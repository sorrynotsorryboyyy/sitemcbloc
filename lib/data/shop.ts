import { network } from "@/lib/data/network";

/**
 * Interrupteur UNIQUE des paiements : data/network.json → "shop": { "open": true|false }.
 * Lu ici (boutons, panier, paiement) ET par le bot (qui refuse tout paiement tant qu'il vaut false).
 */
export const shopOpen: boolean = network.shop?.open === true;

export type CatalogEntry = { id: string; name: string; price: number; category: "Grade" | "Pièces" | "Booster"; color: string };

const group = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/**
 * Articles vendus, avec les mêmes identifiants que le bot (src/utils/shop.js) :
 * rank-<id>-30j, rank-<id>-vie, id des packs de pièces, id des boosters.
 * Le panier ne garde que les identifiants et quantités : nom et prix sont toujours relus ici,
 * et le bot recalcule le prix de son côté (le prix affiché n'est jamais envoyé).
 */
export const catalog: Map<string, CatalogEntry> = new Map(
  [
    ...network.ranks.flatMap((r) => [
      { id: `rank-${r.id}-30j`, name: `Grade ${r.name} · 30 jours`, price: r.priceMonthly, category: "Grade" as const, color: r.color },
      { id: `rank-${r.id}-vie`, name: `Grade ${r.name} · à vie`, price: r.priceLifetime, category: "Grade" as const, color: r.color },
    ]),
    ...network.coinPacks.map((p) => ({
      id: p.id, name: `${group(p.coins + p.bonus)} pièces`, price: p.price, category: "Pièces" as const, color: "#ffd84d",
    })),
    ...network.boosters.map((b) => ({ id: b.id, name: b.name, price: b.price, category: "Booster" as const, color: "#00c6ff" })),
  ].map((e) => [e.id, e]),
);
