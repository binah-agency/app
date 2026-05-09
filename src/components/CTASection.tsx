import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT } from '../constants/contact';

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.cta-animate');
    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="catalogo" data-contacto ref={sectionRef} className="gradient-mesh py-20 lg:py-28 text-center">
      <div className="max-w-[900px] mx-auto px-6">
        <h2 className="cta-animate font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-4">
          ¿LISTOS PARA ESTOQUEAR
          <br />
          TU TIENDA?
        </h2>
        <p className="cta-animate font-body text-lg lg:text-xl text-white/60 mb-6">
          Tu proveedor mayorista de confianza para denim y moda en Venezuela
        </p>
        <p className="cta-animate font-body text-base text-neutral-400 mb-10 lg:mb-12">
          Compra mínima: 6 piezas • Envíos a todo el país • Nueva colección cada semana
        </p>
        <div className="cta-animate flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp px-10 py-4 hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-brand-navy rounded-full"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contactar por WhatsApp
          </a>
          <a
            href="#catalogo"
            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-10 py-4 font-accent text-sm font-medium uppercase tracking-[1.5px] hover:bg-white hover:text-brand-navy focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-navy transition-all duration-300 rounded-full"
          >
            Descargar Lista de Precios
          </a>
        </div>
      </div>
    </section>
  );
}