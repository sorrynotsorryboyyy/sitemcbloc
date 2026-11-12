// Générateur des illustrations pixel-art de la boutique MCBloc.
// Usage : npm run sprites
// Chaque sprite fait 16×16 pixels et se compose de calques (grilles de caractères + palette).
// Sorties : public/shop/<nom>.svg (utilisé par le site) et public/shop/png/<nom>.png (512×512).

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..", "..");
const OUT = path.join(ROOT, "public", "shop");
const OUT_PNG = path.join(OUT, "png");
const SIZE = 16;

// ---------------------------------------------------------------- Palettes
const GOLD = { k: "#5a3d00", g: "#ffd84d", l: "#fff3b0", m: "#e0a800", d: "#b07800" };

// ---------------------------------------------------------------- Calques réutilisables
const COIN_BIG = [
  "................",
  ".....kkkkkk.....",
  "...kkllllggkk...",
  "..kllggggggmdk..",
  ".klgggggggggmdk.",
  ".klggdggggdgmdk.",
  ".klggddggddgmdk.",
  ".klggdgddgdgmdk.",
  ".klggdggggdgmdk.",
  ".klggdggggdgmdk.",
  ".kmgggggggggmdk.",
  "..kmmgggggmddk..",
  "...kkmmmmddkk...",
  ".....kkkkkk.....",
  "................",
  "................",
];

const COIN_SMALL = [".kkkk.", "klggmk", "kgggdk", "kmmddk", ".kkkk."];
const COIN_MID = ["..kkkkk..", ".kllggmk.", "klgggggmk", "klggggmdk", "kgggggmdk", "kmggggmdk", ".kmmmddk.", "..kkkkk.."];
const COIN_FLAT = [".kkkk.", "kllggk", "kmdddk"];
const SPARKLE = [".S.", "SWS", ".S."];
const SPARK_DOT = ["S"];

const CHEST = [
  "................",
  "................",
  "................",
  ".kkkkkkkkkkkkkk.",
  ".kllllllllllllk.",
  ".kwwwwdwwwwwwwk.",
  ".kwwwwwwwwdwwwk.",
  ".kdddddiidddddk.",
  ".kkkkkkIIkkkkkk.",
  ".kwwwwwiiwwwwwk.",
  ".kwwdwwwwwwdwwk.",
  ".kwwwwwwwwwwwwk.",
  ".kddddddddddddk.",
  ".kkkkkkkkkkkkkk.",
  "................",
  "................",
];
const CHEST_BANDS = [
  "................",
  "................",
  "................",
  "................",
  "...b........b...",
  "...b........b...",
  "...b........b...",
  "...B........B...",
  "................",
  "...b........b...",
  "...b........b...",
  "...b........b...",
  "...B........B...",
  "................",
  "................",
  "................",
];

const CROWN = [
  "................",
  "................",
  "................",
  ".k.....kk.....k.",
  "kgk...kggk...kgk",
  "kgk..kgllgk..kgk",
  "kggk.kglggk.kggk",
  "kgggkggggggkgggk",
  "kglggggggggggggk",
  "kggggggggggggggk",
  "kmmmmmmmmmmmmmmk",
  "kmrmmmmeemmmmrmk",
  "kmmmmmmmmmmmmmmk",
  "kkkkkkkkkkkkkkkk",
  "................",
  "................",
];

// ---------------------------------------------------------------- Sprites
const chest = (pal, extra = []) => ({
  layers: [
    { grid: CHEST, pal },
    { grid: CHEST_BANDS, pal },
    ...extra,
  ],
});

const crown = (pal, extra = []) => ({ layers: [...extra, { grid: CROWN, pal }] });

const sprites = {
  // --- Monnaie
  coin: { layers: [{ grid: COIN_BIG, pal: GOLD }] },
  "coins-1": { layers: [{ grid: COIN_BIG, pal: GOLD }, { grid: SPARKLE, x: 12, y: 0, pal: { S: "#fff3b0", W: "#ffffff" } }] },
  "coins-2": {
    // Trois piles de pièces
    layers: [
      ...[12, 10, 8].map((y) => ({ grid: COIN_FLAT, x: 0, y, pal: GOLD })),
      ...[12, 10, 8, 6, 4].map((y) => ({ grid: COIN_FLAT, x: 5, y, pal: GOLD })),
      ...[12, 10].map((y) => ({ grid: COIN_FLAT, x: 10, y, pal: GOLD })),
      { grid: SPARKLE, x: 12, y: 3, pal: { S: "#fff3b0", W: "#ffffff" } },
    ],
  },
  "coins-3": {
    // Sac de pièces
    layers: [
      {
        grid: [
          "......kkk.......",
          ".....kgggk......",
          "....kgggGgk.....",
          ".....krrrk......",
          "......krk.......",
          ".....kbbbk......",
          "....kbllbbk.....",
          "...kbllbbbBk....",
          "..kblbbYYbbBk...",
          "..kbbbYbbbbBk...",
          "..kbbbbYYbbBk...",
          "..kbbbbbbYbBk...",
          "..kbbbYYYbBBk...",
          "...kbbbbbBBk....",
          "....kkkkkkk.....",
          "................",
        ],
        pal: { k: "#3b230c", b: "#c8954f", B: "#9a6a2d", l: "#e9c48a", r: "#6b3d14", g: "#ffd84d", G: "#c98a00", Y: "#ffd84d" },
      },
      { grid: COIN_SMALL, x: 10, y: 11, pal: GOLD },
      { grid: COIN_SMALL, x: 0, y: 11, pal: GOLD },
    ],
  },
  "coins-4": {
    // Coffre rempli de pièces
    layers: [
      { grid: COIN_SMALL, x: 2, y: 3, pal: GOLD },
      { grid: COIN_SMALL, x: 8, y: 2, pal: GOLD },
      { grid: COIN_SMALL, x: 5, y: 4, pal: GOLD },
      { grid: COIN_SMALL, x: 10, y: 5, pal: GOLD },
      {
        grid: [
          "................",
          "................",
          "................",
          "................",
          "................",
          "................",
          "................",
          ".kkkkkkkkkkkkkk.",
          ".kgglggggGgglgk.",
          ".kkkkkkIIkkkkkk.",
          ".kwwwwwiiwwwwwk.",
          ".kwwdwwwwwwdwwk.",
          ".kwwwwwwwwwwwwk.",
          ".kddddddddddddk.",
          ".kkkkkkkkkkkkkk.",
          "................",
        ],
        pal: { k: "#2b1a0c", w: "#a0662d", d: "#6e4219", g: "#ffd84d", l: "#fff3b0", G: "#e0a800", i: "#d9d9d9", I: "#7a7a7a" },
      },
      { grid: SPARKLE, x: 0, y: 0, pal: { S: "#fff3b0", W: "#ffffff" } },
    ],
  },
  "coins-5": {
    // Montagne d'or et gemmes
    layers: [
      {
        grid: [
          "................",
          "................",
          "................",
          ".......kk.......",
          "......kglk......",
          ".....kgllgk.....",
          "....kggglggk....",
          "...kgGggggegk...",
          "..kgggglgGggmk..",
          ".kgGgggggggrggk.",
          "kgggglgggGggggmk",
          "kGgggggggggggGmk",
          "kmmGmmmmmGmmmmmk",
          "kkkkkkkkkkkkkkkk",
          "................",
          "................",
        ],
        pal: { ...GOLD, G: "#e0a800", e: "#4fe0ff", r: "#ff4d6d" },
      },
      { grid: COIN_SMALL, x: 1, y: 2, pal: GOLD },
      { grid: SPARKLE, x: 12, y: 0, pal: { S: "#fff3b0", W: "#ffffff" } },
      { grid: SPARK_DOT, x: 10, y: 3, pal: { S: "#ffffff" } },
    ],
  },

  // --- Grades
  "rank-starter": {
    layers: [
      {
        grid: [
          "................",
          "..kkkkkkkkkkkk..",
          "..kllllgggggmk..",
          "..klgggSggggmk..",
          "..klgggSggggmk..",
          "..klSSSSSSSgmk..",
          "..klgSSSSSggmk..",
          "..klggSSSgggmk..",
          "..klgSSgSSggmk..",
          "..klgSgggSggmk..",
          "..klggggggggmk..",
          "...klgggggmmk...",
          "....klgggmmk....",
          ".....klgmmk.....",
          "......kmmk......",
          ".......kk.......",
        ],
        pal: { k: "#4a2412", g: "#ffb38a", l: "#ffd9c2", m: "#d9784a", S: "#ffffff" },
      },
    ],
  },
  "rank-vip": crown({ k: "#0b3550", g: "#4dd2ff", l: "#c9f3ff", m: "#1f8fc0", r: "#ffffff", e: "#ffffff" }),
  "rank-vipplus": crown(
    { k: "#5a3d00", g: "#f5c518", l: "#fff2a8", m: "#c08f00", r: "#ff4d6d", e: "#00c6ff" },
    [{ grid: SPARK_DOT, x: 7, y: 1, pal: { S: "#fff2a8" } }, { grid: SPARK_DOT, x: 8, y: 1, pal: { S: "#fff2a8" } }],
  ),
  "rank-legende": crown({ k: "#3d0a33", g: "#ff5fd2", l: "#ffc4ef", m: "#b02d8f", r: "#b36bff", e: "#ffd84d" }, [
    { grid: SPARKLE, x: 0, y: 0, pal: { S: "#ffd84d", W: "#ffffff" } },
    { grid: SPARKLE, x: 13, y: 0, pal: { S: "#ffd84d", W: "#ffffff" } },
    { grid: SPARKLE, x: 6, y: 0, pal: { S: "#ffc4ef", W: "#ffffff" } },
  ]),

  // --- Coffres
  "crate-basique": chest({ k: "#2b1a0c", w: "#a0662d", d: "#6e4219", l: "#c98b4a", i: "#d9d9d9", I: "#7a7a7a", b: "#a0662d", B: "#a0662d" }),
  "crate-rare": chest({ k: "#0d1f3d", w: "#3d7bd9", d: "#23508f", l: "#7fb2ff", i: "#e6eef5", I: "#8a96a3", b: "#c0c8d0", B: "#8a96a3" }),
  "crate-legendaire": chest({ k: "#25093f", w: "#7a3fc0", d: "#4e2380", l: "#b98cff", i: "#fff3b0", I: "#e0a800", b: "#ffd84d", B: "#e0a800" }, [
    { grid: SPARKLE, x: 0, y: 0, pal: { S: "#ffd84d", W: "#ffffff" } },
    { grid: SPARKLE, x: 13, y: 0, pal: { S: "#ffd84d", W: "#ffffff" } },
    { grid: ["S.S.S"], x: 5, y: 1, pal: { S: "#ffd84d" } },
    { grid: SPARK_DOT, x: 7, y: 0, pal: { S: "#ffffff" } },
    { grid: SPARK_DOT, x: 8, y: 2, pal: { S: "#ffffff" } },
  ]),

  // --- Boosters
  "boost-coins": {
    layers: [
      { grid: COIN_MID, x: 1, y: 1, pal: GOLD },
      {
        // Badge « ×2 »
        grid: [
          "kkkkkkkkk",
          "k....WWWk",
          "kW.W...Wk",
          "k.W..WWWk",
          "kW.W.W..k",
          "k....WWWk",
          "kkkkkkkkk",
        ].map((r) => r.replace(/\./g, "b")),
        x: 7,
        y: 9,
        pal: { k: "#0b3550", W: "#ffffff", b: "#0072ff" },
      },
    ],
  },
  "boost-xp": {
    layers: [
      {
        grid: [
          "................",
          "......kcck......",
          "......kcck......",
          ".....kkkkkk.....",
          "......kwwk......",
          "......kwwk......",
          ".....kwwwwk.....",
          "....kwggggwk....",
          "...kwgglgggwk...",
          "..kwggllgggggk..",
          "..kwgggggggddk..",
          "..kwgggggggddk..",
          "..kwggggggdddk..",
          "...kwgggddddk...",
          "....kkkkkkkk....",
          "................",
        ],
        pal: { k: "#1b2a12", c: "#8b5a2b", w: "#cfe9ff", g: "#7dff3a", l: "#d6ffb0", d: "#3fa51a" },
      },
      { grid: SPARKLE, x: 12, y: 2, pal: { S: "#7dff3a", W: "#ffffff" } },
      { grid: SPARK_DOT, x: 2, y: 5, pal: { S: "#d6ffb0" } },
      { grid: SPARK_DOT, x: 13, y: 8, pal: { S: "#d6ffb0" } },
    ],
  },
  "boost-combo": {
    layers: [
      {
        grid: [
          "................",
          "........kkkkk...",
          ".......klllgk...",
          "......klllgk....",
          ".....klllgk.....",
          "....klllgk......",
          "...klllggkkkk...",
          "..kllllllllgk...",
          "...kkkkllgk.....",
          ".......klgk.....",
          "......klgk......",
          ".....klgk.......",
          "....klgk........",
          "...kgk..........",
          "...kk...........",
          "................",
        ],
        pal: { k: "#7a5200", l: "#fff3b0", g: "#ffd84d" },
      },
      { grid: SPARKLE, x: 12, y: 9, pal: { S: "#ffd84d", W: "#ffffff" } },
      { grid: SPARK_DOT, x: 2, y: 3, pal: { S: "#fff3b0" } },
    ],
  },
  "boost-network": {
    layers: [
      {
        grid: [
          "......BbbB......",
          "......BbbB......",
          "......BbbB......",
          "......BbbB......",
          ".......bb.......",
          "...kkkkkkkkkk...",
          "...kwwwwwwwwk...",
          "...kwccccccwk...",
          "...kwcCCCCcwk...",
          "...kwcCCCCcwk...",
          "...kwccccccwk...",
          "...kwwwwwwwwk...",
          "..kkkkkkkkkkkk..",
          "..kookooookook..",
          "..kkkkkkkkkkkk..",
          "................",
        ],
        pal: { k: "#120a20", w: "#e8f6ff", c: "#4fe0ff", C: "#e6fdff", o: "#3b2a52", B: "#4fe0ff", b: "#e6fdff" },
      },
      { grid: SPARK_DOT, x: 2, y: 2, pal: { S: "#4fe0ff" } },
      { grid: SPARK_DOT, x: 13, y: 3, pal: { S: "#4fe0ff" } },
    ],
  },

  // --- Cosmétiques
  cosmetics: {
    layers: [
      {
        grid: [
          "................",
          "................",
          "....kkkkkkkk....",
          "....kllllllk....",
          "....khhhhhhk....",
          "....khhhhhhk....",
          "....khhhhhhk....",
          "....kppppppk....",
          "....kPPPPPPk....",
          "....khhhhhhk....",
          ".kkkkhhhhhhkkkk.",
          ".khhhhhhhhhhhhk.",
          "..kkkkkkkkkkkk..",
          "................",
          "................",
          "................",
        ],
        pal: { k: "#0a0a12", h: "#2a2a3a", l: "#4a4a66", p: "#b36bff", P: "#7a3fc0" },
      },
      { grid: SPARKLE, x: 12, y: 0, pal: { S: "#b36bff", W: "#ffffff" } },
      { grid: SPARKLE, x: 0, y: 4, pal: { S: "#ffd84d", W: "#ffffff" } },
      { grid: SPARK_DOT, x: 13, y: 9, pal: { S: "#ffd84d" } },
      { grid: SPARK_DOT, x: 2, y: 13, pal: { S: "#b36bff" } },
    ],
  },
};

// ---------------------------------------------------------------- Rendu
function render(name, sprite) {
  const px = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  for (const layer of sprite.layers) {
    const { grid, pal, x = 0, y = 0 } = layer;
    if (!grid.length) continue;
    const w = grid[0].length;
    grid.forEach((row, ry) => {
      if (row.length !== w) throw new Error(`${name} : ligne ${ry} de longueur ${row.length} au lieu de ${w}`);
      [...row].forEach((ch, rx) => {
        if (ch === ".") return;
        const color = pal[ch];
        if (!color) throw new Error(`${name} : couleur inconnue « ${ch} »`);
        const X = x + rx;
        const Y = y + ry;
        if (X < 0 || Y < 0 || X >= SIZE || Y >= SIZE) return;
        px[Y][X] = color;
      });
    });
  }
  // Rectangles fusionnés horizontalement pour un SVG léger
  let rects = "";
  for (let Y = 0; Y < SIZE; Y++) {
    let X = 0;
    while (X < SIZE) {
      const c = px[Y][X];
      if (!c) { X++; continue; }
      let len = 1;
      while (X + len < SIZE && px[Y][X + len] === c) len++;
      rects += `<rect x="${X}" y="${Y}" width="${len}" height="1" fill="${c}"/>`;
      X += len;
    }
  }
  return (size) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${SIZE} ${SIZE}" shape-rendering="crispEdges">${rects}</svg>`;
}

fs.mkdirSync(OUT_PNG, { recursive: true });
for (const [name, sprite] of Object.entries(sprites)) {
  const svg = render(name, sprite);
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg(SIZE * 8));
  await sharp(Buffer.from(svg(512))).png().toFile(path.join(OUT_PNG, `${name}.png`));
  console.log("✔", name);
}
console.log(`${Object.keys(sprites).length} sprites → public/shop/`);
