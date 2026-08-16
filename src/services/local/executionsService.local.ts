import type { Agent, Execution, AIProviderId } from "@/types";
import { aiConnectorsService } from "../ai/aiConnectorsService";
import type { ExecutionsService } from "../types";

const EXECUTIONS_STORAGE_KEY = "crafty_executions_history_v1";

export class LocalExecutionsService implements ExecutionsService {
  private getStoredExecutions(): Execution[] {
    try {
      const raw = localStorage.getItem(EXECUTIONS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveStoredExecutions(execs: Execution[]) {
    localStorage.setItem(EXECUTIONS_STORAGE_KEY, JSON.stringify(execs));
  }

  // Renderiza la plantilla reemplazando {{variable}} por el valor correspondiente
  renderPrompt(template: string, inputs: Record<string, string>): string {
    return template.replace(/\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g, (_, key) => {
      return inputs[key] !== undefined ? inputs[key] : `{{${key}}}`;
    });
  }

  async create(params: {
    agent: Agent;
    inputs: Record<string, string>;
    providerId?: AIProviderId;
    model?: string;
  }): Promise<Execution> {
    const renderedPrompt = this.renderPrompt(params.agent.userPromptTemplate, params.inputs);

    const execution: Execution = {
      id: `exec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      agentId: params.agent.id,
      agentName: params.agent.name,
      providerId: params.providerId || aiConnectorsService.getDefaultProviderId() || undefined,
      modelUsed: params.model,
      status: "running",
      inputs: params.inputs,
      renderedPrompt,
      createdAt: new Date().toISOString(),
    };

    const execs = this.getStoredExecutions();
    execs.unshift(execution);
    this.saveStoredExecutions(execs);

    try {
      // Si hay un conector de IA activo, lo ejecutamos directamente
      if (execution.providerId) {
        const result = await aiConnectorsService.executePrompt({
          systemPrompt: params.agent.systemPrompt,
          userPrompt: renderedPrompt,
          providerId: execution.providerId,
          model: params.model,
        });

        execution.status = "completed";
        execution.output = result.text;
        execution.modelUsed = result.model;
      } else {
        // Modo sin conector: devuelve el prompt renderizado y un recordatorio
        execution.status = "completed";
        execution.output = `### 📋 Prompt Generado y Listo para Copiar:\n\n${renderedPrompt}\n\n*(Conecta tu API key de DeepSeek, Gemini, OpenAI o Claude en la pestaña 'Conectores IA' para ejecutarlo automáticamente aquí).*`;
      }
    } catch (err: unknown) {
      execution.status = "failed";
      execution.error = err instanceof Error ? err.message : String(err);
    }

    // Actualizar registro guardado
    const updatedExecs = this.getStoredExecutions().map((e) =>
      e.id === execution.id ? execution : e,
    );
    this.saveStoredExecutions(updatedExecs);

    return execution;
  }

  async list(): Promise<Execution[]> {
    return this.getStoredExecutions();
  }

  async getById(id: string): Promise<Execution | null> {
    const found = this.getStoredExecutions().find((e) => e.id === id);
    return found || null;
  }

  async clear(): Promise<void> {
    localStorage.removeItem(EXECUTIONS_STORAGE_KEY);
  }
}

export const localExecutionsService = new LocalExecutionsService();
