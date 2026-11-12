import Image from "next/image";
import Icon, { type IconName } from "@/components/Icon";
import { coinImage } from "@/lib/data/site";

/** Affiche l'image fournie si elle existe, sinon l'icône pixel de remplacement. */
export function Visual({
  image,
  icon,
  size,
  className = "",
  float = false,
}: {
  image?: string;
  icon: IconName;
  size: number;
  className?: string;
  float?: boolean;
}) {
  const anim = float ? "animate-float-sm" : "";
  if (image) {
    return <Image src={image} alt="" width={size} height={size} className={`object-contain drop-shadow-xl ${anim} ${className}`} style={{ width: size, height: size, imageRendering: "pixelated" }} />;
  }
  return <Icon name={icon} size={size} className={`${anim} ${className}`} />;
}

/** Pièce MCBloc qui tourne sur elle-même (rotation 3D CSS). */
export function SpinningCoin({ size = 48, delay = 0 }: { size?: number; delay?: number }) {
  return (
    <span className="coin-spin inline-block" style={{ animationDelay: `${delay}ms` }} aria-hidden>
      {coinImage ? (
        <Image src={coinImage} alt="" width={size} height={size} style={{ width: size, height: size, imageRendering: "pixelated" }} className="object-contain" />
      ) : (
        <span
          className="flex items-center justify-center rounded-full text-[#7a5a00]"
          style={{
            width: size,
            height: size,
            background: "radial-gradient(circle at 35% 30%, #fff3b0, #ffd84d 45%, #e0a800 100%)",
            boxShadow: "inset 0 -3px 0 rgba(0,0,0,0.25), 0 6px 16px -6px rgba(255,216,77,0.7)",
          }}
        >
          <Icon name="coins" size={Math.round(size * 0.55)} />
        </span>
      )}
    </span>
  );
}
