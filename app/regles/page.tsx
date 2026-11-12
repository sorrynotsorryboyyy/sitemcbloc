import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { network, type RuleScope } from "@/lib/data/network";

export const metadata: Metadata = {
  title: "Règles",
  description: "Les règles du réseau MCBloc, en jeu et sur le Discord.",
};

const scopes: { id: RuleScope; label: string; icon: "gamepad" | "discord-solid" }[] = [
  { id: "jeu", label: "En jeu", icon: "gamepad" },
  { id: "discord", label: "Discord", icon: "discord-solid" },
];

export default function ReglesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Règles</p>
      <h1 className="font-display text-4xl sm:text-5xl">
        Les règles <span className="text-gradient">MCBloc</span>
      </h1>
      <p className="mt-3 text-muted">
        Pour que tout le monde passe un bon moment, en jeu comme sur le Discord. En te connectant au serveur, tu acceptes ces règles.
      </p>

      <ol className="mt-10 space-y-3">
        {network.rules.map((r, i) => (
          <li key={r.text} className="flex gap-4 rounded-xl border border-line bg-surface p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-display text-lg text-primary">{i + 1}</span>
            <div className="flex-1">
              <p className="leading-relaxed">{r.text}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {scopes
                  .filter((s) => r.where.includes(s.id))
                  .map((s) => (
                    <span key={s.id} className="inline-flex items-center gap-1 rounded border border-line bg-bg-2 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
                      <Icon name={s.icon} size={12} /> {s.label}
                    </span>
                  ))}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-[#5865F2]/40 bg-[#5865F2]/10 p-6 sm:flex-row sm:items-center">
        <Icon name="discord-solid" size={36} className="text-[#5865F2]" />
        <p className="flex-1 text-sm text-muted">
          Une sanction te semble injuste ? Ouvre un ticket sur le Discord : le staff étudiera ta demande.
        </p>
        <a href={network.links.discord} target="_blank" rel="noreferrer" className="btn-bloc rounded-lg bg-[#5865F2] px-5 py-3 font-bold text-white">
          Ouvrir le Discord
        </a>
      </div>
    </div>
  );
}
