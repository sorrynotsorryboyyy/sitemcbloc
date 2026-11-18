import { network } from "@/lib/data/network";

export type CoinPack = {
  id: string;
  name: string;
  coins: number;
  bonus: number; // pièces offertes en plus
  price: number;
  tag?: string;
  /** Illustration du pack (ex. "/shop/coins-1.svg") — sinon pile de pièces */
  image?: string;
};

// Packs et prix : data/network.json (le bot relit les mêmes prix pour le paiement Tebex).
// La livraison AJOUTE au solde (coins + bonus), jamais ne l'écrase.
export const coinPacks: CoinPack[] = network.coinPacks.map((p, i) => ({ ...p, image: `/shop/coins-${Math.min(i + 1, 5)}.svg` }));
