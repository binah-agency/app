import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronDown } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
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
    <section id="categorias" className="bg-brand-secondary py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="scroll-reveal text-center mb-12 lg:mb-16">
          <h2 className="reveal-item font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-4">
            COMPRAR POR CATEGORÍA
          </h2>
          <p className="reveal-item font-body text-lg text-neutral-200">
            Encuentra los estilos perfectos para tu inventario
          </p>
        </div>

        <div className="mb-10 lg:mb-12">
          <div className="lg:hidden mb-6 relative">
            <select
              value={activeTab}
              onChange={(e) => handleTabChange(e.target.value as 'HOMBRE' | 'MUJER' | 'NIÑOS' | 'DEPORTIVO')}
              className="w-full font-accent text-sm font-medium uppercase tracking-[1.5px] px-6 py-3 pr-12 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent rounded-full appearance-none cursor-pointer"
              aria-label="Seleccionar categoría"
            >
              <option value="" disabled className="text-gray-500">
                Selecciona la categoría
              </option>
              {tabs.map((tab) => (
                <option key={tab} value={tab} className="text-gray-700">
                  {tab}
                </option>
              ))}
            </select>
            <ChevronDown 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
              aria-hidden="true"
            />
          </div>
          
          <div 
            className="hidden lg:flex flex-wrap justify-center gap-3 lg:gap-4"
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
                className={`font-accent text-sm font-medium uppercase tracking-[1.5px] px-6 sm:px-8 py-3 border-2 border-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-full ${
                  activeTab === tab
                    ? 'bg-white text-brand-navy'
                    : 'bg-transparent text-white hover:bg-white/20 focus:bg-white/20'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div
          id="category-panel"
          ref={gridRef}
          role="tabpanel"
          aria-label={`Categoría ${activeTab}`}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {categoryData[activeTab].map((item) => (
            <article
              key={`${activeTab}-${item.title}`}
              className="bg-gray-800 pb-4 
              rounded-[0.5rem] lg:rounded-[1rem] cat-card group cursor-pointer overflow-hidden lg:cursor-default"
              onClick={() => setSelectedCategory(item)}
              role="button"
              tabIndex={0}
              aria-label={`Ver detalles de ${item.title}`}
            >
              <div className="overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-400 group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
                />
              </div>
              <h3 className="px-4 font-display text-xl lg:text-2xl text-white">{item.title}</h3>
              <p className="px-4 font-body text-sm text-neutral-300">{item.subtitle}</p>
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

      {selectedCategory && (
        <div 
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={`Detalles de ${selectedCategory.title}`}
        >
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCategory(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
            
            <img
              src={selectedCategory.image}
              alt={selectedCategory.title}
              className="w-full aspect-[3/4] object-cover rounded-xl mb-4"
            />
            
            <h3 className="font-display text-2xl text-brand-navy mb-2">
              {selectedCategory.title}
            </h3>
            <p className="font-body text-text-muted mb-4">
              {selectedCategory.subtitle}
            </p>
            
            <a
              href="#catalogo"
              onClick={() => setSelectedCategory(null)}
              className="btn-primary w-full text-center block"
            >
              Ver Catálogo
            </a>
          </div>
        </div>
      )}
    </section>
  );
}