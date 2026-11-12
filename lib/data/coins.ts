export type CoinPack = {
  id: string;
  name: string;
  coins: number;
  bonus: number; // pièces offertes en plus
  price: number;
  tag?: string;
  /** Illustration du pack (ex. "/shop/coins-1.png") — sinon pile de pièces */
  image?: string;
};

// ⚠ Paliers proposés — à valider (aucun prix en euros n'existe encore côté serveur).
// Rappel : la livraison doit AJOUTER au solde (coins = coins + X), jamais l'écraser.
export const coinPacks: CoinPack[] = [
  { id: "coins-1000", name: "Poignée", coins: 1000, bonus: 0, price: 1.99, image: "/shop/coins-1.svg" },
  { id: "coins-3000", name: "Sacoche", coins: 3000, bonus: 300, price: 4.99, image: "/shop/coins-2.svg" },
  { id: "coins-7000", name: "Coffre", coins: 7000, bonus: 1000, price: 9.99, tag: "Populaire", image: "/shop/coins-3.svg" },
  { id: "coins-16000", name: "Trésor", coins: 16000, bonus: 4000, price: 19.99, image: "/shop/coins-4.svg" },
  { id: "coins-45000", name: "Montagne d'or", coins: 45000, bonus: 15000, price: 49.99, tag: "Meilleure offre", image: "/shop/coins-5.svg" },
];
