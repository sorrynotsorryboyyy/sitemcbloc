import { site } from "@/lib/data/site";

/**
 * Liaison compte Minecraft ↔ site, via la commande en jeu `/site WEB-XXXXXX`.
 * (Différente de `/lier MCB-XXXXXX`, réservée à la liaison Discord du bot McBlocDidi.)
 *
 * MOCK pour l'instant : tout est stocké dans le navigateur.
 *
 * Contrat prévu pour le backend :
 *  - POST /api/link/code                → { code: "WEB-XXXXXX", expiresAt }   (10 min, usage unique)
 *  - GET  /api/link/status?code=...     → { status: "pending" | "linked" | "expired", account? }
 *  - POST /api/link/confirm             appelé par le proxy (commande /site, calquée sur LierCommand.java)
 *        body { code, uuid, name }, header Authorization: Bearer <LINK_SECRET>
 */
export type LinkedAccount = {
  uuid: string;
  username: string;
  rank: string;
  rankColor: string;
  coins: number;
  level: number;
  linkedAt: string;
  stats: { game: string; wins: number; elo?: number }[];
};

export type LinkCode = { code: string; expiresAt: number };
export type LinkStatus =
  | { status: "pending" }
  | { status: "expired" }
  | { status: "linked"; account: LinkedAccount };

const CODE_TTL_MS = 10 * 60 * 1000;
const ACCOUNT_KEY = "mcbloc.account";
const PENDING_KEY = "mcbloc.link.simulated";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sans 0/O/1/I pour éviter les confusions

function randomCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return site.linkCodePrefix + Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* stockage indisponible : on ignore */
  }
}

export async function createLinkCode(): Promise<LinkCode> {
  await new Promise((r) => setTimeout(r, 300));
  write(PENDING_KEY, null);
  return { code: randomCode(), expiresAt: Date.now() + CODE_TTL_MS };
}

export async function getLinkStatus(code: LinkCode): Promise<LinkStatus> {
  if (Date.now() > code.expiresAt) return { status: "expired" };
  const simulated = read<{ code: string; username: string }>(PENDING_KEY);
  if (simulated?.code === code.code) {
    const account = mockAccount(simulated.username);
    write(ACCOUNT_KEY, account);
    write(PENDING_KEY, null);
    return { status: "linked", account };
  }
  return { status: "pending" };
}

/** Outil de développement : simule le joueur qui tape /site <code> en jeu. */
export function simulateInGameCommand(code: string, username: string) {
  write(PENDING_KEY, { code, username });
}

export function getLinkedAccount(): LinkedAccount | null {
  return read<LinkedAccount>(ACCOUNT_KEY);
}

export async function unlink(): Promise<void> {
  write(ACCOUNT_KEY, null);
}

function mockAccount(username: string): LinkedAccount {
  return {
    uuid: crypto.randomUUID(),
    username,
    rank: "VIP",
    rankColor: "#4dd2ff",
    coins: 12450,
    level: 27,
    linkedAt: new Date().toISOString(),
    stats: [
      { game: "Piggy Wars", wins: 138, elo: 1420 },
      { game: "SumoGames", wins: 64 },
      { game: "CoreWars", wins: 31 },
    ],
  };
}
