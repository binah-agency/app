export const CONTACT = {
  phone: '+15552345678',
  whatsapp: 'https://wa.me/15552345678',
  email: 'sales@virusjeans.com',
  address: 'Los Angeles, CA',
};

export const COMPANY = {
  name: 'VIRUS JEANS',
  tagline: 'PREMIUM DENIM & ACTIVEWEAR',
  yearsExperience: '15+',
  monthlyUnits: '50K+',
  retailPartners: '500+',
};

export const NAV_LINKS = [
  { label: 'HOMBRE', href: '#categorias' },
  { label: 'MUJER', href: '#categorias' },
  { label: 'NIÑOS', href: '#categorias' },
  { label: 'DEPORTIVO', href: '#categorias' },
  { label: 'NOVEDADES', href: '#productos' },
  { label: 'CATÁLOGO', href: '#catalogo' },
] as const;

export type NavLink = typeof NAV_LINKS[number];

export const FOOTER_LINKS = {
  shop: ['Hombre', 'Mujer', 'Niños', 'Deportivo', 'Novedades'],
  company: ['Sobre Nosotros', 'Nuestra Historia', 'Manufactura', 'Carreras'],
  support: ['Contáctanos', 'Preguntas Frecuentes', 'Información de Envío', 'Política de Devoluciones'],
};

export const SCROLL_THRESHOLD = 0.8;