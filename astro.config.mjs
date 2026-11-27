// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Adresse du site : le nom de domaine, servi par GitHub Pages (fichier public/CNAME).
  // L'ancienne adresse donalddonfack03-collab.github.io/double-sestry/ redirige ici automatiquement.
  site: 'https://lamaisondesdouceurs.com',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'ru'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
  integrations: [
    sitemap({
      // Le guide de style et la page de redirection racine ne vont pas dans le plan du site.
      filter: (page) => !page.includes('/styleguide') && /\/(fr|ru)\//.test(page),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', ru: 'ru-RU' } },
    }),
  ],
});
