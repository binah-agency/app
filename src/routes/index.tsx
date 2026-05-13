import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  LineChart,
  Lock,
  PieChart,
  Sparkles,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Route = createFileRoute("/")({
  component: Index,
});

const trackEvent = (event: string, payload?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  // @ts-expect-error dataLayer injected by GTM
  window.dataLayer = window.dataLayer || [];
  // @ts-expect-error dataLayer injected by GTM
  window.dataLayer.push({ event, ...payload });
};

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        y: 32,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(".hero-card", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
        ease: "power3.out",
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent =
              (el.dataset.prefix || "") +
              Math.round(obj.v).toLocaleString("es-ES") +
              (el.dataset.suffix || "");
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-background text-foreground font-[Manrope,sans-serif] overflow-hidden">
      <Header />
      <main>
        <Hero heroRef={heroRef} />
        <LogoCloud />
        <Features />
        <Stats />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-[Sora,sans-serif] font-bold text-xl">
          <span className="w-8 h-8 rounded-lg bg-[var(--gradient-brand)] grid place-items-center text-brand-foreground">
            <TrendingUp className="w-4 h-4" strokeWidth={3} />
          </span>
          Finova
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Producto</a>
          <a href="#how" className="hover:text-foreground transition">Cómo funciona</a>
          <a href="#pricing" className="hover:text-foreground transition">Precios</a>
          <a href="#faq" className="hover:text-foreground transition">Recursos</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#login" className="hidden sm:block text-sm text-muted-foreground hover:text-foreground">Ingresar</a>
          <button
            onClick={() => trackEvent("cta_click", { location: "header" })}
            className="px-4 py-2 rounded-full bg-brand text-brand-foreground text-sm font-semibold hover:opacity-90 transition"
          >
            Empezar gratis
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ heroRef }: { heroRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section
      ref={heroRef}
      className="relative pt-36 pb-24 px-6"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="hero-fade inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface/60 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 text-brand" /> Nueva Suite IA · 2026
          </span>
          <h1 className="hero-fade mt-6 font-[Sora,sans-serif] text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
            Finanzas inteligentes
            <br />
            para tu próximo <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-brand)" }}>millón</span>.
          </h1>
          <p className="hero-fade mt-6 text-lg text-muted-foreground max-w-xl">
            Invierte, ahorra y haz crecer tu patrimonio con un asesor de IA que optimiza tu portafolio cada minuto. Desde $10. Sin comisiones ocultas.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => trackEvent("cta_click", { location: "hero_primary" })}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-brand-foreground font-semibold shadow-[var(--shadow-glow)] hover:translate-y-[-2px] transition"
            >
              Crear mi cuenta
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={() => trackEvent("cta_click", { location: "hero_secondary" })}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-surface/60 hover:bg-surface transition font-medium"
            >
              Ver demo en vivo
            </button>
          </div>
          <div className="hero-fade mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-brand" /> Regulado SEC</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> +1.2M usuarios</div>
          </div>
        </div>

        <div className="lg:col-span-5 hero-card">
          <PortfolioCard />
        </div>
      </div>
    </section>
  );
}

function PortfolioCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-1 blur-3xl opacity-40" style={{ background: "var(--gradient-brand)" }} />
      <div className="relative rounded-3xl border border-border bg-surface/80 backdrop-blur-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Tu portafolio</p>
            <p className="font-[Sora,sans-serif] text-3xl font-bold mt-1">$48,927.40</p>
          </div>
          <span className="inline-flex items-center gap-1 text-brand text-sm font-semibold bg-brand/10 px-3 py-1 rounded-full">
            <ArrowUpRight className="w-3 h-3" /> +12.4%
          </span>
        </div>

        <div className="mt-6 h-32 relative">
          <svg viewBox="0 0 300 120" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chart-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.88 0.18 130)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.88 0.18 130)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,90 C40,70 60,80 90,55 C130,30 160,70 200,40 C240,20 270,35 300,15 L300,120 L0,120 Z"
              fill="url(#chart-grad)"
            />
            <path
              d="M0,90 C40,70 60,80 90,55 C130,30 160,70 200,40 C240,20 270,35 300,15"
              fill="none"
              stroke="oklch(0.88 0.18 130)"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        <div className="mt-6 space-y-3">
          {[
            { name: "Acciones globales", pct: "48%", val: "+8.2%", icon: LineChart },
            { name: "Cripto diversificado", pct: "22%", val: "+24.1%", icon: Zap },
            { name: "Bonos seguros", pct: "30%", val: "+3.6%", icon: Wallet },
          ].map((a) => (
            <div key={a.name} className="flex items-center gap-3 p-3 rounded-xl bg-surface-2/60 border border-border">
              <span className="w-9 h-9 rounded-lg bg-brand/15 grid place-items-center">
                <a.icon className="w-4 h-4 text-brand" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.pct} del portafolio</p>
              </div>
              <span className="text-brand text-sm font-semibold">{a.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoCloud() {
  const logos = ["Forbes", "Bloomberg", "TechCrunch", "WSJ", "Reuters", "Wired"];
  return (
    <section className="py-12 border-y border-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
          Mencionados en
        </p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 opacity-60">
          {logos.map((l) => (
            <span key={l} className="font-[Sora,sans-serif] text-xl font-bold text-muted-foreground">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Sparkles, title: "Asesor IA personal", desc: "Optimiza tu portafolio en tiempo real según tu perfil de riesgo y metas." },
    { icon: PieChart, title: "Diversificación automática", desc: "Acciones, bonos, cripto y ETFs balanceados para ti, sin esfuerzo." },
    { icon: BarChart3, title: "Analytics avanzado", desc: "Métricas en vivo, alpha, Sharpe ratio y proyecciones a 10 años." },
    { icon: Lock, title: "Seguridad bancaria", desc: "Custodia institucional, cifrado AES-256 y autenticación biométrica." },
    { icon: Zap, title: "Trading instantáneo", desc: "Compra y vende en menos de 50ms con cero comisiones de bolsa." },
    { icon: Wallet, title: "Ahorro inteligente", desc: "Redondea cada compra y crea metas que se cumplen solas." },
  ];
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal max-w-2xl mb-16">
          <p className="text-brand text-sm font-semibold mb-3">PRODUCTO</p>
          <h2 className="font-[Sora,sans-serif] text-4xl md:text-5xl font-bold tracking-tight">
            Todo lo que necesitas para hacer crecer tu dinero.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((f) => (
            <div
              key={f.title}
              className="reveal group p-7 rounded-2xl border border-border bg-surface/50 hover:bg-surface transition relative overflow-hidden"
            >
              <div className="w-11 h-11 rounded-xl bg-brand/15 grid place-items-center mb-5">
                <f.icon className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-[Sora,sans-serif] text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: 1200000, suffix: "+", label: "Usuarios activos" },
    { value: 24, suffix: "B", prefix: "$", label: "Activos gestionados" },
    { value: 18, suffix: "%", label: "Retorno promedio anual" },
    { value: 99, suffix: ".9%", label: "Uptime garantizado" },
  ];
  return (
    <section className="py-24 px-6 bg-surface/40 border-y border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((s) => (
          <div key={s.label} className="reveal text-center">
            <p
              className="count font-[Sora,sans-serif] text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-brand)" }}
              data-value={s.value}
              data-suffix={s.suffix || ""}
              data-prefix={s.prefix || ""}
            >
              0
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Crea tu cuenta", desc: "Verificación en 60 segundos con biometría." },
    { n: "02", title: "Define tu perfil", desc: "Cuéntanos tus metas y la IA arma tu portafolio ideal." },
    { n: "03", title: "Mira crecer tu dinero", desc: "Aportes automáticos y rebalanceo continuo." },
  ];
  return (
    <section id="how" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand text-sm font-semibold mb-3">CÓMO FUNCIONA</p>
          <h2 className="font-[Sora,sans-serif] text-4xl md:text-5xl font-bold tracking-tight">
            Tres pasos. Cero fricción.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="reveal p-8 rounded-2xl border border-border bg-surface/50">
              <p className="font-[Sora,sans-serif] text-5xl font-extrabold text-brand/40">{s.n}</p>
              <h3 className="mt-6 font-[Sora,sans-serif] text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "0",
      desc: "Para empezar tu camino financiero.",
      features: ["Portafolio automatizado", "Hasta $5,000 invertidos", "Soporte por chat"],
    },
    {
      name: "Pro",
      price: "9",
      featured: true,
      desc: "Para inversores que quieren más rendimiento.",
      features: ["Sin límite de inversión", "Asesor IA premium", "Cripto y ETFs globales", "Reportes fiscales"],
    },
    {
      name: "Wealth",
      price: "29",
      desc: "Asesoría dedicada y estrategias avanzadas.",
      features: ["Todo en Pro", "Asesor humano dedicado", "Estrategias alternativas", "Acceso early a productos"],
    },
  ];
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="reveal text-center max-w-2xl mx-auto mb-16">
          <p className="text-brand text-sm font-semibold mb-3">PRECIOS</p>
          <h2 className="font-[Sora,sans-serif] text-4xl md:text-5xl font-bold tracking-tight">
            Planes simples, sin sorpresas.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`reveal relative p-8 rounded-3xl border transition ${
                p.featured
                  ? "border-brand bg-surface shadow-[var(--shadow-glow)] scale-[1.02]"
                  : "border-border bg-surface/50"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand text-brand-foreground text-xs font-bold">
                  MÁS POPULAR
                </span>
              )}
              <h3 className="font-[Sora,sans-serif] text-xl font-semibold">{p.name}</h3>
              <p className="text-muted-foreground text-sm mt-1 mb-6">{p.desc}</p>
              <p className="font-[Sora,sans-serif] text-5xl font-extrabold">
                ${p.price}
                <span className="text-base text-muted-foreground font-normal">/mes</span>
              </p>
              <button
                onClick={() => trackEvent("plan_select", { plan: p.name })}
                className={`mt-6 w-full py-3 rounded-full font-semibold transition ${
                  p.featured
                    ? "bg-brand text-brand-foreground hover:opacity-90"
                    : "border border-border hover:bg-surface-2"
                }`}
              >
                Elegir {p.name}
              </button>
              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-28 px-6">
      <div className="reveal max-w-5xl mx-auto rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden border border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-brand)" }} />
        <div className="relative">
          <h2 className="font-[Sora,sans-serif] text-4xl md:text-6xl font-extrabold tracking-tight">
            Tu futuro financiero
            <br />
            empieza hoy.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Únete a más de un millón de personas que ya están construyendo riqueza con Finova.
          </p>
          <button
            onClick={() => trackEvent("cta_click", { location: "footer_cta" })}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand text-brand-foreground font-semibold shadow-[var(--shadow-glow)] hover:translate-y-[-2px] transition"
          >
            Crear mi cuenta gratis
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="faq" className="border-t border-border py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-[Sora,sans-serif] font-bold text-xl mb-4">
            <span className="w-8 h-8 rounded-lg bg-[var(--gradient-brand)] grid place-items-center text-brand-foreground">
              <TrendingUp className="w-4 h-4" strokeWidth={3} />
            </span>
            Finova
          </div>
          <p className="text-sm text-muted-foreground">
            La forma inteligente de invertir tu dinero.
          </p>
        </div>
        {[
          { t: "Producto", l: ["Características", "Precios", "Seguridad", "API"] },
          { t: "Compañía", l: ["Sobre nosotros", "Carreras", "Prensa", "Contacto"] },
          { t: "Recursos", l: ["Blog", "Centro de ayuda", "Términos", "Privacidad"] },
        ].map((c) => (
          <div key={c.t}>
            <p className="font-semibold mb-4 text-sm">{c.t}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.l.map((i) => (
                <li key={i}>
                  <a href="#" className="hover:text-foreground transition">{i}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border flex flex-wrap justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>© 2026 Finova Inc. Todos los derechos reservados.</p>
        <p>Inversiones sujetas a riesgo. Regulado SEC.</p>
      </div>
    </footer>
  );
}
