import type { Agent, AgentCategory, Execution, AIProviderId } from "@/types";

export type AgentDraft = Omit<Agent, "id" | "runs" | "rating" | "createdAt" | "updatedAt">;

export interface AgentsService {
  list(filters?: { category?: AgentCategory | null; search?: string }): Promise<Agent[]>;
  getBySlug(slug: string): Promise<Agent | null>;
  getById(id: string): Promise<Agent | null>;
  create(draft: AgentDraft): Promise<Agent>;
  update(id: string, draft: Partial<AgentDraft>): Promise<Agent>;
  delete(id: string): Promise<void>;
}

export interface ExecutionsService {
  create(params: {
    agent: Agent;
    inputs: Record<string, string>;
    providerId?: AIProviderId;
    model?: string;
  }): Promise<Execution>;
  list(): Promise<Execution[]>;
  getById(id: string): Promise<Execution | null>;
  clear(): Promise<void>;
}
