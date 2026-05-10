import { useState, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';

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
        className="fixed bottom-4 right-4 z-[100] w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center widget-pulse"
        style={{ backgroundColor: '#25D366' }}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat de WhatsApp"}
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={28} className="text-white" />}
      </button>

      {isOpen && (
        <div 
          className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-96 md:w-[28rem] lg:w-[32rem] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 z-[110]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-contact-title"
        >
          <div className="bg-brand-navy p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 541 541" className="w-8 h-8 text-white" aria-label="Virus Jeans Logo">
                  <polygon fill="currentColor" points="280.21 71.91 519.73 71.9 268.54 500.48 175.53 337.65 228.45 244.76 231.12 245.57 271.13 313.37 355.31 165.78 280.21 165.78 280.21 71.91" />
                  <path fill="currentColor" d="M263.38,93.27l-201.97-1.29,116.29,204.25c1.51,5.98-9.99,18.83-12.06,24.9L21.27,69.97h240.17l1.94,1.94v21.36Z" />
                  <path fill="currentColor" d="M263.38,104.92v24.6H123.55l74.88,131.75c.68,1.54.07,2.71-.44,4.13-.58,1.63-11.86,20.21-12.94,20.78L82.13,103.64l181.26,1.29Z" />
                  <path fill="currentColor" d="M263.38,142.47v23.3h-74.45c-.39,0-1.81-1.8-3.23-1.29l33.7,61.59-13.64,23.84-61.49-108.73,119.11,1.29Z" />
                </svg>
              </div>
              <div>
                <h3 id="quick-contact-title" className="font-accent text-white font-semibold">
                  Virus Jeans
                </h3>
                <p className="text-white/80 text-xs">Escríbenos por WhatsApp</p>
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
              className="w-full bg-brand-navy text-white py-3 px-4 rounded-xl font-accent text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-navyLight disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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