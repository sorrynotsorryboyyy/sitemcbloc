"use client";

import type { Rank } from "@/lib/data/ranks";
import { formatEuro } from "@/lib/format";
import { shopOpen } from "@/lib/data/shop";
import BuyButton from "@/components/shop/BuyButton";

/**
 * Prix d'un grade : 30 jours (qui s'ajoutent si on rachète) ou à vie. Mêmes prix qu'en jeu (/grades) et sur Discord :
 * tout vient de data/network.json. Avant l'ouverture, un seul bouton « Disponible à l'ouverture ».
 */
export default function RankPurchase({ rank }: { rank: Rank }) {
  const months = Math.round(rank.priceLifetime / rank.priceMonthly);
  const item = (variant: "30j" | "vie", price: number) => ({
    id: `rank-${rank.id}-${variant}`,
    name: `Grade ${rank.name} · ${variant === "30j" ? "30 jours" : "à vie"}`,
    category: "Grade" as const,
    price,
    color: rank.color,
  });
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-line bg-bg-2 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">30 jours</p>
          <p className="mt-1 text-2xl font-bold">{formatEuro(rank.priceMonthly)}</p>
          <p className="mt-0.5 text-[11px] text-dim">s&apos;ajoutent si tu rachètes</p>
        </div>
        <div className="rounded-lg border-2 p-3" style={{ borderColor: `${rank.color}80`, background: `${rank.color}12` }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: rank.color }}>À vie</p>
          <p className="mt-1 text-2xl font-bold">{formatEuro(rank.priceLifetime)}</p>
          <p className="mt-0.5 text-[11px] text-dim">le prix de {months} mois</p>
        </div>
      </div>
      {shopOpen ? (
        <div className="mt-3 grid grid-cols-2 gap-2">
          <BuyButton item={item("30j", rank.priceMonthly)} label="30 jours" className="py-3" style={{ background: rank.color }} />
          <BuyButton item={item("vie", rank.priceLifetime)} label="À vie" className="py-3" style={{ background: rank.color }} />
        </div>
      ) : (
        <BuyButton item={item("vie", rank.priceLifetime)} className="mt-3 w-full py-3" />
      )}
    </div>
  );
}
