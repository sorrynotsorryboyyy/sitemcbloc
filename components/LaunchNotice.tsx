import Link from "next/link";
import Icon from "@/components/Icon";
import { site } from "@/lib/data/site";

/** Encart « disponible à l'ouverture du serveur » (affiché tant que site.launched = false). */
export default function LaunchNotice({
  title,
  children,
  compact = false,
  backHref,
  backLabel,
}: {
  title: string;
  children?: React.ReactNode;
  compact?: boolean;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 border-warning/40 bg-warning/[0.07] ${compact ? "p-4 sm:p-5" : "p-6 text-center sm:p-10"}`}
    >
      <div className={`flex gap-4 ${compact ? "flex-col items-start sm:flex-row sm:items-center" : "flex-col items-center"}`}>
        <span className={`flex shrink-0 items-center justify-center rounded-xl bg-warning/15 text-warning ${compact ? "h-12 w-12" : "h-16 w-16"}`}>
          <Icon name="clock" size={compact ? 26 : 34} />
        </span>
        <div className="min-w-0 flex-1">
          <p className={`font-display text-warning ${compact ? "text-lg" : "text-2xl sm:text-3xl"}`}>{title}</p>
          {children && <div className={`mt-1 text-sm text-muted ${compact ? "" : "mx-auto max-w-xl text-base"}`}>{children}</div>}
        </div>
        <div className={`flex flex-wrap gap-3 ${compact ? "" : "mt-2 justify-center"}`}>
          <a
            href={site.discord}
            target="_blank"
            rel="noreferrer"
            className="btn-bloc inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-5 py-3 font-bold text-white"
          >
            <Icon name="discord-solid" size={20} /> Être prévenu
          </a>
          {backHref && (
            <Link href={backHref} className="btn-bloc inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 font-bold">
              {backLabel ?? "Retour"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
