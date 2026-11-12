export const site = {
  /**
   * Interrupteur d'ouverture du serveur.
   * false = site en ligne mais serveur pas encore ouvert : pas de nombre de joueurs,
   * boutique en vitrine (pas de panier ni de paiement), liaison de compte indisponible.
   * Passer à true le jour de l'ouverture (une fois le backend de paiement branché).
   */
  launched: false as boolean,
  name: "MCBloc",
  tagline: "Réseau de mini-jeux",
  description:
    "MCBloc, le réseau Minecraft de mini-jeux : Piggy Wars, SumoGames, CoreWars. Classement ELO, pass saisonnier, cosmétiques et défis quotidiens.",
  url: "https://mcbloc.fr",
  ip: "play.mcbloc.fr",
  versions: "1.8 – 1.21",
  discord: "https://discord.mcbloc.fr",
  /** Commande en jeu pour lier le compte au site (≠ /lier, réservée à Discord). */
  linkCommand: "/site",
  linkCodePrefix: "WEB-",
} as const;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/#jeux", label: "Jeux" },
  { href: "/boutique", label: "Boutique" },
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
