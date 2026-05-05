import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

const rowImages = [...galleryImages, ...galleryImages];

const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

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
        y: 0,
        opacity: 1,
        duration: 0.7,
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
      <section className="bg-bg-light py-16 lg:py-20">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-dark text-center mb-10 lg:mb-12 px-4">
          NUESTRAS COLECCIONES
        </h2>
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
          {galleryImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Colección ${i + 1}`}
              loading="lazy"
              className="w-full aspect-[3/4] object-cover"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bg-light py-16 lg:py-20 overflow-hidden">
      <h2
        ref={titleRef}
        className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-brand-dark text-center mb-10 lg:mb-12 px-4"
      >
        NUESTRAS COLECCIONES
      </h2>

      <div className="gallery-wrapper flex flex-col gap-2" aria-hidden="true">
        <GalleryRow images={rowImages} direction="right" speed={35} />
        <GalleryRow images={[...rowImages].reverse()} direction="left" speed={45} />

        <div className="overflow-hidden py-4" aria-hidden="true">
          <div className="flex whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-7xl sm:text-8xl lg:text-[120px] text-bg-gray mx-4 select-none flex-shrink-0"
              >
                VIRUS
              </span>
            ))}
          </div>
        </div>

        <GalleryRow images={rowImages.slice(2).concat(rowImages.slice(0, 2))} direction="right" speed={25} />
        <GalleryRow images={[...rowImages].reverse().slice(3).concat([...rowImages].reverse().slice(0, 3))} direction="left" speed={40} />

        <div className="overflow-hidden py-4" aria-hidden="true">
          <div className="flex whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-7xl sm:text-8xl lg:text-[120px] text-bg-gray mx-4 select-none flex-shrink-0"
              >
                JEANS
              </span>
            ))}
          </div>
        </div>

        <GalleryRow images={rowImages.slice(4).concat(rowImages.slice(0, 4))} direction="right" speed={30} />
        <GalleryRow images={[...rowImages].reverse().slice(1).concat([...rowImages].reverse().slice(0, 1))} direction="left" speed={35} />
      </div>
    </section>
  );
}