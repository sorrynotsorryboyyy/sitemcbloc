import type { IconName } from "@/components/Icon";

/*
 * Actualités du site MCBloc.
 * Pour publier un article : ajouter un objet en haut de la liste `news` (le plus récent en premier).
 * ⚠ Les 3 articles ci-dessous sont des BROUILLONS de départ : relis-les et ajuste dates et contenus.
 */

export const newsCategories = {
  annonce: { label: "Annonce", color: "#00c6ff", icon: "info-box" },
  "mise-a-jour": { label: "Mise à jour", color: "#55ff7f", icon: "trending-up" },
  evenement: { label: "Événement", color: "#ffd84d", icon: "party-popper" },
  devlog: { label: "Devlog", color: "#b36bff", icon: "gamepad" },
} as const satisfies Record<string, { label: string; color: string; icon: IconName }>;

export type NewsCategory = keyof typeof newsCategories;

export type NewsBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type NewsPost = {
  slug: string;
  title: string;
  /** Date ISO (AAAA-MM-JJ) */
  date: string;
  category: NewsCategory;
  excerpt: string;
  /** Image large (bannière) affichée en couverture */
  cover: string;
  body: NewsBlock[];
};

export const news: NewsPost[] = [
  {
    slug: "mcbloc-arrive-bientot",
    title: "MCBloc arrive bientôt !",
    date: "2026-11-12",
    category: "annonce",
    excerpt: "Le réseau de mini-jeux qui fait des vagues se prépare. Voici ce qui t'attend et comment être prévenu de l'ouverture.",
    cover: "/images/banner-mcbloc.png",
    body: [
      { type: "p", text: "Bienvenue sur le site officiel de MCBloc ! Le serveur est en pleine préparation et ouvrira très bientôt ses portes sur play.mcbloc.fr." },
      { type: "h2", text: "Au programme" },
      {
        type: "list",
        items: [
          "Piggy Wars : lance des cochons sur l'équipe adverse, en 1v1 jusqu'à 3v3.",
          "SumoGames : du knockback pur sur une tour à plusieurs étages, jusqu'à 8 joueurs.",
          "CoreWars : défends ton cœur et détruis celui de l'ennemi, jusqu'à 10v10.",
          "Un classement ELO, un pass saisonnier, des défis quotidiens et plus de 100 cosmétiques.",
        ],
      },
      { type: "h2", text: "Comment être prévenu ?" },
      { type: "p", text: "Rejoins notre Discord : c'est là que l'ouverture sera annoncée en premier, avec les dernières infos sur le développement." },
      { type: "quote", text: "On a hâte de te retrouver en jeu !" },
    ],
  },
  {
    slug: "decouvre-piggy-wars",
    title: "Découvre Piggy Wars",
    date: "2026-11-11",
    category: "devlog",
    excerpt: "Notre mini-jeu phare : deux équipes, des cochons en guise de projectiles et une seule règle — pousser l'adversaire dans le vide.",
    cover: "/images/banner-piggywars.png",
    body: [
      { type: "p", text: "Piggy Wars oppose l'équipe Rouge à l'équipe Bleue, de 1v1 à 3v3. Le but : lancer des cochons sur tes adversaires pour les éliminer ou les pousser dans le vide." },
      { type: "h2", text: "Les règles" },
      {
        type: "list",
        items: ["La première équipe à 10 kills remporte la partie.", "Une dizaine de classes pour varier les styles de jeu.", "Un classement ELO pour mesurer ta progression."],
      },
      { type: "p", text: "Certaines classes se débloqueront avec des pièces gagnées en jouant. Rendez-vous à l'ouverture pour les essayer !" },
    ],
  },
  {
    slug: "boutique-et-grades",
    title: "La boutique et les grades",
    date: "2026-11-10",
    category: "annonce",
    excerpt: "Starter, VIP, VIP+ et Légende : découvre les grades et les avantages qui seront disponibles à l'ouverture.",
    cover: "/images/banner-corewars.png",
    body: [
      { type: "p", text: "La boutique du site est déjà visible en avant-première. Les achats seront possibles le jour de l'ouverture du serveur." },
      { type: "h2", text: "Quatre grades à vie" },
      {
        type: "list",
        items: [
          "Starter : préfixe et pseudo coloré, +10 % de pièces et d'XP.",
          "VIP : +25 % de gains, piste VIP du pass saisonnier, /fly au lobby et accès même quand le réseau est plein.",
          "VIP+ : +50 % de gains, couleurs dans le chat et arrivée annoncée au lobby.",
          "Légende : +75 % de gains et des cosmétiques exclusifs.",
        ],
      },
      { type: "p", text: "Chaque grade inclut les avantages du précédent. Les pièces, elles, permettront de débloquer cosmétiques, coffres mystères et classes directement en jeu." },
    ],
  },
];

export function getPost(slug: string) {
  return news.find((p) => p.slug === slug);
}

const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });
export const formatNewsDate = (iso: string) => dateFmt.format(new Date(`${iso}T12:00:00`));
