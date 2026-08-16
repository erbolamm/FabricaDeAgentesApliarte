import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, CircleDot, Lightbulb, MapPin } from "lucide-react";

interface Phase {
  status: "completed" | "in_progress" | "planned" | "idea";
  statusLabel: string;
  badgeColor: string;
  icon: typeof CheckCircle2;
  title: string;
  description: string;
}

const PHASES: Phase[] = [
  {
    status: "completed",
    statusLabel: "Listo ✅",
    badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
    title: "Fase 0 — Núcleo del Universo y Catálogo",
    description: "Catálogo interactivo con 34 prompts de alta precisión, navegación rápida y estructura de datos abierta.",
  },
  {
    status: "completed",
    statusLabel: "Listo ✅",
    badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
    title: "Fase 1 — Identidad, Conectores BYOK y Privacidad",
    description: "Ejecución directa desde el navegador (DeepSeek, Claude, GPT, Gemini, Groq, Ollama) sin servidores intermediarios.",
  },
  {
    status: "in_progress",
    statusLabel: "Siguiente 🟡",
    badgeColor: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: Clock,
    title: "Fase 2 — Guías de Creación y Edición Visual",
    description: "Paso a paso para configurar Gemas de Gemini, Custom GPTs, Claude Projects y Mistral Agents con 1-clic.",
  },
  {
    status: "planned",
    statusLabel: "Planificado ⬜",
    badgeColor: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: CircleDot,
    title: "Fase 3 — Universo Compartible y Visor Embebible",
    description: "Exportación a universe.json, enlaces públicos para compartir mapas de proyectos y portadas visuales.",
  },
  {
    status: "planned",
    statusLabel: "Planificado ⬜",
    badgeColor: "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    icon: CircleDot,
    title: "Fase 4 — Señales de Salud y Métricas",
    description: "Métricas de uso de prompts, pruebas automatizadas y señales de actividad del ecosistema.",
  },
  {
    status: "idea",
    statusLabel: "Idea 💡",
    badgeColor: "border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400",
    icon: Lightbulb,
    title: "Fase 5 — Fábrica Autónoma ErBolamm Studio",
    description: "Integración progresiva con ErBolamm Studio (orquestación autónoma multi-agente) hacia finales de 2026.",
  },
];

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-20 border-t border-border/60 bg-muted/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <MapPin className="h-3.5 w-3.5" />
            <span>Transparencia Técnica</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            🗺️ Roadmap por Fases
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Lo construido, el siguiente foco y las ideas que todavía necesitan validación comunitaria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHASES.map((phase) => {
            const Icon = phase.icon;
            return (
              <div
                key={phase.title}
                className="rounded-3xl border border-border/80 bg-card p-6 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all shadow-sm"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={`text-[11px] py-0.5 px-2.5 font-bold ${phase.badgeColor}`}>
                      {phase.statusLabel}
                    </Badge>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-bold text-foreground leading-snug">{phase.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{phase.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RoadmapSection;
