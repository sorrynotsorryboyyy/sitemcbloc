import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions de vente de la boutique MCBloc : articles, paiement via Tebex, livraison, remboursements.",
};

// ⚠ BROUILLON à faire relire avant l'ouverture de la boutique (mentions légales de l'éditeur à compléter).
const sections: { title: string; text: string[] }[] = [
  {
    title: "1. Objet",
    text: [
      `Ces conditions s'appliquent aux achats faits sur la boutique de ${site.name} (${site.url}/boutique) : grades, pièces et boosters, utilisables uniquement sur le serveur Minecraft ${site.ip}.`,
      "Ce sont des contenus numériques : ils n'ont aucune valeur monétaire, ne sont ni échangeables ni remboursables en argent, et ne peuvent pas être revendus.",
    ],
  },
  {
    title: "2. Vendeur et paiement",
    text: [
      "Le paiement est traité par Tebex Limited, revendeur officiel (« merchant of record ») : c'est Tebex qui encaisse, émet le reçu et applique ses propres conditions, que tu acceptes sur sa page de paiement.",
      "Aucune donnée bancaire ne passe par MCBloc. Les prix sont indiqués en euros, toutes taxes comprises ; le montant final est celui affiché par Tebex.",
    ],
  },
  {
    title: "3. Livraison",
    text: [
      "Les articles sont livrés automatiquement sur le compte Minecraft indiqué, en quelques minutes, ou à la prochaine connexion. Vérifie bien ton pseudo : un article livré sur le mauvais compte ne peut pas être déplacé.",
      "Grade 30 jours : 30 jours qui s'ajoutent aux jours restants si tu rachètes. Grade à vie : permanent, tant que le serveur existe. Pièces : ajoutées à ton solde. Boosters : leur durée est décomptée pendant ton temps de jeu actif (sauf le booster réseau, en temps réel).",
    ],
  },
  {
    title: "4. Droit de rétractation",
    text: [
      "En validant ta commande, tu demandes la livraison immédiate du contenu numérique et tu renonces expressément à ton droit de rétractation de 14 jours (article L221-28 du Code de la consommation).",
    ],
  },
  {
    title: "5. Remboursements et litiges",
    text: [
      "Une demande de remboursement se fait auprès de Tebex. Si un paiement est remboursé ou contesté auprès de ta banque, les articles correspondants sont retirés automatiquement (jours de grade, grade à vie, pièces dans la limite de ton solde, boosters).",
      "Un problème de livraison ? Ouvre un ticket sur notre Discord avec ton reçu Tebex avant toute contestation bancaire : on règle ça au plus vite.",
    ],
  },
  {
    title: "6. Mineurs",
    text: ["Si tu as moins de 18 ans, tu dois avoir l'accord de tes parents (ou de ton représentant légal) avant tout achat."],
  },
  {
    title: "7. Règles du serveur",
    text: [
      "Un achat ne donne aucun droit de passer outre les règles. Une sanction (mute, bannissement) ne donne pas droit à un remboursement.",
      "Les avantages des grades et des articles peuvent évoluer pour l'équilibre du jeu ; les prix affichés au moment de l'achat sont ceux appliqués.",
    ],
  },
];

export default function CgvPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Boutique</p>
      <h1 className="font-display text-4xl sm:text-5xl">Conditions générales de vente</h1>
      <p className="mt-3 text-muted">
        En résumé : tu paies via Tebex, tes articles arrivent en jeu automatiquement, et un paiement remboursé ou contesté retire les
        articles achetés. Voir aussi les <Link href="/regles" className="text-primary hover:underline">règles du serveur</Link>.
      </p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-2xl">{s.title}</h2>
            {s.text.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-muted">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
