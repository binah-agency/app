# Agentes

## dev-tmux

Inicia una sesión de tmux con dos paneles para proyectos de desarrollo.

### Uso

```
/dev-tmux [proyecto1] [proyecto2]
```

### Descripción

- Crea una sesión de tmux "dev-sessions" con dos paneles horizontales
- Lee la configuración de vite.config.ts de cada proyecto
- Agrega `host: '10.0.0.2'` a la configuración del servidor
- Asegura que los puertos sean diferentes (3000 y 3001)
- Ejecuta `pnpm i && pnpm dev` en cada panel

### Ejemplos

```
/dev-tmux
/dev-tmux /home/acostacortez/projects/app /home/acostacortez/projects/cg
```

### Notas

- Los proyectos por defecto son: app y cg
- Para adjuntarse: `tmux attach-session -t dev-sessions`
- Para matar la sesión: `tmux kill-session -t dev-sessions`

---

# Herramientas de Referencia Rápida

## Performance

- Lighthouse CLI: `lighthouse <url> --output json --preset desktop`
- WebPageTest API para filmstrip y waterfall
- Chrome DevTools: Performance tab, Coverage tab, Network tab
- web-vitals library para field data

## SEO Técnico

- Google Search Console → Core Web Vitals report
- Screaming Frog para crawl audit
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/

## GTM/GA4

- GTM Preview Mode para debug de dataLayer
- GA4 DebugView para validar eventos en tiempo real
- Tag Assistant Legacy extension
- dataLayer.push() desde consola para testing manual

## LLM SEO

- Verificar existencia: `https://sitedomain.com/llms.txt`
- GPTBot user agent: `Mozilla/5.0 AppleBot/0.1` → verificar en robots.txt
- Google AI Overviews: buscar queries objetivo con SGE habilitado