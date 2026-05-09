import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BenefitHeading from './BenefitHeading';

interface GalleryRowProps {
  images: string[];
  direction: 'left' | 'right';
  speed: number;
}

const galleryImages = [
  '/images/gallery-1.jpg',
  '/images/gallery-2.jpg',
  '/images/gallery-3.jpg',
  '/images/gallery-4.jpg',
  '/images/gallery-5.jpg',
  '/images/gallery-6.jpg',
  '/images/gallery-7.jpg',
  '/images/gallery-8.jpg',
];

const rowImages = [...galleryImages, ...galleryImages, ...galleryImages];

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

function MarqueeText() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const marquee = marqueeRef.current;
    if (!marquee) return;

    const tween = gsap.to(marquee, {
      xPercent: -50,
      ease: 'none',
      duration: 8,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  if (prefersReducedMotion.current) {
    return (
      <div className="py-6 lg:py-10 overflow-hidden">
        <h3 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-brand-navy700 text-center whitespace-nowrap px-4">
          VIRUS JEANS
        </h3>
      </div>
    );
  }

  return (
    <div className="py-6 lg:py-10 overflow-hidden bg-bg-light" aria-hidden="true">
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <h3
            key={i}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-brand-navy700 flex-shrink-0 px-8"
          >
            VIRUS JEANS
          </h3>
        ))}
      </div>
    </div>
  );
}

interface CollectionCardProps {
  title: string;
  subtitle: string;
  cta: string;
  bgImage: string;
}

function CollectionCard({ title, subtitle, cta, bgImage }: CollectionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion.current || !cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-xl aspect-[4/5] group cursor-pointer"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
        <span className="text-white/80 text-sm lg:text-base font-medium tracking-wider uppercase mb-2">
          {subtitle}
        </span>
        <h3 className="text-white font-display text-2xl sm:text-3xl lg:text-4xl mb-4">
          {title}
        </h3>
        <span className="inline-flex items-center gap-2 bg-white text-brand-navy700 px-5 py-2.5 rounded-full font-semibold text-sm lg:text-base w-fit group-hover:bg-brand-navy700 group-hover:text-white transition-colors duration-300">
          {cta}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </div>
  );
}

const collections = [
  {
    title: 'Primavera 2026',
    subtitle: 'Nueva Temporada',
    cta: 'Ver Colección',
    bgImage: '/images/gallery-1.jpg',
  },
  {
    title: 'Urban Essentials',
    subtitle: 'Colección Exclusiva',
    cta: 'Explorar',
    bgImage: '/images/gallery-2.jpg',
  },
  {
    title: 'Summer Vibes',
    subtitle: 'Edición Limitada',
    cta: 'Descubrir',
    bgImage: '/images/gallery-3.jpg',
  },
  {
    title: 'Street Style',
    subtitle: 'Tendencias 2026',
    cta: 'Ver Más',
    bgImage: '/images/gallery-4.jpg',
  },
];

function CollectionsGrid() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {collections.map((collection, i) => (
        <CollectionCard key={i} {...collection} />
      ))}
    </div>
  );
}

function GalleryRow({ images, direction, speed }: GalleryRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const row = rowRef.current;
    if (!row) return;

    const xPercent = direction === 'left' ? speed : -speed;
    const tween = gsap.to(row, {
      xPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: '.gallery-wrapper',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [direction, speed]);

  return (
    <div ref={rowRef} className="gallery-row" aria-hidden="true">
      {images.map((img, i) => (
        <img
          key={`${img}-${i}`}
          src={img}
          alt=""
          loading="lazy"
          className="flex-shrink-0"
        />
      ))}
    </div>
  );
}

export default function ParallaxGallery() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useRef(checkReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion.current || !titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  if (prefersReducedMotion.current) {
    return (
      <>
        <BenefitHeading />
        <section className="bg-bg-light py-16 lg:py-20">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-navy700 text-center mb-10 lg:mb-12 px-4">
            NUESTRAS COLECCIONES
          </h2>
          <CollectionsGrid />
          <MarqueeText />
        </section>
      </>
    );
  }

  return (
    <>
      <BenefitHeading />
      <section className="bg-bg-light py-16 lg:py-20 overflow-hidden">
        <h2
        ref={titleRef}
        className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-navy700 text-center mb-10 lg:mb-12 px-4"
      >
        NUESTRAS COLECCIONES
      </h2>

      <div className="gallery-wrapper flex flex-col gap-2" aria-hidden="true">
          <CollectionsGrid />
          <MarqueeText />
          <GalleryRow images={rowImages.slice(4).concat(rowImages.slice(0, 4))} direction="right" speed={10} />
          <GalleryRow images={[...rowImages].reverse().slice(1).concat([...rowImages].reverse().slice(0, 1))} direction="left" speed={5} />
        </div>
      </section>
    </>
  );
}