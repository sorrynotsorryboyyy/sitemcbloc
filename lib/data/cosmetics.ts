import type { IconName } from "@/components/Icon";

export type Rarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";

export const rarities: Record<Rarity, { label: string; color: string }> = {
  COMMON: { label: "Commun", color: "#b0b0b0" },
  RARE: { label: "Rare", color: "#00c6ff" },
  EPIC: { label: "Épique", color: "#b36bff" },
  LEGENDARY: { label: "Légendaire", color: "#ffd84d" },
};

export const cosmeticTypes = {
  TITLE: { label: "Titres", icon: "label" },
  PARTICLE: { label: "Particules", icon: "sparkle" },
  TRAIL: { label: "Traînées", icon: "wind" },
  HAT: { label: "Chapeaux", icon: "sunglasses" },
  PET: { label: "Familiers", icon: "dog" },
  GADGET: { label: "Gadgets", icon: "party-popper" },
  OUTFIT: { label: "Tenues", icon: "shirt" },
  BALLOON: { label: "Ballons", icon: "balloon" },
} as const satisfies Record<string, { label: string; icon: IconName }>;

export type CosmeticType = keyof typeof cosmeticTypes;

export type Cosmetic = { name: string; type: CosmeticType; rarity: Rarity; price: number };

// Échantillon extrait de mcblocManager/core/src/main/resources/cosmetics.yml (prix en pièces, achat en jeu).
export const cosmetics: Cosmetic[] = [
  { type: "TITLE", rarity: "COMMON", name: "Cool", price: 650 },
  { type: "TITLE", rarity: "RARE", name: "Ninja", price: 9100 },
  { type: "TITLE", rarity: "EPIC", name: "Roi des cochons", price: 7700 },
  { type: "TITLE", rarity: "LEGENDARY", name: "Dragon", price: 23500 },
  { type: "PARTICLE", rarity: "COMMON", name: "Bulles", price: 950 },
  { type: "PARTICLE", rarity: "RARE", name: "Cerisier", price: 3000 },
  { type: "PARTICLE", rarity: "EPIC", name: "Arc-en-ciel", price: 9100 },
  { type: "PARTICLE", rarity: "LEGENDARY", name: "Ailes de feu", price: 26500 },
  { type: "TRAIL", rarity: "RARE", name: "Pas de feu", price: 3200 },
  { type: "TRAIL", rarity: "EPIC", name: "Portail", price: 7000 },
  { type: "TRAIL", rarity: "LEGENDARY", name: "Totem", price: 28000 },
  { type: "HAT", rarity: "RARE", name: "Tête de creeper", price: 3500 },
  { type: "HAT", rarity: "EPIC", name: "Balise", price: 10500 },
  { type: "HAT", rarity: "LEGENDARY", name: "Tête de dragon", price: 26500 },
  { type: "PET", rarity: "COMMON", name: "Poussin", price: 1200 },
  { type: "PET", rarity: "RARE", name: "Chaton", price: 4500 },
  { type: "PET", rarity: "EPIC", name: "Bébé panda", price: 12000 },
  { type: "PET", rarity: "LEGENDARY", name: "Ourson polaire", price: 30000 },
  { type: "GADGET", rarity: "EPIC", name: "Boule disco", price: 9100 },
  { type: "OUTFIT", rarity: "LEGENDARY", name: "Tenue arc-en-ciel", price: 25500 },
  { type: "BALLOON", rarity: "EPIC", name: "Cochon volant", price: 7700 },
  { type: "BALLOON", rarity: "LEGENDARY", name: "Œuf de dragon", price: 26500 },
];

export type Crate = { id: string; name: string; icon: IconName; image?: string; price: number; odds: Partial<Record<Rarity, number>> };

/** image : illustration du coffre (ex. "/shop/crate-rare.png") — sinon icône pixel */
export const crates: Crate[] = [
  { id: "basique", name: "Coffre basique", icon: "box", image: "/shop/crate-basique.svg", price: 1500, odds: { COMMON: 70, RARE: 25, EPIC: 5 } },
  { id: "rare", name: "Coffre rare", icon: "gift", image: "/shop/crate-rare.svg", price: 4500, odds: { COMMON: 35, RARE: 45, EPIC: 17, LEGENDARY: 3 } },
  { id: "legendaire", name: "Coffre légendaire", icon: "diamond-gem", image: "/shop/crate-legendaire.svg", price: 12000, odds: { RARE: 40, EPIC: 45, LEGENDARY: 15 } },
];
