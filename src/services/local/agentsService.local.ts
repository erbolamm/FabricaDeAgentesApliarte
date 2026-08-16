import { AGENTS } from "@/data/agents";
import type { Agent, AgentCategory } from "@/types";
import type { AgentsService } from "../types";

const CUSTOM_AGENTS_STORAGE_KEY = "crafty_custom_agents_v1";

class LocalAgentsService implements AgentsService {
  private getCustomAgents(): Agent[] {
    try {
      const raw = localStorage.getItem(CUSTOM_AGENTS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveCustomAgents(agents: Agent[]) {
    localStorage.setItem(CUSTOM_AGENTS_STORAGE_KEY, JSON.stringify(agents));
  }

  async list(filters?: { category?: AgentCategory; search?: string }): Promise<Agent[]> {
    const custom = this.getCustomAgents();
    let all = [...AGENTS, ...custom];

    if (filters?.category) {
      all = all.filter((a) => a.category === filters.category);
    }

    if (filters?.search) {
      const query = filters.search.toLowerCase();
      all = all.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.tagline.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          a.tags?.some((t) => t.toLowerCase().includes(query)) ||
          a.tools?.some((t) => t.toLowerCase().includes(query)),
      );
    }

    return all;
  }

  async getBySlug(slug: string): Promise<Agent | null> {
    const custom = this.getCustomAgents();
    const found = [...AGENTS, ...custom].find((a) => a.slug === slug);
    return found || null;
  }

  async getById(id: string): Promise<Agent | null> {
    const custom = this.getCustomAgents();
    const found = [...AGENTS, ...custom].find((a) => a.id === id);
    return found || null;
  }

  async create(draft: Omit<Agent, "id" | "runs" | "rating">): Promise<Agent> {
    const newAgent: Agent = {
      ...draft,
      id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      runs: 0,
      rating: 5.0,
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    const custom = this.getCustomAgents();
    custom.unshift(newAgent);
    this.saveCustomAgents(custom);
    return newAgent;
  }

  async update(id: string, patch: Partial<Agent>): Promise<Agent> {
    const custom = this.getCustomAgents();
    const idx = custom.findIndex((a) => a.id === id);
    if (idx === -1) {
      throw new Error("No se puede editar un prompt del catálogo oficial; clónalo para personalizar.");
    }

    const updated = { ...custom[idx], ...patch, updatedAt: new Date().toISOString() };
    custom[idx] = updated;
    this.saveCustomAgents(custom);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const custom = this.getCustomAgents().filter((a) => a.id !== id);
    this.saveCustomAgents(custom);
  }
}

export const localAgentsService = new LocalAgentsService();
