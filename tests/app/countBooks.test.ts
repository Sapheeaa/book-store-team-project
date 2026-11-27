import { describe, expect, it, beforeEach } from 'vitest';
import {
  getTotalQuantity,
  addBookToCart,
  increaseBookInCart,
  removeBookFromCart,
  clearCart,
} from '@/app/store';
import type { Book } from '@/types';

// Создаем тестовые книги (мини-версия JSON)
const mockBook1: Book = {
  id: '1',
  title: 'Бойцовский клуб',
  author: 'Чак Паланик',
  category: 'Антиутопия',
  price: 650,
  image: '/images/1.jpg',
  description: '...',
};

const mockBook2: Book = {
  id: '2',
  title: 'Сияние',
  author: 'Стивен Кинг',
  category: 'Ужасы',
  price: 890,
  image: '/images/4.jpg',
  description: '...',
};

describe('getTotalQuantity', () => {
  // Перед каждым тестом очищаем корзину, чтобы тесты не влияли друг на друга
  beforeEach(() => {
    clearCart();
  });

  it('должен вернуть 0, если корзина пуста', () => {
    expect(getTotalQuantity()).toBe(0);
  });

  it('должен вернуть 1, если добавлена одна книга', () => {
    addBookToCart(mockBook1);
    expect(getTotalQuantity()).toBe(1);
  });

  it('должен корректно суммировать количество одной книги', () => {
    addBookToCart(mockBook1);
    increaseBookInCart(mockBook1);
    increaseBookInCart(mockBook1);
    expect(getTotalQuantity()).toBe(3);
  });

  it('должен корректно суммировать количество разных книг', () => {
    addBookToCart(mockBook1);
    addBookToCart(mockBook2);
    increaseBookInCart(mockBook1);
    expect(getTotalQuantity()).toBe(3);
  });

  it('должен пересчитывать сумму после удаления книги', () => {
    addBookToCart(mockBook1);
    addBookToCart(mockBook2);
    increaseBookInCart(mockBook1);

    removeBookFromCart(mockBook1);
    expect(getTotalQuantity()).toBe(1);
  });
});
