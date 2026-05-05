import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg-light py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="about-left w-full lg:w-[45%]">
            <img
              src="/images/about-factory.jpg"
              alt="Nuestra fábrica de denim"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="about-right w-full lg:w-[55%] lg:pl-8">
            <span className="font-accent text-sm font-medium tracking-[2px] uppercase text-text-muted mb-4 block">
              SOBRE VIRUS JEANS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-text-dark leading-[1.0] mb-6">
              DENIM CREADO
              <br />
              PARA LOS AUDACES
            </h2>
            <p className="font-body text-base lg:text-lg text-[#333] leading-[1.7] mb-8">
              Desde 2010, Virus Jeans ha sido un proveedor mayorista líder de denim premium y ropa deportiva.
              Nos asociamos con minoristas en todo el país, ofreciendo diseños a la vanguardia de las tendencias
              a precios competitivos al por mayor. Nuestro compromiso con materiales de calidad y manufactura
              ética nos distingue.
            </p>

            <div className="flex flex-wrap gap-8 lg:gap-10 mb-8">
              <div>
                <span className="font-display text-3xl lg:text-4xl text-text-dark">500+</span>
                <p className="font-body text-sm text-text-muted mt-1">Socios Minoristas</p>
              </div>
              <div>
                <span className="font-display text-3xl lg:text-4xl text-text-dark">15+</span>
                <p className="font-body text-sm text-text-muted mt-1">Años en el Negocio</p>
              </div>
              <div>
                <span className="font-display text-3xl lg:text-4xl text-text-dark">100%</span>
                <p className="font-body text-sm text-text-muted mt-1">Calidad Inspeccionada</p>
              </div>
            </div>

            <a
              href="#contacto"
              className="inline-block font-accent text-sm font-medium uppercase text-text-dark border-b-2 border-text-dark pb-1 hover:border-brand-yellow transition-colors duration-300"
            >
              Conocer Más
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
