import { getGuide, type GuideTable } from "@/lib/services/guide";
import type { CosmeticType, Rarity } from "@/lib/data/cosmetics";

/**
 * Catalogue des cosmétiques et coffres mystères, lus dans le guide publié par le serveur (sections « cosmetiques »
 * et « progression »). SOURCE UNIQUE : cosmetics.yml du serveur — un prix changé en jeu change ici aussi.
 */
export type CatalogCosmetic = {
  id: string;
  name: string;
  type: CosmeticType;
  rarity: Rarity;
  /** Prix en pièces (null = pas en vente : grade, pass, niveau, succès...). */
  price: number | null;
  /** Texte du prix tel qu'en jeu (« Inclus avec VIP », « non vendu »...). */
  priceLabel: string;
  /** Comment l'obtenir (« Boutique en jeu · Coffres mystères », « Niveau 25 »...). */
  obtain: string;
  /** Icône de l'objet (matériau Minecraft, ex. « blaze_powder ») : /items/<icon>.png. */
  icon: string;
};

export type CatalogCrate = { id: string; name: string; price: number | null; odds: Partial<Record<Rarity, number>> };

export type Catalog = { cosmetics: CatalogCosmetic[]; crates: CatalogCrate[] };

const RARITIES: Rarity[] = ["COMMON", "RARE", "EPIC", "LEGENDARY"];

/** « 12 500 pièces » → 12500 ; « non vendu » → null. */
function parseCoins(text: string): number | null {
  const digits = text.replace(/[^\d]/g, "");
  return /\d/.test(text) && digits ? Number(digits) : null;
}

/** « 12,5 % » → 12.5 */
function parsePercent(text: string): number {
  const value = Number(text.replace("%", "").replace(",", ".").trim());
  return Number.isFinite(value) ? value : 0;
}

function columnIndex(table: GuideTable, name: string): number {
  return table.columns.indexOf(name);
}

export function toCatalog(sections: Awaited<ReturnType<typeof getGuide>>): Catalog {
  const cosmetics: CatalogCosmetic[] = [];
  for (const table of sections.find((s) => s.id === "cosmetiques")?.tables ?? []) {
    const [id, type, rarity, icon] = ["_id", "_type", "_rarity", "_icon"].map((c) => columnIndex(table, c));
    if (id < 0 || type < 0 || rarity < 0) continue;
    for (const row of table.rows) {
      cosmetics.push({
        id: row[id],
        name: row[0],
        type: row[type] as CosmeticType,
        rarity: row[rarity] as Rarity,
        price: parseCoins(row[2] ?? ""),
        priceLabel: row[2] ?? "",
        obtain: row[3] ?? "",
        icon: icon >= 0 ? row[icon] : "",
      });
    }
  }

  const crates: CatalogCrate[] = [];
  const crateTable = sections.find((s) => s.id === "progression")?.tables.find((t) => columnIndex(t, "_id") >= 0);
  if (crateTable) {
    const id = columnIndex(crateTable, "_id");
    for (const row of crateTable.rows) {
      const odds: Partial<Record<Rarity, number>> = {};
      RARITIES.forEach((r, i) => {
        const pct = parsePercent(row[2 + i] ?? "");
        if (pct > 0) odds[r] = pct;
      });
      crates.push({ id: row[id], name: row[0], price: parseCoins(row[1] ?? ""), odds });
    }
  }
  return { cosmetics, crates };
}

/** Le catalogue (vide si le bot ne répond pas : la boutique l'indique). */
export async function getCatalog(): Promise<Catalog> {
  return toCatalog(await getGuide());
}
