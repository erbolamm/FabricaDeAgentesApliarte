import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { Key, Heart, Github, Sparkles, History, Bot, Code } from "lucide-react";

export const SiteHeader = () => {
  const { profile } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60">
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-extrabold shadow-sm">
            🤖
          </span>
          <span className="flex items-center gap-1.5">
            Fábrica de Agentes
            <Badge variant="outline" className="text-[10px] py-0 px-1.5 text-emerald-500 border-emerald-500/30 font-mono">
              Open Source
            </Badge>
          </span>
        </Link>

        {/* Links Principales */}
        <ul className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <li>
            <NavLink
              to="/agentes"
              className={({ isActive }) =>
                isActive ? "text-foreground font-semibold" : "hover:text-foreground transition-colors"
              }
            >
              Catálogo de Prompts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/conectores"
              className={({ isActive }) =>
                `flex items-center gap-1.5 ${
                  isActive ? "text-foreground font-semibold" : "hover:text-foreground transition-colors"
                }`
              }
            >
              <Key className="h-3.5 w-3.5 text-primary" />
              <span>Conectores IA</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mis-ejecuciones"
              className={({ isActive }) =>
                `flex items-center gap-1.5 ${
                  isActive ? "text-foreground font-semibold" : "hover:text-foreground transition-colors"
                }`
              }
            >
              <History className="h-3.5 w-3.5" />
              <span>Historial</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/apoyar"
              className={({ isActive }) =>
                `flex items-center gap-1.5 ${
                  isActive ? "text-pink-500 font-semibold" : "hover:text-pink-500 transition-colors"
                }`
              }
            >
              <Heart className="h-3.5 w-3.5 text-pink-500 fill-pink-500/20" />
              <span>Apoyar</span>
            </NavLink>
          </li>
        </ul>

        {/* Acciones & GitHub */}
        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs h-8 border-border">
            <a
              href="https://github.com/erbolamm/FabricaDeAgentesApliarte"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <Github className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">GitHub</span>
              <span className="text-[10px] bg-muted px-1.5 py-0.2 rounded font-mono">⭐ Star</span>
            </a>
          </Button>

          <Button size="sm" asChild className="rounded-full text-xs h-8 gap-1.5">
            <Link to="/conectores">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tu propia IA</span>
              <span className="sm:hidden">IA</span>
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
