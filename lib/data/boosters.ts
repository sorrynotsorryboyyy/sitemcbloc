import type { IconName } from "@/components/Icon";

export type Booster = {
  id: string;
  name: string;
  icon: IconName;
  description: string;
  price: number;
  scope: "perso" | "réseau";
  /** Illustration (ex. "/shop/boost-coins.png") — sinon icône pixel */
  image?: string;
};

// ⚠ Propositions à valider : les boosters n'existent pas encore dans les plugins.
export const boosters: Booster[] = [
  { id: "boost-coins-x2-1h", name: "Booster pièces ×2 — 1 h", icon: "coins", image: "/shop/boost-coins.svg", description: "Double tes gains de pièces pendant 1 heure de jeu.", price: 1.49, scope: "perso" },
  { id: "boost-xp-x2-1h", name: "Booster XP ×2 — 1 h", icon: "star", image: "/shop/boost-xp.svg", description: "Double ton XP de pass saisonnier pendant 1 heure.", price: 1.49, scope: "perso" },
  { id: "boost-combo-24h", name: "Combo ×2 — 24 h", icon: "zap", image: "/shop/boost-combo.svg", description: "Pièces et XP doublés pendant 24 heures.", price: 4.99, scope: "perso" },
  { id: "boost-network-1h", name: "Booster réseau — 1 h", icon: "globe", image: "/shop/boost-network.svg", description: "Tout le réseau profite de +50 % de pièces pendant 1 heure. Ton pseudo est annoncé !", price: 6.99, scope: "réseau" },
];

// Classes / kits payants en pièces (achat en jeu) — source : README mcblocManager.
export const paidKits = [
  { game: "Piggy Wars", range: "2 500 – 4 000 pièces", text: "Classes spéciales pour varier les styles de jeu." },
  { game: "CoreWars", range: "dès 2 500 pièces", text: "Classes comme le Démolisseur, idéal pour percer les défenses." },
  { game: "SumoGames", range: "2 000 – 3 000 pièces", text: "Kits pour prendre l'avantage sur le ring." },
];
