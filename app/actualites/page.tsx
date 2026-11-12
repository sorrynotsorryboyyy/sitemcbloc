import type { Metadata } from "next";
import NewsList from "@/components/news/NewsList";
import Icon from "@/components/Icon";
import { news } from "@/lib/data/news";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Annonces, mises à jour, événements et coulisses du développement de MCBloc.",
};

export default function ActualitesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Actualités</p>
          <h1 className="font-display text-4xl sm:text-5xl">
            Les news <span className="text-gradient">MCBloc</span>
          </h1>
          <p className="mt-3 max-w-2xl text-muted">Annonces, mises à jour, événements et coulisses du développement.</p>
        </div>
        <a
          href={site.discord}
          target="_blank"
          rel="noreferrer"
          className="btn-bloc inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-[#5865F2] px-5 py-3 font-bold text-white sm:self-auto"
        >
          <Icon name="discord-solid" size={20} /> Discuter sur Discord
        </a>
      </header>
      <NewsList posts={news} />
    </div>
  );
}
