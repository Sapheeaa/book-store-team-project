import type { Book } from '@/types';

// Заглушка
export const booksInCart: Book[] = [
  {
    id: '1',
    title: 'Бойцовский клуб',
    author: 'Чак Паланик',
    category: 'Антиутопия',
    price: 21,
    image: '/images/1.jpg',
    description: 'Культовый роман Чака Паланика о поиске себя в мире потребления.',
  },
  {
    id: '8',
    title: 'Убийство в Восточном экспрессе',
    author: 'Агата Кристи',
    category: 'Детективы',
    price: 15,
    image: '/images/8.jpg',
    description: 'Эркюль Пуаро расследует загадочное убийство в застрявшем поезде.',
  },
  {
    id: '12',
    title: 'О дивный новый мир',
    author: 'Олдос Хаксли',
    category: 'Антиутопия',
    price: 26,
    image: '/images/12.jpg',
    description:
      'Классическая антиутопия о мире, где люди создаются на заводах и потребляют счастливые таблетки.',
  },
];
