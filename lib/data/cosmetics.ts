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
  EMOTE: { label: "Émotes", icon: "star" },
  ARRIVAL: { label: "Arrivées", icon: "arrow-right" },
  KILL_EFFECT: { label: "Effets de kill", icon: "target" },
  VICTORY_EFFECT: { label: "Effets de victoire", icon: "trophy" },
  KILL_MESSAGE: { label: "Messages de kill", icon: "label" },
} as const satisfies Record<string, { label: string; icon: IconName }>;

export type CosmeticType = keyof typeof cosmeticTypes;

/** Visuels des coffres mystères (le nom, le prix et les chances viennent du serveur : lib/services/cosmetics.ts). */
export const crateVisuals: Record<string, { icon: IconName; image?: string }> = {
  basique: { icon: "box", image: "/shop/crate-basique.svg" },
  rare: { icon: "gift", image: "/shop/crate-rare.svg" },
  legendaire: { icon: "diamond-gem", image: "/shop/crate-legendaire.svg" },
};
