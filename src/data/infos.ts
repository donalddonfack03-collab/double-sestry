// Informations pratiques de Double Sestry. Un seul endroit à modifier.
import type { T } from '../i18n/ui';

export const marque = {
  nom: 'Double Sestry',
  ville: { fr: 'Briansk', ru: 'Брянск' } as T,
  slogan: {
    fr: 'Cuisiné par deux sœurs. Le week-end, sur commande.',
    ru: 'Готовят две сестры. По выходным, под заказ.',
  } as T,
};

export const contact = {
  /** Affiché tel quel sur le site. */
  telephone: '+7 910 337-22-64',
  /** Pour les liens : uniquement des chiffres, avec l'indicatif. */
  whatsapp: '79103372264',
  messageParDefaut: { fr: 'Bonjour Double Sestry', ru: 'Здравствуйте, Double Sestry' } as T,
};

export function lienWhatsApp(texte: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(texte)}`;
}

/** La semaine type. `type` sert au design : commandes, préparation ou cuisine. */
export const semaine: { jour: T; quoi: T; type: 'commande' | 'prepa' | 'cuisine' }[] = [
  { jour: { fr: 'Lun', ru: 'Пн' }, quoi: { fr: 'Le menu est publié', ru: 'Публикуем меню' }, type: 'commande' },
  { jour: { fr: 'Mar', ru: 'Вт' }, quoi: { fr: 'Vous commandez', ru: 'Вы заказываете' }, type: 'commande' },
  { jour: { fr: 'Mer', ru: 'Ср' }, quoi: { fr: 'Vous commandez', ru: 'Вы заказываете' }, type: 'commande' },
  { jour: { fr: 'Jeu', ru: 'Чт' }, quoi: { fr: 'Vous commandez', ru: 'Вы заказываете' }, type: 'commande' },
  { jour: { fr: 'Ven', ru: 'Пт' }, quoi: { fr: 'Dernier jour, jusqu’à 20 h 30', ru: 'Последний день, до 20:30' }, type: 'commande' },
  { jour: { fr: 'Sam', ru: 'Сб' }, quoi: { fr: 'On cuisine · retrait 8 h – 20 h', ru: 'Готовим · выдача 8:00–20:00' }, type: 'cuisine' },
  { jour: { fr: 'Dim', ru: 'Вс' }, quoi: { fr: 'Retrait 8 h – 10 h et 15 h – 21 h', ru: 'Выдача 8:00–10:00 и 15:00–21:00' }, type: 'cuisine' },
];

export const retrait = {
  creneaux: [
    { jour: { fr: 'Samedi', ru: 'Суббота' } as T, heures: ['8:00 – 20:00'] },
    { jour: { fr: 'Dimanche', ru: 'Воскресенье' } as T, heures: ['8:00 – 10:00', '15:00 – 21:00'] },
  ],
  lieu: {
    fr: 'Devant notre cité étudiante : Bezhitskaya 16 b, Briansk.',
    ru: 'У входа в наше общежитие: ул. Бежицкая, 16Б, Брянск.',
  } as T,
  adresse: 'Bezhitskaya 16 b',
  prevenir: {
    fr: 'Prévenez-nous 10 minutes avant d’arriver : on descend devant la cité.',
    ru: 'Напишите за 10 минут до приезда — мы спустимся ко входу.',
  } as T,
  finCommandes: { fr: 'vendredi 20 h 30', ru: 'пятницы, 20:30' } as T,
};

export const paiement: T = {
  fr: 'Par virement, au moment de la confirmation : c’est le paiement qui valide la commande.',
  ru: 'Переводом при подтверждении заказа: заказ считается принятым после оплаты.',
};

export const livraison: T = {
  fr: 'Vous commandez un coursier (Yandex Go) qui passe devant la cité. Paiement par virement avant l’envoi.',
  ru: 'Вы вызываете курьера (Яндекс Go) к общежитию. Оплата переводом до отправки.',
};

/** Message pré-rempli pour composer une box anniversaire sur WhatsApp. */
export const messageBox: T = {
  fr: 'Bonjour Double Sestry ! Je voudrais composer une box anniversaire.\nDate : \nNombre de personnes : \nProduits souhaités : \nPrénom et message à écrire : \nGâteau (marbré, citron, yaourt ou sans) : ',
  ru: 'Здравствуйте, Double Sestry! Хочу собрать праздничный бокс.\nДата: \nКоличество гостей: \nКакие блюда: \nИмя и надпись: \nКекс (мраморный, лимонный, йогуртовый или без): ',
};

/** Délai de réponse promis sur WhatsApp. */
export const reponse: T = { fr: 'On vous répond sous 2 h, entre 9 h et 22 h.', ru: 'Отвечаем в течение 2 часов, с 9:00 до 22:00.' };

/** Le parcours client en 4 étapes : le même sur le site, les statuts, le catalogue et les PDF. */
export const parcours: { titre: T; texte: T }[] = [
  {
    titre: { fr: 'Vous choisissez', ru: 'Вы выбираете' },
    texte: {
      fr: 'Sur le site, dans notre catalogue WhatsApp ou par message, jusqu’au vendredi 20 h 30.',
      ru: 'На сайте, в каталоге WhatsApp или сообщением — до пятницы, 20:30.',
    },
  },
  {
    titre: { fr: 'On confirme, vous payez', ru: 'Мы подтверждаем, вы оплачиваете' },
    texte: {
      fr: 'On vous répond sous 2 h avec le total. Vous payez par virement : votre commande est validée.',
      ru: 'В течение 2 часов присылаем сумму. Вы оплачиваете переводом — заказ принят.',
    },
  },
  {
    titre: { fr: 'Samedi, on cuisine', ru: 'В субботу мы готовим' },
    texte: {
      fr: 'Ria et Emma préparent seulement ce qui a été commandé, avec votre prénom écrit sur le sac.',
      ru: 'Рия и Эмма готовят только то, что заказано, и пишут ваше имя на пакете.',
    },
  },
  {
    titre: { fr: 'Vous récupérez', ru: 'Вы забираете' },
    texte: {
      fr: 'Devant la cité, Bezhitskaya 16 b. Prévenez 10 min avant, ou envoyez un Yandex Go.',
      ru: 'У общежития, ул. Бежицкая, 16Б. Напишите за 10 минут или вызовите Яндекс Go.',
    },
  },
];
