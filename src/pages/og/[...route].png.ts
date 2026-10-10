// Une image d'aperçu par page et par langue, générée au moment de la construction du site.
import type { APIRoute } from 'astro';
import { renderOg, type OgOptions } from '../../lib/og';
import { langs, t, type Lang } from '../../i18n/ui';
import { enVente, prix } from '../../data/produits';
import { accroche } from '../../data/histoire';
import { marque } from '../../data/infos';

export function getStaticPaths() {
  const pages: { params: { route: string }; props: OgOptions }[] = [];
  for (const lang of langs) {
    const fr = lang === 'fr';
    pages.push(
      { params: { route: lang }, props: { lang, eyebrow: fr ? 'Fait maison · Briansk' : 'Домашняя кухня · Брянск', title: marque.slogan[lang], photo: 'crepes.jpg', badge: fr ? 'Crêpes · Pastels · Bissap' : 'Блины · Пастели · Биссап' } },
      { params: { route: `${lang}/carte` }, props: { lang, eyebrow: t(lang, 'nav.carte'), title: fr ? 'Peu de produits, faits avec soin.' : 'Немного блюд, но каждое — с заботой.', subtitle: fr ? 'Prix, allergènes et conservation de chaque produit.' : 'Цены, аллергены и сроки хранения.', photo: 'pastels.jpg' } },
      { params: { route: `${lang}/histoire` }, props: { lang, eyebrow: t(lang, 'nav.histoire'), title: accroche.titre[lang], photo: 'sac.jpg' } },
      { params: { route: `${lang}/commander` }, props: { lang, eyebrow: t(lang, 'nav.commander'), title: fr ? 'Commandez avant jeudi soir.' : 'Заказ до вечера четверга.', subtitle: fr ? 'Retrait le week-end devant la cité.' : 'Выдача на выходных у общежития.', photo: 'bissap.jpg', badge: 'WhatsApp' } },
    );
    for (const p of enVente) {
      const prixConnus = p.formats.map((f) => f.prix).filter((x): x is number => x !== null);
      const min = prixConnus.length ? Math.min(...prixConnus) : null;
      const badge = min === null ? t(lang, 'produit.surDevis') : p.formats.length > 1 ? `${fr ? 'dès' : 'от'} ${prix(min)}` : prix(min);
      pages.push({ params: { route: `${lang}/carte/${p.slug}` }, props: { lang, eyebrow: p.accroche[lang], title: p.nom[lang], photo: p.photo, badge } });
    }
  }
  return pages;
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props as OgOptions & { lang: Lang });
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
