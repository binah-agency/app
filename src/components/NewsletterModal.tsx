import { useState, useEffect } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const shown = localStorage.getItem('newsletterShown');
      if (!shown) {
        setIsOpen(true);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      localStorage.setItem('newsletterShown', 'true');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletterShown', 'true');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-title"
    >
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 z-10"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="bg-brand-navy p-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-secondary rounded-full mb-4">
            <Mail className="w-7 h-7 text-brand-navy" />
          </div>
          <h2 id="newsletter-title" className="font-display text-3xl lg:text-4xl text-white">
            ¡20% DE DESCUENTO
          </h2>
          <p className="text-white/80 mt-2 font-body">
            En tu primera orden mayorista
          </p>
        </div>

        <div className="p-8">
          {submitted ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="font-body text-lg text-gray-700">
                ¡Gracias! Revisa tu WhatsApp para el código de descuento.
              </p>
            </div>
          ) : (
            <>
              <p className="font-body text-gray-600 text-center mb-6">
                Suscríbete y recibe ofertas exclusivas directamente en tu WhatsApp
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Tu número de WhatsApp
                  </label>
                  <input
                    id="newsletter-email"
                    type="tel"
                    placeholder="Tu número de WhatsApp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-body text-gray-700 focus:outline-none focus:border-brand-secondary transition-colors"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-brand-secondary text-brand-navy py-4 px-6 rounded-xl font-accent text-sm font-bold uppercase tracking-[1px] hover:bg-yellow-400 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                >
                  OBTENER MI DESCUENTO
                </button>
              </form>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                Al registrarte aceptas recibir mensajes por WhatsApp. Puedes cancelar en cualquier momento.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}