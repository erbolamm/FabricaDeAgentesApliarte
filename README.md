# 🤖 Fábrica de Agentes & Prompts de IA — Open Source

> Plataforma comunitaria y de código abierto para descubrir, personalizar, copiar y ejecutar **Prompts y Workflows de IA de alta precisión** con tu propia IA (Bring Your Own Key).

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![100% Free & Open Source](https://img.shields.io/badge/Open_Source-100%25_Gratis-blue.svg)](https://github.com/apliarte/FabricaDeAgentesApliarte)
[![RevenueCat Support](https://img.shields.io/badge/RevenueCat-Supported-pink.svg)](https://revenuecat.com)

---

## ✨ Características Principales

1. **⚡ Prompts Listos para Copiar (1-Click)**:
   - System prompts e instrucciones estructuradas para ChatGPT, Claude, Cursor o cualquier LLM.
   - Rellenado dinámico de variables (`{{tema}}`, `{{target_role}}`, etc.).
   - Exportación directa en Markdown (`.md`).

2. **🔑 Conectores de IA (Bring Your Own Key)**:
   - Conecta directamente tus API keys de:
     - **DeepSeek** (`DeepSeek-V3` & `DeepSeek-R1`)
     - **Anthropic** (`Claude 3.7 Sonnet` Thinking & `Claude 3.5`)
     - **OpenAI** (`GPT-4o`, `GPT-4o-mini`, `o3-mini`)
     - **Google Gemini** (`Gemini 2.0 Flash` & `Pro`)
     - **Groq** (`Llama 3.3 70B`, `DeepSeek-R1 Distill`)
     - **OpenRouter** (200+ modelos en un solo endpoint)
     - **Ollama** (100% local y privado en tu máquina)

3. **🔒 100% Privado & Sin Firebase**:
   - Toda la configuración, claves y el historial se guardan únicamente en el `localStorage` de tu navegador.
   - Cero telemetría ni servidores backend centralizados.

4. **💖 100% Gratis con Soporte Voluntario**:
   - Sin paywalls obligatorios.
   - Apoyo voluntario mediante **RevenueCat Web** y **GitHub Sponsors**.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Lucide Icons
- **Gestor de paquetes**: pnpm
- **Almacenamiento**: LocalStorage / IndexedDB (Client-Side)
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
2. Añade tu prompt en `src/data/agents.ts` o usa la interfaz web para exportarlo.
3. Abre un Pull Request con la etiqueta `prompt:nuevo`.

---

## 📄 Licencia

Licencia [MIT](LICENSE) © ApliArte.
