"use client";

import Icon from "@/components/Icon";
import { useCart, type CartItem } from "@/lib/cart";
import { site } from "@/lib/data/site";

/**
 * Bouton d'achat de la boutique.
 * Avant l'ouverture (site.launched = false) : bouton désactivé « Disponible à l'ouverture ».
 */
export default function BuyButton({
  item,
  label = "Ajouter au panier",
  className = "",
  style,
}: {
  item: Omit<CartItem, "qty">;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { add } = useCart();

  if (!site.launched) {
    return (
      <button
        type="button"
        disabled
        className={`flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-bg-2 px-4 py-2.5 text-sm font-bold text-muted ${className}`}
        title="La boutique ouvrira en même temps que le serveur"
      >
        <Icon name="clock" size={16} /> Disponible à l&apos;ouverture
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => add(item)}
      className={`btn-bloc flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-bold text-bg ${className}`}
      style={style}
    >
      <Icon name="shopping-cart" size={16} /> {label}
    </button>
  );
}
