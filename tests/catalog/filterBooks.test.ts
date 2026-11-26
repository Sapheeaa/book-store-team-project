import { describe, it, expect } from 'vitest';
import { filterBooks } from '@/features/catalog/catalog-filter';
import type { Book, FilterParams } from '@/types';

const emptyParams: FilterParams = {
  categories: [],
  minPrice: null,
  maxPrice: null,
};

const mockBooks: Book[] = [
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
    id: '2',
    title: 'Сияние',
    author: 'Стивен Кинг',
    category: 'Ужасы',
    price: 30,
    image: '/images/4.jpg',
    description: 'Классика жанра от Стивена Кинга. Отель «Оверлук» ждет гостей.',
  },
  {
    id: '3',
    title: 'Десять негритят',
    author: 'Агата Кристи',
    category: 'Детективы',
    price: 15,
    image: '/images/9.jpg',
    description: 'Десять незнакомцев на острове. Кто из них убийца? Классика Агаты Кристи.',
  },
  {
    id: '4',
    title: 'О дивный новый мир',
    author: 'Олдос Хаксли',
    category: 'Антиутопия',
    price: 26,
    image: '/images/12.jpg',
    description:
      'Классическая антиутопия о мире, где люди создаются на заводах и потребляют счастливые таблетки.',
  },
];

describe('Фильтрация по жанру', () => {
  it('должен вернуть все книги, если жанры не выбраны', () => {
    const result = filterBooks(mockBooks, emptyParams);
    expect(result).toHaveLength(4);
  });

  it('должен вернуть вернуть только книги выбранного жанра', () => {
    const result = filterBooks(mockBooks, { ...emptyParams, categories: ['Ужасы'] });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Сияние');
  });

  it('должен вернуть книги нескольких выбранных жанров (логика ИЛИ)', () => {
    const result = filterBooks(mockBooks, {
      ...emptyParams,
      categories: ['Антиутопия', 'Детективы'],
    });
    expect(result).toHaveLength(3);
  });
});

describe('Фильтрация по цене', () => {
  it('должен вернуть книги дороже или равные минимальной цене', () => {
    const result = filterBooks(mockBooks, { ...emptyParams, minPrice: 26 });
    expect(result).toHaveLength(2);
  });

  it('должен вернуть книги дешевле или равные максимальной цене', () => {
    const result = filterBooks(mockBooks, { ...emptyParams, maxPrice: 20 });
    expect(result[0].title).toBe('Десять негритят');
  });

  it('должен вернуть книги в заданном диапазоне цен (включительно)', () => {
    const result = filterBooks(mockBooks, { ...emptyParams, minPrice: 15, maxPrice: 21 });
    expect(result).toHaveLength(2);
  });

  it('должен вернуть пустой массив, если цена вне диапазона', () => {
    const result = filterBooks(mockBooks, { ...emptyParams, minPrice: 35 });
    expect(result).toHaveLength(0);
  });
});

describe('Комбинация жанра и цены', () => {
  it('должен применить и жанр, и цену одновременно', () => {
    const result = filterBooks(mockBooks, {
      categories: ['Антиутопия'],
      minPrice: 22,
      maxPrice: null,
    });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('О дивный новый мир');
  });

  it('должен вернуть пустой массив, если комбинация не дает результатов', () => {
    const result = filterBooks(mockBooks, {
      categories: ['Ужасы'],
      minPrice: null,
      maxPrice: 15,
    });

    expect(result).toHaveLength(0);
  });
});
