import { Link } from "react-router-dom";
import { Github, Heart, Key, Mail, Sparkles, ExternalLink } from "lucide-react";
import { generateFeedbackMailto } from "@/lib/feedback";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-background/50">
      <div className="container mx-auto grid grid-cols-2 gap-10 px-6 py-12 md:grid-cols-4">
        {/* Columna 1: Marca & Universo */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 text-base font-bold tracking-tight text-foreground">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-sm">
              🤖
            </span>
            <span>ErBolamm Universo</span>
          </Link>
          <p className="mt-3 max-w-xs text-xs text-muted-foreground leading-relaxed">
            Tu ecosistema de software y prompts convertido en un universo navegable. 100% Open Source y privado.
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
              <Heart className="h-3.5 w-3.5 fill-current" /> Apoyar
            </Link>
          </div>
        </div>

        {/* Columna 2: Producto */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
            Producto
          </h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <a href="#beneficios" className="hover:text-foreground">
                Beneficios
              </a>
            </li>
            <li>
              <a href="#como-funciona" className="hover:text-foreground">
                Cómo Funciona
              </a>
            </li>
            <li>
              <a href="#roadmap" className="hover:text-foreground">
                Roadmap
              </a>
            </li>
            <li>
              <Link to="/apoyar" className="hover:text-foreground">
                Planes & Mecenazgo
              </Link>
            </li>
            <li>
              <Link to="/agentes" className="hover:text-foreground">
                Catálogo de Prompts
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Comunidad */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
            Comunidad
          </h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <Link to="/apoyar" className="hover:text-pink-500 text-pink-500 font-semibold flex items-center gap-1">
                <Heart className="h-3 w-3 fill-current" /> Apoyar el Proyecto
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/erbolamm/FabricaDeAgentesApliarte"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground flex items-center gap-1"
              >
                <Github className="h-3 w-3" /> GitHub Repo
              </a>
            </li>
            <li>
              <Link to="/conectores" className="hover:text-foreground flex items-center gap-1">
                <Key className="h-3 w-3 text-primary" /> Conectar tu IA (BYOK)
              </Link>
            </li>
            <li>
              <Link to="/crear" className="hover:text-foreground flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500" /> Crear Prompt
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

        {/* Columna 4: Autor & Enlaces Canónicos */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">
            Autor
          </h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>
              <a href="https://apliarte.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                ApliArte (Web)
              </a>
            </li>
            <li>
              <a href="https://ia.apliarte.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                ia.apliarte.com (Cursos)
              </a>
            </li>
            <li>
              <a href="https://www.twitch.tv/apliarte" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400">
                Twitch (@apliarte)
              </a>
            </li>
            <li>
              <a href="https://github.com/erbolamm" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                @erbolamm (GitHub)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © 2026 ApliArte · MIT License · Creado con 🧠 por Javier Mateo
      </div>
    </footer>
  );
};
