"use client";

import Link from "next/link";
import { useState } from "react";
import SkinViewer from "@/components/shop/SkinViewer";
import RankEmblem from "@/components/shop/RankEmblem";
import Icon from "@/components/Icon";
import BuyButton from "@/components/shop/BuyButton";
import { ranks } from "@/lib/data/ranks";
import { showcase } from "@/lib/data/site";
import { formatEuro } from "@/lib/format";

/** Vitrine des grades : personnage 3D + pseudo coloré + sélecteur de grade. */
export default function RankShowcase({ showCompareLink = true }: { showCompareLink?: boolean }) {
  const [index, setIndex] = useState(() => Math.max(0, ranks.findIndex((r) => r.popular)));
  const rank = ranks[index];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border bg-surface transition-colors duration-500"
      style={{ borderColor: `${rank.color}55` }}
    >
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Scène 3D */}
        <div className="relative flex flex-col items-center justify-end overflow-hidden bg-bg-2 px-4 pt-6 pb-2">
          <div
            className="pointer-events-none absolute inset-0 transition-[background] duration-500"
            style={{ background: `radial-gradient(circle at 50% 55%, ${rank.color}40, transparent 65%)` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
          {/* Pseudo façon Minecraft */}
          <p className="relative z-10 rounded bg-black/55 px-3 py-1 font-mono text-sm sm:text-base" aria-live="polite">
            <span className="text-dim">[</span>
            <span style={{ color: rank.color }}>{rank.name}</span>
            <span className="text-dim">]</span> <span style={{ color: rank.color }}>{showcase.username}</span>
          </p>
          <div className="relative z-10">
            <SkinViewer skin={showcase.skin} fallbackName={showcase.username} width={280} height={360} />
          </div>
          {/* Socle */}
          <div className="relative -mt-6 h-6 w-48 rounded-[50%] blur-md" style={{ background: `${rank.color}66` }} aria-hidden />
          <p className="relative mt-1 flex items-center gap-1 text-xs text-muted">
            <Icon name="arrows-horizontal" size={14} /> Fais-le tourner
          </p>
        </div>

        {/* Détails */}
        <div className="flex flex-col p-5 sm:p-7">
          <div role="radiogroup" aria-label="Choisir un grade" className="grid grid-cols-4 gap-2">
            {ranks.map((r, i) => (
              <button
                key={r.id}
                role="radio"
                aria-checked={i === index}
                onClick={() => setIndex(i)}
                className={`rounded-lg border-2 px-1 py-2 font-display text-sm transition-all sm:text-base ${
                  i === index ? "scale-105 bg-bg-2" : "border-line bg-transparent opacity-70 hover:opacity-100"
                }`}
                style={{ color: r.color, borderColor: i === index ? r.color : undefined }}
              >
                {r.name}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <RankEmblem rank={rank} size={64} />
            <div>
              <h3 className="font-display text-3xl sm:text-4xl" style={{ color: rank.color }}>
                {rank.name}
              </h3>
              <p className="text-sm text-muted">
                {rank.bonus} de pièces et d&apos;XP{rank.includes && <> · inclut {rank.includes}</>}
              </p>
            </div>
          </div>

          <ul className="mt-5 flex-1 space-y-2.5 text-sm">
            {rank.perks.slice(0, 5).map((p) => (
              <li key={p} className="flex gap-2">
                <Icon name="check" size={18} className="mt-0.5 text-success" /> {p}
              </li>
            ))}
            {rank.perks.length > 5 && <li className="pl-7 text-muted">+ {rank.perks.length - 5} autres avantages</li>}
          </ul>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5">
            <div>
              <p className="text-3xl font-bold">{formatEuro(rank.price)}</p>
              <p className="text-xs text-muted">paiement unique · grade à vie</p>
            </div>
            <BuyButton item={{ id: `rank-${rank.id}`, name: `Grade ${rank.name}`, category: "Grade", price: rank.price, color: rank.color }} className="px-5 py-3" style={{ background: rank.color }} />
          </div>
          {showCompareLink && (
            <Link href="/boutique#grades" className="mt-4 text-sm font-semibold text-primary hover:underline">
              Comparer tous les grades →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
