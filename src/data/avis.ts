// Avis de vrais clients, recopiés depuis WhatsApp (seules les fautes de frappe sont corrigées).
// Le texte original est en français ; `ru` est une traduction affichée sur la page russe.
// N'ajouter un avis qu'avec l'accord de la personne pour publier son prénom.
type T = { fr: string; ru: string };

export type Avis = {
  /** Prénom (ou initiale) que la personne accepte de voir publié. Vide = anonyme. */
  prenom?: string;
  /** Produit commandé ou contexte de l'avis, s'il est connu. */
  contexte?: T;
  texte: T;
  /** Note sur 5, seulement si le client l'a donnée lui-même. */
  note?: number;
};

export const avis: Avis[] = [
  {
    prenom: 'Arsène F.',
    note: 5,
    contexte: { fr: 'Crêpes au poulet, pastels, bissap', ru: 'Блины с курицей, пастели, биссап' },
    texte: {
      fr: 'J’ai beaucoup aimé les crêpes au poulet, c’était trop bon. Ce mélange de farine avec une légère touche de sucré-salé, avec cette sauce qui explose dans la bouche à chaque bouchée : un pur délice. Et le bissap était hyper rafraîchissant, comme d’habitude.',
      ru: 'Мне очень понравились блины с курицей — это было невероятно вкусно. Тесто с лёгкой сладко-солёной ноткой и соус, который взрывается во рту с каждым кусочком: настоящее наслаждение. А биссап, как всегда, отлично освежал.',
    },
  },
  {
    prenom: 'Richnel',
    note: 5,
    contexte: { fr: 'Bissap et pastels', ru: 'Биссап и пастели' },
    texte: {
      fr: 'Le bissap et les pastels, ça me rappelle les goûts de chez nous. Ça fait vraiment plaisir de retrouver ces petites choses ici, surtout quand on est loin de la maison.',
      ru: 'Биссап и пастели напоминают мне вкус дома. Очень приятно находить здесь такие мелочи, особенно когда ты далеко от родных мест.',
    },
  },
  {
    prenom: 'Hassan',
    note: 5,
    texte: {
      fr: 'J’ai pas de mots aujourd’hui, tellement ça me donne la joie au cœur. Je m’attendais pas à ce que ce soit autant.',
      ru: 'Сегодня у меня нет слов — так радостно на душе. Не ожидал, что будет так много.',
    },
  },
  {
    prenom: 'Scaneur',
    note: 5,
    contexte: { fr: 'Client fidèle', ru: 'Постоянный клиент' },
    texte: {
      fr: 'C’est toujours aussi délicieux ! Merci pour ces saveurs.',
      ru: 'Как всегда, очень вкусно! Спасибо за эти вкусы.',
    },
  },
  {
    prenom: 'Christie',
    note: 5,
    contexte: { fr: 'Nous recommanderait-elle ?', ru: 'Порекомендует ли нас?' },
    texte: { fr: 'Oui, bien sûr.', ru: 'Да, конечно.' },
  },
];

const notes = avis.map((a) => a.note).filter((n): n is number => typeof n === 'number');
/** Nombre d'avis qui ont une note. */
export const nombreNotes = notes.length;
/** Note moyenne sur 5, arrondie au dixième (0 s'il n'y a aucune note). */
export const moyenne = notes.length ? Math.round((notes.reduce((s, n) => s + n, 0) / notes.length) * 10) / 10 : 0;
