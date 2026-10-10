// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Adresse du site. Option B (actuelle) : GitHub Pages, dans le sous-dossier /double-sestry.
  // Pour passer à un nom de domaine (option A) : site: 'https://doublesestry.ru' et supprimer `base`.
  site: 'https://donalddonfack03-collab.github.io',
  base: '/double-sestry',
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
