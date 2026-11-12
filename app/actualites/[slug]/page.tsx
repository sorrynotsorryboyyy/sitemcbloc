import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import NewsCard, { CategoryBadge } from "@/components/news/NewsCard";
import { formatNewsDate, getPost, news, type NewsBlock } from "@/lib/data/news";
import { site } from "@/lib/data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return news.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date, images: [{ url: post.cover }] },
  };
}

export default async function ArticlePage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const others = news.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/actualites" className="inline-flex items-center gap-1 text-sm text-muted hover:text-text">
        <Icon name="arrow-left" size={14} /> Toutes les actualités
      </Link>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <CategoryBadge category={post.category} />
          <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
        </div>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-3 text-lg text-muted">{post.excerpt}</p>
      </header>

      <div className="relative mt-8 aspect-[5/2] overflow-hidden rounded-2xl ring-1 ring-white/10">
        <Image src={post.cover} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
      </div>

      <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-text/90">
        {post.body.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>

      <aside className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-[#5865F2]/40 bg-[#5865F2]/10 p-6 sm:flex-row sm:items-center">
        <Icon name="discord-solid" size={40} className="text-[#5865F2]" />
        <div className="flex-1">
          <p className="font-bold">Une question, une idée ?</p>
          <p className="text-sm text-muted">Viens en discuter avec la communauté et l&apos;équipe sur le Discord.</p>
        </div>
        <a href={site.discord} target="_blank" rel="noreferrer" className="btn-bloc rounded-lg bg-[#5865F2] px-5 py-3 font-bold text-white">
          Rejoindre le Discord
        </a>
      </aside>

      {others.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 font-display text-2xl">À lire aussi</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {others.map((p) => (
              <NewsCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function Block({ block }: { block: NewsBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="pt-4 font-display text-2xl text-text">{block.text}</h2>;
    case "list":
      return (
        <ul className="space-y-2">
          {block.items.map((it) => (
            <li key={it} className="flex gap-2">
              <Icon name="chevron-right" size={18} className="mt-1 text-primary" /> <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return <blockquote className="border-l-4 border-primary bg-primary/5 py-3 pl-4 pr-3 font-semibold italic text-text">{block.text}</blockquote>;
    default:
      return <p>{block.text}</p>;
  }
}
