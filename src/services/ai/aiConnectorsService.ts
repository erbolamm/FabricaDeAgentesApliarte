import type { AIProvider, AIProviderId, AIConnection } from "@/types";

const STORAGE_KEY_CONNECTIONS = "crafty_ai_connections_v1";
const STORAGE_KEY_DEFAULT_PROVIDER = "crafty_ai_default_provider_v1";

export const AI_PROVIDERS: AIProvider[] = [
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "API Oficial — DeepSeek-V3 & DeepSeek-R1 (Reasoning)",
    emoji: "🐋",
    color: "#0D6EFD",
    portalUrl: "https://platform.deepseek.com/api_keys",
    envKeyName: "DEEPSEEK_API_KEY",
    defaultModel: "deepseek-chat",
    supportsStreaming: true,
    models: [
      { id: "deepseek-chat", name: "DeepSeek-V3 (Chat General)", recommended: true },
      { id: "deepseek-reasoner", name: "DeepSeek-R1 (Razonamiento / CoT)" },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    description: "API Oficial — Claude 3.7 Sonnet (Thinking) & Claude 3.5 Haiku",
    emoji: "🤖",
    color: "#D97706",
    portalUrl: "https://console.anthropic.com/settings/keys",
    envKeyName: "ANTHROPIC_API_KEY",
    defaultModel: "claude-3-7-sonnet-20250219",
    supportsStreaming: true,
    models: [
      { id: "claude-3-7-sonnet-20250219", name: "Claude 3.7 Sonnet (Hybrid Thinking)", recommended: true },
      { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
      { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku (Ultra rápido)" },
    ],
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "API Oficial — Gemini 2.0 Flash / Pro & Multimodal (Free tier generoso)",
    emoji: "✨",
    color: "#4285F4",
    portalUrl: "https://aistudio.google.com/app/apikey",
    envKeyName: "GEMINI_API_KEY",
    defaultModel: "gemini-2.0-flash",
    supportsStreaming: true,
    models: [
      { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", recommended: true },
      { id: "gemini-2.0-pro-exp-02-05", name: "Gemini 2.0 Pro Experimental" },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
    ],
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "API Oficial — GPT-4o, GPT-4o-mini & o3-mini",
    emoji: "🧠",
    color: "#10B981",
    portalUrl: "https://platform.openai.com/api-keys",
    envKeyName: "OPENAI_API_KEY",
    defaultModel: "gpt-4o",
    supportsStreaming: true,
    models: [
      { id: "gpt-4o", name: "GPT-4o (Omni multimodal)", recommended: true },
      { id: "gpt-4o-mini", name: "GPT-4o Mini" },
      { id: "o3-mini", name: "o3-mini (Razonamiento)" },
    ],
  },
  {
    id: "groq",
    name: "Groq",
    description: "Inferencia LPU ultra-rápida (500+ tokens/seg) para Llama 3.3 y DeepSeek-R1",
    emoji: "⚡",
    color: "#F97316",
    portalUrl: "https://console.groq.com/keys",
    envKeyName: "GROQ_API_KEY",
    defaultModel: "llama-3.3-70b-versatile",
    supportsStreaming: true,
    models: [
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B Versatile", recommended: true },
      { id: "deepseek-r1-distill-llama-70b", name: "DeepSeek R1 Distill Llama 70B" },
      { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B Instant" },
    ],
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    description: "Gateway unificado a 200+ modelos con una sola API key y routing inteligente",
    emoji: "🌐",
    color: "#6366F1",
    portalUrl: "https://openrouter.ai/keys",
    envKeyName: "OPENROUTER_API_KEY",
    defaultModel: "deepseek/deepseek-r1",
    supportsStreaming: true,
    models: [
      { id: "deepseek/deepseek-r1", name: "DeepSeek R1 (OpenRouter)", recommended: true },
      { id: "anthropic/claude-3.7-sonnet", name: "Claude 3.7 Sonnet" },
      { id: "meta-llama/llama-3.3-70b-instruct", name: "Llama 3.3 70B" },
      { id: "google/gemini-2.0-flash-001", name: "Gemini 2.0 Flash" },
    ],
  },
  {
    id: "ollama",
    name: "Ollama (Local)",
    description: "100% privado y local en tu máquina (sin internet, sin costos de API)",
    emoji: "🦙",
    color: "#EC4899",
    portalUrl: "https://ollama.com",
    envKeyName: "OLLAMA_BASE_URL",
    defaultModel: "llama3.2",
    supportsStreaming: true,
    isLocal: true,
    models: [
      { id: "llama3.2", name: "Llama 3.2", recommended: true },
      { id: "deepseek-r1:8b", name: "DeepSeek R1 8B" },
      { id: "mistral", name: "Mistral 7B" },
      { id: "qwen2.5-coder", name: "Qwen 2.5 Coder" },
    ],
  },
];

class AIConnectorsService {
  private getStoredConnections(): Record<string, AIConnection> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CONNECTIONS);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private saveStoredConnections(conns: Record<string, AIConnection>) {
    localStorage.setItem(STORAGE_KEY_CONNECTIONS, JSON.stringify(conns));
  }

  getConnections(): AIConnection[] {
    return Object.values(this.getStoredConnections());
  }

  getConnection(providerId: AIProviderId): AIConnection | null {
    const conns = this.getStoredConnections();
    return conns[providerId] || null;
  }

  saveConnection(
    providerId: AIProviderId,
    apiKey: string,
    selectedModel?: string,
    baseUrl?: string,
  ): AIConnection {
    const provider = AI_PROVIDERS.find((p) => p.id === providerId);
    const model = selectedModel || provider?.defaultModel || "default";

    const connection: AIConnection = {
      providerId,
      apiKey: apiKey.trim(),
      selectedModel: model,
      baseUrl: baseUrl?.trim() || (providerId === "ollama" ? "http://localhost:11434" : undefined),
      connectedAt: new Date().toISOString(),
    };

    const conns = this.getStoredConnections();
    conns[providerId] = connection;
    this.saveStoredConnections(conns);

    if (!this.getDefaultProviderId()) {
      this.setDefaultProviderId(providerId);
    }

    return connection;
  }

  removeConnection(providerId: AIProviderId) {
    const conns = this.getStoredConnections();
    delete conns[providerId];
    this.saveStoredConnections(conns);

    if (this.getDefaultProviderId() === providerId) {
      const remaining = Object.keys(conns);
      if (remaining.length > 0) {
        this.setDefaultProviderId(remaining[0] as AIProviderId);
      } else {
        localStorage.removeItem(STORAGE_KEY_DEFAULT_PROVIDER);
      }
    }
  }

  getDefaultProviderId(): AIProviderId | null {
    const saved = localStorage.getItem(STORAGE_KEY_DEFAULT_PROVIDER) as AIProviderId | null;
    if (saved && this.getConnection(saved)) return saved;
    const conns = this.getConnections();
    return conns.length > 0 ? conns[0].providerId : null;
  }

  setDefaultProviderId(providerId: AIProviderId) {
    localStorage.setItem(STORAGE_KEY_DEFAULT_PROVIDER, providerId);
  }

  // ─── Ejecución del Prompt contra la API del Proveedor ───────────

  async executePrompt(params: {
    systemPrompt: string;
    userPrompt: string;
    providerId?: AIProviderId;
    model?: string;
  }): Promise<{ text: string; providerId: AIProviderId; model: string }> {
    const targetProviderId = params.providerId || this.getDefaultProviderId();

    if (!targetProviderId) {
      throw new Error(
        "No tienes ningún conector de IA configurado. Ve a la pestaña 'Conectores IA' y agrega tu API key de DeepSeek, Gemini, OpenAI, Claude o Groq para ejecutar prompts.",
      );
    }

    const conn = this.getConnection(targetProviderId);
    if (!conn) {
      throw new Error(`No se encontró configuración activa para el proveedor: ${targetProviderId}`);
    }

    const provider = AI_PROVIDERS.find((p) => p.id === targetProviderId);
    const model = params.model || conn.selectedModel || provider?.defaultModel || "";

    switch (targetProviderId) {
      case "deepseek":
        return this.executeOpenAICompatible(
          "https://api.deepseek.com/chat/completions",
          conn.apiKey,
          model,
          params.systemPrompt,
          params.userPrompt,
          "deepseek",
        );

      case "openai":
        return this.executeOpenAICompatible(
          "https://api.openai.com/v1/chat/completions",
          conn.apiKey,
          model,
          params.systemPrompt,
          params.userPrompt,
          "openai",
        );

      case "groq":
        return this.executeOpenAICompatible(
          "https://api.groq.com/openai/v1/chat/completions",
          conn.apiKey,
          model,
          params.systemPrompt,
          params.userPrompt,
          "groq",
        );

      case "openrouter":
        return this.executeOpenAICompatible(
          "https://openrouter.ai/api/v1/chat/completions",
          conn.apiKey,
          model,
          params.systemPrompt,
          params.userPrompt,
          "openrouter",
          {
            "HTTP-Referer": window.location.origin,
            "X-Title": "Crafty Bots",
          },
        );

      case "gemini":
        return this.executeGemini(conn.apiKey, model, params.systemPrompt, params.userPrompt);

      case "anthropic":
        return this.executeAnthropic(conn.apiKey, model, params.systemPrompt, params.userPrompt);

      case "ollama":
        return this.executeOllama(
          conn.baseUrl || "http://localhost:11434",
          model,
          params.systemPrompt,
          params.userPrompt,
        );

      default:
        throw new Error(`Proveedor no soportado: ${targetProviderId}`);
    }
  }

  // ─── Ejecutores específicos ───────────────────────────────────

  private async executeOpenAICompatible(
    url: string,
    apiKey: string,
    model: string,
    systemPrompt: string,
    userPrompt: string,
    providerId: AIProviderId,
    extraHeaders: Record<string, string> = {},
  ) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        ...extraHeaders,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Error API (${providerId} - ${res.status}): ${err}`);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "Sin respuesta recibida del modelo.";
    return { text, providerId, model };
  }

  private async executeGemini(
    apiKey: string,
    model: string,
    systemPrompt: string,
    userPrompt: string,
  ) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: { temperature: 0.7 },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Error Google Gemini (${res.status}): ${err}`);
    }

    const data = await res.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta generada por Gemini.";
    return { text, providerId: "gemini" as AIProviderId, model };
  }

  private async executeAnthropic(
    apiKey: string,
    model: string,
    systemPrompt: string,
    userPrompt: string,
  ) {
    const url = "https://api.anthropic.com/v1/messages";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "dangerously-allow-browser": "true",
      },
      body: JSON.stringify({
        model,
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Error Anthropic (${res.status}): ${err}`);
    }

    const data = await res.json();
    const text =
      data.content?.map((c: { text?: string }) => c.text).filter(Boolean).join("\n") ||
      "Sin respuesta recibida de Claude.";
    return { text, providerId: "anthropic" as AIProviderId, model };
  }

  private async executeOllama(
    baseUrl: string,
    model: string,
    systemPrompt: string,
    userPrompt: string,
  ) {
    const url = `${baseUrl.replace(/\/$/, "")}/api/chat`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        stream: false,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Error Ollama Local (${res.status}): ${err}`);
    }

    const data = await res.json();
    const text = data.message?.content || "Sin respuesta recibida de Ollama.";
    return { text, providerId: "ollama" as AIProviderId, model };
  }
}

export const aiConnectorsService = new AIConnectorsService();
