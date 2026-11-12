import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-display text-7xl text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold">Ce bloc n&apos;existe pas</h1>
      <p className="mt-2 text-muted">La page que tu cherches est tombée dans le vide.</p>
      <Link href="/" className="btn-bloc mt-8 inline-block rounded-lg bg-gradient-brand px-6 py-3 font-bold text-white">
        Retour au lobby
      </Link>
    </div>
  );
}
