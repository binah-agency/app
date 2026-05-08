import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { COMPANY } from '../constants/contact';

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function Hero() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());
  const [imageLoaded, setImageLoaded] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setImageLoaded(true);
      return;
    }

    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const ctx = gsap.context(() => {
      const children = left.querySelectorAll('.hero-animate');
      gsap.from(children, {
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
      });

      const img = right.querySelector('img');
      if (img) {
        gsap.from(img, {
          scale: 1.08,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="min-h-screen flex flex-col lg:flex-row" 
      aria-label="Hero principal"
      id="hero"
    >
      <div
        ref={leftRef}
        className="w-full lg:w-1/2 gradient-mesh-hero flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-16 min-h-[50vh] lg:min-h-screen relative"
      >
        <div className="hero-animate pt-16 lg:pt-0">
          <span className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white tracking-[4px]">
            {COMPANY.name}
          </span>
        </div>

        <div className="my-8 lg:my-0">
          <h1 className="hero-animate font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.95]">
            {COMPANY.tagline}
          </h1>
        </div>

        <div className="mb-16 lg:mb-0">
          <div className="flex flex-wrap gap-6 lg:gap-10 mb-6">
            <div className="hero-animate">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">
                {COMPANY.yearsExperience}
              </span>
              <p className="font-body text-sm text-neutral-300 mt-1">Años de Experiencia</p>
            </div>
            <div className="hero-animate">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">
                {COMPANY.monthlyUnits}
              </span>
              <p className="font-body text-sm text-neutral-300 mt-1">Unidades Mensuales</p>
            </div>
          </div>
          <a
            href="#catalogo"
            className="hero-animate btn-primary"
          >
            Descargar Catálogo
          </a>
        </div>
      </div>

      <div ref={rightRef} className="w-full lg:w-1/2 relative overflow-hidden min-h-[50vh] lg:min-h-screen bg-brand-navy">
        {!imageLoaded && (
          <div 
            className="absolute inset-0 bg-brand-navy z-10" 
            aria-hidden="true"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 lg:w-16 lg:h-16 border-3 border-brand-secondary/20 border-t-brand-secondary rounded-full animate-spin" />
            </div>
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-bg-gray flex items-center justify-center">
            <div className="text-center p-8">
              <p className="font-accent text-lg text-neutral-600">Imagen no disponible</p>
            </div>
          </div>
        ) : (
          <img
            src="/images/hero-model.jpg"
            alt="Modelo presentando colección de denim premium 2025"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            onError={() => setImageError(true)}
          />
        )}
        
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/40 lg:via-transparent lg:to-transparent" 
          aria-hidden="true" 
        />
        
        <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8">
          <span className="bg-neutral-800 text-white px-4 py-2 lg:px-5 lg:py-3 font-accent text-xs font-semibold tracking-[1px] uppercase rounded-full">
            Nueva Colección 2025
          </span>
        </div>
      </div>
    </section>
  );
}