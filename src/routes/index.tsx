import { Analytics } from "@/lib/analytics";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Shirt,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
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

function Index() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(".hero-badge, .hero-heading, .hero-desc, .hero-cta, .hero-stats, .hero-img, .reveal, .reveal-img", { willChange: "transform, opacity" });
      gsap.set(".marquee-track", { willChange: "transform" });

      const heroTl = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out" } });
      heroTl
        .from(".hero-badge", { y: -20, rotation: -5, autoAlpha: 0 })
        .from(".hero-heading", { y: 50, autoAlpha: 0 }, "-=0.4")
        .from(".hero-desc", { y: 30, autoAlpha: 0 }, "-=0.3")
        .from(".hero-cta", { y: 20, autoAlpha: 0 }, "-=0.2")
        .from(".hero-stats", { y: 20, autoAlpha: 0 }, "-=0.15");
      gsap.from(".hero-img", {
        scale: 1.1,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });

      // Marquee infinito
      const marquee = gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
        force3D: true,
      });

      // Pausar marquee en hover
      const marqueeEl = document.querySelector(".marquee-track");
      if (marqueeEl) {
        marqueeEl.addEventListener("mouseenter", () => marquee.pause());
        marqueeEl.addEventListener("mouseleave", () => marquee.resume());
      }

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 50,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-img").forEach((el) => {
        gsap.from(el, {
          scale: 1.15,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Botón WhatsApp click feedback
      gsap.utils.toArray<HTMLElement>('a[href*="wa.me"]').forEach((btn) => {
        btn.addEventListener("mousedown", () => gsap.to(btn, { scale: 0.95, duration: 0.1 }));
        btn.addEventListener("mouseup", () =>
          gsap.to(btn, { scale: 1, duration: 0.15, ease: "back.out(2)" }),
        );
        btn.addEventListener("mouseleave", () => gsap.to(btn, { scale: 1, duration: 0.15 }));
      });
    }, root);

    return () => mm.revert();
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
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { href: "#categorias", label: "Categorías", id: "categorias" },
    { href: "#tienda", label: "Tienda", id: "tienda" },
    { href: "#nosotros", label: "Nosotros", id: "nosotros" },
    { href: "#visitanos", label: "Contacto", id: "contacto" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <img src={LOGO} alt="Virus Jeans" className="h-9 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          <span className="font-[Archivo_Black,sans-serif] text-lg tracking-wider hidden sm:block">
            VIRUS<span className="text-brand-light">JEANS</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => Analytics.navigationClicked(item.id)}
              className="hover:text-brand-light transition"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            onClick={() => Analytics.whatsappClicked("header")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            className="md:hidden p-2 text-white hover:text-brand-light transition"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Drawer overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-out md:hidden ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[80vw] z-50 bg-background border-l border-border shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="font-[Archivo_Black,sans-serif] text-sm uppercase tracking-widest text-muted-foreground">
            Menú
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full hover:bg-surface transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-5 flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                setMenuOpen(false);
                Analytics.navigationClicked(item.id);
              }}
              className="py-4 px-4 rounded-xl text-base font-medium hover:bg-surface hover:text-brand-light transition-colors"
            >
              {item.label}
            </a>
          ))}
          <hr className="my-3 border-border" />
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            onClick={() => {
              setMenuOpen(false);
              Analytics.whatsappClicked("drawer");
            }}
            className="inline-flex items-center gap-3 py-4 px-4 rounded-xl text-base font-medium bg-brand/10 text-brand-light hover:bg-brand/20 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </nav>
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
          <span className="hero-badge hero-fade inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 text-xs font-medium">
            <Sparkles className="w-3 h-3 text-brand-light" /> Mayor y Detal · Valencia, Venezuela
          </span>
          <h1
            className="hero-heading hero-fade mt-6 font-[Archivo_Black,sans-serif] leading-[0.95] tracking-tight uppercase"
            style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 7rem)" }}
          >
            Moda que <br />
            <span className="text-brand-light">contagia</span> <br />
            estilo.
          </h1>
          <p className="hero-desc hero-fade mt-6 text-lg text-muted-foreground max-w-lg">
            Jeans, ropa y accesorios al mejor precio. Calidad garantizada y las últimas tendencias
            para hombre y mujer. Pedidos al por mayor y detal.
          </p>
          <div className="hero-cta hero-fade mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              onClick={() => Analytics.whatsappClicked("hero")}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-brand text-brand-foreground font-semibold shadow-[var(--shadow-glow)] hover:translate-y-[-2px] hover:bg-brand-light transition"
            >
              <MessageCircle className="w-4 h-4" />
              Pedir por WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#tienda"
              onClick={() => Analytics.navigationClicked("tienda")}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-border bg-surface/40 hover:bg-surface transition font-medium"
            >
              Ver catálogo
            </a>
          </div>
          <div className="hero-stats hero-fade mt-10 flex items-center gap-8 text-sm">
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
          <div
            className="absolute -inset-6 blur-3xl opacity-50"
            style={{ background: "var(--gradient-brand)" }}
          />
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl aspect-[4/5]">
            <img
              src={HERO_IMG}
              alt="Tienda Virus Jeans en Valencia"
              className="w-full h-full object-cover img-reveal"
              loading="eager"
              fetchPriority="high"
            />
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
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-[Archivo_Black,sans-serif] text-3xl md:text-4xl tracking-wider flex items-center gap-12"
          >
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
    { name: "Jeans", desc: "Hombre y mujer", icon: Shirt, count: "200+ modelos", img: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400&q=80" },
    { name: "Camisas", desc: "Casual y formal", icon: ShoppingBag, count: "150+ diseños", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80" },
    { name: "Franelas", desc: "Premium quality", icon: Sparkles, count: "120+ estilos", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80" },
    { name: "Accesorios", desc: "Complementa tu look", icon: Star, count: "80+ piezas", img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80" },
  ];
  return (
    <section id="categorias" className="py-24 px-5 md:px-8">
      <div className="@container max-w-7xl mx-auto">
        <div className="reveal max-w-2xl mb-14">
          <p className="text-brand-light text-sm font-bold mb-3 uppercase tracking-widest">
            Categorías
          </p>
          <h2
            className="font-[Archivo_Black,sans-serif] text-4xl md:text-6xl uppercase leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)" }}
          >
            Lo que <br />
            <span className="text-brand-light">vas a amar.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {cats.map((c) => (
            <div
              key={c.name}
              onClick={() => Analytics.categoryClicked(c.name)}
              className="reveal group relative aspect-[4/5] @sm:aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-surface hover:border-brand-light transition cursor-pointer"
            >
              <img
                src={c.img}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover img-reveal"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/20" />
              <div className="absolute inset-0 p-4 @md:p-6 flex flex-col justify-between">
                <c.icon className="w-6 @md:w-8 h-6 @md:h-8 text-brand-light" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{c.count}</p>
                  <h3 className="font-[Archivo_Black,sans-serif] text-lg @md:text-2xl uppercase">
                    {c.name}
                  </h3>
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
      <div className="@container max-w-7xl mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-14">
          <p className="text-brand-light text-sm font-bold mb-3 uppercase tracking-widest">
            Nuestra Tienda
          </p>
          <h2
            className="font-[Archivo_Black,sans-serif] text-4xl md:text-6xl uppercase"
            style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)" }}
          >
            Vive la <span className="text-brand-light">experiencia</span>
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-3 @md:gap-4">
          <div className="reveal-img col-span-12 @md:col-span-8 aspect-video @md:aspect-[16/9] rounded-2xl overflow-hidden border border-border">
            <img
              src={HERO_IMG}
              alt="Interior tienda Virus Jeans"
              className="w-full h-full object-cover img-reveal hover:scale-105 transition duration-700"
              loading="lazy"
            />
          </div>
          <div className="reveal-img col-span-6 @md:col-span-4 aspect-square rounded-2xl overflow-hidden border border-border bg-brand grid place-items-center p-8">
            <img
              src={LOGO}
              alt="Logo Virus Jeans"
              className="w-full h-auto img-reveal"
              style={{ filter: "brightness(0) invert(1)" }}
              loading="lazy"
            />
          </div>
          <div className="reveal-img col-span-6 @md:col-span-4 aspect-square rounded-2xl overflow-hidden border border-border relative">
            <img
              src={HERO_IMG}
              alt="Productos"
              className="w-full h-full object-cover img-reveal scale-150 -translate-x-12"
              loading="lazy"
            />
          </div>
          <div className="reveal col-span-12 @md:col-span-8 rounded-2xl border border-border p-8 @md:p-10 bg-gradient-to-br from-surface to-surface-2 flex flex-col justify-center">
            <p className="text-brand-light text-xs font-bold uppercase tracking-widest mb-3">
              Garantía Virus
            </p>
            <h3 className="font-[Archivo_Black,sans-serif] text-3xl md:text-4xl uppercase leading-tight">
              Calidad que se ve, <br />
              precios que sorprenden.
            </h3>
            <p className="mt-4 text-muted-foreground">
              Trabajamos directamente con fabricantes para ofrecerte lo último en moda al mejor
              precio del mercado venezolano.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    {
      icon: Truck,
      title: "Envíos a todo el país",
      desc: "Despachamos a toda Venezuela vía MRW, Zoom y aliados.",
    },
    {
      icon: ShoppingBag,
      title: "Mayor y detal",
      desc: "Precios especiales para revendedores y boutiques.",
    },
    {
      icon: Sparkles,
      title: "Última moda",
      desc: "Renovamos inventario constantemente con tendencias actuales.",
    },
    {
      icon: MessageCircle,
      title: "Atención personalizada",
      desc: "Asesoramos por WhatsApp en cada compra.",
    },
  ];
  return (
    <section className="py-24 px-5 md:px-8">
      <div className="@container max-w-7xl mx-auto grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
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
      <div className="@container max-w-7xl mx-auto grid grid-cols-1 @lg:grid-cols-2 gap-12 items-center">
        <div className="reveal-img relative aspect-square rounded-3xl overflow-hidden border border-border">
          <img
            src={HERO_IMG}
            alt="Tienda Virus Jeans en Valencia"
            className="w-full h-full object-cover img-reveal"
            loading="lazy"
            width="600"
            height="600"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand/40 to-transparent" />
        </div>
        <div className="reveal">
          <p className="text-brand-light text-sm font-bold mb-3 uppercase tracking-widest">
            Sobre Nosotros
          </p>
          <h2
            className="font-[Archivo_Black,sans-serif] uppercase leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)" }}
          >
            Una marca <br />
            <span className="text-brand-light">venezolana</span> <br />
            que viste al país.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            En <strong className="text-foreground">Virus Jeans, C.A.</strong> llevamos años llevando
            moda accesible y de calidad a cada rincón de Venezuela. Nuestra tienda en Valencia es el
            punto de encuentro de quienes buscan lucir bien sin pagar de más.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/virusjeansmoda/"
              target="_blank"
              rel="noopener"
              onClick={() => Analytics.socialLinkClicked("instagram", "about")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:bg-surface transition"
            >
              <Instagram className="w-4 h-4 text-brand" /> @virusjeansmoda
            </a>
            <a
              href="https://www.tiktok.com/@virusjeansmoda"
              target="_blank"
              rel="noopener"
              onClick={() => Analytics.socialLinkClicked("tiktok", "about")}
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
      <div className="@container max-w-7xl mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-12">
          <p className="text-brand-light text-sm font-bold mb-3 uppercase tracking-widest">
            Visítanos
          </p>
          <h2
            className="font-[Archivo_Black,sans-serif] uppercase"
            style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 4rem)" }}
          >
            Te esperamos en <span className="text-brand-light">Valencia</span>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              icon: MapPin,
              title: "Dirección",
              lines: [
                "Calle 93 Niro Cívico, 91-75",
                "Local Lote L-28, Barrio El Terminal",
                "Valencia, Carabobo 2003",
              ],
            },
            { icon: Phone, title: "Teléfono", lines: ["+58 424 421 0696", "Pedidos por WhatsApp"] },
            { icon: Clock, title: "Horario", lines: ["Lun – Sáb", "9:00 am – 5:00 pm"] },
          ].map((c) => (
            <div
              key={c.title}
              className="reveal p-7 rounded-2xl border border-border bg-surface/50"
            >
              <div className="w-12 h-12 rounded-xl bg-brand/20 grid place-items-center mb-5">
                <c.icon className="w-5 h-5 text-brand-light" />
              </div>
              <h3 className="font-[Archivo_Black,sans-serif] text-xl uppercase mb-3">{c.title}</h3>
              {c.lines.map((l) => (
                <p key={l} className="text-muted-foreground">
                  {l}
                </p>
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
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
          style={{ background: "var(--gradient-brand)" }}
        />
        <div className="relative">
          <h2
            className="font-[Archivo_Black,sans-serif] uppercase leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 5vw + 0.5rem, 5rem)" }}
          >
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
            onClick={() => Analytics.whatsappClicked("cta")}
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
      <div className="@container max-w-7xl mx-auto grid grid-cols-2 @lg:grid-cols-4 gap-10">
        <div className="col-span-2 @lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <img src={LOGO} alt="Virus Jeans" className="h-10 w-auto" style={{ filter: "brightness(0) invert(1)" }} loading="lazy" />
            <span className="font-[Archivo_Black,sans-serif] text-xl tracking-wider">
              VIRUS<span className="text-brand-light">JEANS</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Virus Jeans, C.A. — Moda venezolana al mayor y detal. RIF: J-407967207.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/virusjeansca"
              target="_blank"
              rel="noopener"
              aria-label="Facebook Virus Jeans"
              onClick={() => Analytics.socialLinkClicked("facebook", "footer")}
              className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-brand hover:text-brand-foreground transition-colors"
            >
              <Facebook className="w-4 h-4 text-brand" />
            </a>
            <a
              href="https://www.instagram.com/virusjeansmoda/"
              target="_blank"
              rel="noopener"
              aria-label="Instagram Virus Jeans"
              onClick={() => Analytics.socialLinkClicked("instagram", "footer")}
              className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-brand hover:text-brand-foreground transition-colors"
            >
              <Instagram className="w-4 h-4 text-brand" />
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp Virus Jeans"
              onClick={() => Analytics.whatsappClicked("footer")}
              className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-brand hover:text-brand-foreground transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-brand" />
            </a>
          </div>
        </div>
        <div>
          <p className="font-[Archivo_Black,sans-serif] text-sm uppercase mb-4">Tienda</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="#categorias"
                onClick={() => Analytics.navigationClicked("categorias")}
                className="hover:text-foreground"
              >
                Categorías
              </a>
            </li>
            <li>
              <a
                href="#tienda"
                onClick={() => Analytics.navigationClicked("tienda")}
                className="hover:text-foreground"
              >
                Galería
              </a>
            </li>
            <li>
              <a
                href="#nosotros"
                onClick={() => Analytics.navigationClicked("nosotros")}
                className="hover:text-foreground"
              >
                Nosotros
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-[Archivo_Black,sans-serif] text-sm uppercase mb-4">Contacto</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="tel:+584244210696" className="hover:text-foreground transition">
                +58 424 421 0696
              </a>
            </li>
            <li>Valencia, Carabobo</li>
            <li>Lun–Sáb 9am–5pm</li>
            <li>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener"
                onClick={() => Analytics.whatsappClicked("footer")}
                className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-full bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition"
              >
                <MessageCircle className="w-4 h-4" />
                Escríbenos
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border text-xs text-muted-foreground text-center">
        © 2026 Virus Jeans, C.A. Todos los derechos reservados.
      </div>
    </footer>
  );
}
