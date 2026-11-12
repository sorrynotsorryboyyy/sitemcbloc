"use client";

import { useState } from "react";
import { site } from "@/lib/data/site";
import Icon from "@/components/Icon";

export default function CopyIpButton({ size = "lg" }: { size?: "lg" | "md" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.ip);
    } catch {
      /* presse-papiers indisponible : l'IP reste visible */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const pad = size === "lg" ? "px-6 py-4 text-lg" : "px-4 py-3 text-base";

  return (
    <button
      onClick={copy}
      className={`btn-bloc group inline-flex items-center gap-3 rounded-lg bg-gradient-brand font-bold text-white ${pad}`}
      aria-live="polite"
    >
      <span className="font-mono">{site.ip}</span>
      <span className="rounded bg-black/25 px-2 py-1 text-xs font-semibold uppercase tracking-wider">
        {copied ? <span className="inline-flex items-center gap-1"><Icon name="check" size={14} /> Copié !</span> : <span className="inline-flex items-center gap-1"><Icon name="copy" size={14} /> Copier l&apos;IP</span>}
      </span>
    </button>
  );
}
