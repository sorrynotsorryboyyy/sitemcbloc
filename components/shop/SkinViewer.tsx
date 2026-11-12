"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  skin: string;
  /** Pseudo utilisé pour le rendu de secours (pas de WebGL / chargement). */
  fallbackName: string;
  width?: number;
  height?: number;
};

/**
 * Personnage Minecraft en 3D (skinview3d / three.js).
 * La bibliothèque n'est téléchargée que lorsque le composant arrive à l'écran.
 */
export default function SkinViewer({ skin, fallbackName, width = 300, height = 400 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<"idle" | "ready" | "fallback">("idle");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      // WebGL indisponible → rendu statique
      const probe = document.createElement("canvas");
      if (!probe.getContext("webgl2") && !probe.getContext("webgl")) {
        setState("fallback");
        return;
      }
      try {
        const sv = await import("skinview3d");
        if (disposed) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const viewer = new sv.SkinViewer({ canvas, width, height, skin, model: "auto-detect", zoom: 0.85, fov: 45 });
        viewer.controls.enableZoom = false;
        viewer.controls.enablePan = false;
        viewer.autoRotate = !reduced;
        viewer.autoRotateSpeed = 0.8;
        viewer.playerObject.rotation.y = -0.4;
        const idle = new sv.IdleAnimation();
        viewer.animation = reduced ? null : idle;

        const onEnter = () => {
          if (!reduced) viewer.animation = new sv.WaveAnimation();
        };
        const onLeave = () => {
          if (!reduced) viewer.animation = idle;
        };
        wrap.addEventListener("pointerenter", onEnter);
        wrap.addEventListener("pointerleave", onLeave);

        setState("ready");
        cleanup = () => {
          wrap.removeEventListener("pointerenter", onEnter);
          wrap.removeEventListener("pointerleave", onLeave);
          viewer.dispose();
        };
      } catch {
        if (!disposed) setState("fallback");
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(wrap);

    return () => {
      disposed = true;
      io.disconnect();
      cleanup?.();
    };
  }, [skin, width, height]);

  return (
    <div ref={wrapRef} className="relative mx-auto select-none" style={{ width, height, maxWidth: "100%" }}>
      <canvas
        ref={canvasRef}
        className={`h-full w-full cursor-grab touch-pan-y transition-opacity duration-500 active:cursor-grabbing ${state === "ready" ? "opacity-100" : "opacity-0"}`}
        aria-label={`Personnage 3D de ${fallbackName}, à faire tourner à la souris`}
        role="img"
      />
      {state !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={`https://mc-heads.net/body/${fallbackName}/${Math.round(height * 0.55)}`}
            alt={`Skin de ${fallbackName}`}
            width={Math.round(height * 0.23)}
            height={Math.round(height * 0.55)}
            className={`h-[55%] w-auto ${state === "idle" ? "animate-pulse opacity-60" : ""}`}
            unoptimized
          />
        </div>
      )}
    </div>
  );
}
