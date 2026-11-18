"use client";

import LaunchNotice from "@/components/LaunchNotice";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";
import { shopOpen } from "@/lib/data/shop";
import { formatEuro, isValidUsername } from "@/lib/format";
import { forgetCheckout, pay, pendingCheckout, rememberCheckout, startBasket, type Line } from "@/lib/services/shop";
import Icon from "@/components/Icon";
import { getCachedAccount } from "@/lib/services/link";

function PaiementContent() {
  const { items, total, ready } = useCart();
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [linked, setLinked] = useState(false);
  const [cgv, setCgv] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resumed = useRef(false);

  useEffect(() => {
    const acc = getCachedAccount();
    if (acc) {
      setUsername(acc.name);
      setLinked(true);
    }
  }, []);

  /** Envoie le panier (identifiants et quantités seulement) puis part sur la page de paiement Tebex. */
  async function finish(basket: string, lines: Line[]) {
    const res = await pay(basket, lines);
    forgetCheckout();
    if (!res.ok) {
      setLoading(false);
      return setError(res.error);
    }
    window.location.href = res.data.checkout;
  }

  // Retour de la connexion Tebex (?basket=…) : on reprend là où on s'était arrêté.
  useEffect(() => {
    const basket = params.get("basket");
    const pending = pendingCheckout();
    if (resumed.current || !basket || !pending || pending.basket !== basket) return;
    resumed.current = true;
    setLoading(true);
    void finish(pending.basket, pending.items);
  }, [params]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isValidUsername(username)) return setError("Pseudo Minecraft invalide (3 à 16 caractères : lettres, chiffres, _).");
    if (!cgv) return setError("Tu dois accepter les conditions générales de vente.");
    setLoading(true);
    const started = await startBasket(username);
    if (!started.ok) {
      setLoading(false);
      return setError(started.error);
    }
    const lines = items.map((i) => ({ id: i.id, qty: i.qty }));
    if (started.data.auth) {
      rememberCheckout(started.data.basket, lines);
      window.location.href = started.data.auth;
      return;
    }
    await finish(started.data.basket, lines);
  }

  if (ready && items.length === 0 && !params.get("basket")) {
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
        <form onSubmit={submit} className="space-y-6 rounded-xl border border-line bg-surface p-6">
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

          <div className="flex items-start gap-3 rounded-lg border border-line bg-bg-2 p-4 text-sm text-muted"><Icon name="credit-card" size={22} className="text-primary" /><span>
            Le paiement se fait sur la page sécurisée de <span className="text-text">Tebex</span>, notre prestataire de paiement
            (carte, PayPal…). Aucune donnée bancaire ne passe par MCBloc.</span>
          </div>

          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={cgv} onChange={(e) => setCgv(e.target.checked)} className="mt-1 h-4 w-4 accent-[#00c6ff]" />
            <span>
              J&apos;accepte les <Link href="/cgv" className="text-primary hover:underline">conditions générales de vente</Link> et je
              renonce à mon droit de rétractation pour ce contenu numérique livré immédiatement.
            </span>
          </label>

          {error && <p className="flex items-start gap-2 rounded-lg border border-error/40 bg-error/10 p-3 text-sm text-error"><Icon name="close" size={18} /> {error}</p>}

          <button
            type="submit"
            disabled={loading || !ready}
            className="btn-bloc w-full rounded-lg bg-accent px-4 py-3.5 font-bold text-bg disabled:opacity-60"
          >
            {loading ? "Redirection vers le paiement…" : `Payer ${formatEuro(total)}`}
          </button>
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
          <p className="mt-3 text-xs text-dim">Livraison en jeu automatique, à ta prochaine connexion si tu n&apos;es pas en ligne.</p>
        </aside>
      </div>
    </div>
  );
}

export default function PaiementPage() {
  if (!shopOpen) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <LaunchNotice title="Paiement bientôt disponible" backHref="/boutique" backLabel="Voir la boutique">
          Aucun paiement n&apos;est possible avant l&apos;ouverture du serveur.
        </LaunchNotice>
      </div>
    );
  }
  return (
    <Suspense fallback={<p className="mx-auto max-w-4xl px-4 py-12 text-muted">Chargement…</p>}>
      <PaiementContent />
    </Suspense>
  );
}
