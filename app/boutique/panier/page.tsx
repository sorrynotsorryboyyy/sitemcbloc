"use client";

import LaunchNotice from "@/components/LaunchNotice";
import { site } from "@/lib/data/site";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatEuro } from "@/lib/format";
import Icon from "@/components/Icon";

function PanierContent() {
  const { items, total, ready, setQty, remove, clear } = useCart();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-display text-4xl">Mon panier</h1>

      {!ready ? (
        <p className="mt-8 text-muted">Chargement…</p>
      ) : items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-line bg-surface p-10 text-center">
          <Icon name="shopping-cart" size={56} className="mx-auto text-primary" />
          <p className="mt-4 text-lg font-semibold">Ton panier est vide</p>
          <p className="mt-1 text-muted">Jette un œil aux grades et aux packs de pièces.</p>
          <Link href="/boutique" className="btn-bloc mt-6 inline-block rounded-lg bg-gradient-brand px-6 py-3 font-bold text-white">
            Aller à la boutique
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_300px]">
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4">
                <span className="h-10 w-1.5 shrink-0 rounded-full" style={{ background: item.color ?? "#00c6ff" }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{item.name}</p>
                  <p className="text-xs text-muted">{item.category} · {formatEuro(item.price)}</p>
                </div>
                {item.category !== "Grade" ? (
                  <div className="flex items-center rounded-lg border border-line">
                    <button className="px-3 py-1.5 text-muted hover:text-text" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Retirer un"><Icon name="minus" size={14} /></button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button className="px-3 py-1.5 text-muted hover:text-text" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Ajouter un"><Icon name="plus" size={14} /></button>
                  </div>
                ) : (
                  <span className="text-xs text-muted">×1</span>
                )}
                <p className="w-20 text-right font-bold">{formatEuro(item.price * item.qty)}</p>
                <button onClick={() => remove(item.id)} className="text-muted hover:text-error" aria-label={`Supprimer ${item.name}`}><Icon name="trash" size={18} /></button>
              </li>
            ))}
            <li>
              <button onClick={clear} className="text-sm text-muted hover:text-error">Vider le panier</button>
            </li>
          </ul>

          <aside className="h-fit rounded-xl border border-line bg-surface p-5">
            <h2 className="font-semibold">Récapitulatif</h2>
            <div className="mt-4 flex justify-between text-sm text-muted">
              <span>Sous-total</span>
              <span>{formatEuro(total)}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-line pt-3 text-lg font-bold">
              <span>Total</span>
              <span>{formatEuro(total)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">TVA incluse</p>
            <Link href="/boutique/paiement" className="btn-bloc mt-5 block rounded-lg bg-accent px-4 py-3 text-center font-bold text-bg">
              Passer au paiement
            </Link>
            <Link href="/boutique" className="mt-3 block text-center text-sm text-muted hover:text-text">
              Continuer mes achats
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default function PanierPage() {
  if (!site.launched) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <LaunchNotice title="Le panier ouvrira avec le serveur" backHref="/boutique" backLabel="Voir la boutique">
          La boutique est pour l&apos;instant une vitrine : les achats seront possibles le jour de l&apos;ouverture.
        </LaunchNotice>
      </div>
    );
  }
  return <PanierContent />;
}
