import { useState, useEffect, useCallback } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface ExitIntentModalProps {
  children?: React.ReactNode;
}

export default function ExitIntentModal({ children }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleExitIntent = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !hasShown) {
      setIsOpen(true);
      setHasShown(true);
      localStorage.setItem('exitIntentShown', 'true');
    }
  }, [hasShown]);

  useEffect(() => {
    const stored = localStorage.getItem('exitIntentShown');
    if (stored) setHasShown(true);
  }, []);

  useEffect(() => {
    document.addEventListener('mouseleave', handleExitIntent);
    return () => document.removeEventListener('mouseleave', handleExitIntent);
  }, [handleExitIntent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        localStorage.setItem('exitIntentShown', 'true');
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [hasShown]);

  if (!isOpen) return null;

  return (
    <>
      {children}
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-300">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-secondary/20 rounded-full mb-6">
              <MessageCircle className="w-8 h-8 text-brand-secondary" />
            </div>
            
            <h2 id="exit-intent-title" className="font-display text-2xl lg:text-3xl text-brand-navy mb-3">
              ¡Espera! 👋
            </h2>
            
            <p className="font-body text-gray-600 mb-6">
              ¿Tienes dudas sobre nuestros productos al por mayor? 
              ¡Escríbenos por WhatsApp y te respondemos en minutos!
            </p>

            <a
              href="https://wa.me/15552345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 px-6 rounded-xl font-accent text-sm font-medium uppercase tracking-[1px] hover:bg-[#128C7E] transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chatear por WhatsApp
            </a>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
            >
              No gracias, continuar navegando
            </button>
          </div>
        </div>
      </div>
    </>
  );
}