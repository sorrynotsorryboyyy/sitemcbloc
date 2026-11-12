"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import Icon from "@/components/Icon";

export default function CartToast() {
  const { lastAdded } = useCart();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      {lastAdded && (
        <div className="pointer-events-auto flex items-center gap-3 rounded-lg border border-success/40 bg-surface-2 px-4 py-3 text-sm shadow-xl">
          <Icon name="check" size={18} className="text-success" />
          <span>
            <strong>{lastAdded}</strong> ajouté au panier
          </span>
          <Link href="/boutique/panier" className="font-semibold text-primary hover:underline">
            Voir
          </Link>
        </div>
      )}
    </div>
  );
}
