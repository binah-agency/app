import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQSectionProps {
  id?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '¿Cuál es la compra mínima?',
    answer: 'La compra mínima es de 6 piezas por estilo. Para mejores precios, el pedido completo debe ser de 24+ unidades. Esto te permite diversificar tu inventario sin comprometer demasiado capital.',
  },
  {
    question: '¿Cuánto cuestan los envíos?',
    answer: 'El envío tiene un costo adicional según la agencia y destino. Envíos gratis en pedidos mayores a $500. Para Caracas y ciudades principales el costo varía entre $3-5, zonas remotas $8-12.',
  },
  {
    question: '¿Hacen envíos a todo el país?',
    answer: 'Sí, despachamos a todas las ciudades de Venezuela a través de las principales agencias de mensajería: Zoom, Domesa, Tealca y MRW. Todos los envíos incluyen número de seguimiento.',
  },
  {
    question: '¿Cuáles son los tiempos de entrega?',
    answer: 'Caracas y Vargas: 24-48 horas | Ciudades principales (Maracaibo, Valencia, Barquisimeto, Mérida): 3-5 días laborables | Zonas remotas: 7-10 días laborables.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos: Transferencia bancaria (Banesco, Mercantil, Provincial), Pago móvil (mismo banco), Zelle, y efectivo solo en tienda física en Valencia. Para primeros pedidos recomendamos transferencia.',
  },
  {
    question: '¿Ofrecen precios de mayoreo?',
    answer: 'Sí, manejamos precios preferenciales por volumen: 24-47 unidades = precio base | 48-95 unidades = 5% descuento | 96+ unidades = 10% descuento. Solicita nuestra lista de precios completa.',
  },
  {
    question: '¿Tienen política de devolución?',
    answer: 'Aceptamos devoluciones en productos sin usar, con etiquetas y empaque original dentro de los 30 días. El cliente asume costo de envío de devolución. No aplica para pedidos personalizados.',
  },
  {
    question: '¿Qué pasa si llega el pedido dañado?',
    answer: 'Contamos con estricto control de calidad. En caso de recibir productos dañados, reporta dentro de las 48 horas con fotos del daño. Te reponemos sin costo adicional o creditamos el valor.',
  },
  {
    question: '¿Actualizan su inventario frecuentemente?',
    answer: 'Sí, renovamos nuestro catálogo semanalmente con las últimas tendencias en denim y moda urbana. Siguiendo las temporadas de moda internacionales y adaptándolas al mercado venezolano.',
  },
  {
    question: '¿Trabajan con tiendas pequeñas?',
    answer: 'Absolutamente, nos adaptamos a negocios de todos los tamaños. Contamos con opciones flexibles para emprendedores, tiendas nuevas y boutiques. Puedes comenzar con pedidos de prueba.',
  },
  {
    question: '¿Puedo ver los productos antes de comprar?',
    answer: 'Sí, tenemos showroom en Valencia (Carrera 5 entre Calles 102-103, Centro). También podemos enviar fotos y videos detallados de cualquier producto. Para clientes del interior, enviamos muestras con costo.',
  },
  {
    question: '¿Ofrecen venta mayorista exclusiva o hay mínimo?',
    answer: 'Somos mayoristas puros. El mínimo por estilo es de 6 unidades. Para pedidos mayores a $1000, asignamos un ejecutivo de cuenta personalizado que te ayudará con tu negocio.',
  },
];

export default function FAQSection({ id }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id={id || 'faq'} className="bg-white py-16 lg:py-24">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-accent text-sm font-medium tracking-[2px] uppercase text-brand-secondary mb-4 block">
            SOPORTE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-brand-navy mb-4">
            PREGUNTAS FRECUENTES
          </h2>
          <p className="font-body text-neutral-500 text-lg">
            Encuentra respuestas rápidas a las consultas más comunes
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-neutral-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 lg:p-6 text-left bg-neutral-50 hover:bg-neutral-100 transition-colors duration-300"
                aria-expanded={openIndex === index}
              >
                <span className="font-accent text-base lg:text-lg font-medium text-brand-navy pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 text-brand-secondary transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="font-body text-neutral-600 p-5 lg:p-6 bg-white leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 lg:mt-12">
          <p className="font-body text-neutral-500 mb-4">
            ¿No encontraste lo que buscabas?
          </p>
          <a
            href="https://wa.me/584120410493"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 font-accent text-sm font-medium uppercase tracking-[1.5px] hover:bg-[#128C7E] transition-colors duration-300 rounded-full"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}