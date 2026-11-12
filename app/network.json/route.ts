import raw from "@/data/network.json";

/**
 * Publie la source unique (data/network.json) sur https://mcbloc.fr/network.json.
 * Lue par le bot Discord et le plugin : statique, en lecture seule, ouverte en CORS.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(raw, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=3600",
    },
  });
}
