import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Product {
  id: string;
  name: string;
  price: string;
  minOrder: string;
  image: string;
  isNew: boolean;
}

const products: Product[] = [
  {
    id: 'slim-fit-denim',
    name: 'SLIM FIT DENIM',
    price: '$24.99 /unidad',
    minOrder: 'Min. 24 unidades',
    image: '/images/product-1.jpg',
    isNew: true,
  },
  {
    id: 'straight-leg',
    name: 'STRAIGHT LEG',
    price: '$22.99 /unidad',
    minOrder: 'Min. 24 unidades',
    image: '/images/product-2.jpg',
    isNew: false,
  },
  {
    id: 'black-skinny',
    name: 'BLACK SKINNY',
    price: '$26.99 /unidad',
    minOrder: 'Min. 24 unidades',
    image: '/images/product-3.jpg',
    isNew: true,
  },
  {
    id: 'distressed-blue',
    name: 'DISTRESSED BLUE',
    price: '$28.99 /unidad',
    minOrder: 'Min. 24 unidades',
    image: '/images/product-4.jpg',
    isNew: false,
  },
];

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (prefersReducedMotion.current) return;

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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleImageLoad = (productId: string) => {
    setLoadedImages(prev => new Set(prev).add(productId));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, productId: string) => {
    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='533' viewBox='0 0 400 533'%3E%3Crect fill='%23e5e5e5' width='400' height='533'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle'%3EImagen no disponible%3C/text%3E%3C/svg%3E`;
  };

  return (
    <section id="productos" ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-dark mb-4">
            MÁS VENDIDOS
          </h2>
          <p className="font-body text-lg text-text-muted">
            Nuestros artículos al por mayor más populares
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <article 
              key={product.id} 
              className="product-card group"
              role="article"
              aria-labelledby={`product-${product.id}-name`}
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-bg-gray">
                {!loadedImages.has(product.id) && (
                  <div 
                    className="absolute inset-0 skeleton" 
                    aria-hidden="true"
                  />
                )}
                <img
                  src={product.image}
                  alt={`${product.name} - ${product.price}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(product.id)}
                  onError={(e) => handleImageError(e, product.id)}
                  className={`w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03] group-focus-within:scale-[1.03] ${
                    loadedImages.has(product.id) ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {product.isNew && (
                  <span 
                    className="absolute top-3 left-3 bg-brand-yellow text-brand-dark px-3 py-1 font-accent text-[11px] font-semibold uppercase tracking-[1px]"
                    aria-label="Nuevo producto"
                  >
                    NUEVO
                  </span>
                )}
                <button
                  type="button"
                  className="absolute bottom-0 left-0 right-0 bg-brand-dark text-white py-3 font-accent text-[13px] font-medium uppercase text-center translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 group-active:translate-y-0 transition-transform duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-yellow focus:ring-inset touch-manipulation no-tap-highlight"
                  aria-label={`Agregar ${product.name} a cotización`}
                >
                  Agregar a Cotización
                </button>
              </div>
              <h3 
                id={`product-${product.id}-name`}
                className="font-display text-lg lg:text-xl xl:text-2xl text-brand-dark"
              >
                {product.name}
              </h3>
              <p className="font-body text-sm lg:text-base font-semibold text-brand-dark">{product.price}</p>
              <p className="font-body text-sm text-text-muted">{product.minOrder}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 lg:mt-12">
          <a
            href="#catalogo"
            className="btn-secondary"
          >
            Ver Catálogo Completo
          </a>
        </div>
      </div>
    </section>
  );
}