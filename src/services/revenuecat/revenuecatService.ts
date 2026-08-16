import { Purchases } from "@revenuecat/purchases-js";
import type { SupportTier } from "@/types";

const REVENUECAT_STORAGE_KEY = "crafty_supporter_status_v1";

export const SUPPORT_TIERS: SupportTier[] = [
  {
    id: "coffee",
    title: "Impulso Café",
    emoji: "☕",
    price: "3 €",
    period: "pago único",
    description: "Un café para el taller de Javier que financia horas de investigación en nuevos prompts.",
    benefits: [
      "Badge virtual de Agradecido en tu navegador",
      "Acceso libre a todos los 34+ prompts de por vida",
      "La satisfacción de impulsar el software libre",
    ],
    coffeeUrl: "https://ko-fi.com/C0C11TWR1K",
    githubSponsorUrl: "https://github.com/sponsors/erbolamm",
    revenueCatPackageId: "rc_tier_coffee",
  },
  {
    id: "sponsor",
    title: "Co-Creador IA",
    emoji: "🚀",
    price: "5 €",
    period: "al mes",
    description: "Socio activo de la comunidad. Tu apoyo directo expande el catálogo mes a mes.",
    popular: true,
    benefits: [
      "Todo lo del Impulso Café",
      "Voz y voto en los nuevos prompts que se desarrollan cada mes",
      "Insignia Supporter dorada en tu perfil local",
      "Acceso a directos y tutoriales en vivo en Twitch",
    ],
    githubSponsorUrl: "https://github.com/sponsors/erbolamm",
    revenueCatPackageId: "rc_tier_sponsor_monthly",
  },
  {
    id: "legacy",
    title: "Mecenas Fundador (Legacy)",
    emoji: "👑",
    price: "15 €",
    period: "al mes",
    description: "Inmortalizado para siempre como pilar fundador en GitHub y en el Universo ErBolamm.",
    benefits: [
      "Todo lo de Co-Creador IA",
      "Tu nombre y avatar grabados en el README oficial de GitHub",
      "Nodo de honor en el Grafo 3D de Universo ErBolamm",
      "Acceso prioritario a herramientas experimentales",
    ],
    githubSponsorUrl: "https://github.com/sponsors/erbolamm",
    revenueCatPackageId: "rc_tier_legacy_monthly",
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
        this.setSupporter(true);
        return true;
      } catch {
        // fallback
      }
    }

    // Redirección directa al canal canónico de patrocinio
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
