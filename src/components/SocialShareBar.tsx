import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export function SocialShareBar() {
  const shareUrl = "https://github.com/erbolamm/FabricaDeAgentesApliarte";
  const shareText = "Fábrica de Agentes & ErBolamm Universo: Catálogo Open Source de Prompts y Software en 3D listo para usar con Gemini, GPT y Claude.";

  const links = [
    {
      name: "𝕏 Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "hover:text-sky-400",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "hover:text-blue-500",
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(shareText + " 👉 " + shareUrl)}`,
      color: "hover:text-emerald-500",
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: "hover:text-sky-500",
    },
    {
      name: "Reddit",
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
      color: "hover:text-orange-500",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      url: `mailto:?subject=${encodeURIComponent("Descubre la Fábrica de Agentes & ErBolamm Universo")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
      color: "hover:text-purple-400",
    },
  ];

  return (
    <section className="py-14 border-t border-border/60 bg-background text-center">
      <div className="container mx-auto px-4 max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          <Share2 className="h-3.5 w-3.5" />
          <span>Comunidad & Difusión</span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          💥 Comparte el Universo
        </h3>
        <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Si te ayuda a explicar lo que construís o a ahorrar tiempo con IA, compartilo para que más creadores puedan ordenar y potenciar su ecosistema.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          {links.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              asChild
              className={`rounded-full text-xs font-semibold px-4 h-8 bg-card/80 transition-colors ${link.color}`}
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialShareBar;
