/**
 * Éditeur du site et vendeur de la boutique (micro-entreprise). SOURCE UNIQUE pour les CGV et les mentions légales.
 * ⚠ À compléter avant l'ouverture de la boutique : tant qu'un champ vaut "À compléter", les pages l'affichent tel quel.
 */
export const legal = {
  /** Nom et prénom de l'entrepreneur (ou nom commercial « Prénom Nom EI »). */
  owner: "MCBLOCCORP",
  /** Mention obligatoire de l'entrepreneur individuel. */
  status: "Entrepreneur individuel (micro-entreprise)",
  siret: "Sur demmander*",
  /** Adresse de l'entreprise (une domiciliation est possible). */
  address: "Sur demmande",
  /** Adresse de contact (pas l'adresse personnelle si tu préfères une adresse dédiée). */
  email: "contact@mcbloc.fr",
  /** Franchise en base de TVA : mention obligatoire tant que tu n'es pas assujetti. */
  vat: "TVA non applicable, art. 293 B du CGI",
  /** Hébergeur du site. */
  host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com",
  /** Prestataire de paiement. */
  payment: "Stripe Payments Europe, Ltd. — stripe.com",
  /** Médiateur de la consommation (obligatoire pour la vente aux particuliers) : à choisir et renseigner. */
  mediator: "À compléter",
} as const;
