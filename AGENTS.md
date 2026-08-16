# Fábrica de Agentes — Agent Instructions

Plataforma 100% Open Source de Prompts y Workflows de IA con conectores BYOK y soporte RevenueCat.
Stack: React 18 + TypeScript + Vite + pnpm + Tailwind + shadcn/ui.

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build (dist estático)
pnpm test         # vitest run (jsdom)
pnpm test:watch   # vitest watch
pnpm lint         # eslint
```

## Architecture

### Service Layer
Todos los accesos a datos y conectores pasan por `src/services/types.ts`.
- `src/services/local/agentsService.local.ts`: Catálogo oficial y prompts personalizados del usuario en `localStorage`.
- `src/services/local/executionsService.local.ts`: Renderizado de variables `{{var}}` e historial local.
- `src/services/ai/aiConnectorsService.ts`: Conectores BYOK (DeepSeek, Claude, OpenAI, Gemini, Groq, OpenRouter, Ollama) y ejecución directa desde el navegador.
- `src/services/revenuecat/revenuecatService.ts`: Soporte voluntario, micro-pagos y donaciones con RevenueCat Web SDK.

### Data types
Definidos en `src/types/index.ts`. Tipos clave: `Agent` (prompts con `systemPrompt` y `userPromptTemplate`), `AIProvider`, `AIConnection`, `Execution`, `SupportTier`.

### State management
- Server state → TanStack Query (`useAgents`, `useAgentBySlug`, `useExecutions`)
- Conexiones y Claves → `aiConnectorsService` con `localStorage`
- Profile / Supporter Status → `useAuth()` en `src/context/AuthContext`

### Routing (React Router v6)
Rutas principales en `src/App.tsx`:
- `/`: Portada y destacados
- `/agentes`: Catálogo de prompts
- `/agentes/:slug`: Visor interactivo, copiado con 1-click y ejecución con IA
- `/conectores`: Gestión de API keys (DeepSeek, Claude, GPT, Gemini, Groq, Ollama)
- `/apoyar`: Tiers de apoyo y donaciones con RevenueCat / GitHub Sponsors
- `/mis-ejecuciones`: Historial de prompts ejecutados localmente
- `/crear`: Creador de plantillas de prompt
