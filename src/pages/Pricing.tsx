import { useState } from "react";
import { SUPPORT_TIERS, revenuecatService } from "@/services";
import type { SupportTier } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FeedbackButton } from "@/components/FeedbackButton";
import { Heart, Github, Sparkles, Check, Coffee, Code2, Globe } from "lucide-react";

export function Pricing() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [isSupporter, setIsSupporter] = useState(() => revenuecatService.isSupporter());

  const handleSupport = async (tier: SupportTier) => {
    setLoadingTier(tier.id);
    try {
      await revenuecatService.supportWithTier(tier);
      setIsSupporter(true);
    } catch {
      // fallback
    } finally {
      setLoadingTier(null);
    }
  };

  const getButtonLabel = (tier: SupportTier, isLoading: boolean) => {
    if (isLoading) return "Procesando...";
    if (tier.id === "coffee") return `Invitar un café a Javier (${tier.price})`;
    if (tier.id === "sponsor") return `Unirme como Co-Creador (${tier.price})`;
    return `Inmortalizarme como Mecenas Fundador (${tier.price})`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Hero Section con PNL */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold text-pink-600 dark:text-pink-400 mb-4">
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>Mecenazgo & Código Abierto — 100% Libre</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            El Conocimiento es Libre. <span className="text-primary">El Tiempo es Valioso.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Yo pongo las horas de investigación, pruebas y código abierto; vos te llevás los resultados listos para usar.
            Si estos <strong>34 prompts de alta precisión</strong> te ahorran aunque sea 1 hora de trabajo esta semana,
            tu apoyo hace que sigamos construyendo el mayor ecosistema de IA abierta en español.
          </p>

          {isSupporter && (
            <div className="mt-6 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-xs font-medium">
              <Sparkles className="h-4 w-4" />
              <span>¡Eres un Supporter activo! Tu apoyo financia el desarrollo de nuevos prompts.</span>
            </div>
          )}
        </div>

        {/* Tiers de Patrocinio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {SUPPORT_TIERS.map((tier) => {
            const isLoading = loadingTier === tier.id;

            return (
              <Card
                key={tier.id}
                className={`relative flex flex-col justify-between border transition-all ${
                  tier.popular
                    ? "border-primary shadow-xl ring-1 ring-primary bg-card"
                    : "border-border bg-card/60"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      Recomendado · Comunidad
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="text-3xl mb-2">{tier.emoji}</div>
                  <CardTitle className="text-xl font-bold">{tier.title}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-1">{tier.description}</CardDescription>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold">{tier.price}</span>
                    <span className="text-xs text-muted-foreground">/{tier.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 text-xs">
                  <span className="font-semibold text-foreground block">Impacto en el proyecto:</span>
                  {tier.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-tight">{b}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-4">
                  <Button
                    onClick={() => handleSupport(tier)}
                    disabled={isLoading}
                    variant={tier.popular ? "default" : "outline"}
                    className="w-full gap-2 text-xs font-semibold h-10 shadow-sm"
                  >
                    {tier.id === "coffee" ? (
                      <Coffee className="h-4 w-4" />
                    ) : (
                      <Heart className="h-4 w-4 fill-current" />
                    )}
                    {getButtonLabel(tier, isLoading)}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Canales Canónicos de Apoyo */}
        <div className="rounded-3xl border border-border bg-card/40 p-8 text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto">
            <Globe className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold">Otras Formas de Respaldar el Proyecto</h3>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Puedes apoyar con PayPal, Ko-fi, dejando una estrella en GitHub o enviando tus propios prompts por Pull Request.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button variant="outline" size="sm" asChild className="gap-2 text-xs">
              <a
                href="https://github.com/erbolamm/FabricaDeAgentesApliarte"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" /> ⭐ Estrella en GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="gap-2 text-xs">
              <a
                href="https://ko-fi.com/C0C11TWR1K"
                target="_blank"
                rel="noopener noreferrer"
              >
                ☕ Ko-fi
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="gap-2 text-xs">
              <a
                href="https://paypal.me/erbolamm"
                target="_blank"
                rel="noopener noreferrer"
              >
                💳 PayPal
              </a>
            </Button>
            <FeedbackButton
              contextName="Página de Apoyo y Mecenazgo"
              contextType="apoyar"
              label="¿Qué cambiarías o qué dudas tienes?"
            />
          </div>
        </div>

        {/* FAQ con PNL */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-xl font-bold text-center mb-6">Preguntas Frecuentes</h3>

          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-border p-4 bg-card/60">
              <p className="font-semibold text-foreground mb-1">
                ¿Por qué todo el catálogo es 100% gratuito sin paywalls?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Creemos que el acceso a herramientas de IA debe ser libre y sin intermediarios. Las suscripciones obligatorias limitan la innovación; el mecenazgo voluntario crea una comunidad sólida de constructores.
              </p>
            </div>

            <div className="rounded-xl border border-border p-4 bg-card/60">
              <p className="font-semibold text-foreground mb-1">
                ¿Qué significa ser un "Mecenas Fundador (Legacy)"?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Los Mecenas Fundadores son los pilares del proyecto. Tu nombre y avatar quedan grabados en el README oficial de GitHub y en el grafo 3D del Universo ErBolamm como co-creador permanente.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

export default Pricing;
