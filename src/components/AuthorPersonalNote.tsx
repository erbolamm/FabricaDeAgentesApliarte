import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart, Globe } from "lucide-react";

interface LanguageNote {
  code: string;
  name: string;
  flag: string;
  text: string;
}

const NOTES: LanguageNote[] = [
  {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
    text: "Soy Javier Mateo. Empecé a aprender programación de forma autodidacta el 4 de abril de 2023. Este Universo y la Fábrica de Agentes nacieron para ordenar todo lo que construyo, entender cómo se relaciona y compartirlo sin entregar el control de los datos. Cada planeta y cada prompt representa aprendizaje real, errores reales y el deseo genuino de crear herramientas útiles para otras personas.",
  },
  {
    code: "en",
    name: "English",
    flag: "🇬🇧",
    text: "I am Javier Mateo. I started learning to code as a self-taught developer on April 4, 2023. This Universe and the Agent Factory were born to organize everything I build, understand its connections, and share it without surrendering data ownership. Every node and prompt represents real learning, real mistakes, and a genuine desire to build useful tools for others.",
  },
  {
    code: "pt",
    name: "Português",
    flag: "🇧🇷",
    text: "Eu sou Javier Mateo. Comecei a aprender programação de forma autodidata em 4 de abril de 2023. Este Universo e a Fábrica de Agentes nasceram para organizar tudo o que construo, entender suas conexões e compartilhar sem abrir mão do controle dos dados. Cada planeta e cada prompt representam aprendizado real e a vontade de criar ferramentas úteis para todos.",
  },
  {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    text: "Je suis Javier Mateo. J'ai commencé à apprendre la programmation en autodidacte le 4 avril 2023. Cet Univers et la Fabrique d'Agents sont nés pour organiser tout ce que je construis, comprendre leurs relations et les partager sans céder le contrôle des données. Chaque planète et prompt représente un apprentissage réel et le désir de créer des outils utiles.",
  },
  {
    code: "de",
    name: "Deutsch",
    flag: "🇩🇪",
    text: "Ich bin Javier Mateo. Ich habe am 4. April 2023 autodidaktisch mit dem Programmieren begonnen. Dieses Universum und die Agenten-Fabrik entstanden, um meine Projekte zu strukturieren, Zusammenhänge zu verstehen und frei zu teilen, ohne die Datenkontrolle abzugeben. Jeder Planet und Prompt steht für echtes Lernen und nützliche Open-Source-Tools.",
  },
  {
    code: "it",
    name: "Italiano",
    flag: "🇮🇹",
    text: "Sono Javier Mateo. Ho iniziato a imparare a programmare da autodidatta il 4 aprile 2023. Questo Universo e la Fabbrica di Agenti sono nati per organizzare tutto ciò che costruisco, comprendere le connessioni e condividere liberamente senza cedere il controllo dei dati. Ogni pianeta e prompt rappresenta un apprendimento reale al servizio della comunità.",
  },
];

export function AuthorPersonalNote() {
  const [activeLang, setActiveLang] = useState("es");

  const current = NOTES.find((n) => n.code === activeLang) || NOTES[0];

  return (
    <section className="py-16 border-t border-border/60 bg-muted/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <Heart className="h-3.5 w-3.5 fill-current text-pink-500" />
            <span>Transparencia & Origen</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            💬 Una nota personal del autor
          </h2>
          <p className="text-xs text-muted-foreground">
            Un mismo mensaje en seis idiomas. No implica soporte funcional completo en todos ellos.
          </p>
        </div>

        {/* Selector de idiomas */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {NOTES.map((n) => (
            <button
              key={n.code}
              type="button"
              onClick={() => setActiveLang(n.code)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                activeLang === n.code
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/80 bg-card text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <span>{n.flag}</span>
              <span>{n.name}</span>
            </button>
          ))}
        </div>

        {/* Tarjeta de la nota */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-black shrink-0">
              {current.flag}
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                {current.name} · Javier Mateo (@erbolamm)
              </span>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-normal">
                "{current.text}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthorPersonalNote;
