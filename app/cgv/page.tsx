import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/data/site";
import { legal } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions de vente de la boutique MCBloc : articles, paiement sécurisé par Stripe, livraison, remboursements.",
};

// ⚠ BROUILLON à faire relire avant l'ouverture de la boutique. Infos du vendeur : lib/data/legal.ts.
const sections: { title: string; text: string[] }[] = [
  {
    title: "1. Vendeur",
    text: [
      `La boutique de ${site.name} (${site.url}/boutique) est exploitée par ${legal.owner}, ${legal.status}, SIRET ${legal.siret}, ${legal.address}. Contact : ${legal.email}.`,
      `${legal.vat}. Les prix sont indiqués en euros et sont les prix finaux à payer.`,
    ],
  },
  {
    title: "2. Articles",
    text: [
      `Les articles vendus (grades, pièces, boosters) sont des contenus numériques utilisables uniquement sur le serveur Minecraft ${site.ip}.`,
      "Ils n'ont aucune valeur monétaire, ne sont ni échangeables ni convertibles en argent, et ne peuvent pas être revendus ni transférés à un autre compte.",
    ],
  },
  {
    title: "3. Paiement",
    text: [
      `Le paiement est sécurisé par notre prestataire ${legal.payment}. Aucune donnée bancaire n'est vue ni conservée par MCBloc.`,
      "Les moyens de paiement acceptés sont ceux affichés sur la page de paiement (carte bancaire, Apple Pay, Google Pay…). Un reçu est envoyé par e-mail.",
    ],
  },
  {
    title: "4. Livraison",
    text: [
      "Les articles sont livrés automatiquement sur le compte Minecraft indiqué, en quelques minutes, ou à la prochaine connexion. Vérifie bien ton pseudo : un article livré sur le mauvais compte ne peut pas être déplacé.",
      "Grade 30 jours : 30 jours qui s'ajoutent aux jours restants si tu rachètes. Grade à vie : permanent, tant que le serveur existe. Pièces : ajoutées à ton solde. Boosters : leur durée est décomptée pendant ton temps de jeu actif (sauf le booster réseau, en temps réel).",
    ],
  },
  {
    title: "5. Droit de rétractation",
    text: [
      "En validant ta commande, tu demandes la livraison immédiate du contenu numérique et tu renonces expressément à ton droit de rétractation de 14 jours (article L221-28 du Code de la consommation).",
    ],
  },
  {
    title: "6. Remboursements et litiges",
    text: [
      `Un problème (article non reçu, erreur) ? Contacte-nous (${legal.email} ou ticket sur notre Discord) avec ton reçu avant toute contestation bancaire : on règle ça au plus vite, remboursement compris si l'article n'a pas pu être livré.`,
      "Si un paiement est remboursé ou contesté auprès de ta banque, les articles correspondants sont retirés automatiquement (jours de grade, grade à vie, pièces dans la limite de ton solde, boosters).",
      `En cas de litige non résolu, tu peux recourir gratuitement au médiateur de la consommation : ${legal.mediator}.`,
    ],
  },
  {
    title: "7. Mineurs",
    text: ["Si tu as moins de 18 ans, tu dois avoir l'accord de tes parents (ou de ton représentant légal) avant tout achat."],
  },
  {
    title: "8. Règles du serveur",
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
        En résumé : tu paies par une page sécurisée Stripe, tes articles arrivent en jeu automatiquement, et un paiement remboursé
        ou contesté retire les articles achetés. Voir aussi les <Link href="/regles" className="text-primary hover:underline">règles
        du serveur</Link> et les <Link href="/mentions-legales" className="text-primary hover:underline">mentions légales</Link>.
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
