"use client";

import LaunchNotice from "@/components/LaunchNotice";
import { site } from "@/lib/data/site";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart, type CartItem } from "@/lib/cart";
import { formatEuro, isValidUsername } from "@/lib/format";
import { checkout } from "@/lib/services/shop";
import Icon from "@/components/Icon";
import { getCachedAccount } from "@/lib/services/link";

type Done = { orderId: string; username: string; items: CartItem[]; total: number };

function PaiementContent() {
  const { items, total, ready, clear } = useCart();
  const [username, setUsername] = useState("");
  const [linked, setLinked] = useState(false);
  const [cgv, setCgv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);

  useEffect(() => {
    const acc = getCachedAccount();
    if (acc) {
      setUsername(acc.name);
      setLinked(true);
    }
  }, []);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isValidUsername(username)) return setError("Pseudo Minecraft invalide (3 à 16 caractères : lettres, chiffres, _).");
    if (!cgv) return setError("Tu dois accepter les conditions générales de vente.");
    setLoading(true);
    const res = await checkout({ username, items });
    setLoading(false);
    if (!res.ok) return setError(res.error);
    setDone({ orderId: res.orderId, username, items, total });
    clear();
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success"><Icon name="check" size={36} /></div>
        <h1 className="mt-6 font-display text-4xl">Merci {done.username} !</h1>
        <p className="mt-3 text-muted">
          Commande <span className="font-mono text-text">{done.orderId}</span> confirmée. Tes articles seront livrés à ta prochaine connexion
          sur <span className="font-mono text-primary">play.mcbloc.fr</span>.
        </p>
        <ul className="mt-6 space-y-2 rounded-xl border border-line bg-surface p-4 text-left text-sm">
          {done.items.map((i) => (
            <li key={i.id} className="flex justify-between">
              <span>{i.qty > 1 && `${i.qty} × `}{i.name}</span>
              <span className="text-muted">{formatEuro(i.price * i.qty)}</span>
            </li>
          ))}
          <li className="flex justify-between border-t border-line pt-2 font-bold">
            <span>Total</span>
            <span>{formatEuro(done.total)}</span>
          </li>
        </ul>
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-left text-xs text-warning"><Icon name="warning-diamond" size={16} />
          Paiement simulé : aucun débit n&apos;a été effectué (le module de paiement sera branché plus tard).
        </p>
        <Link href="/" className="btn-bloc mt-8 inline-block rounded-lg bg-gradient-brand px-6 py-3 font-bold text-white">
          Retour à l&apos;accueil
        </Link>
      </div>
    );
  }

  if (ready && items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl">Rien à payer</h1>
        <p className="mt-2 text-muted">Ton panier est vide.</p>
        <Link href="/boutique" className="mt-6 inline-block font-semibold text-primary hover:underline">Aller à la boutique</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/boutique/panier" className="text-sm text-muted hover:text-text">← Retour au panier</Link>
      <h1 className="mt-3 font-display text-4xl">Paiement</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_300px]">
        <form onSubmit={pay} className="space-y-6 rounded-xl border border-line bg-surface p-6">
          <div>
            <label htmlFor="username" className="font-semibold">Pseudo Minecraft</label>
            <p className="text-xs text-muted">Les articles seront livrés sur ce compte.</p>
            <div className="mt-2 flex items-center gap-3">
              {isValidUsername(username) && (
                <Image src={`https://mc-heads.net/avatar/${username}/48`} alt="" width={48} height={48} className="rounded" unoptimized />
              )}
              <input
                id="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value.trim()); setLinked(false); }}
                placeholder="Ton pseudo"
                maxLength={16}
                autoComplete="off"
                className="w-full rounded-lg border border-line bg-bg-2 px-4 py-3 font-mono outline-none focus:border-primary"
              />
            </div>
            {linked ? (
              <p className="mt-2 flex items-center gap-1 text-xs text-success"><Icon name="check" size={14} /> Compte lié au site</p>
            ) : (
              <p className="mt-2 text-xs text-muted">
                Astuce : <Link href="/compte" className="text-primary hover:underline">lie ton compte</Link> pour ne plus avoir à saisir ton pseudo.
              </p>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-dashed border-line p-4 text-sm text-muted"><Icon name="credit-card" size={22} className="text-primary" /><span>
            Le choix du moyen de paiement (carte, PayPal…) s&apos;affichera ici une fois le prestataire branché.</span>
          </div>

          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={cgv} onChange={(e) => setCgv(e.target.checked)} className="mt-1 h-4 w-4 accent-[#00c6ff]" />
            <span>
              J&apos;accepte les conditions générales de vente et je renonce à mon droit de rétractation pour ce contenu numérique livré
              immédiatement.
            </span>
          </label>

          {error && <p className="flex items-start gap-2 rounded-lg border border-error/40 bg-error/10 p-3 text-sm text-error"><Icon name="close" size={18} /> {error}</p>}

          <button
            type="submit"
            disabled={loading || !ready}
            className="btn-bloc w-full rounded-lg bg-accent px-4 py-3.5 font-bold text-bg disabled:opacity-60"
          >
            {loading ? "Paiement en cours…" : `Payer ${formatEuro(total)}`}
          </button>
          <p className="flex items-center justify-center gap-1 text-xs text-warning"><Icon name="warning-diamond" size={14} /> Mode démo : le paiement est simulé.</p>
        </form>

        <aside className="h-fit rounded-xl border border-line bg-surface p-5">
          <h2 className="font-semibold">Ta commande</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-3">
                <span className="truncate">{i.qty > 1 && `${i.qty} × `}{i.name}</span>
                <span className="shrink-0 text-muted">{formatEuro(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-line pt-3 text-lg font-bold">
            <span>Total</span>
            <span>{formatEuro(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function PaiementPage() {
  if (!site.launched) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <LaunchNotice title="Paiement bientôt disponible" backHref="/boutique" backLabel="Voir la boutique">
          Aucun paiement n&apos;est possible avant l&apos;ouverture du serveur.
        </LaunchNotice>
      </div>
    );
  }
  return <PaiementContent />;
}
