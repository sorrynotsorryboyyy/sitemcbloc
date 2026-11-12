"use client";

import { useState } from "react";
import NewsCard from "@/components/news/NewsCard";
import Icon from "@/components/Icon";
import { newsCategories, type NewsCategory, type NewsPost } from "@/lib/data/news";

/** Liste des actualités avec filtre par catégorie : le plus récent en grand, les suivants en grille. */
export default function NewsList({ posts }: { posts: NewsPost[] }) {
  const [cat, setCat] = useState<NewsCategory | "all">("all");
  const list = cat === "all" ? posts : posts.filter((p) => p.category === cat);
  const used = new Set(posts.map((p) => p.category));
  const [first, ...rest] = list;

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>
          Tout
        </Chip>
        {(Object.keys(newsCategories) as NewsCategory[])
          .filter((k) => used.has(k))
          .map((k) => (
            <Chip key={k} active={cat === k} onClick={() => setCat(k)} color={newsCategories[k].color}>
              <Icon name={newsCategories[k].icon} size={14} /> {newsCategories[k].label}
            </Chip>
          ))}
      </div>

      {first ? (
        <div className="space-y-6">
          <NewsCard post={first} featured />
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <NewsCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="rounded-xl border border-line bg-surface p-8 text-center text-muted">Aucun article dans cette catégorie pour le moment.</p>
      )}
    </>
  );
}

function Chip({ active, onClick, color, children }: { active: boolean; onClick: () => void; color?: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${
        active ? "bg-text text-bg" : "border border-line bg-surface text-muted hover:text-text"
      }`}
      style={!active && color ? { color } : undefined}
    >
      {children}
    </button>
  );
}
