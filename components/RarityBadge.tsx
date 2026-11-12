import { rarities, type Rarity } from "@/lib/data/cosmetics";

export default function RarityBadge({ rarity }: { rarity: Rarity }) {
  const r = rarities[rarity];
  return (
    <span
      className="inline-block rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider"
      style={{ color: r.color, background: `${r.color}1f`, border: `1px solid ${r.color}55` }}
    >
      {r.label}
    </span>
  );
}
