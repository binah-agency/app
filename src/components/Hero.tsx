import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroCarousel from './HeroCarousel';

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export default function Hero() {
  const prefersReducedMotion = useRef(checkReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        x: -40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="min-h-screen relative z-10" 
      aria-label="Hero principal"
      id="hero"
    >
      <HeroCarousel />
    </section>
  );
}