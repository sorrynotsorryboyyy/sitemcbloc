export default function Section({
  id,
  eyebrow,
  color = "#00c6ff",
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  /** Couleur de la section : petite ligne au-dessus du titre + halo de fond. */
  color?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl scroll-mt-20 px-4 py-16 ${className}`}>
      <div
        className="pointer-events-none absolute -top-10 left-0 -z-10 h-80 w-[min(700px,100%)] rounded-full opacity-20 blur-[110px]"
        style={{ background: color }}
        aria-hidden
      />
      <div className="mb-10 max-w-2xl">
        {eyebrow && (
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color }}>
            <span className="h-1 w-6 rounded-full" style={{ background: color }} aria-hidden />
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
