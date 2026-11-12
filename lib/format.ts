const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
const num = new Intl.NumberFormat("fr-FR");

export const formatEuro = (n: number) => euro.format(n);
export const formatNumber = (n: number) => num.format(n);

/** Pseudo Minecraft valide : 3 à 16 caractères, lettres, chiffres et _ */
export const isValidUsername = (s: string) => /^[A-Za-z0-9_]{3,16}$/.test(s);
