export const TYPOGRAPHY = {
  display: {
    hero: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl',
    section: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl',
    subsection: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl',
    card: 'text-2xl sm:text-3xl lg:text-4xl',
    badge: 'text-xl lg:text-2xl',
    stat: 'text-3xl lg:text-4xl',
    label: 'text-lg lg:text-xl',
  },
  body: {
    large: 'text-lg lg:text-xl',
    base: 'text-base lg:text-lg',
    small: 'text-sm lg:text-base',
    xs: 'text-xs lg:text-sm',
  },
  accent: {
    button: 'text-sm font-medium',
    label: 'text-sm font-medium tracking-[1.5px] uppercase',
    caption: 'text-xs font-semibold',
  },
};

export const HEADING_LEVELS = {
  h1: TYPOGRAPHY.display.hero,
  h2: TYPOGRAPHY.display.section,
  h3: TYPOGRAPHY.display.subsection,
  h4: TYPOGRAPHY.display.card,
};