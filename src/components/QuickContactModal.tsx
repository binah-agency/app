import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const PRESET_MESSAGES = [
  "Hola, me interesa conocer el catálogo de jeans",
  "Quiero información sobre precios por mayoreo",
  "¿Tienen disponible cierta referencia?",
  "Otro motivo (escribir)",
];

export default function QuickContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSend = () => {
    const message = selectedPreset === "Otro motivo (escribir)" 
      ? customMessage 
      : selectedPreset;
    
    if (message) {
      const whatsappUrl = `https://wa.me/15552345678?text=${encodeURIComponent(message || 'Hola, necesito información')}`;
      window.open(whatsappUrl, '_blank');
      setIsOpen(false);
      setCustomMessage('');
      setSelectedPreset(null);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 flex items-center justify-center"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat de WhatsApp"}
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 md:w-[28rem] lg:w-[32rem] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-contact-title"
        >
          <div className="bg-[#25D366] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-6 h-6 text-white" aria-label="Virus Jeans Logo">
                  <polygon fill="currentColor" points="51.8,13.3 96,13.3 49.6,92.4 32.4,62.4 42.2,45.2 42.7,45.4 50.1,57.9 65.6,30.6 51.8,30.6 51.8,13.3" />
                </svg>
              </div>
              <div>
                <h3 id="quick-contact-title" className="font-accent text-white font-semibold">
                  Virus Jeans
                </h3>
                <p className="text-white/80 text-xs">En línea ahora</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            <p className="font-body text-sm text-gray-600 mb-4">
              ¡Hola! ¿En qué podemos ayudarte? Selecciona una opción:
            </p>
            
            {PRESET_MESSAGES.map((msg) => (
              <button
                key={msg}
                onClick={() => setSelectedPreset(msg)}
                className={`w-full text-left p-3 rounded-xl text-sm font-body transition-all duration-200 ${
                  selectedPreset === msg
                    ? 'bg-brand-secondary text-brand-navy font-medium'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {msg}
              </button>
            ))}

            {selectedPreset === "Otro motivo (escribir)" && (
              <div className="mt-2">
                <label htmlFor="custom-msg" className="sr-only">Escribe tu mensaje</label>
                <textarea
                  id="custom-msg"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm font-body resize-none focus:outline-none focus:border-brand-secondary"
                  rows={3}
                />
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <button
              onClick={handleSend}
              disabled={!selectedPreset || (selectedPreset === "Otro motivo (escribir)" && !customMessage)}
              className="w-full bg-[#25D366] text-white py-3 px-4 rounded-xl font-accent text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#128C7E] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
              Enviar mensaje
            </button>
          </div>
        </div>
      )}
    </>
  );
}