import { Link } from "react-router-dom";
import type { Agent } from "@/types";
import { CATEGORIES } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Cpu, ArrowRight, Sparkles } from "lucide-react";

const categoryLabel = (id: Agent["category"]) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

const categoryAccent: Record<Agent["category"], string> = {
  productividad: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  marketing: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  desarrollo: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  ventas: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  soporte: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  analisis: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  creativo: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
};

export const AgentCard = ({ agent }: { agent: Agent }) => {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge
            variant="outline"
            className={`text-[11px] font-semibold capitalize border ${categoryAccent[agent.category] || "bg-muted text-muted-foreground"}`}
          >
            {categoryLabel(agent.category)}
          </Badge>

          {agent.recommendedModels?.[0] && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full font-mono">
              <Cpu className="h-3 w-3 text-primary" /> {agent.recommendedModels[0]}
            </span>
          )}
        </div>

        <h3 className="mb-2 text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
          <Link to={`/agentes/${agent.slug}`}>{agent.name}</Link>
        </h3>

        <p className="mb-4 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
          {agent.tagline}
        </p>

        {agent.tags && agent.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {agent.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-muted/50 text-muted-foreground px-1.5 py-0.5 rounded font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Prompt Gratis</span>
        </div>

        <Button asChild size="sm" variant="ghost" className="gap-1 text-xs hover:text-primary group-hover:translate-x-0.5 transition-transform">
          <Link to={`/agentes/${agent.slug}`}>
            Ver Prompt <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </article>
  );
};
