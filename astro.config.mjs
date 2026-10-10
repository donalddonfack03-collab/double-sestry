// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // À remplacer à l'étape 6 par l'adresse définitive du site.
  site: 'https://example.com',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'ru'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
});
