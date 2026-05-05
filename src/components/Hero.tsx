import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const children = left.querySelectorAll('.hero-animate');
    gsap.from(children, {
      x: -40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
    });

    gsap.from(right.querySelector('img'), {
      scale: 1.08,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      {/* Left half */}
      <div
        ref={leftRef}
        className="w-full lg:w-1/2 bg-brand-dark flex flex-col justify-between p-8 sm:p-12 lg:p-16 xl:p-20 min-h-[50vh] lg:min-h-screen"
      >
        <div className="hero-animate">
          <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-[4px]">
            VIRUS JEANS
          </span>
        </div>

        <div className="mt-12 lg:mt-0">
          <h1 className="hero-animate font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.95]">
            PREMIUM DENIM
            <br />
            &amp; ACTIVEWEAR
          </h1>
        </div>

        <div className="mt-12 lg:mt-0">
          <div className="flex flex-wrap gap-8 lg:gap-12 mb-8">
            <div className="hero-animate">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">15+</span>
              <p className="font-body text-sm text-[#999999] mt-1">Años de Experiencia</p>
            </div>
            <div className="hero-animate">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-white">50K+</span>
              <p className="font-body text-sm text-[#999999] mt-1">Unidades Mensuales</p>
            </div>
          </div>
          <a
            href="#catalogo"
            className="hero-animate inline-block bg-brand-yellow text-text-dark px-8 py-4 font-accent text-sm font-semibold uppercase tracking-[1.5px] hover:bg-text-dark hover:text-brand-yellow transition-colors duration-300"
          >
            Descargar Catálogo
          </a>
        </div>
      </div>

      {/* Right half */}
      <div ref={rightRef} className="w-full lg:w-1/2 relative overflow-hidden min-h-[50vh] lg:min-h-screen">
        <img
          src="/images/hero-model.jpg"
          alt="Premium denim fashion"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10">
          <span className="bg-brand-yellow text-text-dark px-5 py-3 font-accent text-xs font-semibold tracking-[1px] uppercase">
            Nueva Colección 2025
          </span>
        </div>
      </div>
    </section>
  );
}
