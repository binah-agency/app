import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY } from '../constants/contact';

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const section = sectionRef.current;
    if (!section) return;

    const left = section.querySelector('.about-left');
    const right = section.querySelector('.about-right');

    if (left) {
      gsap.fromTo(
        left,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (right) {
      gsap.fromTo(
        right,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg-light py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="about-left w-full lg:w-[45%]">
            <img
              src="/images/about-factory.jpg"
              alt="Nuestra fábrica de denim"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="about-right w-full lg:w-[55%] lg:pl-8">
            <span className="font-accent text-sm font-medium tracking-[2px] uppercase text-text-muted mb-4 block">
              SOBRE VIRUS JEANS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-brand-navy700 leading-[1.0] mb-6">
              LÍDERES EN
              <br />
              DENIM VENEZOLANO
            </h2>
            <p className="font-body text-base lg:text-lg text-neutral-700 leading-[1.7] mb-6">
              Desde 2010, <strong>Virus Jeans, C.A.</strong> es el proveedor mayorista líder de denim premium en Venezuela. 
              Ubicados en Valencia, Carabobo, sirvemos a minoristas y distribuidores en todo el país con la mejor 
              relación calidad-precio del mercado.
            </p>
            <p className="font-body text-base lg:text-lg text-neutral-700 leading-[1.7] mb-8">
              Nuestro compromiso con telas premium, construcción duradera y atención personalizada nos ha permitido 
              convertirnos en el partenaire favorito de cientos de comercios en Venezuela.
            </p>
            <div className="flex flex-wrap gap-8 lg:gap-10 mb-8">
              <div>
                <span className="font-display text-3xl lg:text-4xl text-brand-navy700">{COMPANY.yearsExperience}</span>
                <p className="font-body text-sm text-neutral-500 mt-1">Años de Experiencia</p>
              </div>
              <div>
                <span className="font-display text-3xl lg:text-4xl text-brand-navy700">{COMPANY.monthlyUnits}</span>
                <p className="font-body text-sm text-neutral-500 mt-1">Unidades Mensuales</p>
              </div>
              <div>
                <span className="font-display text-3xl lg:text-4xl text-brand-navy700">500+</span>
                <p className="font-body text-sm text-neutral-500 mt-1">Socios Comerciales</p>
              </div>
            </div>
            <a
              href="#catalogo"
              className="btn-secondary"
            >
              Conocer Más
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}