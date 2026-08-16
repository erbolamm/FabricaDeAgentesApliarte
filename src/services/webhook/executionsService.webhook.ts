// Motor de ejecución basado en webhooks (n8n, Make, endpoint propio…).
//
// Cómo funciona:
//   1. Busca el agente por id.
//   2. Si tiene `webhookUrl`, hace fetch enviando { agentId, userId, inputs }.
//   3. Espera una respuesta JSON con { output: string } (o texto plano).
//   4. Si no tiene webhook, cae al mock para no romper la demo.
//
// Cuando enganches Firebase, también puedes guardar la ejecución en Firestore
// dentro de este mismo servicio.

import type { ExecutionsService } from "../types";
import type { Execution } from "@/types";
import { mockAgentsService } from "../mock/agentsService.mock";
import { mockExecutionsService, persistExecution } from "../mock/executionsService.mock";

export const webhookExecutionsService: ExecutionsService = {
  async create({ agentId, userId, inputs }) {
    const agent = await mockAgentsService.getById(agentId);
    if (!agent?.webhookUrl) {
      // Sin webhook configurado → fallback mock.
      return mockExecutionsService.create({ agentId, userId, inputs });
    }

    const startedAt = new Date().toISOString();
    const method = agent.webhookMethod ?? "POST";

    try {
      const res = await fetch(agent.webhookUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method === "POST" ? JSON.stringify({ agentId, userId, inputs }) : undefined,
      });

      if (!res.ok) throw new Error(`Webhook respondió ${res.status}`);

      const contentType = res.headers.get("content-type") ?? "";
      let output: string;
      if (contentType.includes("application/json")) {
        const data = await res.json();
        output = typeof data === "string" ? data : data.output ?? JSON.stringify(data, null, 2);
      } else {
        output = await res.text();
      }

      const exec: Execution = {
        id: `exec-${Date.now()}`,
        agentId,
        userId,
        status: "completed",
        inputs,
        output,
        creditsSpent: agent.credits,
        createdAt: startedAt,
      };
      persistExecution(exec);
      return exec;
    } catch (err) {
      const exec: Execution = {
        id: `exec-${Date.now()}`,
        agentId,
        userId,
        status: "failed",
        inputs,
        output: err instanceof Error ? err.message : "Error ejecutando el webhook",
        creditsSpent: 0,
        createdAt: startedAt,
      };
      persistExecution(exec);
      return exec;
    }
  },

  async listByUser(userId) {
    return mockExecutionsService.listByUser(userId);
  },
};
