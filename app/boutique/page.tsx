import type { Metadata } from "next";
import Image from "next/image";
import Shop from "@/components/shop/Shop";
import LaunchNotice from "@/components/LaunchNotice";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Grades, pièces, cosmétiques et boosters MCBloc. Soutiens le serveur et brille en jeu.",
};

export default function BoutiquePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="relative -mx-4 mb-8 overflow-hidden px-4 py-10 sm:mx-0 sm:rounded-2xl sm:px-8">
        <Image src="/images/sumogames.png" alt="" aria-hidden fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" style={{ objectPosition: "center 25%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/40" aria-hidden />
        <div className="relative">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Boutique</p>
        <h1 className="font-display text-4xl sm:text-5xl">
          La boutique <span className="text-gradient">MCBloc</span>
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Chaque achat aide à faire vivre le serveur. Les articles sont livrés automatiquement sur ton compte à ta prochaine connexion.
        </p>
        </div>
      </header>
      {!site.launched && (
        <div className="mb-8">
          <LaunchNotice title="La boutique ouvre avec le serveur" compact>
            Découvre dès maintenant les grades, pièces et cosmétiques. Les achats seront possibles le jour de l&apos;ouverture.
          </LaunchNotice>
        </div>
      )}
      <Shop />
    </div>
  );
}
