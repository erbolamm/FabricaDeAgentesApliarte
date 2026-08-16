# Hoja de Ruta — Fábrica de Agentes ApliArte

Stack: React 18 + TypeScript + Vite + Firebase (Auth, Firestore, Hosting, Functions) + Stripe
Última actualización: 2026-05-04

---

## Estado actual (completado)

| Área | Detalle |
|------|---------|
| UI completa | Catálogo, ficha agente, pricing, creadores, login, 404 |
| Design system | Tailwind + shadcn/ui, dark/light, tokens HSL |
| Firebase Auth | Email/Password + Google OAuth — `src/context/AuthContext.tsx` |
| Firestore | Colecciones: `agents`, `users`, `executions` — `src/services/firebase/` |
| Firebase Hosting | https://fabri-agen-apli.web.app |
| Firebase Cloud Functions | `functions/src/index.ts` — Node 22, API v2 |
| Webhook executor | n8n / Make / endpoint propio — `src/services/webhook/executionsService.webhook.ts` |
| Panel de creador | CRUD completo de agentes — `src/pages/CreatorDashboard.tsx` |
| Historial de ejecuciones | `src/pages/MyExecutions.tsx` |
| Sistema de créditos | Deducción atómica en Firestore transaction — `src/services/firebase/executionsService.firebase.ts` |
| Roles | `free / pro / admin` en `users/{uid}.role` — `src/types/index.ts` |
| FAQ de creadores | Dialog + Accordion — `src/pages/Creators.tsx` |
| Favicon / icons | SVG generado con Pixelmator Pro, ICO multi-tamaño con ImageMagick |
| Stack limpio | Sin dependencias de plataformas externas |
| Stripe — packs UI | Sección "Recargar créditos" en `src/pages/Pricing.tsx` (3 packs: 50/200/500 créditos) |
| Stripe — Cloud Function | `createCheckoutSession` + `stripeWebhook` en `functions/src/index.ts` |
| Stripe — Secret Key | `STRIPE_SECRET_KEY` en Google Secret Manager (Firebase) |

---

## Fase 1 — Monetización base ⚠️ EN PROGRESO

### Stripe Checkout — FALTA COMPLETAR

- [ ] **Conceder permiso IAM al service account de Cloud Build**
  - Ir a: `console.cloud.google.com/iam-admin/iam?project=fabri-agen-apli`
  - Principal: `744735005635@cloudbuild.iam.gserviceaccount.com`
  - Rol a agregar: `Secret Manager Secret Accessor`
  - Sin esto, `createCheckoutSession` falla al deployar

- [ ] **Deployar las Cloud Functions sin errores**
  ```bash
  cd functions && npm run build && cd .. && firebase deploy --only functions
  ```
  - `stripeWebhook` ya está deployada en `us-central1`
  - `createCheckoutSession` aún falla por el permiso de arriba

- [ ] **Configurar webhook en Stripe Dashboard**
  - Stripe Dashboard → Developers → Webhooks → Add endpoint
  - URL: `https://us-central1-fabri-agen-apli.cloudfunctions.net/stripeWebhook`
  - Evento: `checkout.session.completed`
  - Copiar el `whsec_...` que genera

- [ ] **Guardar STRIPE_WEBHOOK_SECRET en Firebase**
  ```bash
  firebase functions:secrets:set STRIPE_WEBHOOK_SECRET
  # pegar el whsec_... cuando lo pida
  ```

- [ ] **Re-deployar functions con el nuevo secret**
  ```bash
  cd functions && npm run build && cd .. && firebase deploy --only functions
  ```

- [ ] **Agregar `VITE_STRIPE_PUBLISHABLE_KEY` al `.env.local`**
  - Valor: `pk_live_...` (de Stripe Dashboard → API keys → Clave publicable)

- [ ] **Deploy final del hosting**
  ```bash
  npm run build && firebase deploy --only hosting
  ```

- [ ] **Test end-to-end en modo test**
  - Usar tarjeta de prueba Stripe: `4242 4242 4242 4242` / cualquier fecha futura / cualquier CVC
  - Verificar que `users/{uid}.credits` se incrementa en Firestore

### Pendiente de Fase 1

- [ ] **Página "Mi cuenta"**
  - Ruta: `/cuenta`
  - Mostrar: balance de créditos actual, historial de compras (colección `purchases` en Firestore)
  - Botón "Comprar más créditos" que lleva a `/pricing`

- [ ] **Dashboard de ganancias del creador**
  - Campo `earnings` en cada agente de Firestore
  - En `executionsService.firebase.ts`: al ejecutar, registrar 70% al creador en `agents/{id}.earnings`
  - Vista en panel del creador: "Has ganado €X este mes"

- [ ] **Revenue split en Firestore**
  - Al ejecutar un agente: incrementar `agents/{id}.earnings` con 70% de `agent.credits`
  - No requiere Stripe Connect todavía — pagos manuales hasta validar el modelo

---

## Fase 2 — Calidad y descubrimiento

- [ ] **Sistema de ratings y reviews**
  - Colección `reviews`: `{ agentId, userId, rating: 1-5, text, createdAt }`
  - Regla Firestore: `UNIQUE(agentId, userId)` — un review por usuario
  - UI en `AgentDetail.tsx`: estrellas + listado de comentarios
  - Cloud Function o trigger: actualizar `agents/{id}.rating` como promedio

- [ ] **Búsqueda full-text**
  - Actual: filtrado en cliente (no escala > 200 agentes)
  - Opción A (rápida): Algolia free tier — índice `agents`, instalar `algoliasearch`
  - Opción B (gratis/self-hosted): Typesense Cloud
  - Indexar en: `name`, `tagline`, `description`, `category`, `tools`

- [ ] **Badges en AgentCard**
  - `verified: boolean` — admin activa en Firestore Console
  - `featured: boolean` — aparece primero en el catálogo
  - `successRate: number` — calculado desde executions

- [ ] **SEO dinámico por agente**
  - Instalar `react-helmet-async`
  - En `AgentDetail.tsx`: `<title>{agent.name} — Fábrica de Agentes</title>`
  - JSON-LD `Product` con `name`, `description`, `offers.price`

---

## Fase 3 — UX y retención

- [ ] **Skeletons de carga**
  - `Catalog.tsx`: skeleton grid mientras carga Firestore
  - `AgentDetail.tsx`: skeleton mientras carga el agente
  - Componente `AgentCardSkeleton` reutilizable

- [ ] **Error boundaries globales**
  - Wrapper en `App.tsx` que atrapa crashes y muestra pantalla de error amigable
  - Toast global para errores de red / créditos insuficientes

- [ ] **Onboarding de nuevo usuario**
  - En `AuthContext.tsx`: detectar primer login (`metadata.creationTime === metadata.lastSignInTime`)
  - Modal: "Tenés 100 créditos gratis — probá tu primer agente"
  - Link directo a un agente destacado

- [ ] **Imagen de portada para agentes**
  - Firebase Storage bucket: `agent-covers/{agentId}`
  - En `CreatorDashboard.tsx`: input file → upload → guardar URL en `agents/{id}.coverUrl`
  - Mostrar en `AgentCard` y `AgentDetail`

- [ ] **Agentes guardados / favoritos**
  - Colección `savedAgents`: `{ userId, agentId, savedAt }`
  - Botón corazón en `AgentCard` y `AgentDetail`
  - Página "Mis guardados" en perfil

- [ ] **Responsive mobile < 400px**
  - Auditar y corregir: header, AgentCard, formulario de ejecución, panel creador

---

## Fase 4 — Motor de ejecución avanzado

- [ ] **Ejecución async con Cloud Functions**
  - Mover la lógica de ejecución a una Cloud Function `executeAgent`
  - Estado en tiempo real via `Firestore onSnapshot` en la UI
  - Timeout configurable por agente (5-30 min)
  - Retry: 2 intentos con exponential backoff

- [ ] **Logging por paso**
  - `executions/{id}.steps`: array de `{ stepName, status, output, duration }`
  - UI en historial: expandir ejecución → ver cada paso

- [ ] **Credenciales OAuth del usuario**
  - Colección `userCredentials`: `{ userId, provider, encryptedToken, expiresAt }`
  - Flujo OAuth para Gmail, Notion, Slack
  - Antes de ejecutar: validar que el usuario tiene las integraciones requeridas

- [ ] **Registro de costos LLM**
  - En cada ejecución: registrar `tokensUsed`, `llmCost`, `platformFee`, `creatorPayout`
  - Panel de creador: ver margen real por agente

---

## Fase 5 — Comunidad y escala

- [ ] API pública REST (`/v1/agents/:id/execute`)
- [ ] Sugerencias de agentes por la comunidad + moderación
- [ ] Programa de creators (tiers, splits 75/25 y 80/20)
- [ ] Agentes verticales ("Para inmobiliarias", "Para clínicas")
- [ ] SEO programático (`/automatizar-[tarea]-con-[herramienta]`)
- [ ] Scheduling (ejecutar agente en cron)
- [ ] Multi-agent workflows (output A → input B)
- [ ] Stripe Connect para payouts automáticos a creadores

---

## Fase 6 — Infraestructura y calidad (siempre activo)

- [ ] **Sentry** — `npm install @sentry/react` + DSN en `.env.local` — 5 min de setup
- [ ] **PostHog** — eventos: `agent_executed`, `credits_purchased`, `user_signed_up`
- [ ] **Tests** — Vitest configurado, `src/test/example.test.ts` es el único test real
- [ ] **Terms of Service + Privacy Policy** — Obligatorio antes de cobrar real
- [ ] **GDPR** — Cookie consent, endpoint para borrar cuenta completa
- [ ] **Rate limiting** — En Cloud Functions: max 10 ejecuciones/min por usuario

---

## Archivos clave del proyecto

| Archivo | Qué hace |
|---------|---------|
| `src/lib/firebase.ts` | Init Firebase app, exporta `auth`, `db`, `storage`, `googleProvider` |
| `src/services/index.ts` | Punto de entrada — exporta servicios Firebase |
| `src/services/firebase/authService.firebase.ts` | Auth + creación de doc usuario con créditos |
| `src/services/firebase/agentsService.firebase.ts` | CRUD agentes en Firestore |
| `src/services/firebase/executionsService.firebase.ts` | Ejecuciones + deducción atómica de créditos |
| `src/services/types.ts` | Interfaces `AgentsService`, `AuthService`, `ExecutionsService` |
| `src/types/index.ts` | Tipos: `Agent`, `AppUser` (con `role`), `Execution`, `UserRole` |
| `src/context/AuthContext.tsx` | Proveedor de auth, hook `useAuth()` |
| `functions/src/index.ts` | Cloud Functions: `createCheckoutSession` + `stripeWebhook` |
| `firestore.rules` | Reglas de seguridad Firestore |
| `.env.local` | Variables de entorno locales (no en git — cubierto por `*.local`) |
| `.env-comandos.local` | Referencia de comandos frecuentes |
| `ROADMAP.md` | Este archivo |

---

## Decisiones técnicas registradas

| Decisión | Motivo |
|----------|--------|
| React + Vite en lugar de Next.js | Stack ya construido, SSR no necesario para MVP |
| Firebase en lugar de PostgreSQL | Escala hasta $50K/mes sin ops, gratis en volumen bajo |
| Stripe Checkout (redirect) en lugar de Stripe Elements | Menos código, PCI compliance gratis, más rápido de implementar |
| Revenue split manual (Firestore) en lugar de Stripe Connect | Stripe Connect requiere onboarding complejo. Manual hasta validar el modelo |
| Secrets en Google Secret Manager | `firebase functions:secrets:set` — nunca en archivos, nunca en git |
| Stack propio sin dependencias externas de plataforma | Control total del código y del deploy |
