import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT } from '../constants/contact';

interface TestimonialsProps {
  id?: string;
}

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: 'carlos-mendez',
    quote:
      'Virus Jeans ha sido nuestro proveedor principal durante 3 años. La calidad es consistente y los precios nos dan excelentes márgenes.',
    name: 'CARLOS MENDEZ',
    role: 'Dueño, Urban Style Boutique',
  },
  {
    id: 'laura-garcia',
    quote:
      'El servicio al cliente es excepcional. Siempre recibimos nuestros pedidos a tiempo y la calidad del denim es insuperable.',
    name: 'LAURA GARCIA',
    role: 'Gerente, Fashion Forward Store',
  },
  {
    id: 'roberto-sanchez',
    quote:
      'Hemos probado muchos proveedores, pero Virus Jeans ofrece la mejor relación calidad-precio del mercado mayorista.',
    name: 'ROBERTO SANCHEZ',
    role: 'Director, Denim Depot Chain',
  },
];

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function Testimonials({ id }: TestimonialsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.testimonial-card');
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id={id || 'testimonios'} ref={sectionRef} className="bg-brand-secondary py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white text-center mb-12 lg:mb-16">
          LO QUE DICEN NUESTROS SOCIOS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 lg:mb-12">
          {testimonials.map((t) => (
            <article key={t.id} className="testimonial-card bg-gradient-to-br from-brand-navyLight to-brand-navy p-8 lg:p-10" style={{ borderRadius: '16px' }}>
              <blockquote className="font-body text-base lg:text-lg text-white leading-[1.7] mb-6">
                "{t.quote}"
              </blockquote>
              <div className="border-t border-[#333] pt-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center ring-2 ring-brand-secondary/30"
                    aria-hidden="true"
                  >
                    <span className="font-accent text-sm font-semibold text-white">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-accent text-sm font-semibold tracking-[1px] text-white">
                      {t.name}
                    </p>
                    <p className="font-body text-sm text-white/60">{t.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <a
            href={`${CONTACT.whatsapp}?text=${encodeURIComponent('¡Hola! Vi los testimonios de clientes en la página y me interessó mucho. Me gustaría convertirme en socio y empezar a comprar al por mayor. ¿Qué pasos debo seguir?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-navy text-white px-8 py-4 font-accent text-sm font-semibold uppercase tracking-[1.5px] hover:bg-brand-navyHover focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2 transition-colors duration-300 rounded-full"
          >
            Conviértete en Socio
          </a>
        </div>
      </div>
    </section>
  );
}