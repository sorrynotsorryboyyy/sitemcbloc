"use client";

import { useRef } from "react";

/**
 * Inclinaison 3D qui suit la souris, avec un reflet lumineux.
 * Inactif au tactile et quand l'utilisateur préfère réduire les animations.
 */
export default function TiltCard({
  children,
  className = "",
  max = 8,
  glow = "#ffffff",
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    el.dataset.active = "true";
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.dataset.active = "false";
  }

  return (
    <div className="tilt-wrap h-full">
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt-card relative h-full ${className}`} style={{ ["--glow" as string]: glow }}>
        {children}
        <div className="tilt-shine pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden />
      </div>
    </div>
  );
}
