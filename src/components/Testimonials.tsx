import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'Virus Jeans ha sido nuestro proveedor principal durante 3 años. La calidad es consistente y los precios nos dan excelentes márgenes.',
    name: 'CARLOS MENDEZ',
    role: 'Dueño, Urban Style Boutique',
  },
  {
    quote:
      'El servicio al cliente es excepcional. Siempre recibimos nuestros pedidos a tiempo y la calidad del denim es insuperable.',
    name: 'LAURA GARCIA',
    role: 'Gerente, Fashion Forward Store',
  },
  {
    quote:
      'Hemos probado muchos proveedores, pero Virus Jeans ofrece la mejor relación calidad-precio del mercado mayorista.',
    name: 'ROBERTO SANCHEZ',
    role: 'Director, Denim Depot Chain',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section ref={sectionRef} className="bg-brand-yellow py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-text-dark text-center mb-12 lg:mb-16">
          LO QUE DICEN NUESTROS SOCIOS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 lg:mb-12">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card bg-text-dark p-8 lg:p-10">
              <p className="font-body text-base lg:text-lg text-white leading-[1.7] mb-6">
                "{t.quote}"
              </p>
              <div className="border-t border-[#333] pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center">
                    <span className="font-accent text-sm font-semibold text-white">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-accent text-sm font-semibold tracking-[1px] text-white">
                      {t.name}
                    </p>
                    <p className="font-body text-sm text-[#999]">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://wa.me/15552345678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-text-dark text-brand-yellow px-8 py-4 font-accent text-sm font-semibold uppercase tracking-[1.5px] hover:bg-black transition-colors duration-300"
          >
            Conviértete en Socio
          </a>
        </div>
      </div>
    </section>
  );
}
