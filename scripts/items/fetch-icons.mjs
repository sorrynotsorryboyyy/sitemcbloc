// Icônes des objets Minecraft (celles des menus en jeu) pour la boutique : téléchargées UNE fois depuis le wiki
// Minecraft, puis servies par le site (public/items). Les pages n'appellent jamais le wiki.
//
//   npm run icons                          → objets du catalogue publié par le serveur (bot : /public/guide)
//   npm run icons -- --from cosmetics.yml  → objets lus dans un cosmetics.yml local (avant la publication)
//
// Écrit public/items/<objet>.png (ou .gif) et lib/data/item-icons.json ({ objet: fichier }).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "../..");
const outDir = path.join(root, "public/items");
const manifest = path.join(root, "lib/data/item-icons.json");
const bot = process.env.NEXT_PUBLIC_BOT_URL || "https://mcblocdidi-production.up.railway.app";
const USER_AGENT = "mcbloc-site/1.0 (icones de la boutique, telechargement unique)";
// Coffres mystères (cosmetics.yml, « crates ») : toujours utiles.
const ALWAYS = ["chest", "ender_chest", "shulker_box"];
// Objets dont l'image porte un autre nom sur le wiki.
const ALIASES = {
  diamond_block: "Block_of_Diamond",
  emerald_block: "Block_of_Emerald",
  gold_block: "Block_of_Gold",
  ender_eye: "Eye_of_Ender",
  jack_o_lantern: "Jack_o'Lantern",
  leather_chestplate: "Leather_Tunic",
  tnt: "TNT",
};

async function itemsFromBot() {
  const res = await fetch(`${bot.replace(/\/$/, "")}/public/guide`);
  if (!res.ok) throw new Error(`bot : réponse ${res.status}`);
  const { sections = [] } = await res.json();
  const items = new Set();
  for (const table of sections.find((s) => s.id === "cosmetiques")?.tables ?? []) {
    const i = table.columns.indexOf("_icon");
    if (i >= 0) table.rows.forEach((r) => r[i] && items.add(r[i]));
  }
  return items;
}

function itemsFromYaml(file) {
  const items = new Set();
  for (const m of fs.readFileSync(file, "utf8").matchAll(/\bicon:\s*([A-Z0-9_]+)/g)) items.add(m[1].toLowerCase());
  return items;
}

/** « blaze_powder » → « Blaze_Powder » (nom des images du wiki : Invicon_Blaze_Powder.png). */
function wikiName(item) {
  if (ALIASES[item]) return ALIASES[item];
  return item.split("_").map((w) => (w === "of" || w === "the" ? w : w.charAt(0).toUpperCase() + w.slice(1))).join("_");
}

/** PNG d'abord ; les objets qui brillent en jeu (étoile du Nether, livre enchanté...) n'existent qu'en GIF animé. */
async function download(item) {
  for (const ext of ["png", "gif"]) {
    if (fs.existsSync(path.join(outDir, `${item}.${ext}`))) return "déjà là";
  }
  for (const ext of ["png", "gif"]) {
    const url = `https://minecraft.wiki/images/Invicon_${encodeURIComponent(wikiName(item))}.${ext}`;
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
    if (!res.ok || !(res.headers.get("content-type") ?? "").startsWith(`image/${ext}`)) continue;
    fs.writeFileSync(path.join(outDir, `${item}.${ext}`), Buffer.from(await res.arrayBuffer()));
    return "téléchargée";
  }
  return null;
}

const fromIndex = process.argv.indexOf("--from");
const items = fromIndex > 0 ? itemsFromYaml(process.argv[fromIndex + 1]) : await itemsFromBot();
ALWAYS.forEach((i) => items.add(i));
fs.mkdirSync(outDir, { recursive: true });

const missing = [];
for (const item of [...items].sort()) {
  const result = await download(item).catch(() => null);
  if (!result) missing.push(item);
  else if (result === "téléchargée") console.log(`✔ ${item}`);
  await new Promise((r) => setTimeout(r, 150)); // politesse envers le wiki
}

const available = Object.fromEntries(
  fs.readdirSync(outDir).filter((f) => /\.(png|gif)$/.test(f)).sort().map((f) => [f.replace(/\.(png|gif)$/, ""), f]),
);
fs.writeFileSync(manifest, JSON.stringify(available, null, 2) + "\n");
console.log(`\n${Object.keys(available).length} icône(s) disponibles.`);
if (missing.length) console.log(`Introuvables sur le wiki (icône du type à la place) : ${missing.join(", ")}`);
