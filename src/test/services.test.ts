import { describe, it, expect, beforeEach } from "vitest";
import { localAgentsService } from "@/services/local/agentsService.local";
import { localExecutionsService } from "@/services/local/executionsService.local";
import { aiConnectorsService } from "@/services/ai/aiConnectorsService";

describe("Fábrica de Agentes - Open Source Core Services", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("localExecutionsService", () => {
    it("renders prompt variables correctly with {{variable}} syntax", () => {
      const template = "Escribe un email para {{target_role}} en {{target_industry}} sobre {{product}}.";
      const inputs = {
        target_role: "CEO",
        target_industry: "Fintech",
        product: "automatización de pagos",
      };

      const result = localExecutionsService.renderPrompt(template, inputs);
      expect(result).toBe("Escribe un email para CEO en Fintech sobre automatización de pagos.");
    });

    it("keeps variable placeholder if missing from inputs", () => {
      const template = "Hola {{nombre}}, tu saldo es {{saldo}}.";
      const inputs = { nombre: "Carlos" };

      const result = localExecutionsService.renderPrompt(template, inputs);
      expect(result).toBe("Hola Carlos, tu saldo es {{saldo}}.");
    });
  });

  describe("localAgentsService", () => {
    it("lists default open source agents", async () => {
      const agents = await localAgentsService.list();
      expect(agents.length).toBeGreaterThan(0);
      expect(agents.some((a) => a.slug === "leadminer-pro")).toBe(true);
    });

    it("filters agents by category", async () => {
      const salesAgents = await localAgentsService.list({ category: "ventas" });
      expect(salesAgents.every((a) => a.category === "ventas")).toBe(true);
    });

    it("searches agents by text query", async () => {
      const results = await localAgentsService.list({ search: "LinkedIn" });
      expect(results.length).toBeGreaterThan(0);
    });

    it("creates and retrieves a custom prompt agent in localStorage", async () => {
      const created = await localAgentsService.create({
        name: "Test Custom Prompt",
        slug: "test-custom-prompt",
        tagline: "Un prompt de prueba",
        description: "Descripción de prueba",
        category: "productividad",
        systemPrompt: "Eres un asistente...",
        userPromptTemplate: "Genera {{salida}}",
        exampleOutput: "Ejemplo",
        recommendedModels: ["DeepSeek-R1"],
        tools: ["Custom"],
        tags: ["test"],
        inputs: [{ name: "salida", label: "Salida", type: "text" }],
        author: "Tester",
      });

      expect(created.id).toBeDefined();
      expect(created.isCustom).toBe(true);

      const fetched = await localAgentsService.getBySlug("test-custom-prompt");
      expect(fetched).not.toBeNull();
      expect(fetched?.name).toBe("Test Custom Prompt");
    });
  });

  describe("aiConnectorsService", () => {
    it("saves and retrieves AI connections in localStorage", () => {
      aiConnectorsService.saveConnection("deepseek", "sk-test-deepseek-12345", "deepseek-reasoner");

      const conn = aiConnectorsService.getConnection("deepseek");
      expect(conn).not.toBeNull();
      expect(conn?.apiKey).toBe("sk-test-deepseek-12345");
      expect(conn?.selectedModel).toBe("deepseek-reasoner");
      expect(aiConnectorsService.getDefaultProviderId()).toBe("deepseek");
    });

    it("removes connection and updates default provider", () => {
      aiConnectorsService.saveConnection("gemini", "ai-gemini-key");
      aiConnectorsService.saveConnection("openai", "sk-openai-key");

      aiConnectorsService.removeConnection("gemini");
      expect(aiConnectorsService.getConnection("gemini")).toBeNull();
      expect(aiConnectorsService.getConnection("openai")).not.toBeNull();
    });
  });
});
