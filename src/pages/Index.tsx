import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AgentCard } from "@/components/AgentCard";
import { useAgents } from "@/hooks/useAgents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

export function Index() {
  const { data: agents = [] } = useAgents();
  const featured = agents.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/60 py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-6 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Fábrica de Prompts & Agentes de IA — 100% Open Source</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-tight">
            Workflows y Prompts de IA de alta precisión.{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ejecuta con tu propia IA.
            </span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Catálogo comunitario de plantillas de prompts optimizadas para <strong>DeepSeek-R1</strong>,{" "}
            <strong>Claude 3.7</strong>, <strong>GPT-4o</strong> y <strong>Gemini 2.0</strong>. Rellena las variables,
            copia en 1-click o ejecuta directamente con tus propias API keys.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild className="rounded-full px-8 gap-2 text-sm shadow-md">
              <Link to="/agentes">
                Explorar Catálogo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="rounded-full px-6 gap-2 text-sm">
              <Link to="/conectores">
                <Key className="h-4 w-4 text-primary" /> Conectar tu IA (BYOK)
              </Link>
            </Button>

            <Button size="lg" variant="ghost" asChild className="rounded-full px-6 gap-2 text-sm text-muted-foreground hover:text-foreground">
              <a
                href="https://github.com/apliarte/FabricaDeAgentesApliarte"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" /> Ver en GitHub
              </a>
            </Button>
          </div>

          {/* Badges de Garantía */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Sin Firebase / 100% Privado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              <span>DeepSeek, Claude, GPT, Gemini, Groq, Ollama</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-pink-500" />
              <span>Gratis & Donaciones Vía RevenueCat</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRES PILARES */}
      <section className="py-16 bg-muted/20 border-b border-border/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Copy className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">1. Copia con 1-Click</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Rellena las variables dinámicas de cualquier prompt y cópialo formateado con instrucciones de sistema para ChatGPT, Claude o Cursor.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">2. Conecta tu Propia IA</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Usa tus propias claves (Bring Your Own Key). Ejecuta los prompts directamente desde tu navegador contra las APIs oficiales sin intermediarios.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <Github className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">3. 100% Código Abierto</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sin paywalls obligatorios. Todo el código y catálogo son libres para auditar, forkiar y desplegar en tu propio hosting o GitHub Pages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMPTS DESTACADOS */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                Directorio
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight">Prompts & Workflows Populares</h2>
            </div>
            <Button variant="ghost" asChild className="gap-1.5 text-xs">
              <Link to="/agentes">
                Ver todos los {agents.length} prompts <ArrowRight className="h-3.5 w-3.5" />
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

      {/* CTA DE APOYO / SPONSOR */}
      <section className="py-16 border-t border-border/60 bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/10 text-pink-500 mx-auto">
            <Heart className="h-6 w-6 fill-current" />
          </div>
          <h3 className="text-2xl font-bold">¿Te resulta útil la Fábrica de Agentes?</h3>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Mantener este proyecto libre de suscripciones y anuncios es posible gracias al apoyo voluntario de la comunidad mediante RevenueCat y GitHub Sponsors.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button asChild size="sm" className="gap-1.5 text-xs bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6">
              <Link to="/apoyar">
                <Heart className="h-3.5 w-3.5 fill-current" /> Apoyar el Proyecto
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

export default Index;
