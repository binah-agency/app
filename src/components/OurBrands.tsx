import { useEffect, useState } from 'react';

interface Brand {
  id: number;
  name: string;
  logo: string;
}

interface OurBrandsProps {
  id?: string;
}

const mainBrands: Brand[] = [
  { id: 2, name: 'Calle8', logo: '/images/calle8.svg' },
  { id: 3, name: 'Xplosivo', logo: '/images/xplosivo.svg' },
];

const otherBrands: Brand[] = [
  { id: 1, name: 'Virus Jeans', logo: '/virus-jeans-icon.svg' },
  { id: 4, name: 'Levis', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Levis_logo.svg' },
  { id: 5, name: 'Wrangler', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Wrangler_Logo.svg' },
  { id: 6, name: 'Lee', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Lee_Logo.svg' },
  { id: 7, name: 'Guess', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Guess_Logo.svg' },
  { id: 8, name: 'Diesel', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Diesel_Logo.svg' },
];

export default function OurBrands({ id }: OurBrandsProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const allBrands = [...mainBrands, ...mainBrands, ...mainBrands, ...mainBrands, ...mainBrands, ...mainBrands, ...mainBrands, ...mainBrands, ...mainBrands, ...mainBrands, ...otherBrands];

  return (
    <section id={id || 'marcas'} className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="text-center mb-12 px-6">
        <span className="font-accent text-sm font-medium tracking-[2px] uppercase text-neutral-500 mb-4 block">
          NUESTRAS MARCAS
        </span>
        <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl text-brand-navy">
          MARCAS DISPONIBLES
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className={`flex gap-6 lg:gap-8 py-6 items-center transition-all duration-1000 ${isLoaded ? 'animate-scroll' : ''}`}
          style={{
            width: 'max-content',
          }}
        >
          {allBrands.map((brand, index) => (
            <div 
              key={`${brand.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="h-12 lg:h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </div>

      <div className="text-center mt-8 px-6">
        <p className="font-body text-sm text-neutral-500">
          Y muchas más marcas disponibles en nuestro catálogo
        </p>
      </div>
    </section>
  );
}