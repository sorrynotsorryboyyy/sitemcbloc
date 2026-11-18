import { site } from "@/lib/data/site";

/**
 * Paiement de la boutique, via le bot (Railway) qui crée la session Stripe. Aucun secret ni prix n'est envoyé d'ici :
 *  checkout(pseudo, articles) → le bot vérifie le pseudo, calcule les prix depuis network.json → lien de paiement Stripe.
 * La livraison ne dépend que du webhook signé reçu par le bot (jamais de cette page).
 */
export type Line = { id: string; qty: number };

const ERRORS: Record<string, string> = {
  "shop-closed": "La boutique est fermée pour le moment.",
  "invalid-player": "Ce pseudo Minecraft n'existe pas. Vérifie l'orthographe (compte Minecraft officiel).",
  "invalid-item": "Un article de ton panier n'existe plus. Retire-le puis réessaie.",
  "invalid-cart": "Ton panier est vide ou trop grand (10 articles différents au plus).",
  "too-many-requests": "Trop de tentatives. Patiente quelques minutes.",
  "payment-unavailable": "Le service de paiement ne répond pas. Réessaie dans un instant.",
};

export async function checkout(
  username: string,
  items: Line[],
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${site.botApi}/public/shop/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, items }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || typeof json.checkout !== "string") {
      return { ok: false, error: ERRORS[json.error] ?? "Une erreur est survenue. Réessaie dans un instant." };
    }
    return { ok: true, url: json.checkout };
  } catch {
    return { ok: false, error: ERRORS["payment-unavailable"] };
  }
}
