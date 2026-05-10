import { useEffect, useState, useRef } from 'react';
import { Menu, X, Phone, ChevronRight, ShoppingBag, Users, Package, Sparkles, ArrowRight } from 'lucide-react';
import { NAV_LINKS, CONTACT, SCROLL_THRESHOLD } from '../constants/contact';
import { useCategory } from '../pages/Home';

const menuIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'HOMBRE': ShoppingBag,
  'MUJER': ShoppingBag,
  'NIÑOS': Users,
  'DEPORTIVO': Package,
  'NOVEDADES': Sparkles,
  'CATÁLOGO': ArrowRight,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { setActiveCategory } = useCategory();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLinkClick = (category: string | null) => {
    if (category) setActiveCategory(category);
    setMobileOpen(false);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-yellow-400 text-brand-navy px-4 py-2 font-accent text-sm font-semibold uppercase tracking-[1px] rounded-lg"
      >
        Saltar al contenido
      </a>

      <nav
        className={`fixed top-0 left-0 right-0 z-[70] h-16 transition-all duration-300 ${
          scrolled
            ? 'bg-white/50 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/30'
            : 'bg-brand-navy'
        }`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#"
            className={`flex items-center gap-2 sm:gap-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary rounded-lg ${
              scrolled ? 'text-brand-navy700' : 'text-white'
            }`}
            aria-label="Virus Jeans - Inicio"
          >
            <svg
              viewBox="0 0 541 541"
              className="h-8 sm:h-10 w-auto"
              aria-hidden="true"
            >
              <polygon fill="currentColor" points="280.21 71.91 519.73 71.9 268.54 500.48 175.53 337.65 228.45 244.76 231.12 245.57 271.13 313.37 355.31 165.78 280.21 165.78 280.21 71.91"/>
              <path fill="currentColor" d="M263.38,93.27l-201.97-1.29,116.29,204.25c1.51,5.98-9.99,18.83-12.06,24.9L21.27,69.97h240.17l1.94,1.94v21.36Z"/>
              <path fill="currentColor" d="M263.38,104.92v24.6H123.55l74.88,131.75c.68,1.54.07,2.71-.44,4.13-.58,1.63-11.86,20.21-12.94,20.78L82.13,103.64l181.26,1.29Z"/>
              <path fill="currentColor" d="M263.38,142.47v23.3h-74.45c-.39,0-1.81-1.8-3.23-1.29l33.7,61.59-13.64,23.84-61.49-108.73,119.11,1.29Z"/>
            </svg>
            <span className="font-display text-lg sm:text-2xl tracking-[2px] sm:tracking-[3px]">
              VIRUS JEANS
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1 xl:gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleLinkClick(link.category)}
                className={`font-accent text-xs xl:text-sm font-medium tracking-[1.5px] uppercase relative group px-3 py-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 rounded-lg ${
                  scrolled ? 'text-brand-navy700 hover:text-brand-secondary' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full group-focus:w-full transition-all duration-300 ${
                    scrolled ? 'bg-brand-secondary' : 'bg-white'
                  }`}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 font-accent text-xs font-semibold uppercase tracking-[1px] hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 transition-all duration-300 rounded-full hover:scale-105 active:scale-95"
              aria-label="Contactar por WhatsApp"
            >
              <Phone size={14} aria-hidden="true" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              className={`lg:hidden p-2.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary rounded-lg active:scale-95 ${
                scrolled ? 'text-brand-navy700 hover:bg-neutral-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <div 
            className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          
          <div 
            ref={menuRef}
            className="fixed inset-y-0 right-0 z-[75] w-[85%] max-w-sm bg-white shadow-2xl transform transition-all duration-300 ease-out lg:hidden animate-in slide-in-from-right"
            role="dialog" 
            aria-label="Menú de navegación"
            aria-modal="true"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-100">
                <span className="font-display text-xl text-brand-navy tracking-[2px]">
                  MENÚ
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Cerrar menú"
                  className="p-2 text-neutral-500 hover:text-brand-navy hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 sm:p-6">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link, index) => {
                    const IconComponent = menuIcons[link.label] || ChevronRight;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={() => handleLinkClick(link.category)}
                          className="flex items-center justify-between p-4 font-accent text-sm sm:text-base font-medium tracking-[1.5px] uppercase text-brand-navy hover:text-brand-secondary hover:bg-neutral-50 rounded-xl transition-all duration-200 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-brand-secondary/50 group-hover:text-brand-secondary transition-colors" aria-hidden="true" />
                            {link.label}
                          </span>
                          <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-brand-secondary group-hover:translate-x-1 transition-all" aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="p-4 sm:p-6 border-t border-neutral-100 bg-neutral-50">
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 px-6 font-accent text-sm font-semibold uppercase tracking-[1.5px] hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 transition-all duration-300 rounded-xl active:scale-[0.98]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}