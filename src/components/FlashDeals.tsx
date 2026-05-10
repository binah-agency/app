import { useEffect, useState } from 'react';
import { CONTACT } from '../constants/contact';

interface Deal {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  endTime: Date;
}

const deals: Deal[] = [
  {
    id: 1,
    title: 'Jeans Skinny Dama',
    price: 14,
    originalPrice: 20,
    discount: '30% OFF',
    image: '/images/deals/jeans-1.jpg',
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: 'Jeans Slim Caballero',
    price: 16,
    originalPrice: 22,
    discount: '25% OFF',
    image: '/images/deals/jeans-2.jpg',
    endTime: new Date(Date.now() + 18 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: 'Conjunto Deportivo Dama',
    price: 12,
    originalPrice: 18,
    discount: '35% OFF',
    image: '/images/deals/jeans-3.jpg',
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
  },
  {
    id: 4,
    title: 'Jeans Niño Premium',
    price: 10,
    originalPrice: 15,
    discount: '33% OFF',
    image: '/images/deals/jeans-4.jpg',
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
  },
];

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - Date.now();
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex gap-2">
      {[
        { value: timeLeft.hours, label: 'H' },
        { value: timeLeft.minutes, label: 'M' },
        { value: timeLeft.seconds, label: 'S' },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-red-600 text-white font-display text-lg lg:text-xl w-10 lg:w-12 h-10 lg:h-12 rounded-lg flex items-center justify-center">
            {String(item.value).padStart(2, '0')}
          </div>
          <span className="text-xs text-neutral-500 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function FlashDeals() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-accent text-sm font-medium uppercase tracking-[1px] mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
            Ofertas Relámpago
          </div>
          <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-brand-navy mb-4">
            PRECIOS ESPECIALES
          </h2>
          <p className="font-body text-neutral-600 text-lg">
            ¡Solo por hoy! Precios mayoristas exclusivos con descuento
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative">
                <div className="aspect-square bg-neutral-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-4h4v-2h-4V7h-2v4H8v2h4z"/>
                  </svg>
                </div>
                <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full font-accent text-xs font-bold">
                  {deal.discount}
                </div>
                <div className="absolute top-3 right-3">
                  <CountdownTimer endTime={deal.endTime} />
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-accent text-sm lg:text-base text-brand-navy font-medium mb-2 line-clamp-1">
                  {deal.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display text-xl lg:text-2xl text-red-600">
                    ${deal.price}
                  </span>
                  <span className="font-body text-sm text-neutral-400 line-through">
                    ${deal.originalPrice}
                  </span>
                </div>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-brand-secondary text-brand-navy text-center py-2.5 rounded-lg font-accent text-sm font-medium hover:bg-yellow-400 transition-colors"
                >
                  Pedir ahora
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="font-body text-neutral-500 text-sm mb-4">
            *Stock limitado. Precios sujetos a disponibilidad.
          </p>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-secondary font-accent text-sm font-medium hover:underline"
          >
            Ver todas las ofertas
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}