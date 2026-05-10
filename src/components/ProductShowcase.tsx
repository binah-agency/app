import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

interface ProductShowcaseProps {
  id?: string;
}

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

export default function ProductShowcase({ id }: ProductShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='533' viewBox='0 0 400 533'%3E%3Crect fill='%23e5e5e5' width='400' height='533'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='16' x='50%25' y='50%25' text-anchor='middle'%3EImagen no disponible%3C/text%3E%3C/svg%3E`;
  };

  return (
    <section id={id || 'productos'} ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-navy700 mb-4">
            MÁS VENDIDOS
          </h2>
          <p className="font-body text-lg text-text-muted">
            Nuestros artículos al por mayor más populares
          </p>
        </div>

        <div className="lg:bg-gray-100 p-2 lg:p-8 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
          {products.map((product) => (
            <article 
              key={product.id} 
              className="bg-gray-50 pb-6 product-card group rounded-md lg:cursor-default"
              onClick={() => setSelectedProduct(product)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalles de ${product.name}`}
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-bg-gray rounded-md">
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
                  onError={(e) => handleImageError(e)}
                  className={`w-full h-full rounded-sm object-cover transition-transform duration-400 group-hover:scale-105 group-focus-within:scale-105 ${
                    loadedImages.has(product.id) ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {product.isNew && (
                  <span 
                    className="absolute top-3 left-3 bg-yellow-300 text-brand-navy px-3 py-1 font-accent text-[11px] font-semibold uppercase tracking-[1px] rounded-full"
                    aria-label="Nuevo producto"
                  >
                    NUEVO
                  </span>
                )}
                <button
                  type="button"
                  className="absolute bottom-0 left-0 right-0 bg-brand-navy text-white py-3 font-accent text-[13px] font-medium uppercase text-center translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 group-active:translate-y-0 transition-transform duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-inset touch-manipulation no-tap-highlight rounded-tl-[0.5rem] rounded-tr-[0.5rem] px-1"
                  aria-label={`Agregar ${product.name} a cotización`}
                >
                  Agregar a Cotización
                </button>
              </div>
              <div className="m-4">
              <h3 
                id={`product-${product.id}-name`}
                className="font-display text-lg lg:text-xl xl:text-2xl text-brand-navy700"
              >
                {product.name}
              </h3>
              <p className="font-body text-sm lg:text-base font-semibold text-brand-navy700">{product.price}</p>
              <p className="font-body text-sm text-text-muted">{product.minOrder}</p>
              </div>
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

      {selectedProduct && (
        <div 
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={`Detalles de ${selectedProduct.name}`}
        >
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
            
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full aspect-[3/4] object-cover rounded-xl mb-4"
            />
            
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-display text-2xl text-brand-navy">
                {selectedProduct.name}
              </h3>
              {selectedProduct.isNew && (
                <span className="bg-brand-secondary text-brand-navy px-2 py-0.5 font-accent text-[10px] font-semibold uppercase tracking-[1px] rounded-full">
                  NUEVO
                </span>
              )}
            </div>
            <p className="font-body text-lg font-semibold text-brand-navy mb-1">
              {selectedProduct.price}
            </p>
            <p className="font-body text-sm text-text-muted mb-4">
              {selectedProduct.minOrder}
            </p>
            
            <a
              href="#catalogo"
              onClick={() => setSelectedProduct(null)}
              className="btn-primary w-full text-center block"
            >
              Agregar a Cotización
            </a>
          </div>
        </div>
      )}
    </section>
  );
}