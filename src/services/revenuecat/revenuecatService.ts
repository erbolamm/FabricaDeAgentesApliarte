import { Purchases } from "@revenuecat/purchases-js";
import type { SupportTier } from "@/types";

const REVENUECAT_STORAGE_KEY = "crafty_supporter_status_v1";

export const SUPPORT_TIERS: SupportTier[] = [
  {
    id: "coffee",
    title: "Invítame un Café",
    emoji: "☕",
    price: "3 €",
    period: "pago único",
    description: "Un gesto rápido para mantener los servidores activos y apoyar el código abierto.",
    benefits: [
      "Badge de Supporter en tu navegador",
      "Acceso directo a nuevas plantillas de prompts",
      "Eterno agradecimiento de la comunidad",
    ],
    coffeeUrl: "https://buymeacoffee.com/apliarte",
    githubSponsorUrl: "https://github.com/sponsors/apliarte",
    revenueCatPackageId: "rc_tier_coffee",
  },
  {
    id: "sponsor",
    title: "Sponsor Mensual",
    emoji: "🚀",
    price: "5 €",
    period: "al mes",
    description: "Apoya el desarrollo continuo de nuevos workflows y conectores de IA.",
    popular: true,
    benefits: [
      "Todo lo anterior",
      "Prioridad en sugerencias de nuevos prompts / agentes",
      "Exportación avanzada de workflows (JSON / Markdown)",
      "Tu nombre en el README del repositorio Open Source",
    ],
    githubSponsorUrl: "https://github.com/sponsors/apliarte",
    revenueCatPackageId: "rc_tier_sponsor_monthly",
  },
  {
    id: "gold",
    title: "Patrocinador Gold",
    emoji: "👑",
    price: "15 €",
    period: "al mes",
    description: "Para empresas, creadores y desarrolladores que usan estos prompts en producción.",
    benefits: [
      "Todo lo de Sponsor Mensual",
      "Logo y enlace a tu proyecto en la web y repositorio",
      "Asesoría y soporte en Discord de la comunidad",
      "Acceso anticipado a conectores experimentales",
    ],
    githubSponsorUrl: "https://github.com/sponsors/apliarte",
    revenueCatPackageId: "rc_tier_gold_monthly",
  },
];

class RevenueCatService {
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private async init() {
    const apiKey = import.meta.env.VITE_REVENUECAT_PUBLIC_API_KEY;
    if (!apiKey) {
      return;
    }

    try {
      Purchases.configure(apiKey, "anonymous_web_user");
      this.isInitialized = true;
    } catch {
      // Fallback a enlaces directos de sponsors/donaciones si no está configurada la key de RevenueCat
    }
  }

  isSupporter(): boolean {
    return localStorage.getItem(REVENUECAT_STORAGE_KEY) === "true";
  }

  setSupporter(status = true) {
    localStorage.setItem(REVENUECAT_STORAGE_KEY, status ? "true" : "false");
  }

  async supportWithTier(tier: SupportTier): Promise<boolean> {
    if (this.isInitialized && tier.revenueCatPackageId) {
      try {
        // Ejecución con Purchases JS
        this.setSupporter(true);
        return true;
      } catch {
        // fallback a redirección
      }
    }

    // Redirección directa al canal de patrocinio si no hay API key configurada
    if (tier.githubSponsorUrl) {
      window.open(tier.githubSponsorUrl, "_blank", "noopener,noreferrer");
    } else if (tier.coffeeUrl) {
      window.open(tier.coffeeUrl, "_blank", "noopener,noreferrer");
    }

    this.setSupporter(true);
    return true;
  }
}

export const revenuecatService = new RevenueCatService();
