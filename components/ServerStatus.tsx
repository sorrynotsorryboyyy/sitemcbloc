"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data/site";
import { getServerStatus, type ServerStatus as Status } from "@/lib/services/serverStatus";

export default function ServerStatus() {
  if (!site.launched) return <ComingSoon />;
  return <LiveStatus />;
}

/** Avant l'ouverture : aucun nombre de joueurs (il serait faux). */
function ComingSoon() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-warning/40 bg-warning/10 px-4 py-2 text-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-warning" />
      </span>
      <span>
        <strong className="text-warning">Ouverture prochainement</strong> <span className="text-muted">· serveur en préparation</span>
      </span>
    </div>
  );
}

function LiveStatus() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () => getServerStatus().then((s) => alive && setStatus(s)).catch(() => {});
    load();
    const id = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const online = status?.online ?? false;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-4 py-2 text-sm">
      <span className="relative flex h-2.5 w-2.5">
        {online && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${status ? (online ? "bg-success" : "bg-error") : "bg-dim"}`} />
      </span>
      {status ? (
        online ? (
          <span>
            <strong className="text-success">{status.players}</strong> <span className="text-muted">joueurs en ligne</span>
          </span>
        ) : (
          <span className="text-error">Serveur hors ligne</span>
        )
      ) : (
        <span className="text-muted">Connexion au serveur…</span>
      )}
    </div>
  );
}
