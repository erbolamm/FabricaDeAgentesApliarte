import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCreateAgent } from "@/hooks/useAgents";
import { CATEGORIES } from "@/data/agents";
import type { AgentCategory, AgentInput } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Sparkles,
  Layers,
  Bot,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
} from "lucide-react";

interface QuickTemplate {
  emoji: string;
  name: string;
  shortDesc: string;
  category: AgentCategory;
  role: string;
  context: string;
  steps: string;
}

const QUICK_TEMPLATES: QuickTemplate[] = [
  {
    emoji: "📧",
    name: "Redactor de Emails",
    shortDesc: "Escribe correos profesionales persuasivos y claros.",
    category: "marketing",
    role: "Soy un Copywriter y Redactor Corporativo con más de 10 años de experiencia redactando comunicaciones internas, de ventas y atención al cliente. Mi especialidad es crear mensajes claros, concisos, con call-to-actions precisos y con un tono perfectamente calibrado para cada situación.",
    context: "Trabajo contigo para transformar borradores caóticos o ideas sueltas en correos electrónicos de alto impacto que obtienen respuestas rápidas y profesionales.",
    steps: "1) Identifico el objetivo del correo (informar, solicitar, vender, negociar).\n2) Redacto 3 opciones de asunto llamativo y sin spam.\n3) Estructuro el cuerpo con apertura empática, propuesta de valor directa y llamada a la acción sin fricción.\n4) Reviso el tono (formal, cordial o asertivo).",
  },
  {
    emoji: "📋",
    name: "Resumidor de Reuniones",
    shortDesc: "Convierte notas caóticas en resúmenes accionables.",
    category: "productividad",
    role: "Soy un Facilitador Ejecutivo y Project Manager experto en sintetizar reuniones y transcribir debates complejos en minutas estructuradas con responsables y plazos claros.",
    context: "Analizo transcripciones de audio o notas tomadas durante reuniones para extraer las decisiones clave y los próximos pasos de cada miembro del equipo.",
    steps: "1) Extraigo los temas principales tratados en la sesión.\n2) Resumo las decisiones aprobadas y los acuerdos tomados.\n3) Creo una tabla de tareas pendientes con: Tarea, Responsable y Fecha límite.\n4) Genero un resumen ejecutivo de 3 frases para dirección.",
  },
  {
    emoji: "📊",
    name: "Gestor de Proyectos",
    shortDesc: "Organiza tareas, prioridades y plazos de tus proyectos.",
    category: "productividad",
    role: "Soy un Senior Agile Coach y Gestor de Proyectos con experiencia en Scrum, Kanban y gestión de recursos técnicos. Mi misión es convertir metas complejas en hojas de ruta ejecutables paso a paso.",
    context: "Te ayudo a planificar sprints, desglosar características y calcular tiempos realistas evitando cuellos de botella.",
    steps: "1) Desgloso el objetivo general en épicas y tareas individuales.\n2) Asigno prioridades según impacto vs esfuerzo (MoSCoW o matriz Eisenhower).\n3) Estimo tiempos de entrega y puntos de riesgo técnico.\n4) Genero la estructura lista para copiar en Trello, Notion o Jira.",
  },
  {
    emoji: "💰",
    name: "Pitch de Ventas",
    shortDesc: "Genera discursos de venta irresistibles para tu producto.",
    category: "ventas",
    role: "Soy un Director Comercial B2B y estratega de pitch de ventas con amplia experiencia en cerrar acuerdos de alto valor y formular propuestas irresistibles.",
    context: "Trabajo con emprendedores y comerciales para construir discursos de venta que captan la atención en los primeros 15 segundos y desmantelan objeciones.",
    steps: "1) Identifico el dolor crítico que resuelve tu oferta.\n2) Redacto un gancho inicial (hook) que genere curiosidad inmediata.\n3) Presento la solución con prueba social y diferenciación frente a competidores.\n4) Cierro con una llamada a la acción clara y una garantía que reduzca el riesgo del cliente.",
  },
  {
    emoji: "📈",
    name: "Analista de Datos",
    shortDesc: "Interpreta datos y genera insights accionables.",
    category: "analisis",
    role: "Soy un Data Analyst e Ingeniero de Inteligencia de Negocio con experiencia en SQL, Python y visualización analítica. Interpreto métricas para tomar decisiones comerciales fundamentadas.",
    context: "Analizo datasets, tablas o reportes de rendimiento y los traduzco a conclusiones comprensibles para directivos y fundadores sin tecnicismos innecesarios.",
    steps: "1) Limpio y organizo los datos proporcionados.\n2) Identifico anomalías, tendencias de crecimiento o patrones ocultos.\n3) Calculo métricas clave (ROI, CAC, LTV, tasas de conversión).\n4) Emito 3 recomendaciones estratégicas accionables basadas en la evidencia numérica.",
  },
  {
    emoji: "📱",
    name: "Social Media Manager",
    shortDesc: "Crea contenido y calendarios para redes sociales.",
    category: "marketing",
    role: "Soy un Social Media Manager experimentado con 10 años de trayectoria creando estrategias de contenido para marcas en Instagram, LinkedIn, TikTok, X (Twitter) y YouTube.",
    context: "Trabajo contigo para crear calendarios de contenido que generen engagement real, conviertan seguidores en clientes y amplifiquen tu mensaje de forma consistente.",
    steps: "1) Defino los pilares de contenido según tu audiencia (educativo, entretenimiento, ventas, prueba social).\n2) Creo un calendario editorial mensual con formatos optimizados por plataforma.\n3) Redacto copys con ganchos potentes (primeras 5 palabras críticas) y hashtags relevantes.\n4) Sugiero ideas visuales y mejores horarios de publicación.",
  },
  {
    emoji: "🎧",
    name: "Atención al Cliente",
    shortDesc: "Resuelve consultas de clientes con empatía y eficiencia.",
    category: "soporte",
    role: "Soy un Especialista en Experiencia de Cliente (Customer Success) y resolución de incidencias, entrenado para responder con empatía, rapidez y precisión técnica.",
    context: "Gestiono quejas, dudas sobre facturación o preguntas de soporte técnico para transformar clientes frustrados en embajadores de marca leales.",
    steps: "1) Valido el problema del cliente con empatía y disculpas cuando proceda.\n2) Explico la solución paso a paso de forma cristalina.\n3) Ofrezco alternativas o compensaciones si hubo un error del servicio.\n4) Dejo la puerta abierta para seguimiento con una despedida cálida.",
  },
  {
    emoji: "👔",
    name: "Reclutador de RRHH",
    shortDesc: "Crea ofertas de empleo y evalúa candidatos.",
    category: "productividad",
    role: "Soy un Talent Acquisition Partner y Consultor de Recursos Humanos especializado en reclutamiento tecnológico y evaluación de perfiles por competencias.",
    context: "Diseño ofertas de trabajo atractivas, guías de entrevista estructuradas y rúbricas de evaluación objetivas.",
    steps: "1) Redacto ofertas de trabajo que destaquen cultura, beneficios y requisitos clave sin jerga hueca.\n2) Formulo preguntas de entrevista conductuales (metodología STAR).\n3) Elaboro una matriz de puntuación para evaluar habilidades blandas y técnicas.\n4) Redacto correos de feedback constructivo para candidatos.",
  },
];

export function CreatorAgentForm() {
  const navigate = useNavigate();
  const createAgent = useCreateAgent();

  const [activeTab, setActiveTab] = useState("creador");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Campos estructurados de creación
  const [role, setRole] = useState(QUICK_TEMPLATES[5].role);
  const [context, setContext] = useState(QUICK_TEMPLATES[5].context);
  const [steps, setSteps] = useState(QUICK_TEMPLATES[5].steps);

  const [name, setName] = useState(QUICK_TEMPLATES[5].name);
  const [slug, setSlug] = useState("social-media-manager-pro");
  const [tagline, setTagline] = useState(QUICK_TEMPLATES[5].shortDesc);
  const [description, setDescription] = useState(QUICK_TEMPLATES[5].role.substring(0, 160) + "...");
  const [category, setCategory] = useState<AgentCategory>("marketing");
  const [copied, setCopied] = useState(false);

  const [inputs, setInputs] = useState<AgentInput[]>([
    { name: "marca_o_tema", label: "Marca o Tema principal", type: "text", placeholder: "ej: ApliArte / Agencia de Marketing" },
    { name: "publico_objetivo", label: "Público objetivo", type: "text", placeholder: "ej: Emprendedores y Desarrolladores" },
  ]);

  const handleSelectTemplate = (tpl: QuickTemplate) => {
    setSelectedTemplate(tpl.name);
    setName(tpl.name);
    setSlug(tpl.name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-"));
    setTagline(tpl.shortDesc);
    setCategory(tpl.category);
    setRole(tpl.role);
    setContext(tpl.context);
    setSteps(tpl.steps);
    setDescription(`${tpl.shortDesc} ${tpl.context.substring(0, 100)}...`);
  };

  const handleReset = () => {
    setSelectedTemplate(null);
    setName("");
    setSlug("");
    setTagline("");
    setDescription("");
    setRole("");
    setContext("");
    setSteps("");
  };

  // Generación dinámica del System Prompt
  const compiledSystemPrompt = `# ROL
${role}

# CONTEXTO
${context}

# PASOS A SEGUIR
${steps}

# NOTAS DE CALIDAD
- Mantén un tono profesional, directo y orientado a resultados.
- Nunca generes respuestas genéricas; adapta cada entrega a las variables proporcionadas por el usuario.`;

  const compiledUserPrompt = `Por favor genera la entrega con las siguientes especificaciones:

${inputs.map((inp) => `- ${inp.label}: {{${inp.name}}}`).join("\n")}

Aplica todos los pasos y directrices definidos en tu rol.`;

  const handleCopySystemPrompt = async () => {
    await navigator.clipboard.writeText(compiledSystemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToCatalog = async () => {
    if (!name || !slug) return;

    await createAgent.mutateAsync({
      name: name.startsWith("🤖") ? name : `🤖 ${name}`,
      slug: slug.toLowerCase().trim(),
      tagline: tagline || "Prompt personalizado de la comunidad",
      description: description || compiledSystemPrompt.substring(0, 160),
      category,
      systemPrompt: compiledSystemPrompt,
      userPromptTemplate: compiledUserPrompt,
      exampleOutput: "Ejemplo de salida generado exitosamente.",
      recommendedModels: ["Claude 3.7 Sonnet", "DeepSeek-R1", "GPT-4o", "Gemini 2.0"],
      tags: [category, "comunidad", "apliarte-taller"],
      author: "Creado en el Taller ApliArte",
      inputs,
      rating: 5.0,
      runs: 1,
      tools: ["DeepSeek", "Claude", "Gemini", "GPT-4o"],
    });

    navigate(`/agentes/${slug}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Encabezado del Taller */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/agentes"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al catálogo
          </Link>
          <Badge variant="outline" className="text-xs text-primary border-primary/30 font-semibold">
            🎓 Taller Interactivo de Prompts ApliArte
          </Badge>
        </div>

        {/* Pestañas de la experiencia completa */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto h-11 bg-muted/60 p-1 rounded-full">
            <TabsTrigger value="fundamentos" className="rounded-full text-xs font-bold gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Fundamentos
            </TabsTrigger>
            <TabsTrigger value="antes-despues" className="rounded-full text-xs font-bold gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Antes vs Después
            </TabsTrigger>
            <TabsTrigger value="creador" className="rounded-full text-xs font-bold gap-1.5">
              <Bot className="h-3.5 w-3.5 text-primary" /> Crea tu Agente
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: FUNDAMENTOS */}
          <TabsContent value="fundamentos" className="space-y-6">
            <Card className="border-border bg-card/60 p-6 sm:p-8 rounded-3xl shadow-sm">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-2xl font-black">🎯 La Fórmula Maestra de un Prompt de IA</CardTitle>
                <CardDescription className="text-sm">
                  Un buen System Prompt no es pedirle "hazme un texto". Es estructurar la mente de la IA con 3 pilares:
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-2">
                    <span className="font-black text-primary text-sm flex items-center gap-1.5">
                      <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">1</span>
                      # ROL (Identidad)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Quién es la IA. Cuántos años de experiencia tiene, en qué empresas ha trabajado y cuál es su estándar ético o técnico.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-2">
                    <span className="font-black text-blue-500 text-sm flex items-center gap-1.5">
                      <span className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">2</span>
                      # CONTEXTO (Entorno)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      Con quién trabaja, qué problemas resuelve y qué limitaciones tiene la marca, el proyecto o la audiencia.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
                    <span className="font-black text-emerald-500 text-sm flex items-center gap-1.5">
                      <span className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">3</span>
                      # PASOS A SEGUIR (Flujo)
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      La secuencia algorítmica exacta: qué analiza primero, cómo estructura el borrador y qué validaciones ejecuta antes de responder.
                    </p>
                  </div>
                </div>

                <div className="pt-4 text-center">
                  <Button onClick={() => setActiveTab("creador")} className="rounded-full px-6 gap-2 text-xs font-bold">
                    Ir al Creador de Agentes <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: ANTES VS DESPUÉS */}
          <TabsContent value="antes-despues" className="space-y-6">
            <Card className="border-border bg-card/60 p-6 sm:p-8 rounded-3xl shadow-sm">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-2xl font-black">🔄 Transformación: Prompt Pobre vs Prompt de Fábrica</CardTitle>
                <CardDescription className="text-sm">
                  Mira la diferencia radical entre un prompt genérico y una estructura profesional de ApliArte.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ANTES */}
                  <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5 space-y-3">
                    <Badge variant="outline" className="text-rose-600 dark:text-rose-400 border-rose-500/30 font-bold">
                      ❌ Prompt Genérico (Resultado Pobre)
                    </Badge>
                    <div className="font-mono text-xs bg-background/80 p-3.5 rounded-xl border border-border text-muted-foreground">
                      "Escribe un post de LinkedIn sobre IA para mi empresa."
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1.5">
                      <li>• Respuestas genéricas llenas de clichés ("En el mundo acelerado de hoy...").</li>
                      <li>• Cero diferenciación de marca ni conocimiento de tu audiencia.</li>
                      <li>• Sin call-to-actions ni estructura de enganche.</li>
                    </ul>
                  </div>

                  {/* DESPUÉS */}
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-3">
                    <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold">
                      ✅ Prompt de Fábrica ApliArte (Alta Precisión)
                    </Badge>
                    <div className="font-mono text-xs bg-background/80 p-3.5 rounded-xl border border-border text-foreground space-y-1">
                      <div><strong># ROL:</strong> Social Media Manager B2B especializado en tecnología.</div>
                      <div><strong># CONTEXTO:</strong> Audiencia de directores técnicos y fundadores.</div>
                      <div><strong># PASOS:</strong> 1) Hook en 5 palabras. 2) Problema real. 3) Lección práctica sin humo. 4) CTA de debate.</div>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1.5">
                      <li>• Tono asertivo y adaptado al sector B2B.</li>
                      <li>• Conversión y engagement real sin relleno.</li>
                      <li>• Listo para convertir en Gema de Gemini o Custom GPT.</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 text-center">
                  <Button onClick={() => setActiveTab("creador")} className="rounded-full px-6 gap-2 text-xs font-bold">
                    Probar el Creador Ahora <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: CREADOR DE AGENTES */}
          <TabsContent value="creador" className="space-y-8">
            {/* Selector de Plantillas Rápidas */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Plantillas Rápidas del Taller (Elige una para autocompletar)
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Empezar de cero
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {QUICK_TEMPLATES.map((tpl) => {
                  const isSelected = selectedTemplate === tpl.name || (!selectedTemplate && name === tpl.name);
                  return (
                    <button
                      key={tpl.name}
                      type="button"
                      onClick={() => handleSelectTemplate(tpl)}
                      className={`text-left p-3 rounded-2xl border transition-all text-xs space-y-1 ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-md ring-1 ring-primary"
                          : "border-border bg-card/60 hover:border-primary/40 hover:bg-card"
                      }`}
                    >
                      <span className="text-xl block">{tpl.emoji}</span>
                      <div className="font-bold text-foreground truncate">{tpl.name}</div>
                      <div className="text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                        {tpl.shortDesc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Formulario Estructurado: Rol + Contexto + Pasos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Columna Izquierda: Formulario (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <Card className="border-border bg-card shadow-sm rounded-3xl">
                  <CardHeader className="pb-3 border-b border-border/60">
                    <CardTitle className="text-lg font-bold">1. Estructura de la IA</CardTitle>
                    <CardDescription className="text-xs">
                      Define los 3 pilares del comportamiento del agente.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    {/* ROL */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold flex items-center gap-2 text-foreground">
                        <span className="h-5 w-5 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-black">
                          1
                        </span>
                        <span>ROL (Identidad y Experiencia)</span>
                      </label>
                      <Textarea
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        rows={3}
                        placeholder="Ej: Soy un Social Media Manager experimentado con 10 años de trayectoria..."
                        className="text-xs bg-background leading-relaxed"
                      />
                    </div>

                    {/* CONTEXTO */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold flex items-center gap-2 text-foreground">
                        <span className="h-5 w-5 rounded-md bg-blue-500 text-white flex items-center justify-center text-[10px] font-black">
                          2
                        </span>
                        <span>CONTEXTO (Entorno y Objetivo)</span>
                      </label>
                      <Textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        rows={3}
                        placeholder="Ej: Trabajo contigo para crear un calendario de contenido estratégico..."
                        className="text-xs bg-background leading-relaxed"
                      />
                    </div>

                    {/* PASOS A SEGUIR */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold flex items-center gap-2 text-foreground">
                        <span className="h-5 w-5 rounded-md bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">
                          3
                        </span>
                        <span>PASOS A SEGUIR (Instrucciones Algorítmicas)</span>
                      </label>
                      <Textarea
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        rows={4}
                        placeholder="1) Analizo tu marca... 2) Redacto copy con hooks potentes... 3) Sugiero métricas..."
                        className="text-xs bg-background leading-relaxed font-mono"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Metadatos del Agente */}
                <Card className="border-border bg-card shadow-sm rounded-3xl">
                  <CardHeader className="pb-3 border-b border-border/60">
                    <CardTitle className="text-lg font-bold">2. Datos de Publicación</CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Nombre del Agente</label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="ej: Social Media Manager Pro"
                          className="text-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold">Slug URL</label>
                        <Input
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          placeholder="ej: social-media-manager-pro"
                          className="text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold">Categoría</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as AgentCategory)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs outline-none"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Columna Derecha: Vista Previa del System Prompt Compilado (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <Card className="border-border shadow-md rounded-3xl sticky top-24 bg-card/90 backdrop-blur-md">
                  <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-bold flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-amber-500" /> System Prompt Listo
                      </CardTitle>
                      <CardDescription className="text-[11px]">
                        Compilación en vivo de tu agente
                      </CardDescription>
                    </div>
                    <Button
                      onClick={handleCopySystemPrompt}
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs gap-1 rounded-full"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      {copied ? "¡Copiado!" : "Copiar"}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <pre className="font-mono text-[11px] bg-muted/60 p-3.5 rounded-2xl overflow-x-auto max-h-[380px] whitespace-pre-wrap leading-relaxed border border-border/60">
                      {compiledSystemPrompt}
                    </pre>

                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-2xl text-[11px] text-muted-foreground leading-relaxed">
                      💡 <strong>¿Dónde usarlo?</strong> Cópialo y pégalo directamente en <strong>Gemini (Gemas)</strong>, <strong>ChatGPT (Custom GPTs)</strong> o <strong>Claude Projects</strong>.
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t border-border/60 flex flex-col gap-2">
                    <Button
                      onClick={handleSaveToCatalog}
                      disabled={!name || !slug}
                      className="w-full gap-2 text-xs font-bold h-10 rounded-full shadow-md"
                    >
                      <Plus className="h-4 w-4" /> Guardar en mi Catálogo Local
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <SiteFooter />
    </div>
  );
}

export default CreatorAgentForm;
