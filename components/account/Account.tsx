"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/lib/data/site";
import Icon from "@/components/Icon";
import LaunchNotice from "@/components/LaunchNotice";
import { formatNumber, isValidUsername } from "@/lib/format";
import {
  createLinkCode,
  getLinkStatus,
  getLinkedAccount,
  simulateInGameCommand,
  unlink,
  type LinkCode,
  type LinkedAccount,
} from "@/lib/services/link";

export default function Account() {
  if (!site.launched) return <AccountComingSoon />;
  return <AccountLive />;
}

/** Avant l'ouverture : pas de liaison possible, on explique comment ça marchera. */
function AccountComingSoon() {
  const steps = [
    { icon: "user" as const, title: "Génère ton code", text: "Un code personnel, valable 10 minutes, affiché sur cette page." },
    { icon: "gamepad" as const, title: "Connecte-toi au serveur", text: `Rejoins ${site.ip} avec ton compte Minecraft.` },
    { icon: "link" as const, title: `Tape ${site.linkCommand} ${site.linkCodePrefix}XXXXXX`, text: "Ton compte est lié : profil, statistiques et achats livrés automatiquement." },
  ];
  return (
    <div className="mt-8 space-y-8">
      <LaunchNotice title="La liaison de compte arrive à l'ouverture">
        Le serveur n&apos;est pas encore ouvert : il n&apos;est pas encore possible de lier ton compte Minecraft au site.
      </LaunchNotice>
      <div>
        <h2 className="mb-4 font-display text-2xl">Comment ça marchera</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-xl border border-line bg-surface p-5">
              <span className="absolute right-4 top-3 font-display text-3xl text-line">{i + 1}</span>
              <Icon name={s.icon} size={28} className="text-primary" />
              <p className="mt-3 font-bold">{s.title}</p>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
          <Icon name="info-box" size={14} className="text-primary" />
          <span className="font-mono">/lier</span> sert à lier ton compte <strong>Discord</strong>, pas le site.
        </p>
      </div>
    </div>
  );
}

function AccountLive() {
  const [account, setAccount] = useState<LinkedAccount | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setAccount(getLinkedAccount());
    setLoaded(true);
  }, []);

  if (!loaded) return <p className="mt-8 text-muted">Chargement…</p>;
  return account ? (
    <Profile account={account} onUnlink={async () => { await unlink(); setAccount(null); }} />
  ) : (
    <LinkFlow onLinked={setAccount} />
  );
}

function LinkFlow({ onLinked }: { onLinked: (a: LinkedAccount) => void }) {
  const [code, setCode] = useState<LinkCode | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [expired, setExpired] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = useCallback(async () => {
    setExpired(false);
    setCode(await createLinkCode());
  }, []);

  // Compte à rebours + interrogation du statut toutes les 2 s
  useEffect(() => {
    if (!code) return;
    const tick = setInterval(() => setNow(Date.now()), 1000);
    const poll = setInterval(async () => {
      const s = await getLinkStatus(code);
      if (s.status === "linked") onLinked(s.account);
      if (s.status === "expired") {
        setExpired(true);
        setCode(null);
      }
    }, 2000);
    return () => {
      clearInterval(tick);
      clearInterval(poll);
    };
  }, [code, onLinked]);

  const remaining = code ? Math.max(0, code.expiresAt - now) : 0;
  const mm = Math.floor(remaining / 60000);
  const ss = Math.floor((remaining % 60000) / 1000).toString().padStart(2, "0");
  const command = code ? `${site.linkCommand} ${code.code}` : "";

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-[1fr_280px]">
      <div className="rounded-xl border border-line bg-surface p-6">
        <h2 className="text-xl font-bold">Lier mon compte Minecraft</h2>
        <p className="mt-2 text-sm text-muted">
          Lie ton compte pour voir ton profil, tes statistiques et recevoir tes achats sans saisir ton pseudo.
        </p>

        {!code ? (
          <>
            {expired && <p className="mt-4 flex items-center gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-sm text-warning"><Icon name="warning-diamond" size={18} /> Le code a expiré. Génère-en un nouveau.</p>}
            <button onClick={generate} className="btn-bloc mt-6 rounded-lg bg-gradient-brand px-6 py-3 font-bold text-white">
              Générer mon code
            </button>
          </>
        ) : (
          <div className="mt-6">
            <p className="text-sm font-semibold">Tape cette commande en jeu :</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <code className="flex-1 rounded-lg border border-primary/50 bg-black/60 px-4 py-4 text-center font-mono text-xl tracking-wider text-primary sm:text-2xl">
                {command}
              </code>
              <button onClick={copy} className="btn-bloc rounded-lg border border-line bg-surface-2 px-4 py-3 text-sm font-semibold">
                <span className="inline-flex items-center gap-1.5"><Icon name={copied ? "check" : "copy"} size={16} /> {copied ? "Copié" : "Copier"}</span>
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> En attente de la commande en jeu…
              </span>
              <span className={remaining < 60000 ? "text-warning" : "text-muted"}>
                Expire dans <strong className="font-mono">{mm}:{ss}</strong>
              </span>
            </div>
            <button onClick={generate} className="mt-3 text-xs text-muted hover:text-text">Générer un autre code</button>

            {process.env.NODE_ENV !== "production" && <DevSimulator code={code.code} />}
          </div>
        )}
      </div>

      <aside className="h-fit rounded-xl border border-line bg-bg-2 p-5 text-sm">
        <h3 className="font-semibold">Comment ça marche ?</h3>
        <ol className="mt-3 space-y-3 text-muted">
          <li><span className="font-bold text-primary">1.</span> Génère ton code (valable 10 minutes).</li>
          <li><span className="font-bold text-primary">2.</span> Connecte-toi sur <span className="font-mono text-text">{site.ip}</span>.</li>
          <li><span className="font-bold text-primary">3.</span> Tape <span className="font-mono text-text">{site.linkCommand} {site.linkCodePrefix}XXXXXX</span> dans le chat.</li>
          <li><span className="font-bold text-primary">4.</span> Cette page se met à jour toute seule.</li>
        </ol>
        <p className="mt-4 border-t border-line pt-3 text-xs text-muted">
          <Icon name="info-box" size={14} className="mr-1 -mt-0.5 text-primary" /><span className="font-mono">/lier</span> sert à lier ton compte <strong>Discord</strong>, pas le site.
        </p>
      </aside>
    </div>
  );
}

/** Visible uniquement en développement : remplace le joueur qui tape la commande en jeu. */
function DevSimulator({ code }: { code: string }) {
  const [name, setName] = useState("Steve");
  return (
    <div className="mt-6 rounded-lg border border-dashed border-warning/50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-warning">Mode dev · simuler la commande en jeu</p>
      <div className="mt-2 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="min-w-0 flex-1 rounded border border-line bg-bg-2 px-3 py-2 font-mono text-sm"
          aria-label="Pseudo simulé"
        />
        <button
          disabled={!isValidUsername(name)}
          onClick={() => simulateInGameCommand(code, name)}
          className="rounded bg-warning px-3 py-2 text-sm font-bold text-bg disabled:opacity-50"
        >
          Simuler {site.linkCommand}
        </button>
      </div>
    </div>
  );
}

function Profile({ account, onUnlink }: { account: LinkedAccount; onUnlink: () => void }) {
  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col items-center gap-6 rounded-xl border border-line bg-surface p-6 sm:flex-row">
        <Image
          src={`https://mc-heads.net/body/${account.username}/120`}
          alt={`Skin de ${account.username}`}
          width={60}
          height={120}
          className="h-[120px] w-auto"
          unoptimized
        />
        <div className="flex-1 text-center sm:text-left">
          <p className="font-mono text-sm">
            <span className="text-dim">[</span>
            <span style={{ color: account.rankColor }}>{account.rank}</span>
            <span className="text-dim">]</span>
          </p>
          <h2 className="font-display text-3xl">{account.username}</h2>
          <p className="mt-1 flex items-center justify-center gap-1 text-sm text-success sm:justify-start"><Icon name="check" size={16} /> Compte lié le {new Date(account.linkedAt).toLocaleDateString("fr-FR")}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-lg bg-bg-2 px-4 py-3">
            <p className="font-display text-2xl text-accent">{formatNumber(account.coins)}</p>
            <p className="text-xs text-muted">pièces</p>
          </div>
          <div className="rounded-lg bg-bg-2 px-4 py-3">
            <p className="font-display text-2xl text-primary">{account.level}</p>
            <p className="text-xs text-muted">niveau</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {account.stats.map((s) => (
          <div key={s.game} className="rounded-xl border border-line bg-surface p-5">
            <p className="font-semibold">{s.game}</p>
            <p className="mt-2 text-2xl font-bold">{formatNumber(s.wins)} <span className="text-sm font-normal text-muted">victoires</span></p>
            {s.elo && <p className="text-sm text-muted">ELO <span className="text-primary">{s.elo}</span></p>}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href="/boutique" className="btn-bloc rounded-lg bg-accent px-5 py-3 font-bold text-bg">Aller à la boutique</Link>
        <button onClick={onUnlink} className="rounded-lg border border-line px-5 py-3 text-sm text-muted hover:border-error hover:text-error">
          Délier ce compte
        </button>
      </div>
      <p className="flex items-center gap-1 text-xs text-warning"><Icon name="warning-diamond" size={14} /> Données de démonstration : le profil réel sera chargé depuis le serveur une fois le backend branché.</p>
    </div>
  );
}
