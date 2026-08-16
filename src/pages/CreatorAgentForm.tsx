import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateAgent } from "@/hooks/useAgents";
import { CATEGORIES } from "@/data/agents";
import type { AgentCategory, AgentInput, AgentInputType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  Layers,
  Bot,
  HelpCircle,
} from "lucide-react";

export function CreatorAgentForm() {
  const navigate = useNavigate();
  const createAgent = useCreateAgent();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<AgentCategory>("productividad");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [userPromptTemplate, setUserPromptTemplate] = useState("");
  const [exampleOutput, setExampleOutput] = useState("");
  const [recommendedModels, setRecommendedModels] = useState("DeepSeek-R1, Claude 3.7 Sonnet, GPT-4o");
  const [tags, setTags] = useState("");

  const [inputs, setInputs] = useState<AgentInput[]>([
    { name: "tema", label: "Tema o asunto", type: "text", placeholder: "ej: Inteligencia Artificial" },
  ]);

  const handleAddInput = () => {
    const nextIdx = inputs.length + 1;
    setInputs((prev) => [
      ...prev,
      {
        name: `variable_${nextIdx}`,
        label: `Variable ${nextIdx}`,
        type: "text",
        placeholder: "ej: Valor",
      },
    ]);
  };

  const handleRemoveInput = (index: number) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateInput = (index: number, patch: Partial<AgentInput>) => {
    setInputs((prev) =>
      prev.map((inp, i) => (i === index ? { ...inp, ...patch } : inp)),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !userPromptTemplate.trim()) return;

    const generatedSlug =
      slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
      name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const created = await createAgent.mutateAsync({
      name: name.trim(),
      slug: generatedSlug,
      tagline: tagline.trim() || "Prompt personalizado",
      description: description.trim() || tagline.trim(),
      category,
      systemPrompt: systemPrompt.trim(),
      userPromptTemplate: userPromptTemplate.trim(),
      exampleOutput: exampleOutput.trim() || "Salida generada por el modelo.",
      recommendedModels: recommendedModels
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean),
      tags: tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      tools: ["Custom Prompt"],
      inputs,
      author: "Local Creator",
      authorGithub: "https://github.com",
      isCustom: true,
    });

    navigate(`/agentes/${created.slug}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="gap-1.5 text-muted-foreground -ml-2">
            <Link to="/agentes">
              <ArrowLeft className="h-4 w-4" /> Volver al catálogo
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Creador de Prompts & Workflows</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Crear Nuevo Prompt / Agente
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Diseña una plantilla estructurada con variables dinámicas para reutilizar o compartir con la comunidad.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información General */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold">1. Información del Prompt</CardTitle>
              <CardDescription className="text-xs">
                Metadatos básicos para categorizar y buscar tu prompt.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Nombre del Prompt *</label>
                  <Input
                    required
                    placeholder="ej: Cold Email Specialist"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!slug) {
                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                      }
                    }}
                    className="text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Slug URL</label>
                  <Input
                    placeholder="ej: cold-email-specialist"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Subtítulo / Tagline</label>
                <Input
                  placeholder="ej: Redacta correos B2B personalizados de alta conversión"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as AgentCategory)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Tags (separados por coma)</label>
                  <Input
                    placeholder="ej: ventas, email, b2b, outreach"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="text-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Variables Dinámicas */}
          <Card className="border-border">
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold">2. Variables Dinámicas</CardTitle>
                <CardDescription className="text-xs">
                  Campos que el usuario rellenará al ejecutar (usa <code>{"{{nombre}}"}</code> en la plantilla).
                </CardDescription>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddInput}
                className="text-xs gap-1 h-8"
              >
                <Plus className="h-3.5 w-3.5" /> Añadir Variable
              </Button>
            </CardHeader>

            <CardContent className="space-y-3">
              {inputs.map((inp, idx) => (
                <div
                  key={inp.name || idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 rounded-xl border border-border/80 p-3 bg-muted/20"
                >
                  <div className="w-full sm:w-1/3">
                    <label className="text-[10px] text-muted-foreground block mb-0.5">
                      Nombre variable {"{{"}nombre{"}}"}
                    </label>
                    <Input
                      placeholder="nombre"
                      value={inp.name}
                      onChange={(e) =>
                        handleUpdateInput(idx, {
                          name: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""),
                        })
                      }
                      className="text-xs font-mono h-8"
                    />
                  </div>

                  <div className="w-full sm:w-1/3">
                    <label className="text-[10px] text-muted-foreground block mb-0.5">
                      Etiqueta visible
                    </label>
                    <Input
                      placeholder="Etiqueta visible..."
                      value={inp.label}
                      onChange={(e) => handleUpdateInput(idx, { label: e.target.value })}
                      className="text-xs h-8"
                    />
                  </div>

                  <div className="w-full sm:w-1/4">
                    <label className="text-[10px] text-muted-foreground block mb-0.5">Tipo</label>
                    <select
                      value={inp.type}
                      onChange={(e) =>
                        handleUpdateInput(idx, { type: e.target.value as AgentInputType })
                      }
                      className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs h-8 focus:outline-none"
                    >
                      <option value="text">Texto corto</option>
                      <option value="textarea">Texto largo</option>
                    </select>
                  </div>

                  {inputs.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInput(idx)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive self-end sm:self-center mt-2 sm:mt-4"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Prompt & Template */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold">3. Instrucciones & Plantilla</CardTitle>
              <CardDescription className="text-xs">
                Define el rol del modelo y el formato del prompt con las variables interpoladas.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">
                  System Prompt (Rol, Reglas, Formato de salida)
                </label>
                <Textarea
                  rows={4}
                  placeholder="Eres un experto en... Tus reglas son: 1. ... 2. ..."
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="text-xs font-mono"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">
                  User Prompt Template (Usa {"{{variables}}"} aquí) *
                </label>
                <Textarea
                  required
                  rows={5}
                  placeholder="Por favor genera un... para el tema: {{tema}} con los siguientes datos: {{otra_variable}}"
                  value={userPromptTemplate}
                  onChange={(e) => setUserPromptTemplate(e.target.value)}
                  className="text-xs font-mono"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Modelos Recomendados</label>
                <Input
                  placeholder="DeepSeek-R1, Claude 3.7 Sonnet, GPT-4o, Gemini 2.0 Flash"
                  value={recommendedModels}
                  onChange={(e) => setRecommendedModels(e.target.value)}
                  className="text-xs"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" asChild>
              <Link to="/agentes">Cancelar</Link>
            </Button>
            <Button type="submit" disabled={createAgent.isPending} className="gap-2">
              <Sparkles className="h-4 w-4" />
              {createAgent.isPending ? "Guardando..." : "Guardar Prompt y Abrir"}
            </Button>
          </div>
        </form>
      </main>

      <SiteFooter />
    </div>
  );
}

export default CreatorAgentForm;
