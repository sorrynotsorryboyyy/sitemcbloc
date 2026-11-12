import { network } from "@/lib/data/network";

export const site = {
  /**
   * Interrupteur d'ouverture du serveur.
   * false = site en ligne mais serveur pas encore ouvert : pas de nombre de joueurs,
   * boutique en vitrine (pas de panier ni de paiement), liaison de compte indisponible.
   * Passer à true le jour de l'ouverture (une fois le backend de paiement branché).
   */
  launched: false as boolean,
  /**
   * Liaison du compte Minecraft au site (/site WEB-XXXXXX en jeu), indépendante de l'ouverture :
   * activée dès maintenant pour les tests du staff. La boutique, elle, suit « launched ».
   */
  linking: true as boolean,
  /** API publique du bot Discord (Railway), intermédiaire entre le site et le serveur. */
  botApi: process.env.NEXT_PUBLIC_BOT_URL || "https://mcblocdidi-production.up.railway.app",
  // Infos publiques : data/network.json (source unique partagée avec le bot et le plugin)
  name: network.name,
  tagline: network.tagline,
  description: network.description,
  url: network.links.site,
  ip: network.ip,
  versions: network.versions,
  discord: network.links.discord,
  /** Commande en jeu pour lier le compte au site (≠ /lier, réservée à Discord). */
  linkCommand: "/site",
  linkCodePrefix: "WEB-",
} as const;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/#jeux", label: "Jeux" },
  { href: "/boutique", label: "Boutique" },
  { href: "/vote", label: "Voter" },
  { href: "/actualites", label: "Actualités" },
  { href: "/compte", label: "Mon compte" },
] as const;

/** Personnage 3D de la vitrine des grades (skin enregistré dans /public/skins). */
export const showcase = {
  username: "LeCarreTriangle",
  skin: "/skins/mcbloc.png",
} as const;

/** Logo de la monnaie (pièce MCBloc), dessiné par scripts/sprites/generate.mjs. */
export const coinImage: string | undefined = "/shop/coin.svg";
