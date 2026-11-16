import { site } from "@/lib/data/site";
import { network } from "@/lib/data/network";

/**
 * Guide des jeux : le même contenu qu'en jeu (/guide) et que sur Discord (#guide).
 * SOURCE UNIQUE : le serveur Minecraft. Chaque serveur publie sa section (règles, commandes, chiffres tirés de sa
 * config), le proxy l'envoie au bot, et le site la lit ici : GET {bot}/public/guide (rafraîchi toutes les 5 minutes).
 */
export type GuideCommand = { syntax: string; description: string };
export type GuideTable = { title: string; note: string; columns: string[]; rows: string[][] };
export type GuideSection = {
  id: string;
  title: string;
  order: number;
  summary: string;
  rules: string[];
  commands: GuideCommand[];
  tables: GuideTable[];
};

const SECTION_EMOJI: Record<string, string> = { reseau: "🌐", progression: "⭐", grades: "💎", cosmetiques: "🎨" };

/** Colonne de données (« _icon »...) : lue par le site, jamais affichée (même règle qu'en jeu et sur Discord). */
export function visibleColumns(table: GuideTable): number[] {
  return table.columns.map((c, i) => (c.startsWith("_") ? -1 : i)).filter((i) => i >= 0);
}

/** Emoji d'une section : celui du jeu (network.json) ou celui des sections du réseau. */
export function sectionEmoji(id: string): string {
  return SECTION_EMOJI[id] ?? network.games.find((g) => g.server === id)?.emoji ?? "📘";
}

/** Couleur d'une section : celle du jeu, sinon la couleur principale. */
export function sectionColor(id: string): string {
  return network.games.find((g) => g.server === id)?.color ?? "#00c6ff";
}

/** Toutes les sections (vide si le bot ne répond pas : la page l'indique). */
export async function getGuide(): Promise<GuideSection[]> {
  try {
    const res = await fetch(`${site.botApi.replace(/\/$/, "")}/public/guide`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { sections?: GuideSection[] };
    return Array.isArray(data.sections) ? data.sections : [];
  } catch {
    return [];
  }
}

export async function getSection(id: string): Promise<GuideSection | null> {
  return (await getGuide()).find((s) => s.id === id) ?? null;
}
