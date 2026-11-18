"use client";

import Link from "next/link";
import { useEffect } from "react";
import Icon from "@/components/Icon";
import { useCart } from "@/lib/cart";
import { site } from "@/lib/data/site";

/** Retour de Stripe après un paiement réussi. La livraison, elle, ne dépend que du webhook signé (jamais de cette page). */
export default function MerciPage() {
  const { clear, ready } = useCart();

  useEffect(() => {
    if (!ready) return;
    clear();
  }, [ready, clear]);

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success"><Icon name="check" size={36} /></div>
      <h1 className="mt-6 font-display text-4xl">Merci pour ton achat !</h1>
      <p className="mt-3 text-muted">
        Ton paiement est en cours de validation. Tes articles arrivent automatiquement en jeu dans les minutes qui suivent, ou à ta
        prochaine connexion sur <span className="font-mono text-primary">{site.ip}</span>. Ton reçu t&apos;est envoyé par e-mail.
      </p>
      <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-muted">
        <li className="flex gap-2"><Icon name="check" size={16} className="text-success" /> Grade : visible avec <span className="font-mono text-text">/grades</span></li>
        <li className="flex gap-2"><Icon name="check" size={16} className="text-success" /> Booster : <span className="font-mono text-text">/boosters</span></li>
        <li className="flex gap-2"><Icon name="check" size={16} className="text-success" /> Pièces : ajoutées à ton solde</li>
      </ul>
      <p className="mt-6 text-sm text-muted">
        Rien reçu après 15 minutes ? Ouvre un ticket sur le{" "}
        <a href={site.discord} target="_blank" rel="noreferrer" className="text-primary hover:underline">Discord</a> avec ton reçu.
      </p>
      <Link href="/" className="btn-bloc mt-8 inline-block rounded-lg bg-gradient-brand px-6 py-3 font-bold text-white">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
