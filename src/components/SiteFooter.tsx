import { Link } from "react-router-dom";
import { Github, Heart, Key, Bot, Mail } from "lucide-react";
import { generateFeedbackMailto } from "@/lib/feedback";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-background/50">
      <div className="container mx-auto grid grid-cols-2 gap-10 px-6 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
              🤖
            </span>
            Fábrica de Agentes ApliArte
          </Link>
          <p className="mt-3 max-w-xs text-xs text-muted-foreground leading-relaxed">
            Plataforma 100% Open Source de prompts avanzados y workflows de IA con ejecución BYOK
            (DeepSeek, Claude, GPT, Gemini, Groq, Ollama).
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <a
              href="https://github.com/erbolamm/FabricaDeAgentesApliarte"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground flex items-center gap-1"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <span>·</span>
            <Link to="/apoyar" className="hover:text-pink-500 flex items-center gap-1 text-pink-500">
              <Heart className="h-3.5 w-3.5 fill-current" /> Donar
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
            Prompts & IA
          </h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <Link to="/agentes" className="hover:text-foreground">
                Catálogo de Prompts
              </Link>
            </li>
            <li>
              <Link to="/conectores" className="hover:text-foreground flex items-center gap-1">
                <Key className="h-3 w-3 text-primary" /> Conectar tu IA
              </Link>
            </li>
            <li>
              <Link to="/mis-ejecuciones" className="hover:text-foreground">
                Historial Local
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
            Comunidad & Código
          </h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <a
                href="https://github.com/erbolamm/FabricaDeAgentesApliarte"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Repositorio GitHub
              </a>
            </li>
            <li>
              <a
                href="https://github.com/erbolamm/FabricaDeAgentesApliarte/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Contribuir Prompts (PR)
              </a>
            </li>
            <li>
              <Link to="/apoyar" className="hover:text-foreground">
                Patrocinar Proyecto
              </Link>
            </li>
            <li>
              <a
                href={generateFeedbackMailto({ contextName: "Pie de página", contextType: "general" })}
                className="hover:text-primary flex items-center gap-1 text-primary"
              >
                <Mail className="h-3 w-3" /> ¿Qué cambiarías? / Dudas
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
            Licencia & Privacidad
          </h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <span>Licencia MIT Open Source</span>
            </li>
            <li>
              <span>Privacidad Total (Cero Telemetría)</span>
            </li>
            <li>
              <span>Claves en LocalStorage</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        Hecho con ❤️ para la comunidad de IA y creadores · Open Source en GitHub.
      </div>
    </footer>
  );
};
