import { Truck, RefreshCw, Shield, Tag } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Truck,
    title: 'ENVÍO A MAYOR',
    description: 'Entrega nacional para pedidos al por mayor',
  },
  {
    icon: RefreshCw,
    title: 'DEVOLUCIONES FÁCILES',
    description: 'Política de devolución de 30 días en inventario sin usar',
  },
  {
    icon: Shield,
    title: 'CALIDAD GARANTIZADA',
    description: 'Telas premium y construcción duradera',
  },
  {
    icon: Tag,
    title: 'PRECIOS COMPETITIVOS',
    description: 'Los mejores márgenes para minoristas y distribuidores',
  },
];

export default function FeaturesBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section ref={sectionRef} className="bg-text-dark py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, i) => (
            <div key={i} className="feature-item text-center lg:text-left">
              <feature.icon className="w-10 h-10 lg:w-12 lg:h-12 text-brand-yellow mx-auto lg:mx-0 mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-xl lg:text-2xl text-white mb-2">{feature.title}</h3>
              <p className="font-body text-sm text-[#999] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
