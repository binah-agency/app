import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BenefitHeading() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.to(headingRef.current, {
      scale: 1.02,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div
      ref={headingRef}
      className="bg-brand-navy mx-auto px-6 py-10 lg:py-14 mb-12 lg:mb-16"
    >
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white text-center">
        Márgenes de Ganancia Superiores
      </h2>
    </div>
  );
}