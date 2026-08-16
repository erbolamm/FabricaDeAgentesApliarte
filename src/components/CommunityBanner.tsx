import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Sparkles, Coffee, ExternalLink, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BannerMessage {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  isExternal?: boolean;
  emoji: string;
}

const MESSAGES: BannerMessage[] = [
  {
    id: "2000-euros",
    badge: "💡 Realidad vs Humo",
    badgeColor: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    title: "Hay empresas cobrando 2.000 € por formaciones de IA...",
    description:
      "En ApliArte tienes los cursos y esta Fábrica de Agentes 100% gratis. Si te hace ganar pasta, ¡convídate a un café! 😉",
    ctaText: "☕ Convidar un café (3 €)",
    ctaLink: "/apoyar",
    emoji: "☕",
  },
  {
    id: "community-manifesto",
    badge: "👨‍💻 Código Abierto & Comunidad",
    badgeColor: "border-primary/30 bg-primary/10 text-primary",
    title: "Hago mis prompts, comparto mis prompts y espero los tuyos",
    description:
      "¿Tienes un prompt que te ahorra horas en tu trabajo? Súmalo al catálogo y ayuda a miles de programadores y creadores.",
    ctaText: "✨ Compartir mi Prompt",
    ctaLink: "/crear",
    emoji: "🚀",
  },
  {
    id: "ia-apliarte",
    badge: "🎓 Cursos de IA Gratuitos",
    badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    title: "Aprende IA desde cero sin pagar membresías",
    description:
      "Descubre tutoriales paso a paso, casos de uso prácticos y workflows en nuestro portal educativo abierto.",
    ctaText: "Ir a ia.apliarte.com",
    ctaLink: "https://ia.apliarte.com",
    isExternal: true,
    emoji: "📚",
  },
  {
    id: "legacy-supporter",
    badge: "👑 Mecenas Fundador",
    badgeColor: "border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400",
    title: "Inmortaliza tu nombre en GitHub y en el Universo ErBolamm",
    description:
      "Los Mecenas Fundadores apoyan el software libre y quedan grabados para siempre en el README oficial y en el grafo 3D.",
    ctaText: "👑 Ser Mecenas Fundador",
    ctaLink: "/apoyar",
    emoji: "🌟",
  },
];

interface CommunityBannerProps {
  variant?: "floating" | "inline";
  className?: string;
}

export function CommunityBanner({ variant = "inline", className = "" }: CommunityBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  // Rotación periódica cada 10 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  if (isDismissed) return null;

  const msg = MESSAGES[currentIndex];

  if (variant === "floating") {
    return (
      <div
        className={`fixed bottom-4 right-4 z-40 max-w-sm rounded-2xl border border-border/80 bg-card/95 p-4 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${className}`}
      >
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground p-1 rounded-full"
          aria-label="Cerrar banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-start gap-3">
          <span className="text-2xl">{msg.emoji}</span>
          <div className="space-y-1 pr-4">
            <Badge variant="outline" className={`text-[10px] py-0 px-2 font-semibold ${msg.badgeColor}`}>
              {msg.badge}
            </Badge>
            <h4 className="text-xs font-bold text-foreground leading-snug">{msg.title}</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{msg.description}</p>
            <div className="pt-1.5 flex items-center gap-2">
              {msg.isExternal ? (
                <Button size="sm" variant="default" asChild className="h-7 text-[11px] rounded-full px-3 gap-1">
                  <a href={msg.ctaLink} target="_blank" rel="noopener noreferrer">
                    {msg.ctaText} <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              ) : (
                <Button size="sm" variant="default" asChild className="h-7 text-[11px] rounded-full px-3 gap-1">
                  <Link to={msg.ctaLink}>
                    {msg.ctaText} <ChevronRight className="h-3 w-3" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variant "inline" para catálogo o páginas
  return (
    <div
      className={`rounded-3xl border border-primary/20 bg-gradient-to-r from-card/80 via-primary/5 to-card/80 p-6 md:p-8 shadow-sm relative overflow-hidden transition-all duration-500 ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl shrink-0 shadow-inner">
            {msg.emoji}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={`text-[11px] py-0.5 px-2.5 font-bold ${msg.badgeColor}`}>
                {msg.badge}
              </Badge>
              <span className="text-[10px] text-muted-foreground font-mono">
                Mensaje de la comunidad ({currentIndex + 1}/{MESSAGES.length})
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">{msg.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">{msg.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % MESSAGES.length)}
            className="text-xs text-muted-foreground hover:text-foreground h-9"
          >
            Siguiente ➔
          </Button>

          {msg.isExternal ? (
            <Button size="sm" asChild className="gap-1.5 text-xs font-bold rounded-full px-5 h-9 shadow-sm">
              <a href={msg.ctaLink} target="_blank" rel="noopener noreferrer">
                {msg.ctaText} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          ) : (
            <Button size="sm" asChild className="gap-1.5 text-xs font-bold rounded-full px-5 h-9 shadow-sm">
              <Link to={msg.ctaLink}>
                {msg.ctaText} <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityBanner;
