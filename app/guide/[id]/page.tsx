import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { getSection, sectionColor, sectionEmoji, visibleColumns } from "@/lib/services/guide";

export const revalidate = 300;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = await getSection((await params).id);
  return section ? { title: `Guide · ${section.title}`, description: section.summary } : { title: "Guide" };
}

/** Ancre d'un tableau (« Coffre : Placard » → « coffre-placard »). */
function anchor(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function GuideSectionPage({ params }: Props) {
  const section = await getSection((await params).id);
  if (!section) notFound();
  const color = sectionColor(section.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/guide" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
        <Icon name="arrow-left" size={16} /> Tout le guide
      </Link>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl" style={{ color }}>
        <span aria-hidden>{sectionEmoji(section.id)}</span> {section.title}
      </h1>
      <p className="mt-3 max-w-3xl text-muted">{section.summary}</p>

      {section.tables.length > 0 && (
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Tableaux de chiffres">
          {section.tables.map((t) => (
            <a
              key={t.title}
              href={`#${anchor(t.title)}`}
              className="rounded border border-line bg-bg-2 px-2.5 py-1 text-xs font-semibold text-muted hover:text-text"
            >
              {t.title}
            </a>
          ))}
        </nav>
      )}

      {section.rules.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Règles et explications</h2>
          <ol className="mt-4 space-y-2">
            {section.rules.map((rule, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-line bg-surface p-4">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-display text-sm"
                  style={{ background: `${color}1a`, color }}
                >
                  {i + 1}
                </span>
                <p className="leading-relaxed">{rule}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {section.commands.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl">Commandes</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-sm">
              <tbody>
                {section.commands.map((c) => (
                  <tr key={c.syntax} className="border-t border-line bg-surface first:border-t-0 odd:bg-bg-2">
                    <td className="whitespace-nowrap p-3 font-mono text-accent">{c.syntax}</td>
                    <td className="p-3 text-muted">{c.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {section.tables.map((t) => (
        <section key={t.title} id={anchor(t.title)} className="mt-10 scroll-mt-24">
          <h2 className="font-display text-2xl">{t.title}</h2>
          {t.note && <p className="mt-1 text-sm text-muted">{t.note}</p>}
          <div className="mt-4 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-surface-2">
                <tr>
                  {visibleColumns(t).map((i) => (
                    <th key={t.columns[i]} className="p-3 text-left font-semibold text-muted">
                      {t.columns[i]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, i) => (
                  <tr key={i} className="border-t border-line bg-surface odd:bg-bg-2">
                    {visibleColumns(t).map((j) => (
                      <td key={j} className={`p-3 align-top ${j === 0 ? "font-semibold" : ""}`}>
                        {row[j]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
