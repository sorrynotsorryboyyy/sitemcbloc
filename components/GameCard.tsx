import Image from "next/image";
import type { Game } from "@/lib/data/games";
import CopyIpButton from "@/components/CopyIpButton";
import Icon from "@/components/Icon";
import { site } from "@/lib/data/site";

/** Grande carte horizontale : bannière d'un côté, infos de l'autre (côtés alternés avec `reverse`). */
export default function GameCard({ game, reverse = false }: { game: Game; reverse?: boolean }) {
  return (
    <article
      className="group relative grid items-center gap-6 rounded-2xl border bg-surface p-3 sm:p-4 md:grid-cols-12 md:gap-8"
      style={{ borderColor: `${game.color}40`, boxShadow: `0 20px 60px -30px ${game.color}80` }}
    >
      {/* Bannière + mascotte */}
      <div className={`relative md:col-span-7 ${reverse ? "md:order-2" : ""}`}>
        <div className="relative aspect-[5/2] overflow-hidden rounded-xl">
          <Image
            src={game.banner}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1152px) 640px, (min-width: 768px) 58vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" aria-hidden />
        </div>
        {/* Mascotte centrée sur le coin bas-droit : elle déborde de la bannière sans masquer son titre */}
        <div className="absolute bottom-0 right-0 translate-x-[28%] translate-y-[40%]">
          {game.logo ? (
            <Image
              src={game.logo}
              alt={`Mascotte ${game.name}`}
              width={104}
              height={104}
              sizes="(min-width: 640px) 104px, 80px"
              className="h-20 w-20 object-contain drop-shadow-[0_8px_14px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 sm:h-26 sm:w-26"
            />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-lg border bg-bg/80 text-3xl" style={{ borderColor: `${game.color}80` }} aria-hidden>
              {game.emoji}
            </span>
          )}
        </div>
      </div>

      {/* Infos */}
      <div className={`flex flex-col px-2 pb-3 pt-4 md:col-span-5 md:px-2 md:py-4 ${reverse ? "md:order-1 md:pl-4" : "md:pr-4"}`}>
        <h3 className="sr-only">{game.name}</h3>
        <p className="font-display text-sm uppercase tracking-[0.2em]" style={{ color: game.color }}>
          {game.mode}
        </p>
        <p className="mt-3 text-base leading-relaxed text-text/90">{game.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {game.features.map((f) => (
            <li key={f} className="flex items-center gap-1.5 rounded-md border border-line bg-bg-2 px-2.5 py-1.5 text-xs text-muted">
              <Icon name="check" size={14} style={{ color: game.color }} /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          {site.launched ? (
            <CopyIpButton size="md" />
          ) : (
            <span
              className="inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2.5 font-display text-sm uppercase tracking-wider"
              style={{ borderColor: `${game.color}66`, color: game.color, background: `${game.color}14` }}
            >
              <Icon name="clock" size={16} /> Bientôt jouable
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
