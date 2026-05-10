import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPANY, CONTACT } from '../constants/contact';

interface AboutSectionProps {
  id?: string;
}

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function AboutSection({ id }: AboutSectionProps) {
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
    <section id={id || 'nosotros'} ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          <div className="about-left w-full lg:w-[45%]">
            <img
              src="/images/about-hero.jpg"
              alt="Virus Jeans - Tu proveedor de confianza"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover rounded-2xl"
            />
          </div>
          <div className="about-right w-full lg:w-[55%] lg:pl-8">
<span className="font-accent text-sm font-medium tracking-[2px] uppercase text-neutral-500 mb-4 block">
              SOBRE NOSOTROS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-brand-navy leading-[1.0] mb-6">
              TU PROVEEDOR
              <br />
              DE CONFIANZA
            </h2>
            <p className="font-body text-base lg:text-lg text-neutral-700 leading-[1.7] mb-4">
              Desde 2010 siendo el proveedor mayorista favorito de más de <strong>500 comercios</strong> en Venezuela. 
              Ubicados en el corazón comercial de Valencia, Carabobo.
            </p>
            <p className="font-body text-base lg:text-lg text-neutral-700 leading-[1.7] mb-6">
              Te aseguramos la mejor relación calidad-precio del mercado, con un inventario que se actualiza 
              cada semana y envíos a todo el país.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <span className="font-display text-3xl lg:text-4xl text-brand-navy700">{COMPANY.yearsExperience}</span>
                <p className="font-body text-sm text-neutral-500 mt-1">Años en el mercado</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <span className="font-display text-3xl lg:text-4xl text-brand-navy700">{COMPANY.monthlyUnits}</span>
                <p className="font-body text-sm text-neutral-500 mt-1">Unidades mensuales</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <span className="font-display text-3xl lg:text-4xl text-brand-navy700">500+</span>
                <p className="font-body text-sm text-neutral-500 mt-1">Tiendas atendidas</p>
              </div>
            </div>

            <div className="bg-brand-navy/5 p-4 rounded-xl border border-brand-navy/10 mb-6">
              <h3 className="font-accent font-medium text-brand-navy mb-2">📍 Nuestras ubicaciones</h3>
              <ul className="font-body text-sm text-neutral-600 space-y-1">
                <li>• Valencia: {CONTACT.address}</li>
                <li>• Caracas: {CONTACT.secondaryAddress}</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 font-accent text-sm font-medium uppercase tracking-[1.5px] transition-all duration-300 hover:bg-[#128C7E] rounded-full"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escríbenos por WhatsApp
              </a>
              <a
                href="#catalogo"
                className="btn-secondary text-center"
              >
                Ver Catálogo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}