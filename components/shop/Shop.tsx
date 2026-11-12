"use client";

import { useEffect, useState } from "react";
import RankCard from "@/components/RankCard";
import TiltCard from "@/components/TiltCard";
import BuyButton from "@/components/shop/BuyButton";
import RankShowcase from "@/components/shop/RankShowcase";
import { Visual, SpinningCoin } from "@/components/shop/Visual";
import Icon, { type IconName } from "@/components/Icon";
import RarityBadge from "@/components/RarityBadge";
import { ranks, rankComparison } from "@/lib/data/ranks";
import { coinPacks } from "@/lib/data/coins";
import { cosmetics, cosmeticTypes, crates, rarities, type CosmeticType, type Rarity } from "@/lib/data/cosmetics";
import { boosters, paidKits } from "@/lib/data/boosters";
import { formatEuro, formatNumber } from "@/lib/format";

const tabs = [
  { id: "grades", label: "Grades", icon: "crown" },
  { id: "pieces", label: "Pièces", icon: "coins" },
  { id: "cosmetiques", label: "Cosmétiques", icon: "sparkles" },
  { id: "boosters", label: "Kits & Boosters", icon: "zap" },
] as const satisfies readonly { id: string; label: string; icon: IconName }[];

type TabId = (typeof tabs)[number]["id"];

export default function Shop() {
  const [tab, setTab] = useState<TabId>("grades");

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1) as TabId;
      if (tabs.some((t) => t.id === h)) setTab(h);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function select(id: TabId) {
    setTab(id);
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <>
      <div role="tablist" aria-label="Catégories" className="sticky top-16 z-30 -mx-4 mb-8 flex gap-2 overflow-x-auto border-b border-line bg-bg/90 px-4 py-3 backdrop-blur">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => select(t.id)}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.id ? "bg-gradient-brand text-white" : "border border-line bg-surface text-muted hover:text-text"
            }`}
          >
            <Icon name={t.icon} size={18} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "grades" && <RanksTab />}
      {tab === "pieces" && <CoinsTab />}
      {tab === "cosmetiques" && <CosmeticsTab />}
      {tab === "boosters" && <BoostersTab />}
    </>
  );
}

function RanksTab() {
  return (
    <div>
      <RankShowcase showCompareLink={false} />

      <h2 className="mt-14 mb-6 font-display text-2xl">Tous les grades</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ranks.map((r) => (
          <RankCard key={r.id} rank={r} />
        ))}
      </div>

      <h2 className="mt-14 mb-4 font-display text-2xl">Comparer les grades</h2>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-surface-2">
            <tr>
              <th className="p-3 text-left font-semibold text-muted">Avantage</th>
              {ranks.map((r) => (
                <th key={r.id} className="p-3 text-center font-display text-base" style={{ color: r.color }}>
                  {r.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rankComparison.map((row) => (
              <tr key={row.label} className="border-t border-line bg-surface odd:bg-bg-2">
                <td className="p-3">{row.label}</td>
                {row.values.map((v, i) => (
                  <td key={i} className="p-3 text-center">
                    {v === true ? <Icon name="check" size={18} className="text-success" title="Inclus" /> : v === false ? <span className="text-dim">—</span> : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">Grades permanents. Si tu achètes un grade supérieur, tu gardes tous les avantages des grades inférieurs.</p>
    </div>
  );
}

function CoinsTab() {
  return (
    <div>
      <p className="mb-6 max-w-2xl text-muted">
        Les pièces servent à acheter des cosmétiques, des coffres mystères et des classes en jeu. Elles s&apos;ajoutent à ton solde actuel.
      </p>
      <div className="grid gap-5 pt-3 sm:grid-cols-2 lg:grid-cols-5">
        {coinPacks.map((p, i) => {
          const bonusPct = Math.round((p.bonus / p.coins) * 100);
          const featured = Boolean(p.tag);
          return (
            <TiltCard key={p.id} glow="#ffd84d">
              <article
                className={`relative flex h-full flex-col overflow-hidden rounded-xl border-2 bg-surface text-center ${featured ? "border-accent" : "border-accent/20"}`}
                style={{ boxShadow: featured ? "0 24px 50px -24px rgba(255,216,77,0.6)" : undefined }}
              >
                <div className="absolute inset-x-2 top-2 z-10 flex items-start justify-between gap-1">
                  {p.tag ? (
                    <span className="whitespace-nowrap rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bg">{p.tag}</span>
                  ) : (
                    <span />
                  )}
                  {bonusPct > 0 && (
                    <span className="whitespace-nowrap rounded-full bg-success px-2 py-0.5 text-[10px] font-bold text-bg" title={`${bonusPct} % de pièces en plus`}>
                      +{bonusPct} %
                    </span>
                  )}
                </div>
                {/* Visuel : illustration du pack, sinon pile de pièces qui tournent */}
                <div className="relative flex h-36 items-end justify-center pb-5" style={{ background: "radial-gradient(circle at 50% 75%, rgba(255,216,77,0.28), transparent 65%)" }}>
                  {p.image ? (
                    <Visual image={p.image} icon="coins" size={96} float />
                  ) : (
                    <CoinStack count={i + 1} />
                  )}
                </div>
                <div className="flex flex-1 flex-col px-5 pb-5">
                  <h3 className="font-semibold uppercase tracking-wider text-muted">{p.name}</h3>
                  <p className="mt-1 font-display text-3xl text-accent">{formatNumber(p.coins)}</p>
                  <p className="text-sm text-muted">pièces</p>
                  <p className="mt-2 h-5 text-sm font-semibold text-success">{p.bonus > 0 && `+${formatNumber(p.bonus)} offertes`}</p>
                  <p className="mt-4 text-2xl font-bold">{formatEuro(p.price)}</p>
                  <BuyButton item={{ id: p.id, name: `${formatNumber(p.coins + p.bonus)} pièces`, category: "Pièces", price: p.price, color: "#ffd84d" }} label="Ajouter" className="mt-4 bg-accent" />
                </div>
              </article>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}

function CosmeticsTab() {
  const [type, setType] = useState<CosmeticType | "ALL">("ALL");
  const list = type === "ALL" ? cosmetics : cosmetics.filter((c) => c.type === type);

  return (
    <div>
      <div className="mb-6 rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm">
        <strong className="inline-flex items-center gap-1 text-primary"><Icon name="info-box" size={16} /> Achat en jeu.</strong> Les cosmétiques et les coffres s&apos;achètent avec des pièces depuis le
        lobby (<span className="font-mono">/cosmetiques</span>). Il te manque des pièces ?{" "}
        <a href="#pieces" className="font-semibold text-accent hover:underline">Recharge ton solde</a>.
      </div>

      <h2 className="mb-4 font-display text-2xl">Coffres mystères</h2>
      <div className="mb-12 grid gap-5 md:grid-cols-3">
        {crates.map((c, i) => {
          const tone = [rarities.RARE.color, rarities.EPIC.color, rarities.LEGENDARY.color][i] ?? rarities.RARE.color;
          return (
          <TiltCard key={c.id} glow={tone}>
          <article className="h-full rounded-xl border-2 bg-surface p-5" style={{ borderColor: `${tone}40` }}>
            <div className="flex h-28 items-center justify-center rounded-lg" style={{ color: tone, background: `radial-gradient(circle at 50% 60%, ${tone}33, transparent 70%)` }}>
              <Visual image={c.image} icon={c.icon} size={c.image ? 96 : 56} float />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold">{c.name}</h3>
              <span className="flex items-center gap-1.5 font-bold text-accent"><SpinningCoin size={20} /> {formatNumber(c.price)}</span>
            </div>
            <div className="mt-3 flex h-2 overflow-hidden rounded-full">
              {(Object.entries(c.odds) as [Rarity, number][]).map(([r, pct]) => (
                <div key={r} style={{ width: `${pct}%`, background: rarities[r].color }} title={`${rarities[r].label} ${pct} %`} />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
              {(Object.entries(c.odds) as [Rarity, number][]).map(([r, pct]) => (
                <li key={r}>
                  <span style={{ color: rarities[r].color }}>■</span> {rarities[r].label} {pct} %
                </li>
              ))}
            </ul>
          </article>
          </TiltCard>
          );
        })}
      </div>

      <h2 className="mb-4 font-display text-2xl">Catalogue</h2>
      <div className="mb-5 flex flex-wrap gap-2">
        <FilterChip active={type === "ALL"} onClick={() => setType("ALL")}>Tout</FilterChip>
        {(Object.keys(cosmeticTypes) as CosmeticType[]).map((t) => (
          <FilterChip key={t} active={type === t} onClick={() => setType(t)}>
            <span className="inline-flex items-center gap-1.5"><Icon name={cosmeticTypes[t].icon} size={16} /> {cosmeticTypes[t].label}</span>
          </FilterChip>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((c) => (
          <article
            key={c.name}
            className="rounded-xl border bg-surface p-4"
            style={{ borderColor: `${rarities[c.rarity].color}40`, boxShadow: `inset 0 -40px 60px -40px ${rarities[c.rarity].color}40` }}
          >
            <div style={{ color: rarities[c.rarity].color }}><Icon name={cosmeticTypes[c.type].icon} size={30} /></div>
            <h3 className="mt-2 font-bold">{c.name}</h3>
            <p className="text-xs text-muted">{cosmeticTypes[c.type].label}</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <RarityBadge rarity={c.rarity} />
              <span className="text-sm font-semibold text-accent">{formatNumber(c.price)}</span>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">Aperçu d&apos;une partie du catalogue — plus de 100 cosmétiques sont disponibles en jeu.</p>
    </div>
  );
}

function BoostersTab() {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {boosters.map((b) => {
          const tone = b.scope === "réseau" ? "#b36bff" : "#00c6ff";
          return (
          <TiltCard key={b.id} glow={tone}>
          <article className="flex h-full flex-col rounded-xl border-2 bg-surface p-5" style={{ borderColor: `${tone}33` }}>
            <div className="relative flex h-24 items-center justify-center rounded-lg" style={{ color: tone, background: `radial-gradient(circle at 50% 60%, ${tone}30, transparent 70%)` }}>
              <Visual image={b.image} icon={b.icon} size={b.image ? 80 : 48} float />
              <span
                className={`absolute right-2 top-2 rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                  b.scope === "réseau" ? "bg-epic/20 text-epic" : "bg-primary/15 text-primary"
                }`}
              >
                {b.scope === "réseau" ? "Tout le réseau" : "Personnel"}
              </span>
            </div>
            <h3 className="mt-3 font-bold">{b.name}</h3>
            <p className="mt-1 flex-1 text-sm text-muted">{b.description}</p>
            <p className="mt-4 text-xl font-bold">{formatEuro(b.price)}</p>
            <BuyButton item={{ id: b.id, name: b.name, category: "Booster", price: b.price, color: "#00c6ff" }} label="Ajouter" className="mt-3 bg-gradient-brand text-white" />
          </article>
          </TiltCard>
          );
        })}
      </div>

      <h2 className="mt-14 mb-4 font-display text-2xl">Classes & kits</h2>
      <p className="mb-5 max-w-2xl text-muted">Les classes et kits payants se débloquent avec des pièces, directement dans le menu de chaque jeu.</p>
      <div className="grid gap-5 md:grid-cols-3">
        {paidKits.map((k) => (
          <article key={k.game} className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-display text-xl">{k.game}</h3>
            <p className="mt-1 text-sm font-semibold text-accent">{k.range}</p>
            <p className="mt-2 text-sm text-muted">{k.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-3 py-1.5 text-sm font-medium ${active ? "bg-text text-bg" : "border border-line bg-surface text-muted hover:text-text"}`}
    >
      {children}
    </button>
  );
}

/** Pile de pièces : plus le pack est gros, plus il y a de pièces (elles tournent en décalé). */
function CoinStack({ count }: { count: number }) {
  const n = Math.min(Math.max(count, 1), 5);
  const rows = n <= 2 ? [n] : n === 3 ? [1, 2] : n === 4 ? [1, 3] : [2, 3];
  let k = 0;
  return (
    <div className="flex flex-col items-center" aria-hidden>
      {rows.map((cols, r) => (
        <div key={r} className="-mt-3 flex first:mt-0">
          {Array.from({ length: cols }, () => {
            const i = k++;
            return (
              <span key={i} className="-mx-1">
                <SpinningCoin size={n >= 4 ? 44 : 52} delay={i * 260} />
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
