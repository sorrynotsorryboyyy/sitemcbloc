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

// Source : mcblocManager/README.md + core config.yml (ranks-shop) + db/V12__ranks.sql
export const ranks: Rank[] = [
  {
    id: "starter",
    image: "/shop/rank-starter.svg",
    name: "Starter",
    price: 3.99,
    color: "#ffb38a",
    bonus: "+10 %",
    perks: ["Préfixe [Starter] et pseudo coloré", "+10 % de pièces et d'XP", "Titre « Starter »"],
  },
  {
    id: "vip",
    image: "/shop/rank-vip.svg",
    name: "VIP",
    price: 7.99,
    color: "#4dd2ff",
    bonus: "+25 %",
    includes: "Starter",
    popular: true,
    perks: [
      "+25 % de pièces et d'XP",
      "+50 % sur la récompense quotidienne",
      "Piste VIP du pass saisonnier",
      "/fly au lobby",
      "Connexion même si le réseau est plein",
      "Pas de délai dans le chat",
      "100 amis, groupes de 12",
      "Cosmétiques VIP",
    ],
  },
  {
    id: "vipplus",
    image: "/shop/rank-vipplus.svg",
    name: "VIP+",
    price: 12.99,
    color: "#f5c518",
    bonus: "+50 %",
    includes: "VIP",
    perks: [
      "+50 % de pièces et d'XP",
      "Couleurs dans le chat",
      "/couleur : choix de la couleur du pseudo",
      "Arrivée annoncée au lobby",
      "Cosmétiques VIP+",
    ],
  },
  {
    id: "legende",
    image: "/shop/rank-legende.svg",
    name: "Légende",
    price: 19.99,
    color: "#ff5fd2",
    bonus: "+75 %",
    includes: "VIP+",
    perks: [
      "+75 % de pièces et d'XP",
      "Cosmétiques Légende exclusifs",
      "Ailes, fée, ballon et titre Légende",
    ],
  },
];

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
