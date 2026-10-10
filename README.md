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
| `src/pages/fr/`, `src/pages/ru/` | Les pages, une version par langue |
| `src/data/` | Produits, prix, horaires (un seul endroit à modifier) |
| `src/components/` | Les blocs réutilisables (carte produit, alvéole, en-tête…) |
| `src/styles/` | Couleurs, polices, espacements de la charte |
| `public/` | Logo, photos, favicon |
