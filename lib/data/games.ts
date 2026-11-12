import type { IconName } from "@/components/Icon";

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

// Sources : mcblocManager/README.md et C:\mcblocdidi\config.js (minigames)
export const games: Game[] = [
  {
    id: "piggy-wars",
    name: "Piggy Wars",
    server: "piggywars",
    emoji: "🐷",
    mode: "Rouge vs Bleu · 1v1 à 3v3",
    description:
      "Lance des cochons sur tes adversaires pour les éliminer ou les pousser dans le vide ! Première équipe à 10 kills.",
    features: ["Classement ELO", "~10 classes", "Parties rapides"],
    color: "#ff7aa8",
    banner: "/images/banner-piggywars.png",
    logo: "/games/piggywars.png",
  },
  {
    id: "sumogames",
    name: "SumoGames",
    server: "sumotower",
    emoji: "🤼",
    mode: "Chacun pour soi · 2 à 8 joueurs",
    description:
      "Sumo sur une tour à plusieurs étages : pas de dégâts, que du recul. Coffres et kits façon Survival Games — sois le dernier debout !",
    features: ["Knockback pur", "Coffres à loot", "Kits"],
    color: "#55ff7f",
    banner: "/images/banner-sumogames.png",
    logo: "/games/sumogames.png",
  },
  {
    id: "corewars",
    name: "CoreWars",
    server: "corewars",
    emoji: "🔮",
    mode: "Rouge vs Bleu · jusqu'à 10v10",
    description:
      "Construis, défends et détruis le cœur de la base ennemie. Générateurs d'or, 7 classes et de grosses batailles d'équipe.",
    features: ["7 classes", "Générateurs d'or", "Grandes équipes"],
    color: "#b36bff",
    banner: "/images/banner-corewars.png",
    logo: "/games/corewars.png",
  },
];

export const features: { icon: IconName; title: string; text: string }[] = [
  { icon: "trophy", title: "Classement ELO", text: "Grimpe dans les classements de chaque mini-jeu et prouve que tu es le meilleur." },
  { icon: "membercard", title: "Pass saisonnier", text: "100 niveaux chaque mois, une piste gratuite et une piste VIP remplie de récompenses." },
  { icon: "sparkles", title: "Cosmétiques", text: "Titres, particules, familiers, chapeaux, ballons, effets de victoire… plus de 100 objets." },
  { icon: "target", title: "Défis quotidiens", text: "Séries de connexion, défis et succès pour gagner des pièces chaque jour." },
];

export const faq = [
  {
    q: "Quand le serveur ouvre-t-il ?",
    a: "Très bientôt ! Le serveur est en préparation. Rejoins le Discord et suis les actualités du site pour être prévenu dès l'ouverture.",
  },
  {
    q: "Quelles versions de Minecraft sont acceptées ?",
    a: "Le serveur accepte les versions 1.8 à 1.21. Connecte-toi avec l'adresse play.mcbloc.fr.",
  },
  {
    q: "Comment recevoir mes achats en jeu ?",
    a: "Indique ton pseudo au moment du paiement, ou lie ton compte depuis « Mon compte ». Tes achats arrivent automatiquement à ta prochaine connexion.",
  },
  {
    q: "Comment lier mon compte Minecraft au site ?",
    a: "Va dans « Mon compte », génère un code puis tape /site WEB-XXXXXX en jeu. À ne pas confondre avec /lier, qui sert à lier ton compte Discord.",
  },
  {
    q: "Les grades sont-ils permanents ?",
    a: "Oui, les grades achetés sur la boutique sont permanents et chaque grade inclut les avantages du grade précédent.",
  },
];
