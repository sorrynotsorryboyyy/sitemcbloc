/**
 * Statut du serveur Minecraft.
 *
 * MOCK pour l'instant. À brancher plus tard, au choix :
 *  - API publique : GET https://api.mcsrvstat.us/3/play.mcbloc.fr  → { online, players: { online, max } }
 *  - ou une route maison /api/status alimentée par le proxy (même modèle que le bot McBlocDidi).
 */
export type ServerStatus = { online: boolean; players: number; max: number };

export async function getServerStatus(): Promise<ServerStatus> {
  await new Promise((r) => setTimeout(r, 400));
  return { online: true, players: 42 + Math.floor(Math.random() * 20), max: 500 };
}
