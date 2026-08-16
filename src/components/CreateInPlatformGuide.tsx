import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, ExternalLink, Sparkles, HelpCircle } from "lucide-react";

interface CreateInPlatformGuideProps {
  agentName: string;
  systemPrompt: string;
  tagline?: string;
}

export function CreateInPlatformGuide({
  agentName,
  systemPrompt,
  tagline,
}: CreateInPlatformGuideProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Guía de Creación Paso a Paso</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Cómo crear este Agente en tu IA favorita
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Copia el System Prompt y configúralo como un asistente persistente en minutos.
          </p>
        </div>

        <Button
          onClick={handleCopy}
          size="sm"
          className="gap-1.5 text-xs bg-primary text-primary-foreground shrink-0 shadow-sm"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "¡System Prompt Copiado!" : "Copiar System Prompt"}
        </Button>
      </div>

      <Tabs defaultValue="gemini" className="w-full">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 h-auto p-1 bg-muted/60 gap-1 rounded-xl">
          <TabsTrigger value="gemini" className="text-xs py-2 data-[state=active]:bg-background">
            💎 Gemini (Gema)
          </TabsTrigger>
          <TabsTrigger value="gpt" className="text-xs py-2 data-[state=active]:bg-background">
            🤖 Custom GPT
          </TabsTrigger>
          <TabsTrigger value="claude" className="text-xs py-2 data-[state=active]:bg-background">
            🎭 Claude Project
          </TabsTrigger>
          <TabsTrigger value="mistral" className="text-xs py-2 data-[state=active]:bg-background">
            🌪️ Mistral Agent
          </TabsTrigger>
          <TabsTrigger value="deepseek" className="text-xs py-2 data-[state=active]:bg-background">
            🐋 DeepSeek
          </TabsTrigger>
          <TabsTrigger value="kimi" className="text-xs py-2 data-[state=active]:bg-background">
            🌙 Kimi / MiniMax
          </TabsTrigger>
        </TabsList>

        {/* 1. GOOGLE GEMINI (GEMAS) */}
        <TabsContent value="gemini" className="space-y-4 pt-4 text-xs">
          <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                💎 Crear como una "Gema" en Google Gemini
              </span>
              <a
                href="https://gemini.google.com/gems"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Abrir Gemini Gems <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Las <strong>Gemas (Gems)</strong> son los agentes personalizados de Google Gemini. Al
              crear una Gema, Gemini siempre recordará el rol, contexto y reglas de este prompt en
              todas las conversaciones.
            </p>
          </div>

          <ol className="list-decimal list-inside space-y-2.5 text-muted-foreground leading-relaxed pl-1">
            <li>
              Abre <strong className="text-foreground">Google Gemini</strong> y en la barra lateral izquierda haz clic en <strong className="text-foreground">"Administrador de Gemas"</strong> (o "Gems").
            </li>
            <li>
              Haz clic en el botón <strong className="text-foreground">"+ Nueva Gema"</strong>.
            </li>
            <li>
              En el campo <strong className="text-foreground">Nombre</strong>, escribe: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-semibold">{agentName}</code>.
            </li>
            <li>
              En el campo <strong className="text-foreground">Instrucciones</strong>, pega el <strong>System Prompt</strong> copiado.
            </li>
            <li>
              (Opcional) Elige un icono o emoji representativo y guarda haciendo clic en <strong className="text-foreground">"Crear"</strong>.
            </li>
          </ol>
        </TabsContent>

        {/* 2. CHATGPT (CUSTOM GPTS) */}
        <TabsContent value="gpt" className="space-y-4 pt-4 text-xs">
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                🤖 Crear como un "Custom GPT" en ChatGPT
              </span>
              <a
                href="https://chatgpt.com/gpts/editor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
              >
                Editor de GPTs <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Un <strong>Custom GPT</strong> adapta el modelo GPT-4o con instrucciones persistentes
              y capacidades a medida para tareas repetitivas.
            </p>
          </div>

          <ol className="list-decimal list-inside space-y-2.5 text-muted-foreground leading-relaxed pl-1">
            <li>
              Ve a <strong className="text-foreground">ChatGPT</strong> ➔ <strong className="text-foreground">Explore GPTs</strong> ➔ Haz clic en <strong className="text-foreground">"+ Create"</strong> (arriba a la derecha).
            </li>
            <li>
              Cambia a la pestaña <strong className="text-foreground">"Configure"</strong>.
            </li>
            <li>
              Escribe el nombre: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-semibold">{agentName}</code>.
            </li>
            <li>
              En el cuadro <strong className="text-foreground">"Instructions"</strong>, pega todo el <strong>System Prompt</strong>.
            </li>
            <li>
              Guarda en la esquina superior derecha como <strong className="text-foreground">"Only me"</strong> (Privado) o <strong className="text-foreground">"Anyone with a link"</strong> para compartirlo.
            </li>
          </ol>
        </TabsContent>

        {/* 3. ANTHROPIC CLAUDE (PROJECTS) */}
        <TabsContent value="claude" className="space-y-4 pt-4 text-xs">
          <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">
                🎭 Crear en Claude Projects (Anthropic)
              </span>
              <a
                href="https://claude.ai/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline font-semibold"
              >
                Abrir Claude Projects <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Los <strong>Projects de Claude</strong> permiten fijar directivas de razonamiento
              profundo para <strong>Claude 3.7 Sonnet</strong>.
            </p>
          </div>

          <ol className="list-decimal list-inside space-y-2.5 text-muted-foreground leading-relaxed pl-1">
            <li>
              Abre <strong className="text-foreground">Claude.ai</strong> y haz clic en <strong className="text-foreground">"Projects"</strong> en la barra lateral.
            </li>
            <li>
              Haz clic en <strong className="text-foreground">"+ New Project"</strong> y nómbralo <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-semibold">{agentName}</code>.
            </li>
            <li>
              En la sección lateral derecha, haz clic en <strong className="text-foreground">"Set Project Instructions"</strong>.
            </li>
            <li>
              Pega el <strong>System Prompt</strong> completo y guarda.
            </li>
          </ol>
        </TabsContent>

        {/* 4. MISTRAL AI (LE CHAT AGENTS) */}
        <TabsContent value="mistral" className="space-y-4 pt-4 text-xs">
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">
                🌪️ Crear como un "Agent" en Mistral Le Chat
              </span>
              <a
                href="https://chat.mistral.ai/agents"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline font-semibold"
              >
                Abrir Mistral Agents <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Mistral Le Chat permite crear agentes basados en <strong>Mistral Large 2</strong> o <strong>Pixtral</strong> con instrucciones de sistema personalizadas.
            </p>
          </div>

          <ol className="list-decimal list-inside space-y-2.5 text-muted-foreground leading-relaxed pl-1">
            <li>
              Entra en <strong className="text-foreground">chat.mistral.ai</strong> y haz clic en <strong className="text-foreground">"Agents"</strong>.
            </li>
            <li>
              Haz clic en <strong className="text-foreground">"Create an Agent"</strong>.
            </li>
            <li>
              Introduce el nombre: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-semibold">{agentName}</code>.
            </li>
            <li>
              En <strong className="text-foreground">"System Prompt / Instructions"</strong>, pega las instrucciones.
            </li>
            <li>
              Haz clic en <strong className="text-foreground">"Publish"</strong> o <strong className="text-foreground">"Save"</strong>.
            </li>
          </ol>
        </TabsContent>

        {/* 5. DEEPSEEK */}
        <TabsContent value="deepseek" className="space-y-4 pt-4 text-xs">
          <div className="rounded-xl bg-sky-500/10 border border-sky-500/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-600 dark:text-sky-400 text-sm">
                🐋 Configurar en DeepSeek Chat / Reasoner (R1)
              </span>
              <a
                href="https://chat.deepseek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline font-semibold"
              >
                Abrir DeepSeek Chat <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Para <strong>DeepSeek-R1</strong> y <strong>DeepSeek-V3</strong>, el modelo alcanza
              su máxima precisión cuando se le proporciona el `#ROL`, `#CONTEXTO` y `#PASOS A SEGUIR`
              en el inicio de la sesión.
            </p>
          </div>

          <ol className="list-decimal list-inside space-y-2.5 text-muted-foreground leading-relaxed pl-1">
            <li>Abre un nuevo chat en <strong className="text-foreground">chat.deepseek.com</strong> (activa <em>DeepThink R1</em> si necesitas razonamiento paso a paso).</li>
            <li>En tu primer mensaje, envía el <strong>System Prompt</strong> copiado precedido de: <code>"A partir de ahora actúa bajo estas instrucciones:"</code>.</li>
            <li>A continuación, envía los datos de tu caso específico (las variables rellenadas).</li>
          </ol>
        </TabsContent>

        {/* 6. KIMI / MINIMAX / OTROS */}
        <TabsContent value="kimi" className="space-y-4 pt-4 text-xs">
          <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-orange-600 dark:text-orange-400 text-sm">
                🌙 Kimi AI, MiniMax, Qwen y otros LLMs
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Todos los modelos avanzados siguen el mismo estándar estructurado:
              <strong> Rol ➔ Contexto ➔ Pasos ➔ Reglas ➔ Tarea</strong>.
            </p>
          </div>

          <ol className="list-decimal list-inside space-y-2.5 text-muted-foreground leading-relaxed pl-1">
            <li>
              <strong>Kimi (Moonshot AI)</strong>: En Kimi Chat, pega el System Prompt al inicio. Gracias a su ventana de contexto de 2M tokens, el modelo retendrá estas reglas sin degradación durante toda la sesión.
            </li>
            <li>
              <strong>MiniMax (abab6) / Qwen (Alibaba)</strong>: En la configuración de sistema o mensaje inicial, define el `#ROL` y los `#PASOS A SEGUIR`.
            </li>
            <li>
              <strong>Cursor / Windsurf / Copilot</strong>: Agrega este System Prompt en tu archivo <code>.cursorrules</code> o <code>AGENTS.md</code> para que actúe como tu copiloto permanente.
            </li>
          </ol>
        </TabsContent>
      </Tabs>
    </div>
  );
}
