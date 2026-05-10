import { useEffect, useRef, useCallback, createContext, useContext, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OurBrands from '../components/OurBrands';
import ParallaxGallery from '../components/ParallaxGallery';
import CategoryTabs from '../components/CategoryTabs';
import FeaturesBanner from '../components/FeaturesBanner';
import ProductShowcase from '../components/ProductShowcase';
import AboutSection from '../components/AboutSection';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import DynamicBanner from '../components/DynamicBanner';
import ExitIntentModal from '../components/ExitIntentModal';
import NewsletterModal from '../components/NewsletterModal';
import QuickContactModal from '../components/QuickContactModal';
import WelcomeModal from '../components/WelcomeModal';

const CategoryContext = createContext<{
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
} | null>(null);

export const useCategory = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error('useCategory must be used within CategoryProvider');
  return ctx;
};

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Home() {
  const [activeCategory, setActiveCategory] = useState('HOMBRE');
  const mainRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  const initGSAP = useCallback(() => {
    if (prefersReducedMotion.current) return;

    gsap.config({ nullTargetWarn: false });

    const sections = document.querySelectorAll('.scroll-reveal');
    sections.forEach((section) => {
      const children = section.querySelectorAll('.reveal-item');
      if (children.length > 0) {
        gsap.fromTo(
          children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    if (!prefersReducedMotion.current) {
      initGSAP();
    }

    const handleAnimationEnd = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleAnimationEnd);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener('load', handleAnimationEnd);
    };
  }, [initGSAP]);

  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
      <div className="min-h-screen bg-white overflow-x-hidden">
        <Navbar />
        <DynamicBanner />
        <main id="main-content" ref={mainRef}>
          <Hero id="hero" />
          <OurBrands id="marcas" />
          <ParallaxGallery id="colecciones" />
          <CategoryTabs initialCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <FeaturesBanner id="features" />
          <AboutSection id="nosotros" />
          <div className="h-px bg-gradient-to-r from-transparent via-brand-secondary/30 to-transparent" />
          <ProductShowcase id="productos" />
          <Testimonials id="testimonios" />
          <CTASection id="catalogo" />
          <FAQSection id="faq" />
        </main>
        <Footer />
        <ExitIntentModal>
          <NewsletterModal />
        </ExitIntentModal>
        <QuickContactModal />
        <WelcomeModal />
      </div>
    </CategoryContext.Provider>
  );
}

