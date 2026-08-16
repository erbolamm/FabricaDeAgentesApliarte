import { Check, HelpCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    number: "1",
    title: "Entra a tu Universo",
    description: "Abre el catálogo y el visor de prompts desde cualquier navegador compatible.",
  },
  {
    number: "2",
    title: "Conecta tu cuenta o modo local",
    description: "Usa tus propias claves (BYOK) o explora primero con las plantillas gratuitas.",
  },
  {
    number: "3",
    title: "Agrega tu primer prompt / planeta",
    description: "Elige una de las 34 plantillas o crea la tuya personalizada en el creador visual.",
  },
  {
    number: "4",
    title: "Configura pilar y variables",
    description: "Rellena los datos dinámicos ({{tema}}, {{target_role}}) y asígnalo a su pilar.",
  },
  {
    number: "5",
    title: "Configura en Gemini, GPT o Claude",
    description: "Sigue la guía visual paso a paso para crearlo como Gema, Custom GPT o Project.",
  },
  {
    number: "6",
    title: "Comparte tu Universo público",
    description: "Exporta tu trabajo en Markdown o comparte tus flujos con la comunidad libremente.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 border-t border-border/60 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Guía de Inicio Rápido
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Cómo funciona, paso a paso
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Seis pasos cortos. Una acción clara en cada paso para poner a trabajar tu ejército de IA.
          </p>
        </div>

        {/* Pasos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl border border-border/80 bg-card p-6 relative overflow-hidden space-y-3 hover:border-primary/40 transition-all shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary font-black text-lg">
                {step.number}
              </div>
              <h3 className="text-base font-bold text-foreground">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Mini FAQs directas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
              <HelpCircle className="h-4 w-4 text-primary shrink-0" />
              <span>¿Pueden otros modificar mis planetas o prompts?</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-6">
              <strong>No.</strong> Cada persona trabaja en un espacio aislado local en su navegador (localStorage). Nadie puede modificar ni acceder a tus prompts privados ni claves.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-2">
            <div className="flex items-center gap-2 text-foreground font-semibold text-xs">
              <HelpCircle className="h-4 w-4 text-primary shrink-0" />
              <span>¿Qué pasa si mi proyecto no es público?</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pl-6">
              Puede quedarse 100% privado en tu equipo. Vos decidís qué nodo se exporta y qué información se comparte.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
