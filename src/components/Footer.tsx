import { Instagram, Facebook, ArrowUp } from 'lucide-react';
import { COMPANY, CONTACT, FOOTER_LINKS } from '../constants/contact';

interface FooterProps {
  id?: string;
}

export default function Footer({ id }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer id={id} className="bg-black pt-16 lg:pt-20 pb-8 lg:pb-10" role="contentinfo">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12 lg:mb-16">
            <div className="flex items-center gap-4">
              <svg
                viewBox="0 0 541 541"
                className="h-12 w-auto text-brand-secondary"
                aria-label="Virus Jeans Logo"
              >
                <polygon
                  fill="currentColor"
                  points="280.21 71.91 519.73 71.9 268.54 500.48 175.53 337.65 228.45 244.76 231.12 245.57 271.13 313.37 355.31 165.78 280.21 165.78 280.21 71.91"
                />
                <path
                  fill="currentColor"
                  d="M263.38,93.27l-201.97-1.29,116.29,204.25c1.51,5.98-9.99,18.83-12.06,24.9L21.27,69.97h240.17l1.94,1.94v21.36Z"
                />
                <path
                  fill="currentColor"
                  d="M263.38,104.92v24.6H123.55l74.88,131.75c.68,1.54.07,2.71-.44,4.13-.58,1.63-11.86,20.21-12.94,20.78L82.13,103.64l181.26,1.29Z"
                />
                <path
                  fill="currentColor"
                  d="M263.38,142.47v23.3h-74.45c-.39,0-1.81-1.8-3.23-1.29l33.7,61.59-13.64,23.84-61.49-108.73,119.11,1.29Z"
                />
              </svg>
              <span className="font-display text-2xl lg:text-3xl text-white tracking-[3px]">
                {COMPANY.name}
              </span>
            </div>
            <div className="flex gap-6">
              <a 
                href="#" 
                className="text-brand-secondary hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={22} aria-hidden="true" />
              </a>
              <a 
                href="#" 
                className="text-brand-secondary hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={22} aria-hidden="true" />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <div>
              <h4 className="font-accent text-sm font-medium tracking-[1.5px] text-brand-secondary mb-5 uppercase">
                Tienda
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.shop.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="font-body text-[15px] text-white/60 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors duration-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-accent text-sm font-medium tracking-[1.5px] text-brand-secondary mb-5 uppercase">
                Empresa
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="font-body text-[15px] text-white/60 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors duration-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-accent text-sm font-medium tracking-[1.5px] text-brand-secondary mb-5 uppercase">
                Soporte
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="font-body text-[15px] text-white/60 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors duration-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-accent text-sm font-medium tracking-[1.5px] text-brand-secondary mb-5 uppercase">
                Contacto
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="font-body text-[15px] text-white/60 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary">
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <span className="font-body text-[15px] text-white/60">{CONTACT.phone}</span>
                </li>
                <li>
                  <span className="font-body text-[15px] text-white/60">{CONTACT.address}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#222] pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="font-body text-[13px] text-white/60">
                © 2025 {COMPANY.name}. Todos los derechos reservados.
              </span>
              <div className="flex gap-6">
                <a href="#" className="font-body text-[13px] text-white/60 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors duration-300">
                  Política de Privacidad
                </a>
                <a href="#" className="font-body text-[13px] text-white/60 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors duration-300">
                  Términos de Servicio
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-orange-500 text-white hover:bg-orange-600 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
        aria-label="Volver arriba"
      >
        <ArrowUp size={20} aria-hidden="true" />
      </button>
    </>
  );
}