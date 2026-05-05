import { Truck, RefreshCw, Shield, Tag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 'envio-mayor',
    icon: Truck,
    title: 'ENVÍO A MAYOR',
    description: 'Entrega nacional para pedidos al por mayor',
  },
  {
    id: 'devoluciones',
    icon: RefreshCw,
    title: 'DEVOLUCIONES FÁCILES',
    description: 'Política de devolución de 30 días en inventario sin usar',
  },
  {
    id: 'calidad-garantizada',
    icon: Shield,
    title: 'CALIDAD GARANTIZADA',
    description: 'Telas premium y construcción duradera',
  },
  {
    id: 'precios-competitivos',
    icon: Tag,
    title: 'PRECIOS COMPETITIVOS',
    description: 'Los mejores márgenes para minoristas y distribuidores',
  },
];

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function FeaturesBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.feature-item');
    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
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
    <section ref={sectionRef} className="bg-brand-dark py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature) => (
            <article 
              key={feature.id} 
              className="feature-item"
              role="region"
              aria-label={feature.title}
            >
              <div 
                className="relative"
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
                onFocus={() => setActiveFeature(feature.id)}
                onBlur={() => setActiveFeature(null)}
                tabIndex={0}
              >
                <div 
                  className={`transition-all duration-300 ${
                    activeFeature === feature.id ? 'transform -translate-y-1' : ''
                  }`}
                >
                  <feature.icon 
                    className={`w-10 h-10 lg:w-12 lg:h-12 mx-auto lg:mx-0 mb-4 transition-colors duration-300 ${
                      activeFeature === feature.id ? 'text-brand-yellow' : 'text-brand-yellow'
                    }`}
                    strokeWidth={1.5} 
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-xl lg:text-2xl text-white mb-2 text-center lg:text-left">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-[#999] leading-relaxed text-center lg:text-left">
                    {feature.description}
                  </p>
                </div>
                <div 
                  className={`absolute inset-0 border-2 border-brand-yellow rounded-lg transition-opacity duration-300 pointer-events-none ${
                    activeFeature === feature.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}