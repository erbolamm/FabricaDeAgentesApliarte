# 🤖 Fábrica de Agentes & Prompts de IA — Open Source

> Plataforma comunitaria y de código abierto para descubrir, personalizar, copiar y configurar **Prompts y Workflows de IA de alta precisión** (Gemas de Gemini, Custom GPTs, Claude Projects, Mistral Agents, DeepSeek y más).

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![100% Free & Open Source](https://img.shields.io/badge/Open_Source-100%25_Gratis-blue.svg)](https://github.com/erbolamm/FabricaDeAgentesApliarte)
[![RevenueCat Support](https://img.shields.io/badge/RevenueCat-Supported-pink.svg)](https://revenuecat.com)

---

## ✨ Características Principales

1. **⚡ Prompts Listos para Copiar (1-Click)**:
   - System prompts e instrucciones estructuradas para ChatGPT, Claude, Cursor o cualquier LLM.
   - Rellenado dinámico de variables (`{{tema}}`, `{{target_role}}`, etc.).
   - Exportación directa en Markdown (`.md`).

2. **📚 Guías de Creación Paso a Paso en Cada IA**:
   - 💎 **Google Gemini**: Cómo crearlo como una **Gema (Gem)** permanente en el Administrador de Gemas.
   - 🤖 **OpenAI ChatGPT**: Cómo configurarlo como un **Custom GPT** (*Instructions + Capabilities*).
   - 🎭 **Anthropic Claude**: Cómo crearlo en **Claude Projects** (*Project Instructions*).
   - 🌪️ **Mistral AI**: Cómo crearlo como un **Agent** en Mistral Le Chat.
   - 🐋 **DeepSeek**: Cómo inicializar sesiones en *DeepThink R1* con directivas estructuradas.
   - 🌙 **Kimi / MiniMax / Qwen**: Patrón unificado de contexto largo y archivos de reglas (`.cursorrules` / `AGENTS.md`).

3. **✉️ Canal Directo de Feedback & Dudas (`mailto:`)**:
   - Cada prompt incluye el botón *"¿Qué cambiarías o qué dudas tienes?"* con asunto preconfigurado y referencia automática al prompt.

4. **🔒 100% Privado & Sin Servidores**:
   - Toda la configuración, claves opcionales e historial se guardan en el `localStorage` del navegador.
   - Cero telemetría ni bases de datos centralizadas.

5. **💖 100% Gratis con Soporte Voluntario**:
   - Sin paywalls obligatorios.
   - Apoyo voluntario mediante **RevenueCat Web**, **GitHub Sponsors**, **PayPal** y **Ko-fi**.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Lucide Icons
- **Gestor de paquetes**: pnpm
- **Almacenamiento**: LocalStorage / Client-Side
- **Monetización / Apoyo**: RevenueCat Purchases JS SDK + GitHub Sponsors

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
- 🌐 Web: [apliarte.com](https://apliarte.com)
- 🟣 Twitch (En Vivo): [@apliarte](https://www.twitch.tv/apliarte) *(Directos de IA y desarrollo)*

---

## ☕ Apoyo al Proyecto & Mecenazgo Comunitario

> *"Yo pongo las horas de investigación y código abierto; vos te llevás los resultados. Si estos 34 prompts te ahorran aunque sea 1 hora de trabajo esta semana, tu apoyo permite que este catálogo siga creciendo sin paywalls."*

### 👑 Tiers de Apoyo (RevenueCat & GitHub Sponsors):
- ☕ **Tier 1: Impulso Café (3 € / Pago único)**: Un café para el taller de Javier que financia nuevas investigaciones.
- 🚀 **Tier 2: Co-Creador IA (5 € / mes)**: Voz y voto mensual para proponer y priorizar los nuevos prompts del catálogo.
- 👑 **Tier 3: Mecenas Fundador / Legacy Supporter (15 € / mes)**: Nombre y avatar grabados en este README de por vida y nodo de honor en el grafo 3D del **Universo ErBolamm**.

### 🌟 Canales Oficiales:
- 💖 **RevenueCat Web**: Apoya directamente desde la app en `/apoyar`
- 🐙 **GitHub Sponsors**: [Sponsor @erbolamm](https://github.com/sponsors/erbolamm)
- ☕ **Ko-fi**: [ko-fi.com/C0C11TWR1K](https://ko-fi.com/C0C11TWR1K)
- 💳 **PayPal**: [paypal.me/erbolamm](https://paypal.me/erbolamm)
- 🟣 **Twitch Tips**: [streamelements.com/apliarte/tip](https://streamelements.com/apliarte/tip)

### 🏆 Mecenas Fundadores (Legacy Supporters):
| Mecenas | Nivel | Fecha | Enlace |
|---|---|---|---|
| *Sé el primer Mecenas Fundador* | 👑 Legacy Sponsor | 2026 | [Unirme](https://github.com/sponsors/erbolamm) |

---

<details>
<summary>🌐 <strong>Multilingual Note / Nota Multilingüe / Note Multilingue</strong></summary>

### English
This repository is an open-source catalog of AI prompts and workflows with step-by-step guides for Gemini Gems, Custom GPTs, Claude Projects, and Mistral Agents. Free forever under MIT license.

### Español
Este repositorio es un catálogo de código abierto de prompts y flujos de IA con guías paso a paso para Gemas de Gemini, Custom GPTs, Proyectos de Claude y Agentes de Mistral. Gratuito para siempre bajo licencia MIT.

### Français
Ce dépôt est un catalogue open-source de prompts et flux de travail d'IA avec des guides étape par étape pour les Gemmes Gemini, Custom GPTs, Projets Claude et Agents Mistral. Gratuit pour toujours sous licence MIT.

### Deutsch
Dieses Repository ist ein Open-Source-Katalog von KI-Prompts und Arbeitsabläufen mit Schritt-für-Schritt-Anleitungen für Gemini Gems, Custom GPTs, Claude Projects und Mistral Agents. Für immer kostenlos unter MIT-Lizenz.

</details>

---

## 📄 Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE) © 2026 F. Javier Mateo Márquez (ApliArte).
