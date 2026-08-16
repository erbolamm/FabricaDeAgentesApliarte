import type { ExecutionsService } from "../types";
import type { Execution } from "@/types";
import { AGENTS } from "@/data/agents";

const STORAGE_KEY = "fda.executions";

const load = (): Execution[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
};

const save = (list: Execution[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

let store: Execution[] = load();

export const persistExecution = (exec: Execution) => {
  store = [exec, ...store].slice(0, 200);
  save(store);
};

export const mockExecutionsService: ExecutionsService = {
  async create({ agentId, userId, inputs }) {
    const agent = AGENTS.find((a) => a.id === agentId);
    const exec: Execution = {
      id: `exec-${Date.now()}`,
      agentId,
      userId,
      status: "completed",
      inputs,
      output: agent?.exampleOutput ?? "Ejecución completada (mock).",
      creditsSpent: agent?.credits ?? 0,
      createdAt: new Date().toISOString(),
    };
    persistExecution(exec);
    return exec;
  },
  async listByUser(userId) {
    return load()
      .filter((e) => e.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
};
