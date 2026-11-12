# Site MCBloc

Site du réseau de mini-jeux Minecraft **MCBloc** (`play.mcbloc.fr`). Next.js 15 + Tailwind CSS 4, hébergé sur Vercel.

> État actuel : **front-end uniquement**. Statut serveur, paiement et liaison de compte sont simulés dans `lib/services/`.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Pages

| Route | Contenu |
|---|---|
| `/` | Présentation : IP à copier, joueurs en ligne, mini-jeux, grades, FAQ |
| `/boutique` | Onglets `#grades`, `#pieces`, `#cosmetiques`, `#boosters` |
| `/boutique/panier` | Panier (sauvegardé dans le navigateur) |
| `/boutique/paiement` | Pseudo + CGV + paiement **simulé** → confirmation |
| `/compte` | Liaison du compte via `/site WEB-XXXXXX` en jeu, puis profil |

`boutique.mcbloc.fr` redirige vers `mcbloc.fr/boutique` (voir `next.config.ts`).

## Où modifier quoi

- Couleurs (charte `Theme.java`) : `app/globals.css` (`@theme`)
- IP, Discord, commande de liaison : `lib/data/site.ts`
- Jeux, FAQ : `lib/data/games.ts`
- Grades : `lib/data/ranks.ts` · Packs de pièces : `lib/data/coins.ts` · Boosters : `lib/data/boosters.ts`
- Cosmétiques et coffres (copie de `cosmetics.yml`) : `lib/data/cosmetics.ts`

## Brancher le backend

Chaque fichier de `lib/services/` documente le contrat d'API attendu :

- `link.ts` : `POST /api/link/code`, `GET /api/link/status`, `POST /api/link/confirm` (appelé par le proxy pour `/site`, avec `Authorization: Bearer <LINK_SECRET>`). `/site` est distincte de `/lier`, qui sert à lier Discord (bot McBlocDidi).
- `shop.ts` : checkout Tebex/Stripe → webhook → récompenses en attente récupérées par le proxy (`/api/rewards/pending` + `ack`, même modèle que McBlocDidi). Les pièces sont **ajoutées** au solde.
- `serverStatus.ts` : mcsrvstat.us ou une API maison.

En mode dev, la page `/compte` affiche un bouton « Simuler /site » pour tester la liaison sans serveur.
