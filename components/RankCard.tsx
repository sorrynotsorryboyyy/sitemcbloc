"use client";

import type { Rank } from "@/lib/data/ranks";
import Icon from "@/components/Icon";
import TiltCard from "@/components/TiltCard";
import RankPurchase from "@/components/shop/RankPurchase";
import RankEmblem from "@/components/shop/RankEmblem";

export default function RankCard({ rank, compact = false }: { rank: Rank; compact?: boolean }) {
  return (
    <TiltCard glow={rank.color}>
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-xl border-2 bg-surface p-5"
        style={{
          borderColor: rank.popular ? rank.color : `${rank.color}40`,
          boxShadow: `0 24px 50px -28px ${rank.color}${rank.popular ? "cc" : "77"}`,
        }}
      >
        {/* Lueur colorée en haut de la carte */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-32"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${rank.color}33, transparent 70%)` }}
          aria-hidden
        />
        {rank.popular && (
          <span className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-bg" style={{ background: rank.color }}>
            Le plus choisi
          </span>
        )}

        <div className="relative">
          <RankEmblem rank={rank} size={60} />
          <h3 className="mt-4 font-display text-3xl" style={{ color: rank.color }}>
            {rank.name}
          </h3>
          <p className="mt-1 font-mono text-xs">
            <span className="text-dim">[</span>
            <span style={{ color: rank.color }}>{rank.name}</span>
            <span className="text-dim">]</span> <span className="text-muted">Pseudo</span>
          </p>
          <p className="mt-1 inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold" style={{ color: rank.color, background: `${rank.color}1a` }}>
            <Icon name="trending-up" size={14} /> {rank.bonus} de pièces et d&apos;XP
          </p>
        </div>

        {!compact && (
          <ul className="relative mt-5 flex-1 space-y-2 border-t border-line pt-4 text-sm">
            {rank.includes && (
              <li className="flex gap-2 text-muted">
                <Icon name="chevron-right" size={18} className="mt-0.5" style={{ color: rank.color }} /> Tout le grade {rank.includes}
              </li>
            )}
            {rank.perks.map((p) => (
              <li key={p} className="flex gap-2">
                <Icon name="check" size={18} className="mt-0.5 text-success" /> {p}
              </li>
            ))}
          </ul>
        )}

        <div className="relative mt-5">
          <RankPurchase rank={rank} />
        </div>
      </article>
    </TiltCard>
  );
}
