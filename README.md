# Site MCBloc

Site du réseau de mini-jeux Minecraft **MCBloc** (`play.mcbloc.fr`). Next.js 15 + Tailwind CSS 4, hébergé sur Vercel
(chaque `git push` sur `main` redéploie).

> État actuel : **avant l'ouverture**. Deux interrupteurs : `site.launched` (`lib/data/site.ts` : nombre de joueurs, IP)
> et **`shop.open`** (`data/network.json` : panier et paiement Stripe, lu aussi par le bot). La liaison du compte
> (`/site` en jeu) fonctionne déjà.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run lint
npm run icons    # icônes des cosmétiques (voir plus bas)
```

## Pages

| Route | Contenu |
|---|---|
| `/` | Présentation : IP à copier, mini-jeux, grades, boutique |
| `/boutique` | Onglets `#grades` (30 jours / à vie), `#pieces`, `#cosmetiques` (catalogue complet), `#boosters` |
| `/boutique/panier`, `/boutique/paiement`, `/boutique/merci` | Panier, paiement Stripe (via le bot), confirmation : actifs si `shop.open` |
| `/cgv`, `/mentions-legales` | CGV et mentions légales (**brouillon à faire relire**) ; infos du vendeur dans `lib/data/legal.ts` |
| `/compte` | Liaison du compte via `/site WEB-XXXXXX` en jeu, puis profil (grade, pièces, niveau, victoires) |
| `/guide`, `/guide/<section>` | Guide des jeux (règles, commandes, tous les chiffres) |
| `/vote`, `/regles`, `/actualites` | Votes (sites, récompenses), règles, actualités |
| `/network.json` | Source unique des infos publiques, lue par le bot Discord et le proxy |

`boutique.mcbloc.fr` redirige vers `mcbloc.fr/boutique` (voir `next.config.ts`).

## D'où viennent les données (une seule source pour chaque chose)

| Donnée | Source | Repris par |
|---|---|---|
| Liens, règles, jeux, grades (prix 30 jours / à vie, avantages), packs de pièces, boosters, `shop.open`, votes | `data/network.json` (ici) | bot Discord, proxy (`/regles`, `/grades` en jeu, guide) |
| Guide des jeux, catalogue des cosmétiques, coffres mystères | serveur Minecraft (`cosmetics.yml`, config des jeux) | publié par le serveur, lu ici via le bot : `GET <bot>/public/guide`, rafraîchi toutes les 5 min (`lib/services/guide.ts`, `lib/services/cosmetics.ts`) |
| Classements, top voteurs, profils liés | serveur Minecraft | via le bot : `/public/leaderboards`, `/public/votes`, `/public/site-link/*` |

Adresse du bot : `NEXT_PUBLIC_BOT_URL` (par défaut `https://mcblocdidi-production.up.railway.app`).

## Où modifier quoi

- Couleurs (charte `Theme.java`) : `app/globals.css` (`@theme`)
- IP, Discord, interrupteur d'ouverture (`launched`) : `lib/data/site.ts`
- Textes des jeux, grades, règles, votes : `data/network.json`
- Visuels des jeux (bannière 1983×793, mascotte détourée 1254×1254) : `public/images/banner-<jeu>.png`,
  `public/games/<jeu>.png`, déclarés dans `lib/data/games.ts`
- Packs de pièces, boosters (prix, durée, effet) : `data/network.json` (`coinPacks`, `boosters`) ; visuels dans `lib/data/coins.ts` et `boosters.ts`
- Cosmétiques : **rien à modifier ici** (prix et catalogue en jeu, `cosmetics.yml`). Seuls les libellés des types et
  des raretés et les images des coffres sont dans `lib/data/cosmetics.ts`.

## Icônes des cosmétiques

`npm run icons` télécharge **une fois** les icônes d'inventaire des objets utilisés par le catalogue (wiki Minecraft)
dans `public/items/` et met à jour `lib/data/item-icons.json`. À relancer quand un cosmétique utilise un nouvel objet.
Avant que le serveur ait publié le catalogue : `npm run icons -- --from <chemin>/cosmetics.yml`.
Une icône introuvable affiche l'icône du type de cosmétique.

## Paiement (Stripe)

Le panier ne garde que des identifiants (`rank-vip-30j`, `rank-vip-vie`, `coins-7000`, `boost-combo-24h`…) ; nom et prix sont
relus dans `network.json` (`lib/data/shop.ts`). `/boutique/paiement` appelle le bot (`lib/services/shop.ts`), qui crée la
session Stripe **à ses propres prix**, puis redirige vers la page de paiement Stripe ; retour sur `/boutique/merci`.
La livraison ne dépend que du webhook signé reçu par le bot (voir son README). Ouvrir : `"shop": { "open": true }`, puis `git push`.
