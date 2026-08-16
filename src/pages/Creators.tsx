import { useState } from "react";
import { Link } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = [
  {
    q: "¿Qué es un agente y cómo lo creo?",
    a: "Un agente es un flujo automatizado construido con herramientas como n8n, Make o código propio. Lo publicás definiendo su nombre, categoría, inputs que necesita y la URL del webhook que lo ejecuta. Nosotros nos encargamos del resto.",
  },
  {
    q: "¿Cómo se ejecuta el agente cuando un usuario lo usa?",
    a: "Cuando un usuario ejecuta tu agente, enviamos un POST a tu webhookUrl con los inputs que definiste. Tu flujo procesa la tarea y devuelve el resultado. Si no tenés webhook configurado, el agente usa una salida de ejemplo.",
  },
  {
    q: "¿Cómo y cuándo cobro?",
    a: "Cada ejecución exitosa descuenta créditos del usuario y acredita una comisión en tu cuenta. El sistema de pagos y retiros está en desarrollo — te notificamos cuando esté activo.",
  },
  {
    q: "¿Puedo publicar agentes en múltiples categorías?",
    a: "Por ahora cada agente pertenece a una categoría (productividad, marketing, ventas, soporte u operaciones). Podés publicar tantos agentes como quieras, uno por categoría o varios en la misma.",
  },
  {
    q: "¿Puedo dejar un agente como borrador?",
    a: 'Sí. En tu panel de creador podés crear el agente con el campo "Publicado" en false. Solo vos lo vas a ver hasta que lo actives.',
  },
  {
    q: "¿Qué pasa si mi webhook falla?",
    a: "Si el webhook responde con un error o no responde, la ejecución se marca como fallida y los créditos del usuario se devuelven automáticamente. Tu comisión no se acredita en ese caso.",
  },
  {
    q: "¿Hay límite de agentes por cuenta?",
    a: "No por ahora. Publicá todos los agentes que necesites.",
  },
];

const Creators = () => {
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="px-6 py-24">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-secondary-dark">
              Para creadores
            </p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight md:text-6xl">
              Publica agentes y monetiza tu expertise
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Convierte tus flujos en agentes reutilizables. Cobra por cada ejecución.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/creadores/dashboard">Ir a mi panel</Link>
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full" onClick={() => setFaqOpen(true)}>
                Ver cómo funciona
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-muted-warm/20 px-6 py-20">
          <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { t: "Diseña", d: "Define inputs, prompts y herramientas en nuestro editor visual." },
              { t: "Publica", d: "Sube tu agente al catálogo en minutos." },
              { t: "Cobra", d: "Recibes una comisión por cada ejecución de tu agente." },
            ].map((s) => (
              <div key={s.t} className="rounded-3xl border border-border bg-card p-8">
                <h3 className="mb-3 text-2xl font-semibold tracking-tight">{s.t}</h3>
                <p className="text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Dialog open={faqOpen} onOpenChange={setFaqOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Preguntas frecuentes</DialogTitle>
          </DialogHeader>
          <Accordion type="single" collapsible className="mt-2 w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
};

export default Creators;
