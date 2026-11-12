import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permet un build de vérification séparé (NEXT_DIST_DIR=.next-verify) sans écraser celui de `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      // Le lien en jeu (/grades, /boutique) pointe vers boutique.mcbloc.fr → on renvoie vers la page boutique.
      {
        source: "/:path*",
        has: [{ type: "host", value: "boutique.mcbloc.fr" }],
        destination: "https://mcbloc.fr/boutique",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
