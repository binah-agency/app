import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface BannerConfig {
  id: string;
  sectionId: string;
  type: 'announcement' | 'offer';
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
  accentColor: string;
  icon?: string;
}

const sectionBanners: Record<string, BannerConfig[]> = {
  'categorias': [
    {
      id: 'cat-offer-1',
      sectionId: 'categorias',
      type: 'offer',
      title: '¡DESCUENTOS EN CATEGORÍAS!',
      subtitle: 'Hasta 20% OFF',
      ctaText: 'Ver Ofertas',
      ctaLink: '#catalogo',
      backgroundColor: 'bg-gradient-to-r from-red-600 to-red-700',
      accentColor: 'text-yellow-300',
      icon: '🏷️',
    },
  ],
  'hero': [
    {
      id: 'hero-ann-1',
      sectionId: 'hero',
      type: 'announcement',
      title: 'NUEVA COLECCIÓN PRIMAVERA 2026',
      subtitle: 'Estilos exclusivos',
      ctaText: 'Ver Ahora',
      ctaLink: '#catalogo',
      backgroundColor: 'bg-gradient-to-r from-blue-800 to-brand-navy',
      accentColor: 'text-blue-300',
      icon: '✨',
    },
  ],
  'productos': [
    {
      id: 'prod-offer-1',
      sectionId: 'productos',
      type: 'offer',
      title: '¡MÁS VENDIDOS EN OFERTA!',
      subtitle: 'Precios especiales',
      ctaText: 'Ver Productos',
      ctaLink: '#productos',
      backgroundColor: 'bg-gradient-to-r from-green-600 to-green-700',
      accentColor: 'text-white',
      icon: '🔥',
    },
  ],
  'catalogo': [
    {
      id: 'cat-promo-1',
      sectionId: 'catalogo',
      type: 'offer',
      title: 'ENVÍO GRATIS +$500',
      subtitle: 'En toda tu compra',
      ctaText: 'Comprar',
      ctaLink: '#catalogo',
      backgroundColor: 'bg-gradient-to-r from-[#128C7E] to-[#25D366]',
      accentColor: 'text-white',
      icon: '🚚',
    },
  ],
};

export default function DynamicBanner() {
  const [activeBanner, setActiveBanner] = useState<BannerConfig | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastDismissRef = useRef<number>(0);

  const COOLDOWN_MS = 180000;

  useEffect(() => {
    const handleScroll = () => {
      if (Date.now() - lastDismissRef.current < COOLDOWN_MS) return;

      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let foundSection = false;

      for (const [sectionId, banners] of Object.entries(sectionBanners)) {
        if (sectionId === 'hero') continue;
        
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (banners.length > 0) {
              setActiveBanner(banners[Math.floor(Math.random() * banners.length)]);
              setIsDismissed(false);
              setTimeout(() => setIsVisible(true), 100);
              foundSection = true;
            }
            break;
          }
        }
      }

      if (!foundSection) {
        setIsVisible(false);
        setActiveBanner(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    lastDismissRef.current = Date.now();
    
    if (cooldownRef.current) {
      clearTimeout(cooldownRef.current);
    }
    
    cooldownRef.current = setTimeout(() => {
      lastDismissRef.current = 0;
    }, COOLDOWN_MS);
  };

  if (!isVisible || !activeBanner || isDismissed) {
    return null;
  }

  return (
    <div
      className={`fixed left-2 right-2 sm:left-4 sm:right-4 z-[55] ${activeBanner.backgroundColor} text-white transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0'
      } rounded-b-2xl sm:rounded-b-3xl shadow-xl top-16 sm:top-4`}
      role="banner"
      aria-label={`Banner de ${activeBanner.type === 'offer' ? 'oferta' : 'anuncio'}`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 lg:gap-4 text-center">
          {activeBanner.icon && (
            <span className="text-xl sm:text-2xl hidden sm:block" aria-hidden="true">
              {activeBanner.icon}
            </span>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-0 sm:gap-2">
            <span className="font-display text-sm sm:text-base lg:text-xl xl:text-2xl tracking-wide leading-tight">
              {activeBanner.title}
            </span>
            {activeBanner.subtitle && (
              <span className={`text-xs sm:text-sm lg:text-base ${activeBanner.accentColor}`}>
                {activeBanner.subtitle}
              </span>
            )}
          </div>
          <a
            href={activeBanner.ctaLink}
            className={`w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-accent text-xs sm:text-sm font-medium uppercase tracking-wide transition-all duration-300 hover:scale-105 ${
              activeBanner.type === 'offer'
                ? 'bg-yellow-400 text-brand-navy hover:bg-yellow-300'
                : 'bg-white text-brand-navy hover:bg-neutral-100'
            }`}
          >
            {activeBanner.ctaText}
            <svg width="12" height="12" className="sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <button
            onClick={handleDismiss}
            className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full transition-colors duration-200 flex-shrink-0"
            aria-label="Cerrar banner"
          >
            <X size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}