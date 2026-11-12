import Image from "next/image";
import Icon from "@/components/Icon";
import type { Rank } from "@/lib/data/ranks";

/** Emblème d'un grade : image fournie, sinon couronne pixel dans un bloc coloré. */
export default function RankEmblem({ rank, size = 56 }: { rank: Rank; size?: number }) {
  if (rank.image) {
    return <Image src={rank.image} alt="" width={size} height={size} className="shrink-0 object-contain drop-shadow-lg" style={{ width: size, height: size, imageRendering: "pixelated" }} />;
  }
  return (
    <span
      className="relative flex shrink-0 items-center justify-center rounded-xl"
      style={{
        width: size,
        height: size,
        color: rank.color,
        background: `linear-gradient(145deg, ${rank.color}33, ${rank.color}0d)`,
        boxShadow: `inset 0 0 0 2px ${rank.color}66, 0 8px 24px -8px ${rank.color}aa`,
      }}
      aria-hidden
    >
      <Icon name="crown" size={Math.round(size * 0.6)} />
    </span>
  );
}
