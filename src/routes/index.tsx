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
  Moon,
  Phone,
  Shirt,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
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
  "https://img1.wsimg.com/isteam/ip/8d039810-0b99-40b7-a7f3-03e3cfec8e0e/Screenshot%202026-04-14%20at%207.02.53%E2%80%AFPM.png/:/rs=w:984,h:659";
const WHATSAPP = "https://wa.me/584244210696";

function BackgroundGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      glowRef.current.style.setProperty("--mouse-x", `${x}%`);
      glowRef.current.style.setProperty("--mouse-y", `${y}%`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.62 0.22 260 / 0.1), transparent 60%)",
      }}
    />
  );
}

function Index() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.set(
          ".hero-badge, .hero-heading, .hero-desc, .hero-cta, .hero-stats, .hero-img, .reveal, .reveal-img, .hero-badge .word, .hero-heading .word",
          { willChange: "transform, opacity" },
        );
        gsap.set(".marquee-track", { willChange: "transform" });

        const heroTl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
        heroTl
          .from(".hero-badge .word", { y: -12, autoAlpha: 0, stagger: 0.05 })
          .from(".hero-heading .word", { y: 25, autoAlpha: 0, stagger: 0.08 }, "-=0.2")
          .from(".hero-desc", { y: 20, autoAlpha: 0 }, "-=0.15")
          .from(".hero-cta", { y: 20, autoAlpha: 0 }, "-=0.1")
          .from(".hero-stats", { y: 20, autoAlpha: 0 }, "-=0.1");
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
      },
      root,
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={root}
      className="min-h-screen bg-background text-foreground font-[Inter,sans-serif] overflow-hidden"
    >
      <BackgroundGlow />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <Showcase />
        <Benefits />
        <BrandMarquee />
        <About />
        <Visit />
        <CTA />
      </main>
      <Footer />

      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener"
        onClick={() => Analytics.whatsappClicked("floating")}
        className="whatsapp-float group fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BD5A] hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
        aria-label="Escríbenos por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-surface/90 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-border">
          ¡Escríbenos!
        </span>
      </a>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );
  const navItems = [
    { href: "#categorias", label: "Categorías", id: "categorias" },
    { href: "#tienda", label: "Tienda", id: "tienda" },
    { href: "#nosotros", label: "Nosotros", id: "nosotros" },
    { href: "#visitanos", label: "Contacto", id: "contacto" },
  ];

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <img
              src={LOGO}
              alt="Virus Jeans"
              className="h-9 w-auto dark:brightness-0 dark:invert"
            />
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
                className="hover:text-brand-light transition px-3 py-1.5 rounded"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface transition-colors text-muted-foreground hover:text-foreground"
              aria-label={dark ? "Modo claro" : "Modo oscuro"}
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition"
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
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ease-out md:hidden ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[80vw] z-50 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d12] to-[#0f0f15] border-l border-border/50 shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center gap-3 p-5 border-b border-border">
          <img src={LOGO} alt="Virus Jeans" className="h-8 w-auto dark:brightness-0 dark:invert" />
          <span className="font-[Archivo_Black,sans-serif] text-sm tracking-wider text-foreground">
            VIRUS<span className="text-brand-light">JEANS</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="ml-auto p-2 rounded-full hover:bg-surface transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-5 flex flex-col gap-1">
          {navItems.map((item) => {
            const icons: Record<string, React.ReactNode> = {
              categorias: <Shirt className="w-4 h-4" />,
              tienda: <ShoppingBag className="w-4 h-4" />,
              nosotros: <Star className="w-4 h-4" />,
              contacto: <Phone className="w-4 h-4" />,
            };
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setMenuOpen(false);
                  Analytics.navigationClicked(item.id);
                }}
                className="flex items-center gap-3 py-3.5 px-4 rounded-xl text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-surface transition-colors"
              >
                {icons[item.id]}
                {item.label}
              </a>
            );
          })}
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
    <section className="relative pt-28 md:pt-32 pb-20 px-5 md:px-8 overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-[heroZoom_8s_ease-in-out_infinite_alternate]" style={{ backgroundImage: `url(${HERO_IMG})`, maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)" }} />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 20%, oklch(0.42 0.22 265 / 0.4), transparent 60%)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-2xl">
          <span className="hero-badge hero-fade inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-300/20 bg-blue-300/10 text-xs font-medium text-blue-100">
            <Sparkles className="w-3 h-3 text-brand-light" />
            <span className="word">Mayor</span> <span className="word">y</span> <span className="word">Detal</span>
            <span className="word">·</span>
            <span className="word">Valencia,</span> <span className="word">Venezuela</span>
          </span>
          <h1
            className="hero-heading hero-fade mt-6 font-[Archivo_Black,sans-serif] leading-[0.95] tracking-tight uppercase text-blue-100"
            style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 7rem)" }}
          >
            <span className="word">Moda</span> <span className="word">que</span> <br />
            <span className="word text-brand-light">contagia</span> <br />
            <span className="word">estilo.</span>
          </h1>
          <p className="hero-desc hero-fade mt-6 text-lg text-blue-100 max-w-lg bg-brand px-5 py-4 rounded-xl font-medium">
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
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-blue-300/30 bg-blue-300/10 hover:bg-blue-300/20 transition font-medium text-blue-100 hover:text-white"
            >
              Ver catálogo
            </a>
          </div>
          <div className="hero-stats hero-fade mt-10 flex items-center gap-8 text-sm">
            <div>
              <p className="font-[Archivo_Black,sans-serif] text-2xl text-blue-50">+10K</p>
              <p className="text-blue-100/80 text-xs">Clientes felices</p>
            </div>
            <div className="h-10 w-px bg-blue-100/10" />
            <div>
              <p className="font-[Archivo_Black,sans-serif] text-2xl text-blue-50">500+</p>
              <p className="text-blue-100/80 text-xs">Modelos en stock</p>
            </div>
            <div className="h-10 w-px bg-blue-100/10" />
            <div>
              <p className="font-[Archivo_Black,sans-serif] text-2xl text-blue-50">5★</p>
              <p className="text-blue-100/80 text-xs">Calificación</p>
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

function BrandMarquee() {
  const brands = ["CALLE 8", "XPLOSIVO"];
  return (
    <div className="py-10 bg-gradient-to-r from-brand/5 via-brand/10 to-brand/5 border-y border-border overflow-hidden">
      <div className="marquee-track flex gap-16 whitespace-nowrap">
        {[...brands, ...brands, ...brands, ...brands, ...brands, ...brands].map((b, i) => (
          <span
            key={i}
            className="font-[Archivo_Black,sans-serif] text-5xl md:text-7xl tracking-wider flex items-center gap-16 text-brand-light/30 uppercase"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

function Categories() {
  const cats = [
    {
      name: "Caballero",
      desc: "Moda y estilo para hombres",
      icon: Shirt,
      count: "200+ modelos",
      link: "https://smart-outsourcing-business-consulting-virus-jeans.odoo.com/shop?search=&attribute_value=2-26",
      img: "https://smart-outsourcing-business-consulting-virus-jeans.odoo.com/web/image/product.product/19039/image_1024/%5BCB1129%5D%20Sueters%20Caballero?unique=ad5126c",
    },
    {
      name: "Infantil",
      desc: "Para los más pequeños",
      icon: ShoppingBag,
      count: "150+ diseños",
      link: "https://smart-outsourcing-business-consulting-virus-jeans.odoo.com/shop/page/8?search=&attribute_value=2-1570&attribute_value=2-1572",
      img: "https://smart-outsourcing-business-consulting-virus-jeans.odoo.com/web/image/product.product/24237/image_1024/%5BCB3049%5D%20SUETER%20INFANTIL?unique=9c0a2f9",
    },
    {
      name: "Juveniles",
      desc: "Tendencias juveniles",
      icon: Sparkles,
      count: "120+ estilos",
      link: "https://smart-outsourcing-business-consulting-virus-jeans.odoo.com/shop?search=&attribute_value=2-1571",
      img: "https://smart-outsourcing-business-consulting-virus-jeans.odoo.com/web/image/product.product/19635/image_1024/%5BCB225%5D%20Pantalon%20Casual%20Juvenil%20%20%5BCA-05%5D?unique=04140a9",
    },
     {
       name: "Multimarca",
       desc: "Las mejores marcas",
       icon: Star,
       count: "80+ piezas",
       img: LOGO,
     },

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
            Lo que <span className="hidden md:inline"> </span><br className="md:hidden" />
            <span className="text-brand-light">vas a amar.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cats.map((c) => {
            const Wrapper = c.link ? "a" : "div";
            return (
              <Wrapper
                key={c.name}
                {...(c.link ? { href: c.link, target: "_blank", rel: "noopener" } : {})}
                onClick={() => Analytics.categoryClicked(c.name)}
                className="reveal group relative aspect-[4/5] @md:aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-surface hover:border-brand-light transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-brand/20"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover img-reveal group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/20 group-hover:from-background/95 transition-all duration-500" />
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
              </Wrapper>
            );
          })}
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
           <div className="reveal-img relative col-span-12 rounded-2xl overflow-hidden border border-border h-[300px] md:h-[50vh] group">
             <img
               src="https://scontent-bog2-1.xx.fbcdn.net/v/t39.30808-6/481666884_3991445904511489_3973845326439655280_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=oFbbBWqa8BAQ7kNvwEy_6z-&_nc_oc=AdoqTcNDLmn_zchKfDAxQpVGmJvhLPfAbvxLhk7v25c7as2GdprfEylttOh8w5MYINA&_nc_zt=23&_nc_ht=scontent-bog2-1.xx&_nc_gid=JzS1E4M_wjaEo4kNj8Iogw&_nc_ss=7b289&oh=00_Af7yRT1ScyxGWIxecBrL6V8u6qAJ9Ft1yln9_kBooKfOxw&oe=6A0E5C58"
               alt="Interior tienda Virus Jeans"
               className="absolute inset-0 w-full h-full object-cover img-reveal group-hover:scale-105 transition-transform duration-700"
               loading="lazy"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-background/10" />
           </div>
           <div className="reveal-img col-span-6 @md:col-span-5 aspect-square rounded-2xl overflow-hidden border border-border relative group">
             <img
               src="https://scontent-bog2-1.xx.fbcdn.net/v/t39.30808-6/481144195_3991446244511455_8347602001065588288_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rdOjhi5bInEQ7kNvwENdYlp&_nc_oc=AdqGZjpRf7p1YOD1PDtMzzha65VDA0CNvYmt6OqYJJDIfSfzGfW_DGd0jjE8tILewWU&_nc_zt=23&_nc_ht=scontent-bog2-1.xx&_nc_gid=IIs2KDJF2281lqwfJd4-tQ&_nc_ss=7b289&oh=00_Af46G7tQCQ2ZMP32tEruLlRoniCOxbuh7_TvLdDROD3pLQ&oe=6A0E5F83"
               alt="Productos"
               className="w-full h-full object-cover img-reveal group-hover:scale-105 transition-transform duration-700"
               loading="lazy"
             />
           </div>

          <GradientCard />
        </div>
      </div>
    </section>
  );
}

function GlowCard({ className, children }: { className?: string; children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.62 0.22 260 / 0.15), transparent 60%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; title: string; desc: string }) {
  return (
    <GlowCard className="reveal p-8 rounded-2xl border border-border/60 bg-brand/10 backdrop-blur-sm transition-colors">
      <div className="w-12 h-12 rounded-xl bg-brand/20 grid place-items-center mb-6">
        <Icon className="w-6 h-6" style={{ color: "oklch(0.72 0.26 260)" }} />
      </div>
      <h3 className="font-[Archivo_Black,sans-serif] text-xl uppercase mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </GlowCard>
  );
}

function GradientCard() {
  return (
    <GlowCard className="reveal col-span-12 @md:col-span-7 rounded-2xl border border-brand/30 p-8 @md:p-10 bg-gradient-to-br from-surface to-surface-2 flex flex-col justify-center">
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
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener"
        onClick={() => Analytics.whatsappClicked("distribuidores")}
        className="group mt-6 inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-brand text-brand-foreground text-sm font-bold uppercase tracking-wider hover:bg-brand-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 w-fit animate-[pulse-cta_2s_ease-in-out_infinite]"
      >
        <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
        Ser distribuidor
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </GlowCard>
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
    <section className="relative py-24 px-5 md:px-8 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {items.map((b) => (
          <BenefitCard key={b.title} {...b} />
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
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-[heroZoom_8s_ease-in-out_infinite_alternate]"
            style={{ backgroundImage: `url("https://smart-outsourcing-business-consulting-virus-jeans.odoo.com/web/image/33235-a37f0d44/IMG_9425.webp")` }}
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
            ¡Ven a <span className="text-brand-light">visitarnos!</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Nos encanta recibir a nuestros clientes, así que ven en cualquier momento durante las
            horas de oficina.
          </p>
        </div>
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-5">
          {[
            {
              icon: MapPin,
              title: "Dirección",
              lines: [
                "Calle 93 Niro Cívico, 91-75",
                "Local Lote L-28, Barrio El Terminal",
                "Valencia, Carabobo 2001",
              ],
              action: {
                href: "https://maps.google.com/?q=Calle+93+Niro+Cívico+91-75+Valencia",
                label: "Abrir en Google Maps",
              },
            },
            {
              icon: Phone,
              title: "Teléfono",
              lines: ["+58 424 421 0696", "Pedidos por WhatsApp"],
              action: {
                href: "tel:+584244210696",
                label: "Llamar ahora",
              },
            },
            {
              icon: Clock,
              title: "Horario",
              lines: ["Lun – Sáb", "9:00 am – 5:00 pm"],
              action: {
                href: "https://virusjeansca.com/",
                label: "virusjeansca.com",
              },
            },
          ].map((c) => (
            <GlowCard
              key={c.title}
              className="p-5 rounded-2xl border border-border bg-gradient-to-br from-surface/50 to-surface/20 hover:border-brand-light/40 transition-colors"
            >
              <div className="flex items-start gap-4 @md:gap-5">
                <div className="w-10 h-10 @md:w-12 @md:h-12 rounded-xl bg-brand/20 grid place-items-center shrink-0 group-hover:bg-brand/30 transition-colors">
                  <c.icon className="w-4 h-4 @md:w-5 @md:h-5 text-brand-light" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-[Archivo_Black,sans-serif] text-lg @md:text-xl uppercase mb-1">
                    {c.title}
                  </h3>
                  {c.lines.map((l) => (
                    <p key={l} className="text-muted-foreground text-sm leading-relaxed">
                      {l}
                    </p>
                  ))}
                  {c.action && (
                    <a
                      href={c.action.href}
                      target={c.action.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.action.href.startsWith("http") ? "noopener" : undefined}
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-brand-light hover:text-brand-light/80 transition-colors"
                    >
                      {c.action.label}
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </GlowCard>
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
        className="reveal max-w-6xl mx-auto rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden border border-brand/20"
        style={{ background: "linear-gradient(135deg, oklch(0.12 0.08 265), oklch(0.3 0.18 265))" }}
      >
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{ background: "var(--gradient-brand)" }}
        />
        <div className="relative">
          <h2
            className="font-[Archivo_Black,sans-serif] uppercase leading-[0.95] text-white"
            style={{ fontSize: "clamp(2.5rem, 5vw + 0.5rem, 5rem)" }}
          >
            ¿Listo para <br />
            <span className="text-blue-300">contagiarte de estilo?</span>
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto">
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
  const links = [
    { href: "#categorias", label: "Categorías", id: "categorias" },
    { href: "#tienda", label: "Galería", id: "tienda" },
    { href: "#nosotros", label: "Nosotros", id: "nosotros" },
    { href: "#visitanos", label: "Contacto", id: "contacto" },
  ];

  return (
    <footer className="border-t border-border py-16 px-5 md:px-8 relative overflow-hidden bg-gradient-to-b from-surface to-background">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
<img
              src={LOGO}
              alt="Virus Jeans"
              className="h-10 w-auto dark:brightness-0 dark:invert"
              loading="lazy"
            />
              <span className="font-[Archivo_Black,sans-serif] text-xl tracking-wider">
                VIRUS<span className="text-brand-light">JEANS</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Virus Jeans, C.A. — Moda venezolana al mayor y detal. Calidad que se ve, precios que sorprenden.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.facebook.com/virusjeansca"
                target="_blank"
                rel="noopener"
                aria-label="Facebook Virus Jeans"
                onClick={() => Analytics.socialLinkClicked("facebook", "footer")}
                className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-brand hover:border-brand hover:text-brand-foreground hover:scale-110 transition-all duration-200"
              >
                <Facebook className="w-4 h-4 text-muted-foreground group-hover:text-brand-foreground transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/virusjeansmoda/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram Virus Jeans"
                onClick={() => Analytics.socialLinkClicked("instagram", "footer")}
                className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-brand hover:border-brand hover:text-brand-foreground hover:scale-110 transition-all duration-200"
              >
                <Instagram className="w-4 h-4 text-muted-foreground transition-colors" />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp Virus Jeans"
                onClick={() => Analytics.whatsappClicked("footer")}
                className="w-10 h-10 rounded-full border border-border grid place-items-center hover:bg-brand hover:border-brand hover:text-brand-foreground hover:scale-110 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-muted-foreground transition-colors" />
              </a>
            </div>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <p className="font-[Archivo_Black,sans-serif] text-sm uppercase tracking-wider mb-5 text-foreground/80">
              Tienda
            </p>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.href}
                    onClick={() => Analytics.navigationClicked(l.id)}
                    className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 inline-block after:block after:h-px after:w-0 after:bg-brand-light after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3 md:col-start-10">
            <p className="font-[Archivo_Black,sans-serif] text-sm uppercase tracking-wider mb-5 text-foreground/80">
              Contacto
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="tel:+584244210696"
                  className="hover:text-foreground transition-colors duration-200 inline-block after:block after:h-px after:w-0 after:bg-brand-light after:transition-all after:duration-300 hover:after:w-full"
                >
                  +58 424 421 0696
                </a>
              </li>
              <li className="hover:text-foreground/60 transition-colors duration-200">Valencia, Carabobo</li>
              <li className="hover:text-foreground/60 transition-colors duration-200">Lun–Sáb 9am–5pm</li>
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener"
                  onClick={() => Analytics.whatsappClicked("footer")}
                  className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light hover:scale-105 active:scale-95 transition-all duration-200 shadow-[var(--shadow-glow)]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Escríbenos
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-border/50 text-xs text-muted-foreground text-center flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2026 Virus Jeans, C.A. Todos los derechos reservados.</span>
          <span>RIF: J-407967207</span>
        </div>
        <p className="mt-3 text-[10px] text-muted-foreground/60 text-center max-w-3xl mx-auto leading-relaxed">
          VIRUS JEANS, C.A. — Calle 93 Niro Cívico, 91-75 Local Lote L-28 Barrio El Terminal, Valencia, Carabobo Zona Postal 2003, Venezuela | RIF: J-407967207
        </p>
      </div>
    </footer>
  );
}
