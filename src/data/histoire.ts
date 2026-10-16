// L'histoire de Double Sestry, racontée à partir des réponses de Donald (10 octobre 2026).
// Faits : Ria et Emmanuelle, sœurs de sang, de Pointe-Noire (Congo-Brazzaville) ; la recette vient de leur maman ;
// elles étudient la biologie à Briansk ; elles faisaient des crêpes pour elles, un voisin de cité a goûté
// et a demandé si on pouvait les vendre ; enfants, leur père les emmenait tout le temps à la viennoiserie manger des crêpes, et elles ont décidé de les refaire.
import type { T } from '../i18n/ui';

export const soeurs = {
  noms: { fr: 'Ria et Emmanuelle', ru: 'Рия и Эмманюэль' } as T,
  origine: { fr: 'Pointe-Noire, Congo-Brazzaville', ru: 'Пуэнт-Нуар, Республика Конго' } as T,
  etudes: { fr: 'étudiantes en biologie', ru: 'студентки-биологи' } as T,
};

export const accroche = {
  titre: { fr: 'Ria et Emmanuelle, deux sœurs de Pointe-Noire.', ru: 'Рия и Эмманюэль — две сестры из Пуэнт-Нуара.' } as T,
  texte: {
    fr: 'Enfants, à Pointe-Noire, leur père les emmenait tout le temps à la viennoiserie manger des crêpes. Aujourd’hui étudiantes en biologie à Briansk, elles refont ces crêpes chaque week-end, avec la recette de leur maman.',
    ru: 'В детстве в Пуэнт-Нуаре папа постоянно водил их в кондитерскую есть блины. Сегодня они изучают биологию в Брянске и каждые выходные пекут те самые блины по маминому рецепту.',
  } as T,
};

export interface Chapitre {
  titre: T;
  texte: T;
}

export const chapitres: Chapitre[] = [
  {
    titre: { fr: 'Les crêpes de la viennoiserie', ru: 'Блины из кондитерской' },
    texte: {
      fr: 'À Pointe-Noire, au Congo-Brazzaville, leur père les emmenait tout le temps à la viennoiserie, où elles mangeaient des crêpes. Ria et Emmanuelle n’ont jamais oublié ce goût-là, et elles ont décidé de le refaire. La pâte qu’elles font aujourd’hui, c’est celle de leur maman.',
      ru: 'В Пуэнт-Нуаре, в Республике Конго, папа постоянно водил их в кондитерскую, где они ели блины. Рия и Эмманюэль так и не забыли этот вкус и решили его повторить. Тесто, которое они делают сегодня, — мамин рецепт.',
    },
  },
  {
    titre: { fr: 'Une cuisine partagée à Briansk', ru: 'Общая кухня в Брянске' },
    texte: {
      fr: 'Arrivées en Russie pour étudier la biologie, les deux sœurs cuisinaient pour elles-mêmes, dans la cuisine commune de leur cité étudiante. Des crêpes pour le dîner, pour se rappeler la maison.',
      ru: 'Приехав в Россию изучать биологию, сёстры готовили для себя на общей кухне студенческого общежития. Блины на ужин — чтобы вспомнить дом.',
    },
  },
  {
    titre: { fr: 'Le voisin qui a goûté', ru: 'Сосед, который попробовал' },
    texte: {
      fr: 'Un jour, un voisin de la cité a goûté. Il a posé une seule question : « Et si on les vendait ? » Double Sestry est née de cette question. Les voisins de couloir sont devenus les premiers clients, puis leurs amis, puis les amis de leurs amis.',
      ru: 'Однажды сосед по общежитию попробовал их блины и задал всего один вопрос: «А что, если их продавать?» Так появилась Double Sestry. Первыми покупателями стали соседи по этажу, потом их друзья, потом друзья друзей.',
    },
  },
  {
    titre: { fr: 'La rigueur du labo, la chaleur de la maison', ru: 'Точность лаборатории, тепло дома' },
    texte: {
      fr: 'Étudiantes en biologie, elles cuisinent comme on travaille au laboratoire : chaque portion est pesée, chaque boîte est datée, et rien ne reste plus de deux jours au frais. Le reste vient de la maison : la recette, le goût, et votre prénom écrit à la main sur le sac.',
      ru: 'Как настоящие биологи, они готовят так, как работают в лаборатории: каждая порция взвешена, на каждой коробке дата, и ничего не хранится дольше двух дней. Всё остальное — из дома: рецепт, вкус и ваше имя, написанное от руки на пакете.',
    },
  },
];

export const nom = {
  titre: { fr: 'Pourquoi « Double Sestry »', ru: 'Почему «Double Sestry»' } as T,
  texte: {
    fr: '« Sestry », c’est « sœurs » en russe. Double, parce qu’elles sont deux. Le nom mélange les langues, comme les clients qui passent devant la cité : étudiants francophones, voisins russes, familles de la diaspora.',
    ru: '«Sestry» — это «сёстры». Double — потому что их двое. В названии смешаны языки, как и среди тех, кто приходит за заказом: франкоязычные студенты, русские соседи, семьи из диаспоры.',
  } as T,
  abeilleTitre: { fr: 'Pourquoi une abeille', ru: 'Почему пчела' } as T,
  abeille: {
    fr: 'Dans une ruche, toutes les ouvrières sont sœurs. Et l’abeille fait le miel, la douceur par excellence. Regardez bien le logo : le D et le S de Double Sestry forment son corps.',
    ru: 'В улье все рабочие пчёлы — сёстры. А ещё пчела делает мёд — самую настоящую сладость. Присмотритесь к логотипу: буквы D и S из Double Sestry образуют её тельце.',
  } as T,
};

export const promesses: { titre: T; texte: T }[] = [
  {
    titre: { fr: 'Frais, vraiment', ru: 'По-настоящему свежее' },
    texte: {
      fr: 'Rien n’attend en vitrine. On cuisine le samedi pour vos commandes du week-end, et rien ne reste plus de deux jours au frais.',
      ru: 'Ничего не лежит на витрине. Готовим в субботу под ваши заказы и храним не дольше двух дней.',
    },
  },
  {
    titre: { fr: 'Toujours pareil', ru: 'Всегда одинаково вкусно' },
    texte: {
      fr: 'Chaque portion est pesée, chaque crêpe pliée de la même façon. Ce que vous avez aimé la semaine dernière, vous le retrouvez.',
      ru: 'Каждая порция взвешена, каждый блин сложен одинаково. То, что вам понравилось, будет таким же и в следующий раз.',
    },
  },
  {
    titre: { fr: 'Votre prénom sur le sac', ru: 'Ваше имя на пакете' },
    texte: {
      fr: 'On écrit « Bon appétit » et votre prénom à la main sur chaque commande. Vous savez qui a cuisiné pour vous.',
      ru: 'На каждом заказе мы от руки пишем «Приятного аппетита» и ваше имя. Вы знаете, кто готовил для вас.',
    },
  },
];
