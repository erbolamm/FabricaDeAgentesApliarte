import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AgentCard } from "@/components/AgentCard";
import { CommunityBanner } from "@/components/CommunityBanner";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { AuthorPersonalNote } from "@/components/AuthorPersonalNote";
import { SocialShareBar } from "@/components/SocialShareBar";
import { useAgents } from "@/hooks/useAgents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Sparkles,
  Key,
  Copy,
  Zap,
  Github,
  Heart,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Bot,
  Globe,
  Monitor,
  Smartphone,
  Eye,
  Lock,
  RefreshCw,
  Share2,
  Activity,
  Compass,
  Coffee,
  Check,
} from "lucide-react";

export function Index() {
  const { data: agents = [] } = useAgents();
  const featured = agents.slice(0, 6);
  const location = useLocation();

  useEffect(() => {
    // Detectar ruta o hash (#beneficios, /beneficios, #como-funciona, /como-funciona, #roadmap, /roadmap)
    const rawPath = location.pathname.replace(/^\/+/, "");
    const rawHash = location.hash.replace(/^#+/, "");
    const target = rawPath || rawHash;

    if (target && ["beneficios", "como-funciona", "roadmap", "faq", "nota-personal"].includes(target)) {
      const el = document.getElementById(target);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO SECTION - ERBOLAMM UNIVERSO & FÁBRICA DE AGENTES */}
      <section className="relative overflow-hidden border-b border-border/60 py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="outline" className="text-xs font-semibold py-1 px-3 border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              🟢 Universo abierto · Crea y conecta tus planetas y agentes
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <span className="inline-flex items-center gap-1"><Globe className="h-3 w-3" /> Web</span> •
              <span className="inline-flex items-center gap-1"><Monitor className="h-3 w-3" /> Desktop</span> •
              <span className="inline-flex items-center gap-1"><Smartphone className="h-3 w-3" /> Mobile</span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground block">
              Francisco Javier Mateo Márquez · ErBolamm Universo
            </span>
            <h1 className="text-4xl font-black tracking-tight sm:text-6xl sm:leading-tight">
              Tu Universo de Software, Prompts y Proyectos en 3D.
            </h1>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Conecta, visualiza y comparte todo tu ecosistema de aplicaciones, webs y herramientas de IA en un mapa interactivo de planetas sin que nadie toque tus datos.
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button size="lg" asChild className="rounded-full px-8 gap-2 text-sm font-bold shadow-lg bg-primary hover:bg-primary/90">
              <Link to="/agentes">
                🌌 Entrar al Universo / Catálogo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="rounded-full px-6 gap-2 text-sm font-semibold">
              <Link to="/conectores">
                <Key className="h-4 w-4 text-primary" /> Conectar tu IA (BYOK)
              </Link>
            </Button>

            <Button size="lg" variant="ghost" asChild className="rounded-full px-6 gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
              <Link to="/apoyar">
                <Heart className="h-4 w-4 text-pink-500 fill-current" /> Apoyar como Fundador
              </Link>
            </Button>
          </div>

          {/* Badges de Garantía y Pilares */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>🆓 Explora Gratis & Privado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-amber-500" />
              <span>🔒 Proyectos Aislados y Seguros</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>🪐 Tus planetas y agentes propios</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-purple-500" />
              <span>🎨📚🛠️ Cuatro Pilares (Cultura, Creación, Educación, Herramientas)</span>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS - TUS PROYECTOS. SUS RELACIONES. UNA SOLA VISTA */}
      <section id="beneficios" className="py-20 border-b border-border/60 bg-card/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Visión del Ecosistema
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Tus proyectos. Sus relaciones. Una sola vista.
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              No es un catálogo plano: es una vista viva de tu ecosistema, pensada para crear contexto sin complicarte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500 text-xl font-bold">
                🌀
              </div>
              <h3 className="text-base font-bold">3D Ligero</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Render WebGL y React optimizado para explorar con fluidez incluso desde equipos modestos.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 text-xl font-bold">
                🔐
              </div>
              <h3 className="text-base font-bold">Privacidad por Creador</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Cada persona trabaja en un espacio aislado en su navegador: nadie puede modificar tus planetas ni leer tus datos.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 text-xl font-bold">
                🔄
              </div>
              <h3 className="text-base font-bold">Sincronización Abierta</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Tu universo se describe con <code className="text-[11px] bg-muted px-1.5 py-0.5 rounded font-mono">universe.json</code> y puede crecer desde GitHub y otras fuentes.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 text-xl font-bold">
                🔗
              </div>
              <h3 className="text-base font-bold">Visor Público Embebible</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Comparte tu mapa como enlace o exporta tus prompts en 1-clic para Gemini, Claude o ChatGPT.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 text-xl font-bold">
                📡
              </div>
              <h3 className="text-base font-bold">Salud en Tiempo Real</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ejecución directa BYOK contra DeepSeek, Claude, GPT o Gemini sin intermediarios ni demoras.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card p-6 space-y-3 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 text-xl font-bold">
                🧭
              </div>
              <h3 className="text-base font-bold">Cuatro Pilares</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ordena Cultura, Creación, Educación y Herramientas con colores y relaciones claras en tu mapa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA PASO A PASO */}
      <HowItWorksSection />

      {/* MANIFIESTO COMUNITARIO Y BANNER PERIÓDICO */}
      <section className="py-14 border-t border-border/60 bg-card/40">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <CommunityBanner variant="inline" />
        </div>
      </section>

      {/* PROMPTS DESTACADOS */}
      <section className="py-20 border-t border-border/60">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                Directorio de Prompts
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight">Prompts & Workflows de IA ({agents.length})</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Optimizado para DeepSeek-R1, Claude 3.7, GPT-4o y Gemini 2.0.
              </p>
            </div>
            <Button variant="ghost" asChild className="gap-1.5 text-xs font-bold">
              <Link to="/agentes">
                Ver los {agents.length} prompts <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP POR FASES */}
      <RoadmapSection />

      {/* APOYO COMUNITARIO & EARLY ADOPTERS FUNDADORES */}
      <section className="py-20 border-t border-border/60 bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold text-pink-600 dark:text-pink-400">
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>💖 Apoyo Comunitario & Early Adopters</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Quien colabora hoy es un Early Adopter Fundador
          </h3>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Colaborar ahora te da un <strong>50% de descuento vitalicio en ErBolamm Studio (la fábrica autónoma)</strong> para finales de 2026.
          </p>

          {/* Canales Canónicos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
            <a
              href="https://paypal.me/erbolamm"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-all text-center space-y-2 shadow-sm"
            >
              <span className="text-2xl block">💳</span>
              <span className="font-bold text-sm block">PayPal</span>
              <span className="text-xs text-muted-foreground font-mono">paypal.me/erbolamm</span>
            </a>

            <a
              href="https://ko-fi.com/C0C11TWR1K"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-all text-center space-y-2 shadow-sm"
            >
              <span className="text-2xl block">☕</span>
              <span className="font-bold text-sm block">Ko-fi</span>
              <span className="text-xs text-muted-foreground font-mono">ko-fi.com/C0C11TWR1K</span>
            </a>

            <a
              href="https://www.twitch.tv/apliarte"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-all text-center space-y-2 shadow-sm"
            >
              <span className="text-2xl block">🎮</span>
              <span className="font-bold text-sm block">Twitch Tips</span>
              <span className="text-xs text-muted-foreground font-mono">twitch.tv/apliarte</span>
            </a>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs text-muted-foreground max-w-xl mx-auto">
            <p className="font-semibold text-foreground mb-0.5">Transparencia, no urgencia artificial</p>
            Guardá tu comprobante y un email de contacto. El beneficio fundador se validará de buena fe cuando Studio abra su etapa comercial.
          </div>

          <div className="pt-2">
            <Button asChild size="lg" className="rounded-full px-8 gap-2 text-xs font-bold shadow-md">
              <Link to="/apoyar">
                <Heart className="h-4 w-4 fill-current text-pink-300" /> Ver Tiers de Mecenazgo en RevenueCat
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* NOTA PERSONAL DEL AUTOR (6 IDIOMAS) */}
      <AuthorPersonalNote />

      {/* COMPARTE EL UNIVERSO */}
      <SocialShareBar />

      {/* FOOTER OFICIAL */}
      <SiteFooter />
    </div>
  );
}

export default Index;
