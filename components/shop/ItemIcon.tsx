import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import available from "@/lib/data/item-icons.json";

/** { objet: fichier } : icônes téléchargées une fois depuis le wiki Minecraft (« npm run icons »), dans /public/items. */
const icons = available as Record<string, string>;

/**
 * Icône d'un objet Minecraft (celle des menus en jeu). Icône absente : l'icône pixel du type de cosmétique.
 * Les objets qui brillent en jeu (étoile du Nether...) sont des GIF animés, servis tels quels.
 */
export default function ItemIcon({ item, fallback, size = 48, color }: { item: string; fallback: IconName; size?: number; color?: string }) {
  const file = item ? icons[item] : undefined;
  if (file) {
    return (
      <Image
        src={`/items/${file}`}
        alt=""
        width={size}
        height={size}
        unoptimized={file.endsWith(".gif")}
        style={{ imageRendering: "pixelated" }}
      />
    );
  }
  return (
    <span style={{ color }}>
      <Icon name={fallback} size={Math.round(size * 0.65)} />
    </span>
  );
}
