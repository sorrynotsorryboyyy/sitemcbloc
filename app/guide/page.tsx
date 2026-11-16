import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { getGuide, sectionColor, sectionEmoji } from "@/lib/services/guide";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Guide",
  description: "Règles, commandes et chiffres de chaque jeu MCBloc : dégâts, chances, prix, récompenses.",
};

export default async function GuidePage() {
  const sections = await getGuide();
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Guide</p>
      <h1 className="font-display text-4xl sm:text-5xl">
        Le guide <span className="text-gradient">MCBloc</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Règles, commandes et chiffres exacts de chaque jeu : dégâts, chances, prix, récompenses. Le même guide qu&apos;en jeu
        (<code className="rounded bg-bg-2 px-1.5 py-0.5 text-sm">/guide</code>) et que sur le Discord, mis à jour
        automatiquement par le serveur.
      </p>

      {sections.length === 0 ? (
        <div className="mt-10 rounded-xl border border-line bg-surface p-6 text-muted">
          Le guide se charge depuis le serveur : reviens dans quelques minutes.
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => {
            const color = sectionColor(s.id);
            return (
              <Link
                key={s.id}
                href={`/guide/${s.id}`}
                className="group flex flex-col rounded-xl border-2 bg-surface p-5 transition-colors hover:bg-surface-2"
                style={{ borderColor: `${color}40` }}
              >
                <span className="text-3xl" aria-hidden>
                  {sectionEmoji(s.id)}
                </span>
                <h2 className="mt-3 font-display text-2xl" style={{ color }}>
                  {s.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted">{s.summary}</p>
                <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-dim">
                  {s.rules.length > 0 && <span>{s.rules.length} règles</span>}
                  {s.commands.length > 0 && <span>{s.commands.length} commandes</span>}
                  {s.tables.length > 0 && <span>{s.tables.length} tableaux de chiffres</span>}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Lire <Icon name="chevron-right" size={16} />
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
