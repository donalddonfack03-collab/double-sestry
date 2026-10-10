// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // À remplacer à l'étape 6 par l'adresse définitive du site.
  site: 'https://example.com',
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
