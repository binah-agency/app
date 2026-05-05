import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'SLIM FIT DENIM',
    price: '$24.99 /unidad',
    minOrder: 'Min. 24 unidades',
    image: '/images/product-1.jpg',
    isNew: true,
  },
  {
    name: 'STRAIGHT LEG',
    price: '$22.99 /unidad',
    minOrder: 'Min. 24 unidades',
    image: '/images/product-2.jpg',
    isNew: false,
  },
  {
    name: 'BLACK SKINNY',
    price: '$26.99 /unidad',
    minOrder: 'Min. 24 unidades',
    image: '/images/product-3.jpg',
    isNew: true,
  },
  {
    name: 'DISTRESSED BLUE',
    price: '$28.99 /unidad',
    minOrder: 'Min. 24 unidades',
    image: '/images/product-4.jpg',
    isNew: false,
  },
];

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.product-card');
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
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
    <section id="productos" ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-text-dark mb-4">
            MÁS VENDIDOS
          </h2>
          <p className="font-body text-lg text-text-muted">
            Nuestros artículos al por mayor más populares
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <div key={i} className="product-card group">
              <div className="relative overflow-hidden aspect-[3/4] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-brand-yellow text-text-dark px-3 py-1 font-accent text-[11px] font-semibold uppercase tracking-[1px]">
                    NUEVO
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-text-dark text-white py-3 font-accent text-[13px] font-medium uppercase text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer">
                  Agregar a Cotización
                </div>
              </div>
              <h3 className="font-display text-lg lg:text-xl xl:text-2xl text-text-dark">{product.name}</h3>
              <p className="font-body text-sm lg:text-base font-semibold text-text-dark">{product.price}</p>
              <p className="font-body text-sm text-text-muted">{product.minOrder}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 lg:mt-12">
          <a
            href="#catalogo"
            className="inline-block bg-transparent border-2 border-text-dark text-text-dark px-8 py-4 font-accent text-sm font-medium uppercase tracking-[1.5px] hover:bg-text-dark hover:text-white transition-all duration-300"
          >
            Ver Catálogo Completo
          </a>
        </div>
      </div>
    </section>
  );
}
