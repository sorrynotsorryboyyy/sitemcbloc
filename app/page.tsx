import Image from "next/image";
import Link from "next/link";
import CopyIpButton from "@/components/CopyIpButton";
import ServerStatus from "@/components/ServerStatus";
import Section from "@/components/Section";
import GameCard from "@/components/GameCard";
import NewsCard from "@/components/news/NewsCard";
import { news } from "@/lib/data/news";
import Icon from "@/components/Icon";
import { games, features, faq } from "@/lib/data/games";
import { coinPacks } from "@/lib/data/coins";
import { boosters } from "@/lib/data/boosters";
import { cosmetics } from "@/lib/data/cosmetics";
import TiltCard from "@/components/TiltCard";
import RankShowcase from "@/components/shop/RankShowcase";
import { SpinningCoin, Visual } from "@/components/shop/Visual";
import type { IconName } from "@/components/Icon";
import { site } from "@/lib/data/site";
import { formatEuro, formatNumber } from "@/lib/format";

/** Fond du hero : bannière MCBloc. */
const BANNER = "/images/banner-mcbloc.png";

const shopTiles: { href: string; title: string; text: string; from: string; color: string; icon: IconName; coin?: boolean; image?: string }[] = [
  { href: "/boutique#pieces", title: "Pièces", text: "Recharge ton solde", from: `dès ${formatEuro(Math.min(...coinPacks.map((p) => p.price)))}`, color: "#ffd84d", icon: "coins", coin: true },
  { href: "/boutique#cosmetiques", title: "Cosmétiques", text: "Coffres, familiers, effets…", from: `dès ${formatNumber(Math.min(...cosmetics.map((c) => c.price)))} pièces`, color: "#b36bff", icon: "sparkles", image: "/shop/cosmetics.svg" },
  { href: "/boutique#boosters", title: "Boosters", text: "Double tes gains", from: `dès ${formatEuro(Math.min(...boosters.map((b) => b.price)))}`, color: "#00c6ff", icon: "zap", image: "/shop/boost-combo.svg" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <Image src={BANNER} alt="" aria-hidden fill priority sizes="100vw" className="scale-105 object-cover blur-[2px]" />
        <div className="absolute inset-0 bg-bg/85" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" aria-hidden />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" aria-hidden />
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-secondary/25 blur-[120px]" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.1fr_1fr] md:py-20">
          <div className="order-2 text-center md:order-1 md:text-left">
            <ServerStatus />
            <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Le réseau de <span className="text-gradient">mini-jeux</span> qui fait des vagues.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted md:mx-0">
              Piggy Wars, SumoGames, CoreWars : des parties rapides, un classement ELO, un pass saisonnier et plus de 100 cosmétiques à
              collectionner.
            </p>
            <HeroActions left />
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <Image
              src="/logo.png"
              alt="MCBloc"
              width={460}
              height={460}
              priority
              className="animate-float h-auto w-64 drop-shadow-[0_20px_60px_rgba(0,114,255,0.45)] sm:w-80 md:w-full md:max-w-[460px]"
            />
          </div>
        </div>
      </section>

      {/* JEUX */}
      <Section id="jeux" eyebrow="Mini-jeux" title="Choisis ton terrain de jeu" subtitle="Trois modes, trois ambiances. Saute d'un jeu à l'autre depuis le lobby.">
        <div className="flex flex-col gap-12">
          {games.map((g, i) => (
            <GameCard key={g.id} game={g} reverse={i % 2 === 1} />
          ))}
        </div>
      </Section>

      {/* POURQUOI */}
      <div className="border-y border-line bg-bg-2">
        <Section eyebrow="Pourquoi MCBloc" title="Plus qu'un serveur de mini-jeux">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-line bg-surface p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon name={f.icon} size={28} /></div>
                <h3 className="mt-3 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* BOUTIQUE */}
      <Section
        eyebrow="Boutique"
        title={<>Soutiens le serveur, <span className="text-gradient">brille en jeu</span></>}
        subtitle="Des grades à vie, cumulables : chaque grade inclut les avantages du précédent. Choisis-en un pour voir ton personnage le porter."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <RankShowcase />
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {shopTiles.map((t) => (
              <TiltCard key={t.href} glow={t.color}>
                <Link
                  href={t.href}
                  className="group relative flex h-full items-center gap-4 overflow-hidden rounded-xl border-2 bg-surface p-5"
                  style={{ borderColor: `${t.color}33` }}
                >
                  <span
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl"
                    style={{ color: t.color, background: `radial-gradient(circle, ${t.color}33, transparent 70%)` }}
                  >
                    {t.coin ? <SpinningCoin size={44} /> : <Visual image={t.image} icon={t.icon} size={44} float />}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-xl" style={{ color: t.color }}>{t.title}</span>
                    <span className="block text-sm text-muted">{t.text}</span>
                    <span className="mt-1 flex items-center gap-1 text-sm font-semibold">
                      {t.from} <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href="/boutique" className="btn-bloc inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-bold text-bg">
            <Icon name="shopping-cart" size={18} /> Voir toute la boutique
          </Link>
        </div>
      </Section>

      {/* LIAISON */}
      <div className="border-y border-line bg-bg-2">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Mon compte</p>
            <h2 className="font-display text-3xl">Lie ton compte en 10 secondes</h2>
            <p className="mt-3 text-muted">
              Génère un code sur le site, tape-le en jeu, et retrouve ton grade, tes pièces et tes statistiques ici. Tes achats sont livrés
              directement sur ton compte.
            </p>
            <Link href="/compte" className="btn-bloc mt-6 inline-block rounded-lg bg-gradient-brand px-6 py-3 font-bold text-white">
              Lier mon compte
            </Link>
          </div>
          <div className="rounded-xl border border-line bg-black/60 p-5 font-mono text-sm shadow-2xl">
            <p className="text-muted">&lt;Toi&gt; <span className="text-text">{site.linkCommand} {site.linkCodePrefix}7KQ2XM</span></p>
            <p className="mt-2"><span className="text-gradient font-bold">[mcbloc]</span> <span className="text-success">✔ Ton compte est maintenant lié au site !</span></p>
          </div>
        </div>
      </div>

      {/* ACTUALITÉS */}
      <Section id="actualites" eyebrow="Actualités" title="Les dernières news" subtitle="Annonces, mises à jour et coulisses du développement.">
        <div className="grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((p) => (
            <NewsCard key={p.slug} post={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/actualites" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            Toutes les actualités <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="Questions fréquentes">
        <div className="grid gap-3 md:grid-cols-2">
          {faq.map((item) => (
            <details key={item.q} className="group rounded-xl border border-line bg-surface p-5 open:border-primary/50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {item.q}
                <span className="text-primary transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-2xl px-6 py-12 text-center">
          <Image src="/images/corewars.png" alt="" aria-hidden fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" style={{ objectPosition: "65% center" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/75 to-secondary/75" aria-hidden />
          <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
          <div className="relative">
            {site.launched ? (
              <>
                <h2 className="font-display text-3xl text-white sm:text-4xl">Prêt à jouer ?</h2>
                <p className="mt-2 text-white/80">Lance Minecraft, ajoute le serveur et rejoins la partie.</p>
                <div className="mt-6 flex justify-center">
                  <CopyIpButton size="md" />
                </div>
              </>
            ) : (
              <>
                <h2 className="font-display text-3xl text-white sm:text-4xl">Sois là dès l&apos;ouverture</h2>
                <p className="mt-2 text-white/80">Le serveur ouvre bientôt. Rejoins le Discord pour être prévenu en premier.</p>
                <div className="mt-6 flex justify-center">
                  <a
                    href={site.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-bloc inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-[#3b45c4]"
                  >
                    <Icon name="discord-solid" size={22} className="text-[#5865F2]" /> Rejoindre le Discord
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function HeroActions({ left = false }: { left?: boolean }) {
  const row = `mt-8 flex flex-col items-center gap-4 sm:flex-row ${left ? "md:items-start" : "sm:justify-center"}`;

  // Avant l'ouverture : le Discord est l'action principale, l'IP est affichée « bientôt ».
  if (!site.launched) {
    return (
      <>
        <div className={row}>
          <a
            href={site.discord}
            target="_blank"
            rel="noreferrer"
            className="btn-bloc inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-6 py-4 text-lg font-bold text-white"
          >
            <Icon name="discord-solid" size={24} /> Rejoindre le Discord
          </a>
          <Link
            href="/actualites"
            className="btn-bloc inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-6 py-4 font-bold hover:border-primary/60"
          >
            <Icon name="info-box" size={20} className="text-primary" /> Suivre les actualités
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted">
          Sois prévenu de l&apos;ouverture · Adresse : <span className="font-mono text-primary">{site.ip}</span>{" "}
          <span className="rounded bg-warning/15 px-1.5 py-0.5 text-xs font-semibold text-warning">ouvre bientôt</span>
        </p>
      </>
    );
  }

  return (
    <>
      <div className={row}>
        <CopyIpButton />
        <a
          href={site.discord}
          target="_blank"
          rel="noreferrer"
          className="btn-bloc inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-6 py-4 font-bold hover:border-[#5865F2]"
        >
          <Icon name="discord-solid" size={22} className="text-[#5865F2]" /> Rejoindre le Discord
        </a>
      </div>
      <p className="mt-4 text-sm text-muted">
        Versions <strong className="text-text">{site.versions}</strong> · Java Edition
      </p>
    </>
  );
}
