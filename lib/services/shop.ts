import type { CartItem } from "@/lib/cart";

/**
 * Paiement de la boutique.
 *
 * MOCK pour l'instant : simule un paiement réussi.
 *
 * Contrat prévu pour le backend (Tebex ou Stripe Checkout) :
 *  1. POST /api/checkout { username, items }  → { url }  (redirection vers la page de paiement)
 *  2. Webhook du prestataire → enregistre des récompenses « en attente » en base
 *     (identifiant fixe, ex. "order:<id>:<item>", pour ne jamais livrer deux fois).
 *  3. Le proxy MCBloc récupère GET /api/rewards/pending puis confirme POST /api/rewards/:id/ack
 *     (Authorization: Bearer <secret>), exactement comme avec le bot McBlocDidi.
 *  4. Les pièces sont AJOUTÉES au solde (coins = coins + X), jamais écrasées.
 */
export type CheckoutRequest = { username: string; items: CartItem[] };
export type CheckoutResult = { ok: true; orderId: string } | { ok: false; error: string };

export async function checkout(req: CheckoutRequest): Promise<CheckoutResult> {
  await new Promise((r) => setTimeout(r, 1200));
  if (req.items.length === 0) return { ok: false, error: "Ton panier est vide." };
  const orderId = "MCB-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return { ok: true, orderId };
}
