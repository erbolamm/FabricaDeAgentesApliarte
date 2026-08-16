import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AgentCard } from "@/components/AgentCard";
import { CATEGORIES } from "@/data/agents";
import { useAgents } from "@/hooks/useAgents";
import type { AgentCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Key, Plus } from "lucide-react";

export function Catalog() {
  const [params, setParams] = useSearchParams();
  const initialCat = (params.get("cat") as AgentCategory | null) ?? null;
  const [cat, setCat] = useState<AgentCategory | null>(initialCat);
  const [q, setQ] = useState("");

  const { data: agents = [], isLoading } = useAgents({
    category: cat,
    search: q,
  });

  const setCategory = (next: AgentCategory | null) => {
    setCat(next);
    const newParams = new URLSearchParams(params);
    if (next) newParams.set("cat", next);
    else newParams.delete("cat");
    setParams(newParams, { replace: true });
  };

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <main className="px-4 sm:px-6 py-12">
        <div className="container mx-auto max-w-6xl">
          <header className="mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Directorio de Prompts & Workflows de IA</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Catálogo de Prompts Open Source
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              {agents.length} plantillas de prompt listas para personalizar, copiar con 1-click o ejecutar directamente con tus conectores de IA.
            </p>
          </header>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Categorías */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory(null)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  cat === null
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                Todos los prompts
              </button>
              {CATEGORIES.map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    cat === c.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Búsqueda */}
            <div className="flex w-full items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 md:w-80">
              <Search className="size-4 text-muted-foreground shrink-0" aria-hidden />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar por tarea, tag o modelo…"
                aria-label="Buscar agentes"
                className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <Sparkles className="h-8 w-8 animate-spin mx-auto text-primary mb-3" />
              <p className="text-xs text-muted-foreground">Cargando catálogo...</p>
            </div>
          ) : agents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground space-y-3">
              <p>No encontramos ningún prompt para esa búsqueda.</p>
              <Button variant="outline" size="sm" onClick={() => { setCategory(null); setQ(""); }}>
                Restablecer filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {agents.map((a) => (
                <AgentCard key={a.id} agent={a} />
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Catalog;
