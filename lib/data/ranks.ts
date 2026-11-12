import { network } from "@/lib/data/network";

export type Rank = {
  id: string;
  name: string;
  price: number;
  color: string;
  bonus: string;
  includes?: string;
  perks: string[];
  popular?: boolean;
  /** Emblème du grade (ex. "/shop/rank-vip.png") — sinon couronne pixel colorée */
  image?: string;
};

// Grades, prix et avantages : data/network.json (mêmes valeurs qu'en jeu via /grades).
export const ranks: Rank[] = network.ranks.map((r) => ({ ...r, image: `/shop/rank-${r.id}.svg` }));

/** Lignes du tableau comparatif : valeur par grade (true = inclus). */
export const rankComparison: { label: string; values: (string | boolean)[] }[] = [
  { label: "Bonus pièces / XP", values: ["+10 %", "+25 %", "+50 %", "+75 %"] },
  { label: "Préfixe & pseudo coloré", values: [true, true, true, true] },
  { label: "Piste VIP du pass", values: [false, true, true, true] },
  { label: "/fly au lobby", values: [false, true, true, true] },
  { label: "Rejoindre si plein", values: [false, true, true, true] },
  { label: "Couleurs dans le chat", values: [false, false, true, true] },
  { label: "Arrivée annoncée", values: [false, false, true, true] },
  { label: "Cosmétiques exclusifs", values: [false, "VIP", "VIP+", "Légende"] },
];
