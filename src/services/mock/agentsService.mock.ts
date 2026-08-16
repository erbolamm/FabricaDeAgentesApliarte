import type { AgentsService, AgentDraft } from "../types";
import { AGENTS } from "@/data/agents";
import type { Agent } from "@/types";

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

// Copia mutable en memoria. Al migrar a Firebase esto desaparece.
const store: Agent[] = [...AGENTS];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const ensureUniqueSlug = (base: string, ignoreId?: string) => {
  let slug = base || "agente";
  let i = 1;
  while (store.some((a) => a.slug === slug && a.id !== ignoreId)) {
    i += 1;
    slug = `${base}-${i}`;
  }
  return slug;
};

export const mockAgentsService: AgentsService = {
  async list(filters) {
    await delay();
    return store.filter((a) => {
      if (a.published === false) return false;
      const matchCat = filters?.category ? a.category === filters.category : true;
      const q = filters?.query?.toLowerCase().trim();
      const text = `${a.name} ${a.tagline} ${a.description}`.toLowerCase();
      const matchQ = q ? text.includes(q) : true;
      return matchCat && matchQ;
    });
  },
  async getBySlug(slug) {
    await delay();
    return store.find((a) => a.slug === slug) ?? null;
  },
  async getById(id) {
    await delay();
    return store.find((a) => a.id === id) ?? null;
  },
  async listByAuthor(author) {
    await delay();
    return store.filter((a) => a.author === author);
  },
  async create(draft: AgentDraft) {
    await delay();
    const id = `local-${Date.now()}`;
    const slug = ensureUniqueSlug(draft.slug || slugify(draft.name));
    const agent: Agent = {
      ...draft,
      id,
      slug,
      runs: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: draft.published ?? true,
    };
    store.unshift(agent);
    return agent;
  },
  async update(id, patch) {
    await delay();
    const idx = store.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error("Agente no encontrado");
    const next: Agent = {
      ...store[idx],
      ...patch,
      slug: patch.slug
        ? ensureUniqueSlug(slugify(patch.slug), id)
        : store[idx].slug,
      updatedAt: new Date().toISOString(),
    };
    store[idx] = next;
    return next;
  },
  async remove(id) {
    await delay();
    const idx = store.findIndex((a) => a.id === id);
    if (idx !== -1) store.splice(idx, 1);
  },
};
