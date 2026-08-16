// Tipos principales para Crafty Bots (Fábrica de Agentes Open Source)

export type AgentCategory =
  | "productividad"
  | "marketing"
  | "ventas"
  | "desarrollo"
  | "soporte"
  | "analisis"
  | "creativo";

export type AgentInputType = "text" | "textarea" | "url" | "select";

export interface AgentInput {
  name: string;
  label: string;
  type: AgentInputType;
  placeholder?: string;
  defaultValue?: string;
  options?: string[]; // para tipo select
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: AgentCategory;
  systemPrompt: string;
  userPromptTemplate: string; // Plantilla con {{variables}}
  exampleOutput: string;
  recommendedModels: string[];
  author: string;
  authorGithub?: string;
  tools: string[];
  tags: string[];
  inputs: AgentInput[];
  rating: number;
  runs: number;
  isCustom?: boolean; // Creado localmente por el usuario
  createdAt?: string;
  updatedAt?: string;
}

// ─── Conectores IA (BYOK) ───────────────────────────────────────

export type AIProviderId =
  | "deepseek"
  | "anthropic"
  | "openai"
  | "gemini"
  | "groq"
  | "minimax"
  | "openrouter"
  | "ollama";

export interface AIProviderModel {
  id: string;
  name: string;
  recommended?: boolean;
}

export interface AIProvider {
  id: AIProviderId;
  name: string;
  description: string;
  emoji: string;
  color: string;
  portalUrl: string;
  envKeyName: string;
  defaultModel: string;
  models: AIProviderModel[];
  supportsStreaming: boolean;
  isLocal?: boolean;
}

export interface AIConnection {
  providerId: AIProviderId;
  apiKey: string;
  baseUrl?: string;
  selectedModel: string;
  connectedAt: string;
}

// ─── Ejecuciones e Historial ───────────────────────────────────

export type ExecutionStatus = "pending" | "running" | "completed" | "failed";

export interface Execution {
  id: string;
  agentId: string;
  agentName: string;
  providerId?: AIProviderId;
  modelUsed?: string;
  status: ExecutionStatus;
  inputs: Record<string, string>;
  renderedPrompt: string;
  output?: string;
  error?: string;
  createdAt: string; // ISO
}

// ─── Apoyo y Monetización ──────────────────────────────────────

export interface SupportTier {
  id: string;
  title: string;
  emoji: string;
  price: string;
  period: string;
  description: string;
  benefits: string[];
  popular?: boolean;
  revenueCatPackageId?: string;
  githubSponsorUrl?: string;
  coffeeUrl?: string;
}
