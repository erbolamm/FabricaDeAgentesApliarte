import { useState } from "react";
import { Link } from "react-router-dom";
import { useExecutions, useClearExecutions } from "@/hooks/useExecutions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  History,
  Trash2,
  Copy,
  Check,
  Bot,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Cpu,
} from "lucide-react";

export function MyExecutions() {
  const { data: executions = [], isLoading } = useExecutions();
  const clearExecutions = useClearExecutions();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Historial de Ejecuciones</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Registro local privado de todos los prompts que has personalizado y ejecutado.
            </p>
          </div>

          {executions.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => clearExecutions.mutate()}
              className="text-xs text-muted-foreground hover:text-destructive gap-1.5"
            >
              <Trash2 className="h-3.5 w-3.5" /> Limpiar Historial
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <Sparkles className="h-8 w-8 animate-spin mx-auto text-primary mb-3" />
            <p className="text-xs text-muted-foreground">Cargando historial local...</p>
          </div>
        ) : executions.length === 0 ? (
          <Card className="border-dashed border-border text-center py-16">
            <CardContent className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
                <History className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">Aún no has ejecutado ningún prompt</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Explora el catálogo, rellena las variables de tu prompt favorito y pruébalo en vivo con
                tu IA conectada.
              </p>
              <Button asChild size="sm" className="gap-1.5 text-xs">
                <Link to="/agentes">
                  Explorar Catálogo de Prompts <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {executions.map((exec) => {
              const isCopied = copiedId === exec.id;

              return (
                <Card key={exec.id} className="border-border">
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-primary" />
                        <CardTitle className="text-base font-bold">{exec.agentName}</CardTitle>
                        {exec.providerId && (
                          <Badge variant="outline" className="text-[10px] uppercase font-mono py-0">
                            {exec.providerId}
                          </Badge>
                        )}
                        {exec.modelUsed && (
                          <Badge variant="secondary" className="text-[10px] gap-1 py-0">
                            <Cpu className="h-3 w-3" /> {exec.modelUsed}
                          </Badge>
                        )}
                      </div>

                      <span className="text-[11px] text-muted-foreground">
                        {new Date(exec.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 text-xs">
                    {/* Prompt Renderizado */}
                    <div>
                      <span className="font-semibold text-muted-foreground block mb-1">
                        Prompt Renderizado:
                      </span>
                      <pre className="rounded-lg bg-muted/40 p-3 font-mono text-[11px] whitespace-pre-wrap max-h-32 overflow-y-auto border border-border/50">
                        {exec.renderedPrompt}
                      </pre>
                    </div>

                    {/* Salida Generada */}
                    {exec.output && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-foreground">Respuesta Generada:</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(exec.id, exec.output || "")}
                            className="h-7 text-[11px] gap-1"
                          >
                            {isCopied ? (
                              <Check className="h-3 w-3 text-emerald-500" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                            {isCopied ? "Copiado" : "Copiar"}
                          </Button>
                        </div>
                        <pre className="rounded-lg bg-background p-3 font-mono text-[11px] whitespace-pre-wrap border border-border max-h-48 overflow-y-auto text-foreground">
                          {exec.output}
                        </pre>
                      </div>
                    )}

                    {exec.error && (
                      <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-destructive">
                        {exec.error}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
