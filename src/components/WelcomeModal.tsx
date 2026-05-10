import { useState, useEffect } from 'react';
import { X, Gift, Check, MessageCircle, Zap, ChevronRight } from 'lucide-react';
import { CONTACT } from '../constants/contact';

interface Reward {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const rewards: Reward[] = [
  {
    id: 1,
    icon: <Gift className="w-7 h-7" />,
    title: '📦 Catálogo Exclusivo',
    description: '+500 modelos actualizados cada semana',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 2,
    icon: <MessageCircle className="w-7 h-7" />,
    title: '💬 Asesoría Personalizada',
    description: 'Atención directa por WhatsApp',
    color: 'from-green-400 to-emerald-500',
  },
  {
    id: 3,
    icon: <Zap className="w-7 h-7" />,
    title: '🚚 Envío Gratis',
    description: 'En tu primer pedido mayorista',
    color: 'from-purple-400 to-indigo-500',
  },
];

function Isotipo() {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="w-16 h-16 text-white"
      fill="currentColor"
    >
      <polygon points="51.5,13.2 95.3,13.2 49.1,91.8 32.1,61.6 41.8,44.6 42.3,44.8 49.6,57.1 65,30.2 51.5,30.2 51.5,13.2"/>
      <path d="M48.2,17l-37,0,21.3,37.3c0.3,1.1-1.8,3.4-2.2,4.5L3.9,12.8h43.8l0.4,0.4v3.9L48.2,17z"/>
      <path d="M48.2,19.1v4.5H22.6l13.7,24.1c0.1,0.3,0,0.5-0.1,0.8c-0.1,0.3-2.2,3.7-2.4,3.8L15,19.8l33.1,0.2L48.2,19.1z"/>
      <path d="M48.2,26v4.3h-13.6c-0.1,0-0.3-0.3-0.6-0.2l6.2,11.3l-2.5,4.4l-11.3-19.9l21.8,0.2L48.2,26z"/>
    </svg>
  );
}

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'welcome' | 'rewards' | 'success'>('welcome');
  const [selectedReward, setSelectedReward] = useState<number | null>(null);
  const [hoveredReward, setHoveredReward] = useState<number | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('virusJeansWelcome');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('virusJeansWelcome', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClaimReward = () => {
    if (selectedReward) {
      setStep('success');
      const reward = rewards.find(r => r.id === selectedReward);
      const message = `Hola! Quiero reclamar mi reward: ${reward?.title}. Me interesa conocer más sobre ${reward?.description}`;
      setTimeout(() => {
        window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
        setIsOpen(false);
      }, 2000);
    }
  };

  const handleSpinToRewards = () => {
    setStep('rewards');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-[95vw] sm:max-w-lg md:max-w-2xl lg:max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10 z-20"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {step === 'welcome' && (
          <>
            <div className="relative bg-gradient-to-br from-brand-navy via-brand-navy700 to-[#1a365d] py-12 px-8 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-brand-secondary rounded-full blur-3xl -translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400 rounded-full blur-3xl translate-x-10 translate-y-10"></div>
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/20">
                  <Isotipo />
                </div>
                
                <h2 id="welcome-title" className="font-display text-4xl lg:text-5xl text-white mb-3 tracking-wide">
                  ¡BIENVENIDO!
                </h2>
                <p className="text-white/80 font-body text-lg mb-6">
                  Tu proveedor mayorista de confianza
                </p>
                
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Gift className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-accent text-sm">Tienes 3 rewards exclusivos esperando</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <button
                onClick={handleSpinToRewards}
                className="group w-full bg-brand-navy text-white py-5 px-6 rounded-2xl font-accent text-base font-bold uppercase tracking-[1px] hover:bg-brand-navyLight transition-all duration-300 hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
              >
                <span>RECLAMAR MIS RECOMPENSAS</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-4 text-gray-400 hover:text-gray-600 font-body text-sm transition-colors"
              >
                maybe later
              </button>
            </div>
          </>
        )}

        {step === 'rewards' && (
          <>
            <div className="bg-brand-navy py-8 px-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-3">
                <Isotipo />
              </div>
              <h2 className="font-display text-2xl lg:text-3xl text-white">
                ELIGE TU RECOMPENSA
              </h2>
              <p className="text-white/60 text-sm mt-2">
                Toca una opción para seleccionar
              </p>
            </div>

            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <button
                  key={reward.id}
                  onClick={() => setSelectedReward(reward.id)}
                  onMouseEnter={() => setHoveredReward(reward.id)}
                  onMouseLeave={() => setHoveredReward(null)}
                  className={`group relative p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
                    selectedReward === reward.id
                      ? 'border-brand-navy shadow-lg bg-brand-navy/5'
                      : hoveredReward === reward.id
                        ? 'border-gray-300 shadow-md'
                        : 'border-gray-100'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${reward.color} opacity-0 transition-opacity duration-300 ${
                    hoveredReward === reward.id ? 'opacity-5' : ''
                  }`} />
                  
                  <div className="relative flex items-center gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${reward.color} flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 ${
                      hoveredReward === reward.id ? 'scale-110' : ''
                    }`}>
                      {reward.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-display text-lg text-brand-navy font-semibold">
                        {reward.title}
                      </h3>
                      <p className="font-body text-sm text-gray-500 mt-1">
                        {reward.description}
                      </p>
                    </div>
                    
                    {selectedReward === reward.id ? (
                      <div className="flex-shrink-0 w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center animate-in zoom-in">
                        <Check className="w-5 h-5 text-brand-navy" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-8 h-8 border-2 border-gray-200 rounded-full flex items-center justify-center group-hover:border-brand-secondary/50 transition-colors">
                        <div className={`w-3 h-3 rounded-full ${
                          hoveredReward === reward.id ? 'bg-brand-secondary' : 'bg-gray-200'
                        } transition-colors`} />
                      </div>
                    )}
                  </div>
                </button>
              ))}

              <button
                onClick={handleClaimReward}
                disabled={!selectedReward}
                className={`relative w-full mt-6 py-5 px-6 rounded-2xl font-accent text-base font-bold uppercase tracking-[1px] transition-all duration-300 overflow-hidden ${
                  selectedReward
                    ? 'bg-brand-navy text-white hover:bg-brand-navyLight shadow-lg hover:scale-[1.02]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span className="relative z-10">
                  {selectedReward ? 'RECLAMAR POR WHATSAPP' : 'SELECCIONA UNA OPCIÓN'}
                </span>
              </button>
            </div>
          </>
        )}

        {step === 'success' && (
          <div className="py-16 px-8 text-center">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
              <div className="relative bg-green-100 rounded-full p-6">
                <Check className="w-12 h-12 text-green-500" />
              </div>
            </div>
            
            <h2 className="font-display text-3xl lg:text-4xl text-brand-navy mb-3">
              ¡RECLAMADO! 🎉
            </h2>
            <p className="font-body text-gray-600 mb-2">
              Redireccionando a WhatsApp...
            </p>
            <p className="font-body text-sm text-gray-400">
              Un experto te atenderá en minutos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}