// Données structurées schema.org : elles aident Google et Yandex à afficher le nom, la ville,
// les horaires, le téléphone et les prix directement dans les résultats de recherche.
import type { Lang } from '../i18n/ui';
import { path } from '../i18n/ui';
import { contact, marque } from '../data/infos';
import { enVente, type Produit } from '../data/produits';

export function etablissement(lang: Lang, site: URL) {
  const prixConnus = enVente.flatMap((p) => p.formats.map((f) => f.prix)).filter((x): x is number => x !== null);
  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': new URL('/#double-sestry', site).href,
    name: marque.nom,
    description: marque.slogan[lang],
    url: new URL(path(lang), site).href,
    image: new URL(`/og/${lang}.png`, site).href,
    logo: new URL('/ds-logo.svg', site).href,
    telephone: contact.telephone.replace(/[\s-]/g, ''),
    servesCuisine: lang === 'fr' ? ['Crêpes', 'Cuisine congolaise', 'Fait maison'] : ['Блины', 'Конголезская кухня', 'Домашняя кухня'],
    priceRange: `${Math.min(...prixConnus)}–${Math.max(...prixConnus)} RUB`,
    currenciesAccepted: 'RUB',
    paymentAccepted: lang === 'fr' ? 'Espèces, virement' : 'Наличные, перевод',
    address: { '@type': 'PostalAddress', addressLocality: marque.ville[lang], addressCountry: 'RU' },
    areaServed: marque.ville[lang],
    hasMenu: new URL(path(lang, 'carte'), site).href,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '08:00', closes: '10:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '15:00', closes: '21:00' },
    ],
    founder: [
      { '@type': 'Person', name: lang === 'fr' ? 'Ria' : 'Рия' },
      { '@type': 'Person', name: lang === 'fr' ? 'Emmanuelle' : 'Эмманюэль' },
    ],
  };
}

export function produit(p: Produit, lang: Lang, site: URL) {
  const url = new URL(path(lang, `carte/${p.slug}`), site).href;
  const offers = p.formats
    .filter((f) => f.prix !== null)
    .map((f) => ({
      '@type': 'Offer',
      name: f.libelle[lang],
      price: f.prix,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/PreOrder',
      url,
      seller: { '@id': new URL('/#double-sestry', site).href },
    }));
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.nom[lang],
    description: p.description[lang],
    image: new URL(`/og/${lang}/carte/${p.slug}.png`, site).href,
    url,
    brand: { '@type': 'Brand', name: marque.nom },
    ...(offers.length ? { offers } : {}),
  };
}
