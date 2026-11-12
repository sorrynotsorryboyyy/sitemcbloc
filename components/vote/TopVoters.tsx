"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { site } from "@/lib/data/site";

type Voter = { name: string; votes: number };

/**
 * Top des voteurs du mois, servi par le bot Discord (GET <BOT_URL>/public/votes).
 * Masqué tant que le serveur n'est pas ouvert ou que NEXT_PUBLIC_BOT_URL n'est pas défini.
 */
export default function TopVoters() {
  const api = process.env.NEXT_PUBLIC_BOT_URL;
  const [voters, setVoters] = useState<Voter[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!site.launched || !api) return;
    fetch(`${api.replace(/\/$/, "")}/public/votes`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { top?: Voter[] }) => setVoters(d.top ?? []))
      .catch(() => setFailed(true));
  }, [api]);

  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <h2 className="flex items-center gap-2 font-display text-2xl">
        <Icon name="trophy" size={24} className="text-accent" /> Top voteurs du mois
      </h2>
      {!site.launched || !api || failed ? (
        <p className="mt-4 text-sm text-muted">Le classement s&apos;affichera ici dès l&apos;ouverture du serveur. Il est aussi publié sur le Discord.</p>
      ) : voters === null ? (
        <p className="mt-4 text-sm text-muted">Chargement…</p>
      ) : voters.length === 0 ? (
        <p className="mt-4 text-sm text-muted">Personne n&apos;a encore voté ce mois-ci. Sois le premier !</p>
      ) : (
        <ol className="mt-4 space-y-2">
          {voters.slice(0, 10).map((v, i) => (
            <li key={v.name} className="flex items-center gap-3 rounded-lg bg-bg-2 px-3 py-2">
              <span className={`w-6 text-center font-display ${i < 3 ? "text-accent" : "text-muted"}`}>{i + 1}</span>
              <Image src={`https://mc-heads.net/avatar/${encodeURIComponent(v.name)}/24`} alt="" width={24} height={24} className="rounded" unoptimized />
              <span className="flex-1 truncate font-semibold">{v.name}</span>
              <span className="text-sm text-muted">{v.votes} votes</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
