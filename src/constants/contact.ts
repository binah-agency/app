export const CONTACT = {
  phone: '+584120410493',
  whatsapp: 'https://wa.me/584120410493',
  email: 'ventas@virusjeansca.com',
  address: 'Mercado Los Guajiros, Sector Entrance, Valencia, Carabobo, Venezuela',
  secondaryAddress: 'Centro de Mayoristas del Área del Cementerio, Edificio Merposur, Pasillo Canguro, Caracas',
  phones: ['04120410493', '04244401152', '04244091422', '04145944101'],
  rif: 'J-407967207',
  schedule: '07:00 am – 06:00 pm',
};

export const COMPANY = {
  name: 'VIRUS JEANS, C.A.',
  tagline: 'JEANS Y ROPA AL POR MAYOR',
  yearsExperience: '15+',
  monthlyUnits: '50K+',
  retailPartners: '500+',
};

export const CATEGORIES = ['HOMBRE', 'MUJER', 'NIÑOS', 'DEPORTIVO'] as const;
export type CategoryType = typeof CATEGORIES[number];

export const NAV_LINKS = [
  { label: 'HOMBRE', href: '#categorias', category: 'HOMBRE' as const },
  { label: 'MUJER', href: '#categorias', category: 'MUJER' as const },
  { label: 'NIÑOS', href: '#categorias', category: 'NIÑOS' as const },
  { label: 'DEPORTIVO', href: '#categorias', category: 'DEPORTIVO' as const },
  { label: 'NOVEDADES', href: '#productos', category: null },
  { label: 'CATÁLOGO', href: '#catalogo', category: null },
];

export type NavLink = typeof NAV_LINKS[number];

export const FOOTER_LINKS = {
  shop: [
    { label: 'Hombre', href: '#categorias' },
    { label: 'Mujer', href: '#categorias' },
    { label: 'Niños', href: '#categorias' },
    { label: 'Deportivo', href: '#categorias' },
    { label: 'Novedades', href: '#productos' },
  ],
  company: [
    { label: 'Sobre Nosotros', href: '#hero' },
    { label: 'Nuestra Historia', href: '#hero' },
    { label: 'Manufactura', href: '#hero' },
    { label: 'Carreras', href: '#catalogo' },
  ],
  support: [
    { label: 'Contáctanos', href: '#catalogo' },
    { label: 'Preguntas Frecuentes', href: '#faq' },
    { label: 'Información de Envío', href: '#catalogo' },
    { label: 'Política de Devoluciones', href: '#catalogo' },
  ],
};

export const SCROLL_THRESHOLD = 0.8;