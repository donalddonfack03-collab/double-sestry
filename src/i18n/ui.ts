// Textes de l'interface (menus, boutons, libellés) dans les deux langues.
// Les textes des produits sont dans src/data/produits.ts.

export const langs = ['fr', 'ru'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'fr';

/** Un texte dans les deux langues. */
export type T = Record<Lang, string>;

export const langLabels: Record<Lang, string> = { fr: 'Français', ru: 'Русский' };

export const ui = {
  'nav.accueil': { fr: 'Accueil', ru: 'Главная' },
  'nav.carte': { fr: 'La carte', ru: 'Меню' },
  'nav.histoire': { fr: 'Notre histoire', ru: 'Наша история' },
  'nav.commander': { fr: 'Commander', ru: 'Заказать' },
  'nav.infos': { fr: 'Retrait & infos', ru: 'Выдача и инфо' },
  'cta.whatsapp': { fr: 'Commander sur WhatsApp', ru: 'Заказать в WhatsApp' },
  'cta.voirCarte': { fr: 'Voir la carte', ru: 'Смотреть меню' },
  'produit.allergenes': { fr: 'Allergènes', ru: 'Аллергены' },
  'produit.traces': { fr: 'Traces possibles', ru: 'Возможны следы' },
  'produit.aucunAllergene': { fr: 'Aucun allergène majeur', ru: 'Без основных аллергенов' },
  'produit.conservation': { fr: 'Conservation', ru: 'Хранение' },
  'produit.surDevis': { fr: 'Prix selon composition', ru: 'Цена по составу' },
  'produit.auLieuDe': { fr: 'au lieu de', ru: 'вместо' },
  'produit.retourCarte': { fr: '← Retour à la carte', ru: '← Назад в меню' },
  'carte.sale': { fr: 'Salé', ru: 'Солёное' },
  'carte.sucre': { fr: 'Sucré', ru: 'Сладкое' },
  'carte.boisson': { fr: 'Boisson', ru: 'Напитки' },
  'carte.formule': { fr: 'Les formules', ru: 'Наборы' },
  'carte.surCommande': { fr: 'Sur commande, 48 h à l’avance', ru: 'Под заказ, за 48 часов' },
} as const satisfies Record<string, T>;

export type UiKey = keyof typeof ui;

export function t(lang: Lang, key: UiKey): string {
  return ui[key][lang];
}

export function isLang(value: string | undefined): value is Lang {
  return !!value && (langs as readonly string[]).includes(value);
}

/** Préfixe d'adresse du site (« /double-sestry » sur GitHub Pages, vide avec un nom de domaine). */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Ajoute le préfixe du site à une adresse : withBase('/favicon.svg') → /double-sestry/favicon.svg */
export function withBase(p: string): string {
  return `${BASE}/${p.replace(/^\/+/, '')}`;
}

/** Retire le préfixe du site d'une adresse (pour retrouver /fr/carte/…). */
export function stripBase(p: string): string {
  return BASE && p.startsWith(BASE) ? p.slice(BASE.length) || '/' : p;
}

/** Construit une adresse dans une langue : path('ru', 'carte/la-sestry') → /ru/carte/la-sestry/ */
export function path(lang: Lang, slug = ''): string {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  return withBase(clean ? `${lang}/${clean}/` : `${lang}/`);
}

/** Même page dans l'autre langue (pour le bouton FR / RU et les balises hreflang). */
export function switchLang(currentPath: string, to: Lang): string {
  const parts = stripBase(currentPath).split('/').filter(Boolean);
  if (parts.length && isLang(parts[0])) parts[0] = to;
  else parts.unshift(to);
  return withBase(`${parts.join('/')}/`);
}

/** Pour générer chaque page une fois par langue. */
export function langPaths() {
  return langs.map((lang) => ({ params: { lang } }));
}

/** Ponctuation : le français met une espace insécable avant « : » et « ! », pas le russe. */
export function colon(lang: Lang): string {
  return lang === 'fr' ? ' :' : ':';
}
export function bang(lang: Lang): string {
  return lang === 'fr' ? ' !' : '!';
}
