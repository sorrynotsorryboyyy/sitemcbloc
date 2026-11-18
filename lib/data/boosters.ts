import type { IconName } from "@/components/Icon";
import { network, type BoosterEffect, type NetworkBooster } from "@/lib/data/network";

export type Booster = NetworkBooster & {
  icon: IconName;
  /** Illustration (ex. "/shop/boost-coins.svg") — sinon icône pixel */
  image?: string;
};

const look: Record<BoosterEffect, { icon: IconName; image: string }> = {
  coins: { icon: "coins", image: "/shop/boost-coins.svg" },
  xp: { icon: "star", image: "/shop/boost-xp.svg" },
  combo: { icon: "zap", image: "/shop/boost-combo.svg" },
  network: { icon: "globe", image: "/shop/boost-network.svg" },
};

// Boosters, durées et prix : data/network.json (mêmes valeurs pour le paiement et la livraison en jeu).
export const boosters: Booster[] = network.boosters.map((b) => ({ ...b, ...look[b.effect] }));

// Classes / kits payants en pièces (achat en jeu) — source : README mcblocManager.
export const paidKits = [
  { game: "Piggy Wars", range: "2 500 – 4 000 pièces", text: "Classes spéciales pour varier les styles de jeu." },
  { game: "CoreWars", range: "dès 2 500 pièces", text: "Classes comme le Démolisseur, idéal pour percer les défenses." },
  { game: "SumoGames", range: "2 000 – 3 000 pièces", text: "Kits pour prendre l'avantage sur le ring." },
];
