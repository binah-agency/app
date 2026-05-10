import { X } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  subtitle?: string;
  price?: string;
  minOrder?: string;
  badge?: string;
  stock?: string;
  isLowStock?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export default function ProductModal({
  isOpen,
  onClose,
  image,
  title,
  subtitle,
  price,
  minOrder,
  badge,
  stock,
  isLowStock,
  ctaText = 'Ver Catálogo',
  ctaHref = '#catalogo',
}: ProductModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles de ${title}`}
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
        
        <img
          src={image}
          alt={title}
          className="w-full aspect-[3/4] object-cover rounded-xl mb-4"
        />
        
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-display text-2xl text-brand-navy">
            {title}
          </h3>
          {badge && (
            <span className="bg-brand-secondary text-brand-navy px-2 py-0.5 font-accent text-[10px] font-semibold uppercase tracking-[1px] rounded-full">
              {badge}
            </span>
          )}
        </div>
        
        {subtitle && (
          <p className="font-body text-text-muted mb-4">
            {subtitle}
          </p>
        )}
        
        {price && (
          <p className="font-body text-lg font-semibold text-brand-navy mb-1">
            {price}
          </p>
        )}
        
        {minOrder && (
          <p className="font-body text-sm text-text-muted mb-2">
            {minOrder}
          </p>
        )}
        
        {stock && (
          <div className={`mb-4 ${isLowStock ? 'animate-pulse' : ''}`}>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-accent text-xs font-semibold uppercase ${
              isLowStock 
                ? 'bg-red-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isLowStock ? 'bg-white animate-ping' : 'bg-white'}`} />
              {isLowStock ? `¡Últimas ${stock}!` : `Stock: ${stock}`}
            </span>
          </div>
        )}
        
        <a
          href={ctaHref}
          onClick={onClose}
          className="inline-flex items-center justify-center bg-brand-navy700 text-white w-full text-center block px-8 py-4 font-accent text-sm font-medium uppercase tracking-[1.5px] rounded-full"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}