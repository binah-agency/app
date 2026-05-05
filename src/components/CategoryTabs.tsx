import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CategoryItem {
  title: string;
  subtitle: string;
  image: string;
}

interface CategoryData {
  [key: string]: CategoryItem[];
}

const tabs = ['HOMBRE', 'MUJER', 'NIÑOS', 'DEPORTIVO'] as const;

const categoryData: CategoryData = {
  HOMBRE: [
    { title: 'JEANS SLIM FIT', subtitle: '15 Estilos Disponibles', image: '/images/cat-men-1.jpg' },
    { title: 'JEANS RECTO', subtitle: '12 Estilos Disponibles', image: '/images/cat-men-2.jpg' },
    { title: 'JEANS SKINNY', subtitle: '10 Estilos Disponibles', image: '/images/gallery-5.jpg' },
    { title: 'JOGGERS DENIM', subtitle: '8 Estilos Disponibles', image: '/images/gallery-1.jpg' },
  ],
  MUJER: [
    { title: 'MOM JEANS', subtitle: '14 Estilos Disponibles', image: '/images/cat-women-1.jpg' },
    { title: 'SKINNY JEANS', subtitle: '18 Estilos Disponibles', image: '/images/cat-women-2.jpg' },
    { title: 'WIDE LEG', subtitle: '9 Estilos Disponibles', image: '/images/gallery-7.jpg' },
    { title: 'HIGH RISE', subtitle: '11 Estilos Disponibles', image: '/images/gallery-2.jpg' },
  ],
  NIÑOS: [
    { title: 'JEANS CLÁSICO', subtitle: '10 Estilos Disponibles', image: '/images/gallery-3.jpg' },
    { title: 'SLIM FIT KIDS', subtitle: '8 Estilos Disponibles', image: '/images/product-1.jpg' },
    { title: 'JEANS ELÁSTICO', subtitle: '12 Estilos Disponibles', image: '/images/product-2.jpg' },
    { title: 'SHORTS DENIM', subtitle: '6 Estilos Disponibles', image: '/images/gallery-6.jpg' },
  ],
  DEPORTIVO: [
    { title: 'JOGGERS', subtitle: '16 Estilos Disponibles', image: '/images/gallery-8.jpg' },
    { title: 'LEGGINGS', subtitle: '14 Estilos Disponibles', image: '/images/product-3.jpg' },
    { title: 'ACTIVE TOP', subtitle: '10 Estilos Disponibles', image: '/images/product-4.jpg' },
    { title: 'CHAQUETA', subtitle: '7 Estilos Disponibles', image: '/images/gallery-4.jpg' },
  ],
};

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('HOMBRE');
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabChange = useCallback((tab: typeof tabs[number]) => {
    if (tab === activeTab) return;

    const grid = gridRef.current;
    if (!grid || prefersReducedMotion.current) {
      setActiveTab(tab);
      return;
    }

    const cards = grid.querySelectorAll('.cat-card');
    gsap.to(cards, {
      opacity: 0,
      y: 10,
      stagger: 0.03,
      duration: 0.2,
      onComplete: () => {
        setActiveTab(tab);
      },
    });
  }, [activeTab]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;
    
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        newIndex = (index + 1) % tabs.length;
        tabRefs.current[newIndex]?.focus();
        handleTabChange(tabs[newIndex]);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        newIndex = (index - 1 + tabs.length) % tabs.length;
        tabRefs.current[newIndex]?.focus();
        handleTabChange(tabs[newIndex]);
        break;
      case 'Home':
        e.preventDefault();
        tabRefs.current[0]?.focus();
        handleTabChange(tabs[0]);
        break;
      case 'End':
        e.preventDefault();
        tabRefs.current[tabs.length - 1]?.focus();
        handleTabChange(tabs[tabs.length - 1]);
        break;
    }
  }, [handleTabChange]);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.cat-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.35, ease: 'power2.out' }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [activeTab]);

  return (
    <section id="categorias" className="bg-brand-yellow py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal text-center mb-12 lg:mb-16">
          <h2 className="reveal-item font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-dark mb-4">
            COMPRAR POR CATEGORÍA
          </h2>
          <p className="reveal-item font-body text-lg text-brand-dark/70">
            Encuentra los estilos perfectos para tu inventario
          </p>
        </div>

        <div 
          className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-10 lg:mb-12"
          role="tablist"
          aria-label="Categorías de productos"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => { tabRefs.current[index] = el; }}
              onClick={() => handleTabChange(tab)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls="category-panel"
              tabIndex={activeTab === tab ? 0 : -1}
              className={`font-accent text-sm font-medium uppercase tracking-[1.5px] px-6 sm:px-8 py-3 border-2 border-brand-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-dark focus:ring-offset-2 ${
                activeTab === tab
                  ? 'bg-brand-dark text-brand-yellow'
                  : 'bg-transparent text-brand-dark hover:bg-black/10 focus:bg-black/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          id="category-panel"
          ref={gridRef}
          role="tabpanel"
          aria-label={`Categoría ${activeTab}`}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {categoryData[activeTab].map((item, i) => (
            <article
              key={`${activeTab}-${item.title}`}
              className="cat-card group cursor-pointer"
            >
              <div className="overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-400 group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
                />
              </div>
              <h3 className="font-display text-xl lg:text-2xl text-brand-dark">{item.title}</h3>
              <p className="font-body text-sm text-text-muted">{item.subtitle}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-10 lg:mt-12">
          <a
            href="#catalogo"
            className="btn-primary"
          >
            Ver Todas las Categorías
          </a>
        </div>
      </div>
    </section>
  );
}