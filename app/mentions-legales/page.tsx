import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/data/site";
import { legal } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Éditeur, hébergeur et contact du site MCBloc.",
};

// Infos de l'éditeur : lib/data/legal.ts (source unique, aussi utilisée par les CGV).
const blocks: { title: string; lines: string[] }[] = [
  {
    title: "Éditeur",
    lines: [legal.owner, legal.status, `SIRET : ${legal.siret}`, legal.address, `Contact : ${legal.email}`, legal.vat],
  },
  { title: "Hébergeur", lines: [legal.host] },
  { title: "Paiements", lines: [legal.payment] },
  {
    title: "Minecraft",
    lines: [
      `${site.name} n'est pas un produit officiel de Minecraft et n'est ni approuvé ni associé à Mojang ou Microsoft.`,
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Informations</p>
      <h1 className="font-display text-4xl sm:text-5xl">Mentions légales</h1>
      <div className="mt-10 space-y-8">
        {blocks.map((b) => (
          <section key={b.title}>
            <h2 className="font-display text-2xl">{b.title}</h2>
            {b.lines.map((l) => (
              <p key={l} className="mt-2 leading-relaxed text-muted">{l}</p>
            ))}
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">
        Voir aussi les <Link href="/cgv" className="text-primary hover:underline">conditions générales de vente</Link>.
      </p>
    </div>
  );
}
