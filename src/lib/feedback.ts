export interface FeedbackMailOptions {
  contextName: string;
  contextType?: "prompt" | "catalogo" | "conectores" | "apoyar" | "general";
  url?: string;
}

export function generateFeedbackMailto({
  contextName,
  contextType = "prompt",
  url = typeof window !== "undefined" ? window.location.href : "",
}: FeedbackMailOptions): string {
  const email = "erbolamm@gmail.com";
  const subject = `Fábrica de Agentes ApliArte — ${contextType === "prompt" ? `Feedback: ${contextName}` : "Sugerencias & Feedback"}`;

  const body = `Hola Javier,

Estoy usando la Fábrica de Agentes de ApliArte y te escribo desde:
👉 ${contextName} (${url})

¿Qué cambiarías o qué sugerencia tienes para mejorar este prompt o la plataforma?:
[Escribe aquí lo que cambiarías, quitarías o agregarías...]

¿Tienes alguna duda sobre su uso en Gemini, GPT, Claude, DeepSeek, etc.?:
[Escribe aquí tu duda...]

---
Enviado desde Fábrica de Agentes ApliArte (Open Source)`;

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
