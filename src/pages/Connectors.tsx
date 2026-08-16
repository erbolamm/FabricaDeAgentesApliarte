import { useState } from "react";
import { AI_PROVIDERS, aiConnectorsService } from "@/services";
import type { AIProvider, AIProviderId, AIConnection } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Key,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Trash2,
  Play,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

export function Connectors() {
  const [connections, setConnections] = useState<Record<string, AIConnection>>(() => {
    const list = aiConnectorsService.getConnections();
    const map: Record<string, AIConnection> = {};
    list.forEach((c) => {
      map[c.providerId] = c;
    });
    return map;
  });

  const [inputKeys, setInputKeys] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [selectedModels, setSelectedModels] = useState<Record<string, string>>({});
  const [testingProvider, setTestingProvider] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { ok: boolean; msg: string }>>({});
  const [defaultProvider, setDefaultProvider] = useState<AIProviderId | null>(() =>
    aiConnectorsService.getDefaultProviderId(),
  );

  const handleSave = async (provider: AIProvider) => {
    const key = inputKeys[provider.id]?.trim() || connections[provider.id]?.apiKey;
    if (!key && !provider.isLocal) {
      setTestResults((prev) => ({
        ...prev,
        [provider.id]: { ok: false, msg: "Ingresa una API key válida." },
      }));
      return;
    }

    const model = selectedModels[provider.id] || provider.defaultModel;
    setTestingProvider(provider.id);

    try {
      // Guardar conexión localmente
      const conn = aiConnectorsService.saveConnection(
        provider.id,
        key || "local",
        model,
        provider.isLocal ? inputKeys[provider.id] || "http://localhost:11434" : undefined,
      );

      // Prueba rápida de salud
      const ping = await aiConnectorsService.executePrompt({
        systemPrompt: "Responde solo 'OK' en una palabra.",
        userPrompt: "Ping",
        providerId: provider.id,
        model,
      });

      setConnections((prev) => ({ ...prev, [provider.id]: conn }));
      setTestResults((prev) => ({
        ...prev,
        [provider.id]: {
          ok: true,
          msg: `¡Conexión exitosa con ${model}! (${ping.text.slice(0, 30)}...)`,
        },
      }));
      setDefaultProvider(aiConnectorsService.getDefaultProviderId());
    } catch (err: unknown) {
      setTestResults((prev) => ({
        ...prev,
        [provider.id]: {
          ok: false,
          msg: err instanceof Error ? err.message : "Error al conectar con la API",
        },
      }));
    } finally {
      setTestingProvider(null);
    }
  };

  const handleDisconnect = (providerId: AIProviderId) => {
    aiConnectorsService.removeConnection(providerId);
    setConnections((prev) => {
      const next = { ...prev };
      delete next[providerId];
      return next;
    });
    setInputKeys((prev) => ({ ...prev, [providerId]: "" }));
    setTestResults((prev) => {
      const next = { ...prev };
      delete next[providerId];
      return next;
    });
    setDefaultProvider(aiConnectorsService.getDefaultProviderId());
  };

  const handleSetDefault = (providerId: AIProviderId) => {
    aiConnectorsService.setDefaultProviderId(providerId);
    setDefaultProvider(providerId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Banner Superior */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            <Zap className="h-3.5 w-3.5" />
            <span>Bring Your Own Key (BYOK) — Tu y tu propia IA</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Conectores de Inteligencia Artificial
          </h1>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
            Conecta tus propias claves de DeepSeek, Claude, OpenAI, Gemini, Groq u Ollama.
            Tus prompts se ejecutarán directamente desde tu navegador sin intermediarios.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground bg-card/60 border border-border/80 rounded-xl p-3 max-w-xl mx-auto">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>
              <strong>100% Seguro y Privado:</strong> Tus API keys nunca salen de tu dispositivo. Se
              guardan únicamente en el <code>localStorage</code> de tu navegador.
            </span>
          </div>
        </div>

        {/* Grid de Proveedores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AI_PROVIDERS.map((provider) => {
            const isConnected = !!connections[provider.id];
            const isDefault = defaultProvider === provider.id;
            const currentModel =
              selectedModels[provider.id] ||
              connections[provider.id]?.selectedModel ||
              provider.defaultModel;
            const isTesting = testingProvider === provider.id;
            const result = testResults[provider.id];

            return (
              <Card
                key={provider.id}
                className={`transition-all border ${
                  isConnected
                    ? "border-primary/40 shadow-sm bg-card/90"
                    : "border-border/70 bg-card/40 opacity-90 hover:opacity-100"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-xl shadow-inner"
                        style={{ backgroundColor: `${provider.color}20` }}
                      >
                        {provider.emoji}
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {provider.name}
                          {isConnected && (
                            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 gap-1 text-[11px] font-medium py-0">
                              <CheckCircle2 className="h-3 w-3" /> Conectado
                            </Badge>
                          )}
                          {isDefault && (
                            <Badge className="bg-primary text-primary-foreground text-[10px] py-0">
                              ⭐ Predeterminado
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-xs line-clamp-1">
                          {provider.description}
                        </CardDescription>
                      </div>
                    </div>

                    <a
                      href={provider.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
                      title="Obtener API Key en la consola oficial"
                    >
                      <span>Obtener Key</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 text-sm">
                  {/* Selector de Modelo */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                      Modelo recomendado:
                    </label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      value={currentModel}
                      onChange={(e) =>
                        setSelectedModels((prev) => ({ ...prev, [provider.id]: e.target.value }))
                      }
                    >
                      {provider.models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} {m.recommended ? "★" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Input de API Key / URL */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                      {provider.isLocal ? "URL del servidor Ollama:" : `API Key (${provider.envKeyName}):`}
                    </label>
                    <div className="relative flex items-center">
                      <Input
                        type={showKeys[provider.id] ? "text" : "password"}
                        placeholder={
                          isConnected
                            ? "••••••••••••••••••••••••••••"
                            : provider.isLocal
                            ? "http://localhost:11434"
                            : `Pega tu ${provider.envKeyName}...`
                        }
                        value={inputKeys[provider.id] || ""}
                        onChange={(e) =>
                          setInputKeys((prev) => ({ ...prev, [provider.id]: e.target.value }))
                        }
                        className="pr-10 text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowKeys((prev) => ({ ...prev, [provider.id]: !prev[provider.id] }))
                        }
                        className="absolute right-2.5 text-muted-foreground hover:text-foreground"
                      >
                        {showKeys[provider.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mensaje de feedback / test */}
                  {result && (
                    <div
                      className={`text-xs rounded-md p-2 border ${
                        result.ok
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          : "bg-destructive/10 border-destructive/20 text-destructive"
                      }`}
                    >
                      {result.msg}
                    </div>
                  )}

                  {/* Botonera */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSave(provider)}
                        disabled={isTesting}
                        className="text-xs gap-1.5 h-8"
                      >
                        {isTesting ? (
                          <Sparkles className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Play className="h-3.5 w-3.5" />
                        )}
                        {isConnected ? "Actualizar y Probar" : "Conectar"}
                      </Button>

                      {isConnected && !isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(provider.id)}
                          className="text-xs h-8"
                        >
                          Usar por Defecto
                        </Button>
                      )}
                    </div>

                    {isConnected && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDisconnect(provider.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        title="Desconectar y borrar clave"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
