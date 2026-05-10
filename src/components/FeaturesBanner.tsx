import { Truck, RefreshCw, Shield, Tag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FeaturesBannerProps {
  id?: string;
}

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
    title: 'ENVÍO A TODO EL PAÍS',
    description: 'Despachos diarios con las mejores agencias. Recibe tu pedido en 24-72 horas',
  },
  {
    id: 'devoluciones',
    icon: RefreshCw,
    title: '30 DÍAS DEVOLUCIÓN',
    description: 'Política transparente. Productos sin usar, te devolvemos el 100%',
  },
  {
    id: 'calidad-garantizada',
    icon: Shield,
    title: 'PREMIUM CALIDAD',
    description: 'Telas importadas de primera. Costos reforzados que duran años',
  },
  {
    id: 'precios-competitivos',
    icon: Tag,
    title: 'MEJORES PRECIOS',
    description: 'Hasta 15% de descuento por volumen. Máximos márgenes para tu negocio',
  },
];

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function FeaturesBanner({ id }: FeaturesBannerProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const section = sectionRef.current;
    if (!section) return;

    const headline = section.querySelector('.features-headline');
    if (headline) {
      gsap.fromTo(
        headline,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    const items = section.querySelectorAll('.feature-item');
    gsap.fromTo(
      items,
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'back.out(1.2)',
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
    <section id={id || 'features'} ref={sectionRef} className="bg-gradient-to-br from-brand-navy via-brand-navyLight to-brand-navy700 py-12 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="features-headline text-center mb-8 lg:mb-12">
          <span className="inline-block bg-white text-brand-navy px-5 py-2.5 rounded-full font-accent text-sm font-bold uppercase tracking-[2px] mb-4 shadow-lg">
            ¿Por qué elegirnos?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
            TU NEGOCIO, <span className="text-brand-accent">NUESTRA PRIORIDAD</span>
          </h2>
          <p className="font-body text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
            Compromisos que protegen tu inversión y potencian tus ventas
          </p>
        </div>

        <div className="justify-center grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <article 
              key={feature.id} 
              className={`feature-item group rounded-2xl p-5 lg:p-7 transition-all duration-500 cursor-pointer ${
                activeFeature === feature.id 
                  ? 'bg-white/15 shadow-xl shadow-brand-accent/20 scale-[1.02]' 
                  : 'bg-white/5 hover:bg-white/10 hover:scale-[1.01]'
              }`}
              role="region"
              aria-label={feature.title}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div 
                className="relative"
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
                onFocus={() => setActiveFeature(feature.id)}
                onBlur={() => setActiveFeature(null)}
                tabIndex={0}
              >
                <div className="flex items-start gap-4">
                  <div className={`relative p-3 rounded-xl transition-all duration-300 ${
                    activeFeature === feature.id 
                      ? 'bg-brand-accent text-brand-navy scale-110' 
                      : 'bg-white/10 text-blue-300 group-hover:bg-white/20'
                  }`}>
                    <feature.icon 
                      className="w-8 h-8 lg:w-10 lg:h-10"
                      strokeWidth={1.5} 
                      aria-hidden="true"
                    />
                    {activeFeature === feature.id && (
                      <div className="absolute inset-0 rounded-xl bg-brand-accent animate-ping opacity-20"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-display text-xl lg:text-2xl text-white mb-1 group-hover:text-brand-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                <div className={`h-0.5 mt-4 rounded-full overflow-hidden transition-all duration-500 ${
                  activeFeature === feature.id ? 'bg-brand-accent w-full' : 'bg-white/10 w-0 group-hover:w-full'
                }`} />
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="font-body text-gray-400 text-sm">
            <span className="text-white font-semibold">500+ tiendas</span> ya confían en nosotros
          </p>
        </div>
      </div>
    </section>
  );
}