import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { formatNewsDate, newsCategories, type NewsPost } from "@/lib/data/news";

export function CategoryBadge({ category }: { category: NewsPost["category"] }) {
  const c = newsCategories[category];
  return (
    <span
      className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider"
      style={{ color: c.color, background: `${c.color}1f`, border: `1px solid ${c.color}55` }}
    >
      <Icon name={c.icon} size={12} /> {c.label}
    </span>
  );
}

/** Carte d'article. `featured` = grande carte horizontale (article à la une). */
export default function NewsCard({ post, featured = false }: { post: NewsPost; featured?: boolean }) {
  return (
    <Link
      href={`/actualites/${post.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-primary/50 ${
        featured ? "md:grid md:grid-cols-[1.3fr_1fr]" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[5/2] md:aspect-auto md:min-h-64" : "aspect-[5/2]"}`}>
        <Image
          src={post.cover}
          alt=""
          fill
          sizes={featured ? "(min-width: 768px) 640px, 100vw" : "(min-width: 768px) 360px, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={`flex flex-1 flex-col ${featured ? "p-6 md:p-8" : "p-5"}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <CategoryBadge category={post.category} />
          <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
        </div>
        <h3 className={`mt-3 font-display leading-tight group-hover:text-primary ${featured ? "text-3xl" : "text-xl"}`}>{post.title}</h3>
        <p className={`mt-2 flex-1 text-muted ${featured ? "text-base" : "text-sm"}`}>{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Lire l&apos;article <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
