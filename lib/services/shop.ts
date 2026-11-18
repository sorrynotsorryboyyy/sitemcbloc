import { site } from "@/lib/data/site";

/**
 * Paiement de la boutique, via le bot (Railway) qui parle à Tebex. Aucun secret ni prix n'est envoyé d'ici :
 *  1. startBasket(pseudo)   → panier Tebex (et, si Tebex le demande, lien de connexion du joueur)
 *  2. pay(panier, articles) → le bot crée les articles AU PRIX de network.json → lien de paiement Tebex
 *  3. Tebex prévient le bot (webhook signé) → le proxy livre en jeu, une seule fois par article.
 */
export type Line = { id: string; qty: number };

const ERRORS: Record<string, string> = {
  "shop-closed": "La boutique est fermée pour le moment.",
  "invalid-player": "Ce pseudo Minecraft n'existe pas. Vérifie l'orthographe (compte Minecraft officiel).",
  "invalid-item": "Un article de ton panier n'existe plus. Retire-le puis réessaie.",
  "invalid-cart": "Ton panier est vide ou trop grand (10 articles différents au plus).",
  "unknown-basket": "Ta session de paiement a expiré. Recommence depuis le panier.",
  "basket-used": "Cette session de paiement a déjà été utilisée. Recommence depuis le panier.",
  "too-many-requests": "Trop de tentatives. Patiente quelques minutes.",
  "payment-unavailable": "Le service de paiement ne répond pas. Réessaie dans un instant.",
};

async function post<T>(path: string, body: unknown): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${site.botApi}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: ERRORS[json.error] ?? "Une erreur est survenue. Réessaie dans un instant." };
    return { ok: true, data: json as T };
  } catch {
    return { ok: false, error: ERRORS["payment-unavailable"] };
  }
}

export function startBasket(username: string) {
  return post<{ basket: string; player: string; auth: string | null }>("/public/shop/basket", { username });
}

export function pay(basket: string, items: Line[]) {
  return post<{ checkout: string }>("/public/shop/checkout", { basket, items });
}

/** Panier en cours de paiement, gardé le temps d'un éventuel passage par la connexion Tebex. */
const PENDING = "mcbloc.checkout";
export function rememberCheckout(basket: string, items: Line[]) {
  try { sessionStorage.setItem(PENDING, JSON.stringify({ basket, items })); } catch { /* navigation privée */ }
}
export function pendingCheckout(): { basket: string; items: Line[] } | null {
  try { return JSON.parse(sessionStorage.getItem(PENDING) ?? "null"); } catch { return null; }
}
export function forgetCheckout() {
  try { sessionStorage.removeItem(PENDING); } catch { /* ignore */ }
}
