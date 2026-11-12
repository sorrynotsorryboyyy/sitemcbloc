import type { Metadata } from "next";
import Account from "@/components/account/Account";

export const metadata: Metadata = {
  title: "Mon compte",
  description: "Lie ton compte Minecraft au site MCBloc avec la commande /site.",
};

export default function ComptePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Mon compte</p>
      <h1 className="font-display text-4xl sm:text-5xl">Ton compte MCBloc</h1>
      <Account />
    </div>
  );
}
