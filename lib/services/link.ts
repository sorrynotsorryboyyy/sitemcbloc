import { site } from "@/lib/data/site";

/**
 * Liaison du site avec un compte Minecraft, via la commande en jeu `/site WEB-XXXXXX`.
 * (Différente de `/lier MCB-XXXXXX`, réservée à la liaison Discord.)
 *
 * Le bot Discord (Railway) sert d'intermédiaire : il est déjà relié au proxy du serveur,
 * ce qui évite d'ouvrir la base MySQL à Internet.
 *  - POST   {bot}/public/site-link/code    → { code, token, expiresAt }
 *  - GET    {bot}/public/site-link/status  → { status, account? }   (Authorization: Bearer <token>)
 *  - DELETE {bot}/public/site-link         → { ok }
 * Le jeton (secret) reste dans ce navigateur ; le proxy envoie les profils des comptes liés au bot.
 */

export type GameStat = { game: string; wins: number; elo?: number };

export type AccountProfile = {
  name: string;
  rank: { id: string; name: string };
  coins: number;
  level: number;
  stats: GameStat[];
  updatedAt: number;
};

export type LinkedAccount = {
  uuid: string;
  name: string;
  linkedAt: number;
  /** null tant que le serveur n'a pas encore envoyé le profil (quelques secondes après la liaison) */
  profile: AccountProfile | null;
};

export type LinkCode = { code: string; expiresAt: number };
export type LinkStatus =
  | { status: "pending" }
  | { status: "expired" }
  | { status: "unknown" }
  | { status: "linked"; account: LinkedAccount };

const TOKEN_KEY = "mcbloc.site.token";
const ACCOUNT_KEY = "mcbloc.site.account";

const api = (path: string) => `${site.botApi.replace(/\/$/, "")}${path}`;

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

const getToken = () => storage()?.getItem(TOKEN_KEY) ?? null;

function setToken(token: string | null) {
  const s = storage();
  if (!s) return;
  if (token) s.setItem(TOKEN_KEY, token);
  else s.removeItem(TOKEN_KEY);
}

function cacheAccount(account: LinkedAccount | null) {
  const s = storage();
  if (!s) return;
  if (account) s.setItem(ACCOUNT_KEY, JSON.stringify(account));
  else s.removeItem(ACCOUNT_KEY);
}

/** Dernier compte lié connu (lecture immédiate, sans réseau ; ex. pseudo pré-rempli au paiement). */
export function getCachedAccount(): LinkedAccount | null {
  try {
    const raw = storage()?.getItem(ACCOUNT_KEY);
    return raw ? (JSON.parse(raw) as LinkedAccount) : null;
  } catch {
    return null;
  }
}

/** Demande un code. Le jeton secret est gardé dans ce navigateur. */
export async function createLinkCode(): Promise<LinkCode> {
  const res = await fetch(api("/public/site-link/code"), { method: "POST" });
  if (res.status === 429) throw new Error("Trop de demandes : réessaie dans quelques minutes.");
  if (!res.ok) throw new Error("Le service de liaison est injoignable pour le moment.");
  const data = (await res.json()) as { code: string; token: string; expiresAt: number };
  setToken(data.token);
  cacheAccount(null);
  return { code: data.code, expiresAt: data.expiresAt };
}

/** Statut du jeton de ce navigateur (en attente, lié avec profil, expiré...). */
export async function getLinkStatus(): Promise<LinkStatus> {
  const token = getToken();
  if (!token) return { status: "unknown" };
  const res = await fetch(api("/public/site-link/status"), { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  if (!res.ok) throw new Error("Le service de liaison est injoignable pour le moment.");
  const data = (await res.json()) as LinkStatus;
  if (data.status === "linked") cacheAccount(data.account);
  if (data.status === "unknown") {
    setToken(null);
    cacheAccount(null);
  }
  return data;
}

/** Compte lié de ce navigateur (null s'il n'y en a pas). */
export async function getLinkedAccount(): Promise<LinkedAccount | null> {
  const s = await getLinkStatus();
  return s.status === "linked" ? s.account : null;
}

export async function unlink(): Promise<void> {
  const token = getToken();
  if (token) {
    await fetch(api("/public/site-link"), { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).catch(() => null);
  }
  setToken(null);
  cacheAccount(null);
}
