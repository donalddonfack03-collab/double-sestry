// La carte de Double Sestry : le SEUL endroit où l'on change un produit, un prix ou une disponibilité.
//
// Pour mettre un produit en pause : disponible: false (sa page et sa fiche disparaissent du site).
// Pour changer un prix : modifier `prix` dans `formats`. Tout le site se met à jour.

import type { T } from '../i18n/ui';

export type Categorie = 'sale' | 'sucre' | 'boisson' | 'formule' | 'surCommande';

export type Allergene = 'gluten' | 'lait' | 'oeufs' | 'moutarde' | 'noisette' | 'soja';

export const allergenes: Record<Allergene, T> = {
  gluten: { fr: 'gluten', ru: 'глютен' },
  lait: { fr: 'lait', ru: 'молоко' },
  oeufs: { fr: 'œufs', ru: 'яйца' },
  moutarde: { fr: 'moutarde', ru: 'горчица' },
  noisette: { fr: 'noisette', ru: 'фундук' },
  soja: { fr: 'soja', ru: 'соя' },
};

export interface Format {
  libelle: T;
  /** Prix en roubles. `null` = prix sur demande. */
  prix: number | null;
  /** Prix barré (formules : total des produits achetés séparément). */
  prixBarre?: number;
}

export interface Produit {
  /** Sert d'adresse : /fr/carte/<slug>/ */
  slug: string;
  /** Code court de la fiche du week-end (S, C, L…). */
  code?: string;
  categorie: Categorie;
  disponible: boolean;
  nom: T;
  /** Une ligne : ce que c'est. */
  accroche: T;
  /** Le paragraphe de la page produit. */
  description: T;
  formats: Format[];
  contient: Allergene[];
  traces: Allergene[];
  conservation?: T;
  /** Nom du fichier dans src/assets/photos/ ; absente = alvéole de couleur avec le nom. */
  photo?: string;
  photoAlt?: T;
  /** Prix de départ seulement : le prix final se fixe sur WhatsApp (pas d'ajout au panier). */
  surMesure?: boolean;
  /** Pour les formules : les slugs des produits inclus. */
  inclus?: string[];
}

const deuxJours: T = { fr: '2 jours au frais.', ru: '2 дня в холодильнике.' };

export const produits: Produit[] = [
  {
    slug: 'la-sestry',
    code: 'S',
    categorie: 'sale',
    disponible: true,
    nom: { fr: 'La Sestry', ru: 'La Sestry' },
    accroche: { fr: 'Crêpe poulet-fromage · notre signature', ru: 'Блин с курицей и сыром · наш фирменный' },
    description: {
      fr: 'Une crêpe fine garnie de poulet épicé cuit maison, d’une cuillère de sauce et d’une tranche de cheddar. On la plie en enveloppe, puis on la repasse à la poêle, le côté soudé en premier, pour qu’elle reste fermée. Le fromage fond à l’intérieur, la crêpe reste souple.',
      ru: 'Тонкий блин с острой домашней курицей, ложкой соуса и ломтиком чеддера. Мы складываем его конвертом и ещё раз обжариваем, начиная со шва, чтобы он не раскрылся. Сыр плавится внутри, а блин остаётся мягким.',
    },
    formats: [
      { libelle: { fr: 'la crêpe', ru: '1 шт.' }, prix: 150 },
      { libelle: { fr: 'paquet de 4', ru: '4 шт.' }, prix: 480 },
      { libelle: { fr: 'paquet de 6', ru: '6 шт.' }, prix: 690 },
    ],
    contient: ['gluten', 'lait', 'oeufs', 'moutarde'],
    traces: ['noisette'],
    conservation: {
      fr: '2 jours au frais. Réchauffer 1 minute à la poêle, ou au micro-ondes sans le couvercle.',
      ru: '2 дня в холодильнике. Разогреть 1 минуту на сковороде или в микроволновке без крышки.',
    },
    photo: 'crepes.jpg',
    photoAlt: { fr: 'Quatre crêpes La Sestry pliées en carré dans une assiette', ru: 'Четыре блина La Sestry, сложенные квадратиком, на тарелке' },
  },
  {
    slug: 'la-choco',
    code: 'C',
    categorie: 'sucre',
    disponible: true,
    nom: { fr: 'La Choco', ru: 'La Choco' },
    accroche: { fr: 'Crêpe chocolat-noisette', ru: 'Блин с шоколадно-ореховой пастой' },
    description: {
      fr: 'La crêpe du goûter. On la tartine de pâte chocolat-noisette, on la roule, on la laisse prendre au frais, puis on la coupe en spirales. Elle se mange froide ou tiède, avec les doigts.',
      ru: 'Блин к чаю. Намазываем шоколадно-ореховой пастой, сворачиваем, даём застыть в холодильнике и режем на рулетики. Вкусно и холодным, и тёплым.',
    },
    formats: [
      { libelle: { fr: 'la crêpe', ru: '1 шт.' }, prix: 120 },
      { libelle: { fr: 'paquet de 4', ru: '4 шт.' }, prix: 400 },
      { libelle: { fr: 'paquet de 6', ru: '6 шт.' }, prix: 560 },
    ],
    contient: ['gluten', 'lait', 'oeufs', 'noisette', 'soja'],
    traces: [],
    conservation: deuxJours,
    photo: 'choco.jpg',
    photoAlt: { fr: 'Crêpes La Choco roulées, avec des traits de chocolat, dans leur boîte', ru: 'Свёрнутые блины La Choco с шоколадными полосками в коробке' },
  },
  {
    slug: 'lotus',
    code: 'L',
    categorie: 'sucre',
    disponible: true,
    nom: { fr: 'Crêpe du mois : Lotus', ru: 'Блин месяца: Lotus' },
    accroche: { fr: 'Crème de biscuits caramélisés', ru: 'Крем из карамельного печенья' },
    description: {
      fr: 'Une crêpe qui change de temps en temps. Ce mois-ci, la crème Lotus : un goût de caramel et de cannelle, comme le petit biscuit servi avec le café. Quand elle change, on vous l’annonce le lundi avec le menu.',
      ru: 'Блин, который время от времени меняется. В этом месяце — крем Lotus: вкус карамели и корицы, как у печенья к кофе. О новом вкусе мы сообщаем в понедельник вместе с меню.',
    },
    formats: [
      { libelle: { fr: 'la crêpe', ru: '1 шт.' }, prix: 200 },
      { libelle: { fr: 'paquet de 4', ru: '4 шт.' }, prix: 560 },
    ],
    contient: ['gluten', 'lait', 'oeufs', 'soja'],
    traces: ['noisette'],
    conservation: deuxJours,
    photo: 'lotus.jpg',
    photoAlt: { fr: 'Crêpe Lotus nappée de crème Lotus et de sauce blanche, avec un biscuit et de la chantilly, dans sa boîte', ru: 'Блин Lotus с кремом Lotus и белым соусом, с печеньем и взбитыми сливками, в коробке' },
  },
  {
    slug: 'pastels',
    code: 'P',
    categorie: 'sale',
    disponible: true,
    nom: { fr: 'Pastels de la Maison', ru: 'Пастели по-домашнему' },
    accroche: { fr: 'Chaussons frits au poulet', ru: 'Жареные пирожки с курицей' },
    description: {
      fr: 'Une pâte faite à la main, garnie de poulet assaisonné aux oignons, au poivron et aux épices, puis frite dans une huile neuve à chaque fournée. Croustillants dehors, fondants dedans. C’est le plat qu’on partage chez nous quand la famille se réunit.',
      ru: 'Тесто ручной работы, начинка из курицы с луком, перцем и специями. Жарим в свежем масле для каждой партии. Хрустящие снаружи, сочные внутри. У нас дома это блюдо всегда на столе, когда собирается семья.',
    },
    formats: [
      { libelle: { fr: 'boîte de 6', ru: '6 шт.' }, prix: 400 },
      { libelle: { fr: 'boîte de 9', ru: '9 шт.' }, prix: 600 },
    ],
    contient: ['gluten', 'lait', 'oeufs', 'moutarde'],
    traces: ['noisette'],
    conservation: {
      fr: '2 jours au frais. 5 minutes au four ou à la poêle pour retrouver le croustillant.',
      ru: '2 дня в холодильнике. 5 минут в духовке или на сковороде — и они снова хрустящие.',
    },
    photo: 'pastels.jpg',
    photoAlt: { fr: 'Quatre pastels dorés dans une assiette', ru: 'Четыре золотистых пастели на тарелке' },
  },
  {
    slug: 'bissap',
    code: 'B',
    categorie: 'boisson',
    disponible: true,
    nom: { fr: 'Bissap Maison', ru: 'Биссап по-домашнему' },
    accroche: { fr: 'Boisson à la fleur d’hibiscus', ru: 'Напиток из цветков гибискуса' },
    description: {
      fr: 'Des fleurs d’hibiscus séchées infusées, filtrées, sucrées et parfumées, puis mises en bouteille le vendredi. Rouge profond, légèrement acidulé, à boire bien frais. Le grand format est celui qu’on vous conseille.',
      ru: 'Сушёные цветки гибискуса настаиваем, процеживаем, подслащиваем и разливаем по бутылкам в пятницу. Глубокий красный цвет, лёгкая кислинка — пить хорошо охлаждённым. Советуем большую бутылку.',
    },
    formats: [
      { libelle: { fr: '0,5 L', ru: '0,5 л' }, prix: 200 },
      { libelle: { fr: '0,25 L', ru: '0,25 л' }, prix: 150 },
    ],
    contient: [],
    traces: [],
    conservation: { fr: '3 jours au frais. Bien agiter avant de servir.', ru: '3 дня в холодильнике. Перед подачей взболтать.' },
    photo: 'bissap.jpg',
    photoAlt: { fr: 'Verre et bouteille de bissap au bord de la fenêtre', ru: 'Стакан и бутылка биссапа на подоконнике' },
  },
  {
    slug: 'grande-faim',
    code: 'GF',
    categorie: 'formule',
    disponible: true,
    nom: { fr: 'Formule Grande Faim', ru: 'Набор «Большой голод»' },
    accroche: { fr: '2 La Sestry, 5 pastels et un bissap 0,25 L', ru: '2 блина La Sestry, 5 пастелей и биссап 0,25 л' },
    description: {
      fr: 'Le repas complet pour les jours de grande faim : deux crêpes La Sestry, cinq pastels et une petite bouteille de bissap (0,25 L), dans une seule boîte.',
      ru: 'Полноценный обед для очень голодных: два блина La Sestry, пять пастелей и маленькая бутылка биссапа (0,25 л) в одной коробке.',
    },
    formats: [{ libelle: { fr: 'la formule', ru: 'набор' }, prix: 650 }],
    contient: ['gluten', 'lait', 'oeufs', 'moutarde'],
    traces: ['noisette'],
    conservation: deuxJours,
    inclus: ['la-sestry', 'pastels', 'bissap'],
  },
  {
    slug: 'douceur-complete',
    code: 'DC',
    categorie: 'formule',
    disponible: true,
    nom: { fr: 'La Douceur complète', ru: 'Набор «Полный»' },
    accroche: { fr: '3 La Sestry, 5 pastels, 2 La Choco et un bissap 0,25 L', ru: '3 блина La Sestry, 5 пастелей, 2 блина La Choco и биссап 0,25 л' },
    description: {
      fr: 'Le salé et le sucré dans une seule boîte : trois crêpes La Sestry, cinq pastels, deux La Choco pour finir et une petite bouteille de bissap (0,25 L). De quoi partager, ou tenir tout le week-end.',
      ru: 'Солёное и сладкое в одной коробке: три блина La Sestry, пять пастелей, два блина La Choco на десерт и маленькая бутылка биссапа (0,25 л). Можно поделиться — или растянуть на все выходные.',
    },
    formats: [{ libelle: { fr: 'la formule', ru: 'набор' }, prix: 750 }],
    contient: ['gluten', 'lait', 'oeufs', 'moutarde', 'noisette', 'soja'],
    traces: [],
    conservation: deuxJours,
    inclus: ['la-sestry', 'pastels', 'la-choco', 'bissap'],
  },
  {
    slug: 'mini-douceur',
    code: 'MD',
    categorie: 'formule',
    disponible: true,
    nom: { fr: 'Mini Douceur', ru: 'Набор «Мини»' },
    accroche: { fr: '2 La Choco ou 2 La Sestry, et un bissap 0,25 L', ru: '2 La Choco или 2 La Sestry и биссап 0,25 л' },
    description: {
      fr: 'La petite formule : deux crêpes et une petite bouteille de bissap (0,25 L). En version sucrée avec deux La Choco pour le goûter, ou en version salée avec deux La Sestry pour un repas léger.',
      ru: 'Маленький набор: два блина и маленькая бутылка биссапа (0,25 л). В сладкой версии, с двумя La Choco, — к чаю, в солёной, с двумя La Sestry, — для лёгкого обеда.',
    },
    formats: [
      { libelle: { fr: 'sucrée (2 La Choco)', ru: 'сладкий (2 La Choco)' }, prix: 350 },
      { libelle: { fr: 'salée (2 La Sestry)', ru: 'солёный (2 La Sestry)' }, prix: 390 },
    ],
    contient: ['gluten', 'lait', 'oeufs', 'moutarde', 'noisette', 'soja'],
    traces: [],
    conservation: deuxJours,
    inclus: ['la-choco', 'la-sestry', 'bissap'],
  },
  {
    slug: 'gateaux',
    categorie: 'surCommande',
    disponible: true,
    nom: { fr: 'Gâteaux maison', ru: 'Домашние кексы' },
    accroche: { fr: 'Marbré, citron ou yaourt · 48 h à l’avance', ru: 'Мраморный, лимонный или йогуртовый · за 48 часов' },
    description: {
      fr: 'Les gâteaux simples et moelleux des anniversaires et des réunions de famille : marbré chocolat-vanille, citron ou yaourt. Le prix dépend de la taille. Écrivez-nous au moins 48 heures avant la date souhaitée.',
      ru: 'Простые и нежные кексы для дней рождения и семейных встреч: мраморный шоколадно-ванильный, лимонный или йогуртовый. Цена зависит от размера. Напишите нам минимум за 48 часов до нужной даты.',
    },
    formats: [{ libelle: { fr: 'le gâteau', ru: 'кекс' }, prix: 700 }],
    surMesure: true,
    contient: ['gluten', 'lait', 'oeufs'],
    traces: ['noisette'],
    photo: 'gateau-marbre.jpg',
    photoAlt: { fr: 'Gâteau marbré chocolat-vanille, avec deux tranches coupées', ru: 'Мраморный шоколадно-ванильный кекс с двумя отрезанными ломтиками' },
  },
  {
    slug: 'box-anniversaire',
    categorie: 'surCommande',
    disponible: true,
    nom: { fr: 'Box anniversaire', ru: 'Праздничный бокс' },
    accroche: { fr: 'Composée par vous · 48 h à l’avance', ru: 'Собираете сами · за 48 часов' },
    description: {
      fr: 'Une box à partager pour un anniversaire ou une fête, que vous composez vous-même : vous choisissez les produits (mini-burgers, wraps, mini hot-dogs, pastels, crêpes, feuilletés, gâteaux…), le nombre de personnes, et le prénom et le message à écrire. On vous donne le prix sur WhatsApp selon votre composition.',
      ru: 'Бокс для дня рождения или праздника, который вы собираете сами: выбираете блюда (мини-бургеры, роллы, мини хот-доги, пастели, блины, слойки, кексы…), количество гостей, имя и надпись. Цену назовём в WhatsApp по вашему составу.',
    },
    formats: [{ libelle: { fr: 'la box', ru: 'бокс' }, prix: null }],
    contient: ['gluten', 'lait', 'oeufs', 'moutarde', 'noisette', 'soja'],
    traces: [],
    photo: 'box-burgers.jpg',
    photoAlt: { fr: 'Box anniversaire : mini-burgers, wraps et mini hot-dogs', ru: 'Праздничный бокс: мини-бургеры, роллы и мини хот-доги' },
  },
  {
    slug: 'tiramisu',
    categorie: 'sucre',
    disponible: false,
    nom: { fr: 'Tiramisu des Sœurs', ru: 'Тирамису от сестёр' },
    accroche: { fr: 'Pot individuel', ru: 'Порционный стаканчик' },
    description: { fr: 'De retour bientôt.', ru: 'Скоро вернётся.' },
    formats: [{ libelle: { fr: 'le pot', ru: 'стаканчик' }, prix: null }],
    contient: ['gluten', 'lait', 'oeufs'],
    traces: [],
  },
];

/** Les produits visibles sur le site. */
export const enVente = produits.filter((p) => p.disponible);

export function parCategorie(cat: Categorie): Produit[] {
  return enVente.filter((p) => p.categorie === cat);
}

export function trouver(slug: string): Produit | undefined {
  return enVente.find((p) => p.slug === slug);
}

export function prix(n: number): string {
  return `${n.toLocaleString('fr-FR').replace(/ /g, ' ')} ₽`;
}
