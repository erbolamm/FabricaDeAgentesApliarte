# 🤖 Fábrica de Agentes & Prompts ApliArte

> **"Fabrica tu agente gratis con ApliArte"**  
> Plataforma 100% comunitaria, libre y de código abierto para descubrir, personalizar, copiar y ejecutar **34 Prompts y Workflows de IA de alta precisión** (Gemas de Gemini, Custom GPTs, Claude Projects, Mistral Agents, DeepSeek y más).

[![Web en Vivo](https://img.shields.io/badge/🌐_Web_Oficial-erbolamm.github.io-0284c7.svg)](https://erbolamm.github.io/FabricaDeAgentesApliarte/)
[![ia.apliarte.com](https://img.shields.io/badge/🎓_ia.apliarte.com-Cursos_&_Noticias_Gratis-emerald.svg)](https://ia.apliarte.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/erbolamm/FabricaDeAgentesApliarte?style=social)](https://github.com/erbolamm/FabricaDeAgentesApliarte)

---

## 🌐 Enlaces Oficiales del Ecosistema

- 🚀 **Web Interactiva en Vivo**: [https://erbolamm.github.io/FabricaDeAgentesApliarte/](https://erbolamm.github.io/FabricaDeAgentesApliarte/)
- 🎓 **Noticias & Formación en IA Gratuita**: [https://ia.apliarte.com](https://ia.apliarte.com)
- 🌌 **Portal Central ApliArte**: [https://apliarte.com](https://apliarte.com)
- 🐙 **Repositorio GitHub**: [https://github.com/erbolamm/FabricaDeAgentesApliarte](https://github.com/erbolamm/FabricaDeAgentesApliarte)

---

## 💡 Manifiesto & Propuesta de Valor

> *"Hay empresas cobrando más de 2.000 € por formaciones y plantillas de Inteligencia Artificial. En **ia.apliarte.com** y en esta **Fábrica de Agentes** lo tienes 100% gratis, sin paywalls ni suscripciones obligatorias. Si este catálogo te ahorra tiempo o te ayuda a ganar dinero, ¡convídate a un café y apoya el proyecto!"*

---

## ✨ Características Principales

1. **⚡ Catálogo de 34 Prompts Profesionales (1-Click Copy & Exportación)**:
   - System prompts e instrucciones estructuradas para ChatGPT, Claude, Cursor, DeepSeek o cualquier LLM.
   - Rellenado dinámico e interactivo de variables (`{{tema}}`, `{{target_role}}`, etc.).
   - Exportación directa en formato Markdown (`.md`).

2. **🎓 Taller & Creador Estructurado de Prompts (`/#/crear`)**:
   - Basado en la fórmula maestra: `#ROL` + `#CONTEXTO` + `#PASOS A SEGUIR`.
   - Incluye **8 Plantillas Rápidas** con 1-clic (Redactor de Emails, Resumidor de Reuniones, Gestor de Proyectos, Pitch de Ventas, Analista de Datos, Social Media Manager, Atención al Cliente, Reclutador de RRHH).
   - Comparador interactivo *Antes vs Después*.

3. **📚 Guías de Configuración Paso a Paso en Cada IA**:
   - 💎 **Google Gemini**: Cómo crearlo como una **Gema (Gem)** permanente en el Administrador de Gemas.
   - 🤖 **OpenAI ChatGPT**: Cómo configurarlo como un **Custom GPT** (*Instructions + Capabilities*).
   - 🎭 **Anthropic Claude**: Cómo crearlo en **Claude Projects** (*Project Instructions*).
   - 🌪️ **Mistral AI**: Cómo crearlo como un **Agent** en Mistral Le Chat.
   - 🐋 **DeepSeek**: Sesiones en *DeepThink R1* con directivas estructuradas.
   - 🌙 **Kimi / MiniMax / Qwen**: Patrón unificado de contexto largo y archivos de reglas (`AGENTS.md`).

4. **🔑 Conectores BYOK (Bring Your Own Key)**:
   - Ejecuta directamente desde el navegador contra **DeepSeek, Claude 3.7, GPT-4o, Gemini 2.0, Groq, OpenRouter y Ollama local** sin servidores intermediarios.

5. **🔒 Privacidad Total (Cero Telemetría)**:
   - Todas tus claves e historial se guardan en el `localStorage` de tu navegador.

6. **✉️ Canal Directo de Feedback & Dudas (`erbolamm@gmail.com`)**:
   - Botón directo para enviar dudas o sugerencias de mejora con 1-clic.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Lucide Icons
- **Enrutamiento**: HashRouter (100% compatible con GitHub Pages y servidores estáticos)
- **Estado & Cache**: TanStack Query
- **Almacenamiento**: LocalStorage / Client-Side
- **Tests & Calidad**: Vitest + ESLint

---

## 🚀 Comandos

```bash
pnpm install     # Instalar dependencias
pnpm dev         # Servidor de desarrollo local
pnpm build       # Compilación para producción (dist estático)
pnpm test        # Tests unitarios con Vitest
pnpm lint        # Linter con ESLint
```

---

## 🤝 Cómo Contribuir

1. Haz un Fork del repositorio.
2. Añade tu prompt en `src/data/agents.ts` o usa el creador visual en la app.
3. Abre un Pull Request con la etiqueta `prompt:nuevo`.

---

## 👤 Autor

**F. Javier Mateo Márquez**
- 🐙 GitHub: [@erbolamm](https://github.com/erbolamm)
- 🐦 X / Twitter: [@erbolamm](https://x.com/erbolamm)
- 🌐 Web: [apliarte.com](https://apliarte.com) · [ia.apliarte.com](https://ia.apliarte.com)
- 🟣 Twitch (En Vivo): [@apliarte](https://www.twitch.tv/apliarte) *(Directos de programación e IA)*
- ✉️ Contacto / Sugerencias: `erbolamm@gmail.com`

---

## ☕ Formas de Apoyo & Mecenazgo Comunitario

El proyecto es y será 100% gratuito. Si quieres apoyar el mantenimiento de la infraestructura, los cursos abiertos y la creación de nuevos prompts:

### 🌟 Canales Oficiales de Donación y Mecenazgo:
- ☕ **Ko-fi (Café o Donación rápida)**: [ko-fi.com/C0C11TWR1K](https://ko-fi.com/C0C11TWR1K)
- 💳 **PayPal**: [paypal.me/erbolamm](https://paypal.me/erbolamm)
- 🐙 **GitHub Sponsors (Suscripción mensual con insignia)**: [github.com/sponsors/erbolamm](https://github.com/sponsors/erbolamm)
- 🟣 **Twitch Tips**: [streamelements.com/apliarte/tip](https://streamelements.com/apliarte/tip)
- 💖 **RevenueCat Web**: Directo en la app en [/#/apoyar](https://erbolamm.github.io/FabricaDeAgentesApliarte/#/apoyar)

### 👑 Tiers de Mecenazgo:
- ☕ **Impulso Café (3 € / Pago único)**: Apoyo directo al taller de Javier.
- 🚀 **Co-Creador IA (5 € / mes)**: Voz y voto mensual para proponer y priorizar los nuevos prompts del catálogo.
- 👑 **Mecenas Fundador / Legacy Supporter (15 € / mes)**: Nombre y avatar grabados en este README de por vida y nodo de honor en el grafo 3D del **Universo ErBolamm**.

### 🏆 Tabla de Honor — Mecenas Fundadores (Legacy Supporters):
| Mecenas / Empresa | Nivel | Planeta en el Universo | Enlace |
|---|---|---|---|
| *Sé el primer Mecenas Fundador* | 👑 Legacy Sponsor | 🪐 Planeta Alfa | [Unirme](https://github.com/sponsors/erbolamm) |

---

<details>
<summary>🌐 <strong>Multilingual Note / Nota Multilingüe / Note Multilingue</strong></summary>

### English
This repository is an open-source catalog of AI prompts and workflows with step-by-step guides for Gemini Gems, Custom GPTs, Claude Projects, and Mistral Agents. Free forever under MIT license. Live app at https://erbolamm.github.io/FabricaDeAgentesApliarte/

### Español
Este repositorio es un catálogo de código abierto de prompts y flujos de IA con guías paso a paso para Gemas de Gemini, Custom GPTs, Proyectos de Claude y Agentes de Mistral. Gratuito para siempre bajo licencia MIT. Aplicación web en vivo en https://erbolamm.github.io/FabricaDeAgentesApliarte/

### Français
Ce dépôt est un catalogue open-source de prompts et flux de travail d'IA avec des guides étape par étape pour les Gemmes Gemini, Custom GPTs, Projets Claude et Agents Mistral. Gratuit pour toujours sous licence MIT. Application en direct sur https://erbolamm.github.io/FabricaDeAgentesApliarte/

### Deutsch
Dieses Repository ist ein Open-Source-Katalog von KI-Prompts und Arbeitsabläufen mit Schritt-für-Schritt-Anleitungen für Gemini Gems, Custom GPTs, Claude Projects und Mistral Agents. Für immer kostenlos unter MIT-Lizenz. Live-App unter https://erbolamm.github.io/FabricaDeAgentesApliarte/

</details>

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE) © 2026 F. Javier Mateo Márquez (ApliArte).
