import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={36} height={36} />
            <span className="font-display text-lg text-gradient">MCBLOC</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">{site.description}</p>
          <p className="mt-3 font-mono text-sm text-primary">{site.ip}</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text">Le serveur</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link className="hover:text-primary" href="/#jeux">Mini-jeux</Link></li>
            <li><Link className="hover:text-primary" href="/boutique">Boutique</Link></li>
            <li><Link className="hover:text-primary" href="/actualites">Actualités</Link></li>
            <li><Link className="hover:text-primary" href="/compte">Mon compte</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text">Communauté</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li><a className="hover:text-primary" href={site.discord} target="_blank" rel="noreferrer">Discord</a></li>
            <li><Link className="hover:text-primary" href="/#faq">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-5 text-center text-xs text-dim">
        © {new Date().getFullYear()} MCBloc. Serveur non affilié à Mojang Studios ni à Microsoft.
      </div>
    </footer>
  );
}
