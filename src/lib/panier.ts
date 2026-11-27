// Calcul du panier, sans lien avec la page : tarifs « à la pièce » et « par paquet ».
export type FormatPanier = { l: string; p: number | null; /** Nombre de pièces, pour les produits vendus à la pièce et en paquets. */ n?: number };
export type Catalogue = Record<string, { nom: string; formats: FormatPanier[]; choix?: boolean }>;
export type Ligne = { s: string; f: number; q: number };

const MAX = 200;

/** Index du format « à l'unité », ou -1 si le produit n'a pas de tarif paquet. */
export const indexUnite = (c: Catalogue, s: string) => c[s].formats.findIndex((f) => f.n === 1);

/**
 * Nettoie un panier relu du navigateur. Pour les produits à la pièce, tout est regroupé en une seule
 * ligne comptée en pièces (un « paquet de 4 » = 4 pièces), ce qui permet d'appliquer le meilleur tarif.
 */
export function normaliser(brut: unknown, c: Catalogue): Ligne[] {
  if (!Array.isArray(brut)) return [];
  const lignes: Ligne[] = [];
  for (const l of brut) {
    const format = c[l?.s]?.formats[l?.f];
    if (!format || format.p == null || !(l.q > 0)) continue;
    const u = indexUnite(c, l.s);
    const enPieces = u >= 0 && format.n !== undefined;
    const f: number = enPieces ? u : l.f;
    const q = Math.floor(enPieces ? l.q * format.n! : l.q);
    const deja = lignes.find((x) => x.s === l.s && x.f === f);
    if (deja) deja.q = Math.min(MAX, deja.q + q);
    else if (q > 0) lignes.push({ s: l.s, f, q: Math.min(MAX, q) });
  }
  return lignes;
}

/** La combinaison de paquets et d'unités la moins chère pour exactement `pieces` pièces. */
export function meilleurTarif(formats: FormatPanier[], pieces: number) {
  const best: { prix: number; choix: number[] }[] = [{ prix: 0, choix: [] }];
  for (let i = 1; i <= pieces; i++) {
    formats.forEach((f, idx) => {
      if (f.n === undefined || f.p == null || f.n > i || !best[i - f.n]) return;
      const prix = best[i - f.n].prix + f.p;
      const choix = [...best[i - f.n].choix, idx];
      if (!best[i] || prix < best[i].prix || (prix === best[i].prix && choix.length < best[i].choix.length)) best[i] = { prix, choix };
    });
  }
  const { prix, choix } = best[pieces];
  const paquets = [...new Set(choix)]
    .sort((a, b) => formats[b].n! - formats[a].n!)
    .map((f) => ({ f, nb: choix.filter((x) => x === f).length }));
  return { prix, paquets };
}

/** Prix et libellé d'une ligne du panier. */
export function detailLigne(c: Catalogue, l: Ligne) {
  const { formats } = c[l.s];
  const format = formats[l.f];
  const plein = format.p! * l.q;
  if (format.n !== 1) return { prix: plein, plein, libelle: format.l };
  const { prix, paquets } = meilleurTarif(formats, l.q);
  const libelle = l.q === 1 ? format.l : paquets.map((x) => `${x.nb} × ${formats[x.f].l}`).join(' + ');
  return { prix, plein, libelle };
}

export const totalPanier = (c: Catalogue, lignes: Ligne[]) => lignes.reduce((t, l) => t + detailLigne(c, l).prix, 0);
