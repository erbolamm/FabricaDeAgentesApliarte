import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAgentBySlug } from "@/hooks/useAgents";
import { useCreateExecution } from "@/hooks/useExecutions";
import { aiConnectorsService, AI_PROVIDERS } from "@/services";
import type { AIProviderId } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CreateInPlatformGuide } from "@/components/CreateInPlatformGuide";
import { FeedbackButton } from "@/components/FeedbackButton";
import {
  Copy,
  Check,
  Play,
  Sparkles,
  Download,
  ArrowLeft,
  Key,
  Bot,
  Layers,
  HelpCircle,
  Cpu,
  Github,
  Mail,
} from "lucide-react";

export function AgentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: agent, isLoading } = useAgentBySlug(slug);
  const createExecution = useCreateExecution();

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("guide");

  const connections = useMemo(() => aiConnectorsService.getConnections(), []);
  const defaultProviderId = useMemo(() => aiConnectorsService.getDefaultProviderId(), []);
  const [selectedProvider, setSelectedProvider] = useState<AIProviderId | "">(
    defaultProviderId || (connections.length > 0 ? connections[0].providerId : ""),
  );

  // Inicializar inputs con valores por defecto
  useEffect(() => {
    if (agent) {
      setInputs((prev) => {
        if (Object.keys(prev).length > 0) return prev;
        const initial: Record<string, string> = {};
        agent.inputs.forEach((inp) => {
          initial[inp.name] = inp.defaultValue || "";
        });
        return initial;
      });
    }
  }, [agent]);

  const renderedUserPrompt = useMemo(() => {
    if (!agent) return "";
    return agent.userPromptTemplate.replace(/\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g, (_, key) => {
      return inputs[key]?.trim() || `[${key}]`;
    });
  }, [agent, inputs]);

  const fullPromptToCopy = useMemo(() => {
    if (!agent) return "";
    return `### SYSTEM INSTRUCTIONS:
${agent.systemPrompt}

### USER REQUEST:
${renderedUserPrompt}`;
  }, [agent, renderedUserPrompt]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPromptToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = async () => {
    if (!agent) return;
    setIsRunning(true);
    setActiveTab("result");

    try {
      const res = await createExecution.mutateAsync({
        agent,
        inputs,
        providerId: (selectedProvider as AIProviderId) || undefined,
      });

      if (res.output) {
        setOutput(res.output);
      } else if (res.error) {
        setOutput(`❌ Error en la ejecución: ${res.error}`);
      }
    } catch (err: unknown) {
      setOutput(`❌ Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleExportMarkdown = () => {
    if (!agent) return;
    const content = `# ${agent.name}
> ${agent.tagline}

## Categoría
${agent.category}

## System Prompt
\`\`\`markdown
${agent.systemPrompt}
\`\`\`

## User Prompt (Variables Aplicadas)
\`\`\`markdown
${renderedUserPrompt}
\`\`\`

${output ? `## Resultado Generado\n\n${output}` : ""}`;

    const blob = new Blob([content], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${agent.slug}-prompt.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <Sparkles className="h-8 w-8 animate-spin mx-auto text-primary mb-3" />
          <p className="text-sm text-muted-foreground">Cargando prompt...</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold">Prompt no encontrado</h2>
          <p className="text-sm text-muted-foreground mt-2">
            El prompt solicitado no existe en el catálogo.
          </p>
          <Button asChild className="mt-6" size="sm">
            <Link to="/agentes">Volver al catálogo</Link>
          </Button>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        {/* Header Breadcrumb & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Button variant="ghost" size="sm" asChild className="gap-1.5 text-muted-foreground -ml-2">
            <Link to="/agentes">
              <ArrowLeft className="h-4 w-4" /> Volver al catálogo
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <FeedbackButton
              contextName={agent.name}
              contextType="prompt"
              label="¿Qué cambiarías?"
            />

            <Button variant="outline" size="sm" onClick={handleExportMarkdown} className="text-xs gap-1.5">
              <Download className="h-3.5 w-3.5" /> Exportar .md
            </Button>
          </div>
        </div>

        {/* Title & Metadata */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs capitalize border-primary/30 text-primary">
              {agent.category}
            </Badge>
            {agent.recommendedModels?.map((model) => (
              <Badge key={model} variant="secondary" className="text-[11px] gap-1 font-mono">
                <Cpu className="h-3 w-3" /> {model}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{agent.name}</h1>
          <p className="mt-2 text-base text-muted-foreground max-w-3xl leading-relaxed">
            {agent.tagline}
          </p>
        </div>

        {/* Dos Columnas: Inputs a la izquierda / Render & Acciones a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Columna Izquierda: Variables Dinámicas (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" /> Variables Dinámicas
                  </CardTitle>
                  <span className="text-[11px] text-muted-foreground">
                    {agent.inputs.length} campo{agent.inputs.length > 1 ? "s" : ""}
                  </span>
                </div>
                <CardDescription className="text-xs">
                  Rellena los datos para personalizar el prompt automáticamente.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {agent.inputs.map((inp) => (
                  <div key={inp.name} className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                      <span>{inp.label}</span>
                      <code className="text-[10px] text-muted-foreground font-mono">
                        {"{{"}
                        {inp.name}
                        {"}}"}
                      </code>
                    </label>

                    {inp.type === "textarea" ? (
                      <Textarea
                        rows={3}
                        placeholder={inp.placeholder}
                        value={inputs[inp.name] || ""}
                        onChange={(e) =>
                          setInputs((prev) => ({ ...prev, [inp.name]: e.target.value }))
                        }
                        className="text-xs resize-none bg-background"
                      />
                    ) : (
                      <Input
                        placeholder={inp.placeholder}
                        value={inputs[inp.name] || ""}
                        onChange={(e) =>
                          setInputs((prev) => ({ ...prev, [inp.name]: e.target.value }))
                        }
                        className="text-xs bg-background"
                      />
                    )}
                  </div>
                ))}

                {/* BYOK Conector selector (opcional) */}
                <div className="pt-4 border-t border-border/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold flex items-center gap-1.5">
                      <Key className="h-3.5 w-3.5 text-primary" />
                      <span>Ejecutar con tu IA (Opcional):</span>
                    </label>
                    <Link
                      to="/conectores"
                      className="text-[11px] text-primary hover:underline flex items-center gap-1"
                    >
                      Añadir claves
                    </Link>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={selectedProvider}
                      onChange={(e) => setSelectedProvider(e.target.value as AIProviderId)}
                      className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="">-- Elige un proveedor conectado --</option>
                      {connections.map((c) => {
                        const provider = AI_PROVIDERS.find((p) => p.id === c.providerId);
                        return (
                          <option key={c.providerId} value={c.providerId}>
                            {provider?.name || c.providerId} ({c.selectedModel})
                          </option>
                        );
                      })}
                    </select>

                    <Button
                      onClick={handleRun}
                      disabled={!selectedProvider || isRunning}
                      size="sm"
                      className="gap-1.5 text-xs shrink-0"
                    >
                      <Play className="h-3.5 w-3.5" />
                      {isRunning ? "Ejecutando..." : "Ejecutar"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha: Visor de Prompt y Resultados (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3 border-b border-border/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" /> Prompt Formateado
                  </CardTitle>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleCopy}
                      size="sm"
                      className="gap-1.5 text-xs bg-primary text-primary-foreground shadow-sm"
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-emerald-300" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      {copied ? "¡Prompt Copiado!" : "Copiar 1-Click"}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4 space-y-4">
                {/* System Prompt Box */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      1. System Prompt (Instrucciones del Sistema)
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Para Gemini Gems, Custom GPTs, Claude Projects
                    </span>
                  </div>
                  <pre className="rounded-xl bg-muted/40 p-3.5 font-mono text-xs whitespace-pre-wrap max-h-48 overflow-y-auto border border-border/60 text-foreground">
                    {agent.systemPrompt}
                  </pre>
                </div>

                {/* User Prompt Box */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      2. User Prompt (Variables Rellenadas)
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Para enviar en el mensaje de chat
                    </span>
                  </div>
                  <pre className="rounded-xl bg-background p-3.5 font-mono text-xs whitespace-pre-wrap max-h-48 overflow-y-auto border border-border text-foreground">
                    {renderedUserPrompt}
                  </pre>
                </div>

                {/* Salida Generada (si ejecutó con IA) */}
                {output && (
                  <div className="pt-2 border-t border-border/60">
                    <span className="text-xs font-bold text-foreground block mb-1.5">
                      Respuesta de la IA Conectada:
                    </span>
                    <pre className="rounded-xl bg-primary/5 p-4 font-mono text-xs whitespace-pre-wrap border border-primary/20 max-h-60 overflow-y-auto text-foreground">
                      {output}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Guía Detallada de Creación en Plataformas (Gemini, GPT, Claude, Mistral, etc.) */}
        <div className="mb-14">
          <CreateInPlatformGuide
            agentName={agent.name.replace(/^[^\w\s]+/, "").trim()}
            systemPrompt={agent.systemPrompt}
            tagline={agent.tagline}
          />
        </div>

        {/* Banner de Feedback & Preguntas */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto">
            <Mail className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            ¿Qué cambiarías de este prompt o qué dudas tienes?
          </h3>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            Tu opinión ayuda a mejorar este prompt para toda la comunidad. Escríbenos directamente y te respondemos con gusto.
          </p>
          <div className="pt-1">
            <FeedbackButton
              contextName={agent.name}
              contextType="prompt"
              size="default"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              label="Enviar sugerencias o dudas por Email"
            />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default AgentDetail;
