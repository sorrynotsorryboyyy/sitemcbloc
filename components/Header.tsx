"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/data/site";
import { useCart } from "@/lib/cart";
import Icon from "@/components/Icon";
import CopyIpButton from "@/components/CopyIpButton";

export default function Header() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : href.startsWith("/") && !href.includes("#") && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10" priority />
          <span className="font-display text-xl tracking-wide text-gradient">MCBLOC</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href) ? "bg-surface-2 text-primary" : "text-muted hover:text-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {site.launched ? (
            <CopyIpButton size="sm" />
          ) : (
            <a
              href={site.discord}
              target="_blank"
              rel="noreferrer"
              className="btn-bloc flex h-10 items-center gap-2 rounded-md bg-[#5865F2] px-3 text-sm font-bold text-white"
              aria-label="Rejoindre le Discord"
            >
              <Icon name="discord-solid" size={20} />
              <span className="hidden sm:inline">Discord</span>
            </a>
          )}
          {site.launched && (
            <Link
              href="/boutique/panier"
              className="relative flex h-10 items-center gap-2 rounded-md border border-line bg-surface px-3 text-sm font-medium hover:border-primary/60"
              aria-label={`Panier (${ready ? count : 0} article${count > 1 ? "s" : ""})`}
            >
              <Icon name="shopping-cart" size={20} />
              <span className="hidden sm:inline">Panier</span>
              {ready && count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-bg">
                  {count}
                </span>
              )}
            </Link>
          )}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menu"
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg px-4 py-2 md:hidden" aria-label="Navigation mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-3 font-medium ${isActive(item.href) ? "text-primary" : "text-text"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
