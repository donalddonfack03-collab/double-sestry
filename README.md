# Double Sestry — site vitrine

Site bilingue (français / russe) de Double Sestry : crêpes, pastels et bissap faits maison à Briansk, le week-end, sur commande.

## Lancer le site sur son ordinateur

```bash
npm install      # une seule fois
npm run dev      # puis ouvrir http://localhost:4321
```

## Construire la version finale

```bash
npm run build    # le site final est dans le dossier dist/
```

## Organisation

| Dossier | Contenu |
| --- | --- |
| `src/pages/[lang]/` | Les pages, générées une fois en français et une fois en russe |
| `src/data/produits.ts` | **La carte** : produits, prix, allergènes, disponibilité |
| `src/data/infos.ts` | Téléphone, horaires de retrait, semaine type, paiement, livraison |
| `src/i18n/ui.ts` | Les petits textes de l'interface (menus, boutons) en FR et RU |
| `src/layouts/` | Le squelette commun à toutes les pages |
| `src/components/` | Les blocs réutilisables (carte produit, alvéole, en-tête…) |
| `src/styles/` | Couleurs, polices, espacements de la charte |
| `public/` | Logo, photos, favicon |

## Les pages

| Page | Adresse |
| --- | --- |
| Accueil | `/fr/` · `/ru/` |
| La carte | `/fr/carte/` |
| Un produit | `/fr/carte/la-sestry/` (une page par produit en vente) |
| Notre histoire | `/fr/histoire/` |
| Commander | `/fr/commander/` |

## Modifier la carte

Tout se passe dans `src/data/produits.ts` :

- **changer un prix** : modifier `prix` dans `formats` ;
- **mettre un produit en pause** : `disponible: false` (sa page disparaît du site) ;
- **ajouter un produit** : copier un bloc existant et changer le `slug` (il devient l'adresse de la page).

Vérifier avant d'envoyer : `npm run check` puis `npm run build`.

## Référencement et aperçus de liens

- **Image d'aperçu** : chaque page a sa propre image 1200 × 630 (photo dans une alvéole, nom, prix),
  générée à la construction dans `dist/og/`. C'est elle qui s'affiche quand on partage un lien
  sur WhatsApp, Telegram ou VK. Code : `src/lib/og.ts` et `src/pages/og/`.
- **Plan du site** : `sitemap-index.xml`, avec les versions française et russe de chaque page.
- **robots.txt** : autorise Google et Yandex, exclut le guide de style.
- **Données structurées** (`src/lib/schema.ts`) : fiche « établissement » (ville, horaires, téléphone,
  fourchette de prix) sur l'accueil, fiche « produit » avec les prix sur chaque page produit.

> Les adresses complètes utilisent `site` dans `astro.config.mjs`. Tant qu'il vaut `https://example.com`,
> les aperçus ne peuvent pas s'afficher sur WhatsApp : on le remplace à l'étape 6 (mise en ligne).

## Mise en ligne

Le site est publié automatiquement sur **GitHub Pages** à chaque envoi sur la branche `main`
(`.github/workflows/deploy.yml`), à l'adresse :

**https://donalddonfack03-collab.github.io/double-sestry/**

Pour passer plus tard à un nom de domaine (par exemple `doublesestry.ru`) : dans `astro.config.mjs`,
mettre `site: 'https://doublesestry.ru'`, supprimer la ligne `base`, ajouter un fichier `public/CNAME`
contenant le domaine, puis le déclarer dans GitHub → Settings → Pages → Custom domain.
