import { useState } from "react";
import { SUPPORT_TIERS, revenuecatService } from "@/services";
import type { SupportTier } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FeedbackButton } from "@/components/FeedbackButton";
import { Heart, Github, Sparkles, Check, Coffee, ShieldCheck, Code2 } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>100% Gratis & Código Abierto (Open Source)</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Apoya el Proyecto & la Comunidad
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Sin suscripciones obligatorias ni barreras de pago. Todo el catálogo de prompts, workflows
            y conectores de IA es libre para siempre. Si te resulta útil, puedes apoyar su desarrollo
            continuo.
          </p>

          {isSupporter && (
            <div className="mt-6 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-xs font-medium">
              <Sparkles className="h-4 w-4" />
              <span>¡Eres un Supporter activo! Gracias por hacer posible este proyecto.</span>
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
                    ? "border-primary shadow-lg ring-1 ring-primary bg-card"
                    : "border-border bg-card/60"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-0.5 text-xs font-semibold uppercase tracking-wider">
                      Más Popular
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="text-3xl mb-2">{tier.emoji}</div>
                  <CardTitle className="text-xl">{tier.title}</CardTitle>
                  <CardDescription className="text-xs">{tier.description}</CardDescription>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold">{tier.price}</span>
                    <span className="text-xs text-muted-foreground">/{tier.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 text-xs">
                  <span className="font-semibold text-foreground block">Incluye:</span>
                  {tier.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-4">
                  <Button
                    onClick={() => handleSupport(tier)}
                    disabled={isLoading}
                    variant={tier.popular ? "default" : "outline"}
                    className="w-full gap-2 text-xs font-semibold"
                  >
                    {tier.id === "coffee" ? (
                      <Coffee className="h-4 w-4" />
                    ) : (
                      <Heart className="h-4 w-4 fill-current" />
                    )}
                    {isLoading ? "Procesando..." : `Apoyar con ${tier.price}`}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Canales Alternativos de Apoyo */}
        <div className="rounded-2xl border border-border bg-card/40 p-8 text-center space-y-4 max-w-3xl mx-auto mb-16">
          <h3 className="text-lg font-bold">Otras Formas de Contribuir al Código Abierto</h3>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            ¿No puedes donar dinero? ¡No hay problema! Puedes ayudarnos compartiendo la herramienta,
            enviando tus propios prompts o dejando una estrella en GitHub.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button variant="outline" size="sm" asChild className="gap-2 text-xs">
              <a
                href="https://github.com/apliarte/FabricaDeAgentesApliarte"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" /> Dar Estrella en GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="gap-2 text-xs">
              <a
                href="https://github.com/apliarte/FabricaDeAgentesApliarte/pulls"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Code2 className="h-4 w-4" /> Enviar un Prompt (Pull Request)
              </a>
            </Button>
            <FeedbackButton
              contextName="Página de Apoyo y Donaciones"
              contextType="apoyar"
              label="¿Qué cambiarías o qué dudas tienes?"
            />
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className="text-xl font-bold text-center mb-6">Preguntas Frecuentes</h3>

          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-border p-4">
              <p className="font-semibold text-foreground mb-1">
                ¿Por qué es 100% gratuito y sin pagos obligatorios?
              </p>
              <p className="text-muted-foreground">
                Creemos que el acceso a prompts y herramientas de IA debe ser libre y accesible para
                todos. Con el modelo BYOK (Bring Your Own Key), tú pagas solo por los tokens que usas
                directamente a los proveedores oficiales (DeepSeek, OpenAI, etc.), sin comisiones
                intermedias.
              </p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="font-semibold text-foreground mb-1">
                ¿Qué pasarela procesa los pagos de donación?
              </p>
              <p className="text-muted-foreground">
                Las donaciones y patrocinios se gestionan mediante **RevenueCat Web** y **GitHub Sponsors**,
                ofreciendo transacciones seguras y transparentes.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
