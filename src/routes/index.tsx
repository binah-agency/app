import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Shirt,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/")({
  component: Index,
});

const LOGO =
  "https://img1.wsimg.com/isteam/ip/8d039810-0b99-40b7-a7f3-03e3cfec8e0e/AZUL_NEGRO%20M.%20Virus%20Jeans-04.png/:/cr=t:0%25,l:21.88%25,w:56.25%25,h:100%25";
const HERO_IMG =
  "https://img1.wsimg.com/isteam/ip/8d039810-0b99-40b7-a7f3-03e3cfec8e0e/Screenshot%202026-04-14%20at%207.02.53%E2%80%AFPM.png/:/";
const WHATSAPP = "https://wa.me/584244210696";

const trackEvent = (event: string, payload?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  // @ts-expect-error dataLayer injected by GTM
  window.dataLayer = window.dataLayer || [];
  // @ts-expect-error
  window.dataLayer.push({ event, ...payload });
};

function Index() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".hero-img", {
        scale: 1.1,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });

      // Marquee infinito
      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-img").forEach((el) => {
        gsap.from(el, {
          scale: 1.15,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="min-h-screen bg-background text-foreground font-[Inter,sans-serif] overflow-hidden"
    >
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <Showcase />
        <Benefits />
        <About />
        <Visit />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <img src={LOGO} alt="Virus Jeans" className="h-9 w-auto" />
          <span className="font-[Archivo_Black,sans-serif] text-lg tracking-wider hidden sm:block">
            VIRUS<span className="text-brand-light">JEANS</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#categorias" className="hover:text-brand-light transition">Categorías</a>
          <a href="#tienda" className="hover:text-brand-light transition">Tienda</a>
          <a href="#nosotros" className="hover:text-brand-light transition">Nosotros</a>
          <a href="#visitanos" className="hover:text-brand-light transition">Contacto</a>
        </nav>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener"
          onClick={() => trackEvent("whatsapp_click", { location: "header" })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      className="relative pt-28 md:pt-32 pb-20 px-5 md:px-8 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <span className="hero-fade inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 text-xs font-medium">
            <Sparkles className="w-3 h-3 text-brand-light" /> Mayor y Detal · Valencia, Venezuela
          </span>
          <h1 className="hero-fade mt-6 font-[Archivo_Black,sans-serif] text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight uppercase">
            Moda que <br />
            <span className="text-brand-light">contagia</span> <br />
            estilo.
          </h1>
          <p className="hero-fade mt-6 text-lg text-muted-foreground max-w-lg">
            Jeans, ropa y accesorios al mejor precio. Calidad garantizada y las
            últimas tendencias para hombre y mujer. Pedidos al por mayor y detal.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              onClick={() => trackEvent("whatsapp_click", { location: "hero" })}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand text-brand-foreground font-semibold shadow-[var(--shadow-glow)] hover:translate-y-[-2px] hover:bg-brand-light transition"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir por WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#tienda"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-border bg-surface/40 hover:bg-surface transition font-medium"
            >
              Ver catálogo
            </a>
          </div>
          <div className="hero-fade mt-10 flex items-center gap-8 text-sm">
            <div>
              <p className="font-[Archivo_Black,sans-serif] text-2xl text-brand-light">+10K</p>
              <p className="text-muted-foreground text-xs">Clientes felices</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-[Archivo_Black,sans-serif] text-2xl text-brand-light">500+</p>
              <p className="text-muted-foreground text-xs">Modelos en stock</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-[Archivo_Black,sans-serif] text-2xl text-brand-light">5★</p>
              <p className="text-muted-foreground text-xs">Calificación</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative hero-img">
          <div className="absolute -inset-6 blur-3xl opacity-50" style={{ background: "var(--gradient-brand)" }} />
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl aspect-[4/5]">
            <img src={HERO_IMG} alt="Tienda Virus Jeans en Valencia" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-surface/80 backdrop-blur-xl border border-border">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-xl bg-brand grid place-items-center">
                  <ShoppingBag className="w-5 h-5 text-brand-foreground" />
                </span>
                <div>
                  <p className="font-semibold text-sm">Visítanos hoy</p>
                  <p className="text-xs text-muted-foreground">Valencia · Carabobo · 9am-5pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "VIRUS JEANS",
    "MODA AL MAYOR",
    "VALENCIA",
    "VIRUS JEANS",
    "ESTILO QUE CONTAGIA",
    "MAYOR Y DETAL",
  ];
  return (
    <div className="py-6 bg-brand text-brand-foreground border-y border-border overflow-hidden">
      <div className="marquee-track flex gap-12 whitespace-nowrap will-change-transform">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="font-[Archivo_Black,sans-serif] text-3xl md:text-4xl tracking-wider flex items-center gap-12">
            {t}
            <Star className="w-5 h-5 fill-current" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Categories() {
  const cats = [
    { name: "Jeans", desc: "Hombre y mujer", icon: Shirt, count: "200+ modelos" },
    { name: "Camisas", desc: "Casual y formal", icon: ShoppingBag, count: "150+ diseños" },
    { name: "Franelas", desc: "Premium quality", icon: Sparkles, count: "120+ estilos" },
    { name: "Accesorios", desc: "Complementa tu look", icon: Star, count: "80+ piezas" },
  ];
  return (
    <section id="categorias" className="py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="reveal max-w-2xl mb-14">
          <p className="text-brand-light text-sm font-bold mb-3 uppercase tracking-widest">Categorías</p>
          <h2 className="font-[Archivo_Black,sans-serif] text-4xl md:text-6xl uppercase leading-tight">
            Lo que <br />
            <span className="text-brand-light">vas a amar.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cats.map((c) => (
            <div
              key={c.name}
              className="reveal group relative aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-surface hover:border-brand-light transition cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <c.icon className="w-8 h-8 text-brand-light" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{c.count}</p>
                  <h3 className="font-[Archivo_Black,sans-serif] text-2xl uppercase">{c.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="tienda" className="py-24 px-5 md:px-8 bg-surface/40 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-14">
          <p className="text-brand-light text-sm font-bold mb-3 uppercase tracking-widest">Nuestra Tienda</p>
          <h2 className="font-[Archivo_Black,sans-serif] text-4xl md:text-6xl uppercase">
            Vive la <span className="text-brand-light">experiencia</span>
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          <div className="reveal-img col-span-12 md:col-span-8 aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden border border-border">
            <img src={HERO_IMG} alt="Interior tienda Virus Jeans" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>
          <div className="reveal-img col-span-6 md:col-span-4 aspect-square rounded-2xl overflow-hidden border border-border bg-brand grid place-items-center p-8">
            <img src={LOGO} alt="Logo Virus Jeans" className="w-full h-auto" />
          </div>
          <div className="reveal-img col-span-6 md:col-span-4 aspect-square rounded-2xl overflow-hidden border border-border relative">
            <img src={HERO_IMG} alt="Productos" className="w-full h-full object-cover scale-150 -translate-x-12" />
          </div>
          <div className="reveal col-span-12 md:col-span-8 rounded-2xl border border-border p-8 md:p-10 bg-gradient-to-br from-surface to-surface-2 flex flex-col justify-center">
            <p className="text-brand-light text-xs font-bold uppercase tracking-widest mb-3">Garantía Virus</p>
            <h3 className="font-[Archivo_Black,sans-serif] text-3xl md:text-4xl uppercase leading-tight">
              Calidad que se ve, <br />
              precios que sorprenden.
            </h3>
            <p className="mt-4 text-muted-foreground">
              Trabajamos directamente con fabricantes para ofrecerte lo último en moda al mejor precio del mercado venezolano.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: Truck, title: "Envíos a todo el país", desc: "Despachamos a toda Venezuela vía MRW, Zoom y aliados." },
    { icon: ShoppingBag, title: "Mayor y detal", desc: "Precios especiales para revendedores y boutiques." },
    { icon: Sparkles, title: "Última moda", desc: "Renovamos inventario constantemente con tendencias actuales." },
    { icon: MessageCircle, title: "Atención personalizada", desc: "Asesoramos por WhatsApp en cada compra." },
  ];
  return (
    <section className="py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((b) => (
          <div key={b.title} className="reveal p-6 rounded-2xl border border-border bg-surface/50">
            <div className="w-12 h-12 rounded-xl bg-brand/20 grid place-items-center mb-5">
              <b.icon className="w-5 h-5 text-brand-light" />
            </div>
            <h3 className="font-[Archivo_Black,sans-serif] text-lg uppercase mb-2">{b.title}</h3>
            <p className="text-sm text-muted-foreground">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="py-24 px-5 md:px-8 bg-surface/40 border-y border-border">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal-img relative aspect-square rounded-3xl overflow-hidden border border-border">
          <img src={HERO_IMG} alt="Equipo Virus Jeans" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/40 to-transparent" />
        </div>
        <div className="reveal">
          <p className="text-brand-light text-sm font-bold mb-3 uppercase tracking-widest">Sobre Nosotros</p>
          <h2 className="font-[Archivo_Black,sans-serif] text-4xl md:text-6xl uppercase leading-tight">
            Una marca <br />
            <span className="text-brand-light">venezolana</span> <br />
            que viste al país.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            En <strong className="text-foreground">Virus Jeans, C.A.</strong> llevamos años llevando moda accesible y de calidad a cada rincón de Venezuela. Nuestra tienda en Valencia es el punto de encuentro de quienes buscan lucir bien sin pagar de más.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/virusjeansmoda/"
              target="_blank"
              rel="noopener"
              onClick={() => trackEvent("social_click", { network: "instagram" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:bg-surface transition"
            >
              <Instagram className="w-4 h-4" /> @virusjeansmoda
            </a>
            <a
              href="https://www.tiktok.com/@virusjeansmoda"
              target="_blank"
              rel="noopener"
              onClick={() => trackEvent("social_click", { network: "tiktok" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:bg-surface transition"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visitanos" className="py-24 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-12">
          <p className="text-brand-light text-sm font-bold mb-3 uppercase tracking-widest">Visítanos</p>
          <h2 className="font-[Archivo_Black,sans-serif] text-4xl md:text-6xl uppercase">
            Te esperamos en <span className="text-brand-light">Valencia</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: MapPin, title: "Dirección", lines: ["Calle 93 Niro Cívico, 91-75", "Local Lote L-28, Barrio El Terminal", "Valencia, Carabobo 2003"] },
            { icon: Phone, title: "Teléfono", lines: ["+58 424 421 0696", "Pedidos por WhatsApp"] },
            { icon: Clock, title: "Horario", lines: ["Lun – Sáb", "9:00 am – 5:00 pm"] },
          ].map((c) => (
            <div key={c.title} className="reveal p-7 rounded-2xl border border-border bg-surface/50">
              <div className="w-12 h-12 rounded-xl bg-brand/20 grid place-items-center mb-5">
                <c.icon className="w-5 h-5 text-brand-light" />
              </div>
              <h3 className="font-[Archivo_Black,sans-serif] text-xl uppercase mb-3">{c.title}</h3>
              {c.lines.map((l) => (
                <p key={l} className="text-muted-foreground">{l}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 px-5 md:px-8">
      <div
        className="reveal max-w-6xl mx-auto rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden border border-border"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-brand)" }} />
        <div className="relative">
          <h2 className="font-[Archivo_Black,sans-serif] text-4xl md:text-7xl uppercase leading-[0.95]">
            ¿Listo para <br />
            <span className="text-brand-light">contagiarte de estilo?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Escríbenos por WhatsApp y haz tu pedido. Atención personalizada de lunes a sábado.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            onClick={() => trackEvent("whatsapp_click", { location: "cta" })}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand text-brand-foreground font-semibold shadow-[var(--shadow-glow)] hover:bg-brand-light hover:translate-y-[-2px] transition"
          >
            <MessageCircle className="w-5 h-5" />
            Escribir ahora
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-14 px-5 md:px-8 bg-surface/30">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={LOGO} alt="Virus Jeans" className="h-10 w-auto" />
            <span className="font-[Archivo_Black,sans-serif] text-xl tracking-wider">
              VIRUS<span className="text-brand-light">JEANS</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Virus Jeans, C.A. — Moda venezolana al mayor y detal. RIF: J-407967207.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://www.facebook.com/virusjeansca" target="_blank" rel="noopener" className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-brand transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/virusjeansmoda/" target="_blank" rel="noopener" className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-brand transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-brand transition">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div>
          <p className="font-[Archivo_Black,sans-serif] text-sm uppercase mb-4">Tienda</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#categorias" className="hover:text-foreground">Categorías</a></li>
            <li><a href="#tienda" className="hover:text-foreground">Galería</a></li>
            <li><a href="#nosotros" className="hover:text-foreground">Nosotros</a></li>
          </ul>
        </div>
        <div>
          <p className="font-[Archivo_Black,sans-serif] text-sm uppercase mb-4">Contacto</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>+58 424 421 0696</li>
            <li>Valencia, Carabobo</li>
            <li>Lun-Sáb 9am-5pm</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border text-xs text-muted-foreground text-center">
        © 2026 Virus Jeans, C.A. Todos los derechos reservados.
      </div>
    </footer>
  );
}

{/* Floating WhatsApp button */}
