import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTACT } from '../constants/contact';
import { TYPOGRAPHY } from '../constants/typography';

interface Slide {
  id: number;
  image: string;
  alt: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/hero-model.jpg',
    alt: 'Modelo con colección denim',
    badge: 'Nueva Colección 2025',
    title: 'JEANS Y ROPA AL POR MAYOR',
    subtitle: 'El proveedor favorito de comercios en toda Venezuela',
  },
  {
    id: 2,
    image: '/images/cat-women-1.jpg',
    alt: 'Jeans para mujer',
    badge: 'Tallas 3-13',
    title: 'MODA FEMENINA',
    subtitle: 'Los estilos más populares para tu tienda',
  },
  {
    id: 3,
    image: '/images/cat-men-1.jpg',
    alt: 'Jeans para caballero',
    badge: 'Calidad Premium',
    title: 'COLECCIÓN CABALLERO',
    subtitle: 'Calidad premium que tus clientes aman',
  },
  {
    id: 4,
    image: '/images/gallery-1.jpg',
    alt: 'Moda denim',
    badge: 'Precios Mayoristas',
    title: 'ENVÍOS A TODO EL PAÍS',
    subtitle: 'Despachos diarios con las mejores agencias',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goToPrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full h-screen min-h-[100dvh] pb-20 lg:pb-0 bg-gradient-to-br from-blue-900 via-blue-800 to-brand-navy overflow-y-auto touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-12 xl:p-16 pt-20 pb-8 lg:pt-12">
              <div className="max-w-xl text-center animate-in fade-in slide-in-from-left-4 duration-700">
                {slide.badge && (
                  <span className="inline-block bg-brand-secondary text-neutral-100 px-3 py-1 rounded-full font-accent text-xs font-semibold tracking-[1px] uppercase mb-4">
                    {slide.badge}
                  </span>
                )}
                {slide.title && (
                  <h1 className={`font-display text-white leading-[0.95] mb-4 ${TYPOGRAPHY.display.hero}`}>
                    {slide.title}
                  </h1>
                )}
                {slide.subtitle && (
                  <p className={`font-body text-neutral-100 bg-brand-navy/50 backdrop-blur-sm px-6 py-3 rounded-2xl inline-block mb-4 ${TYPOGRAPHY.body.large}`}>
                    {slide.subtitle}
                  </p>
                )}
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-secondary text-neutral-100 px-6 py-3 rounded-full font-accent text-sm font-bold uppercase tracking-[1px] hover:bg-yellow-400 transition-all duration-300 mt-4"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contactar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrev}
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full items-center justify-center transition-all duration-300 z-10 group"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={goToNext}
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full items-center justify-center transition-all duration-300 z-10 group"
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}