import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SeasonalBanner {
  id: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
  textColor: string;
  startDate: string;
  endDate: string;
}

const seasonalBanners: SeasonalBanner[] = [
  {
    id: 'primavera-2026',
    title: '¡COLECCIÓN PRIMAVERA 2026!',
    subtitle: 'Hasta 25% de descuento en compras mayor a 50 piezas',
    ctaText: 'Ver Ofertas',
    ctaLink: '#catalogo',
    backgroundColor: 'bg-brand-navy',
    textColor: 'text-white',
    startDate: '2026-03-01',
    endDate: '2026-05-31',
  },
  {
    id: 'hot-sale',
    title: '🔥 HOT SALE MAYO 🔥',
    subtitle: 'Descuentos de hasta 30% en toda la línea de jeans',
    ctaText: 'Aprovechar Ahora',
    ctaLink: '#catalogo',
    backgroundColor: 'bg-red-600',
    textColor: 'text-white',
    startDate: '2026-05-01',
    endDate: '2026-05-31',
  },
  {
    id: 'back-to-school',
    title: 'BACK TO SCHOOL',
    subtitle: 'Precios especiales para uniformes escolares',
    ctaText: 'Ver Catálogo',
    ctaLink: '#catalogo',
    backgroundColor: 'bg-blue-600',
    textColor: 'text-white',
    startDate: '2026-07-15',
    endDate: '2026-09-15',
  },
];

export default function SeasonalBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<SeasonalBanner | null>(null);

  useEffect(() => {
    const checkActiveBanner = () => {
      const today = new Date();
      const activeBanners = seasonalBanners.filter((banner) => {
        const startDate = new Date(banner.startDate);
        const endDate = new Date(banner.endDate);
        return today >= startDate && today <= endDate;
      });

      if (activeBanners.length > 0) {
        const randomIndex = Math.floor(Math.random() * activeBanners.length);
        setCurrentBanner(activeBanners[randomIndex]);
        setIsVisible(true);
      }
    };

    checkActiveBanner();
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed || !currentBanner) {
    return null;
  }

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-[55] ${currentBanner.backgroundColor} ${currentBanner.textColor} transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      role="banner"
      aria-label="Banner promocional"
    >
      <div className="max-w-[1400px] mx-auto px-4 py-3 lg:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg sm:text-xl lg:text-2xl tracking-wide">
              {currentBanner.title}
            </span>
            {currentBanner.subtitle && (
              <span className="hidden sm:inline text-sm lg:text-base opacity-90">
                • {currentBanner.subtitle}
              </span>
            )}
          </div>
          <a
            href={currentBanner.ctaLink}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-accent text-sm font-medium uppercase tracking-[1px] transition-all duration-300 hover:scale-105 ${
              currentBanner.backgroundColor === 'bg-red-600'
                ? 'bg-white text-red-600 hover:bg-neutral-100'
                : currentBanner.backgroundColor === 'bg-blue-600'
                ? 'bg-white text-blue-600 hover:bg-neutral-100'
                : 'bg-brand-secondary text-white hover:bg-brand-secondary/90'
            }`}
          >
            {currentBanner.ctaText}
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <button
            onClick={handleDismiss}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors duration-200 ml-2"
            aria-label="Cerrar banner"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}