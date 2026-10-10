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
  { jour: { fr: 'Jeu', ru: 'Чт' }, quoi: { fr: 'Dernier jour, jusqu’au soir', ru: 'Последний день, до вечера' }, type: 'commande' },
  { jour: { fr: 'Ven', ru: 'Пт' }, quoi: { fr: 'Courses et préparation', ru: 'Закупка и подготовка' }, type: 'prepa' },
  { jour: { fr: 'Sam', ru: 'Сб' }, quoi: { fr: 'On cuisine · retrait 8 h – 20 h', ru: 'Готовим · выдача 8:00–20:00' }, type: 'cuisine' },
  { jour: { fr: 'Dim', ru: 'Вс' }, quoi: { fr: 'Retrait 8 h – 10 h et 15 h – 21 h', ru: 'Выдача 8:00–10:00 и 15:00–21:00' }, type: 'cuisine' },
];

export const retrait = {
  creneaux: [
    { jour: { fr: 'Samedi', ru: 'Суббота' } as T, heures: ['8:00 – 20:00'] },
    { jour: { fr: 'Dimanche', ru: 'Воскресенье' } as T, heures: ['8:00 – 10:00', '15:00 – 21:00'] },
  ],
  lieu: {
    fr: 'Devant notre cité étudiante, à Briansk. L’adresse exacte vous est envoyée avec la confirmation.',
    ru: 'У входа в наше общежитие в Брянске. Точный адрес пришлём вместе с подтверждением.',
  } as T,
  prevenir: {
    fr: 'Prévenez-nous 10 minutes avant d’arriver : on descend devant la cité.',
    ru: 'Напишите за 10 минут до приезда — мы спустимся ко входу.',
  } as T,
  finCommandes: { fr: 'jeudi soir', ru: 'вечер четверга' } as T,
};

export const paiement: T = {
  fr: 'Virement ou espèces au retrait.',
  ru: 'Переводом или наличными при получении.',
};

export const livraison: T = {
  fr: 'Vous commandez un coursier (Yandex Go) qui passe devant la cité. Paiement par virement avant l’envoi.',
  ru: 'Вы вызываете курьера (Яндекс Go) к общежитию. Оплата переводом до отправки.',
};
