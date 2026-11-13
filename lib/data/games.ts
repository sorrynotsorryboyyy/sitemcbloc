import { network } from "@/lib/data/network";

export type Game = {
  id: string;
  name: string;
  server: string;
  emoji: string;
  mode: string;
  description: string;
  features: string[];
  color: string;
  /** Bannière du jeu (1983×793, titre et mascotte inclus) */
  banner: string;
  /** Mascotte détourée (remplace l'emoji quand elle est définie) */
  logo?: string;
};

/** Visuels propres au site (bannière + mascotte), par identifiant de jeu. */
const gameAssets: Record<string, { banner: string; logo?: string }> = {
  "piggy-wars": { banner: "/images/banner-piggywars.png", logo: "/games/piggywars.png" },
  sumogames: { banner: "/images/banner-sumogames.png", logo: "/games/sumogames.png" },
  corewars: { banner: "/images/banner-corewars.png", logo: "/games/corewars.png" },
};

// Textes des jeux : data/network.json (identiques sur le site, le Discord et en jeu).
export const games: Game[] = network.games.map((g) => ({ ...g, banner: gameAssets[g.id]?.banner ?? "/images/banner-mcbloc.png", logo: gameAssets[g.id]?.logo }));
