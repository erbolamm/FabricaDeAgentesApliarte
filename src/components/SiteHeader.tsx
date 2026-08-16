import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Key,
  Heart,
  Github,
  Sparkles,
  History,
  Bot,
  Menu,
  X,
  BookOpen,
  ArrowRight,
  Compass,
  Layers,
} from "lucide-react";

export const SiteHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/60">
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
        {/* LOGO & MARCA */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-foreground flex-shrink-0"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-black shadow-sm">
            🤖
          </span>
          <div className="flex items-center gap-1.5">
            <span className="truncate max-w-[140px] sm:max-w-none">Fábrica de Agentes</span>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex text-[10px] py-0 px-1.5 text-emerald-500 border-emerald-500/30 font-mono font-bold"
            >
              Open Source
            </Badge>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP (PANTALLAS GRANDES >= lg) */}
        <ul className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-medium text-muted-foreground">
          <li>
            <NavLink
              to="/agentes"
              className={({ isActive }) =>
                isActive ? "text-foreground font-bold" : "hover:text-foreground transition-colors"
              }
            >
              Catálogo
            </NavLink>
          </li>
          <li>
            <a href="#beneficios" className="hover:text-foreground transition-colors">
              Beneficios
            </a>
          </li>
          <li>
            <a href="#como-funciona" className="hover:text-foreground transition-colors">
              Cómo Funciona
            </a>
          </li>
          <li>
            <a href="#roadmap" className="hover:text-foreground transition-colors">
              Roadmap
            </a>
          </li>
          <li>
            <NavLink
              to="/crear"
              className={({ isActive }) =>
                `flex items-center gap-1.5 ${
                  isActive ? "text-primary font-bold" : "hover:text-foreground transition-colors"
                }`
              }
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Taller & Creador</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/conectores"
              className={({ isActive }) =>
                `flex items-center gap-1.5 ${
                  isActive ? "text-foreground font-bold" : "hover:text-foreground transition-colors"
                }`
              }
            >
              <Key className="h-3.5 w-3.5 text-primary" />
              <span>Conectores IA</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/apoyar"
              className={({ isActive }) =>
                `flex items-center gap-1.5 ${
                  isActive ? "text-pink-500 font-bold" : "hover:text-pink-500 transition-colors"
                }`
              }
            >
              <Heart className="h-3.5 w-3.5 text-pink-500 fill-pink-500/20" />
              <span>Apoyar</span>
            </NavLink>
          </li>
        </ul>

        {/* ACCIONES DERECHA & BOTÓN MÓVIL */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden sm:inline-flex gap-1.5 text-xs h-8 rounded-full border-border/80 hover:bg-accent"
          >
            <a
              href="https://github.com/erbolamm/FabricaDeAgentesApliarte"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
              <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full font-mono text-muted-foreground">
                ⭐ Star
              </span>
            </a>
          </Button>

          <Button
            size="sm"
            asChild
            className="rounded-full text-xs h-8 px-3.5 gap-1.5 shadow-sm font-bold bg-primary hover:bg-primary/90"
          >
            <Link to="/conectores">
              <Key className="h-3 w-3" />
              <span>Conectar IA</span>
            </Link>
          </Button>

          {/* BOTÓN HAMBURGUESA MÓVIL (VISIBLE EN < lg) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border/80 bg-background/95 backdrop-blur-xl px-4 py-5 shadow-2xl space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Menú de Navegación
            </span>
            <Badge variant="outline" className="text-[10px] text-emerald-500 border-emerald-500/30">
              100% Libre
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              to="/agentes"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/60 hover:border-primary/40 font-medium"
            >
              <Bot className="h-4 w-4 text-primary" />
              <span>Catálogo (34)</span>
            </Link>

            <Link
              to="/crear"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/60 hover:border-primary/40 font-medium"
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Taller & Creador</span>
            </Link>

            <Link
              to="/conectores"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-card border border-border/60 hover:border-primary/40 font-medium"
            >
              <Key className="h-4 w-4 text-primary" />
              <span>Conectores BYOK</span>
            </Link>

            <Link
              to="/apoyar"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-500 font-bold"
            >
              <Heart className="h-4 w-4 fill-current" />
              <span>Apoyar Proyecto</span>
            </Link>
          </div>

          <div className="pt-2 flex flex-col gap-2 text-xs text-muted-foreground border-t border-border/40">
            <a
              href="#beneficios"
              onClick={closeMobileMenu}
              className="py-1.5 px-2 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
            >
              🌀 Beneficios & Arquitectura 3D
            </a>
            <a
              href="#como-funciona"
              onClick={closeMobileMenu}
              className="py-1.5 px-2 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
            >
              📋 Cómo Funciona (Paso a Paso)
            </a>
            <a
              href="#roadmap"
              onClick={closeMobileMenu}
              className="py-1.5 px-2 rounded-lg hover:bg-muted hover:text-foreground transition-colors"
            >
              🗺️ Roadmap por Fases
            </a>
            <Link
              to="/mis-ejecuciones"
              onClick={closeMobileMenu}
              className="py-1.5 px-2 rounded-lg hover:bg-muted hover:text-foreground transition-colors flex items-center justify-between"
            >
              <span>🕒 Historial de Ejecuciones Locales</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full gap-2 text-xs rounded-xl border-border"
            >
              <a
                href="https://github.com/erbolamm/FabricaDeAgentesApliarte"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span>Ver Código en GitHub (⭐ Star)</span>
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
