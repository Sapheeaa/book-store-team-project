import { describe, expect, it, beforeEach } from 'vitest';
import {
  getCartItems,
  getBookQuantity,
  isInCart,
  addBookToCart,
  clearCart,
  removeBookFromCart,
} from '@/app/store';
import type { Book } from '@/types';

const mockBook: Book = {
  id: '3',
  title: 'Колыбельная',
  author: 'Чак Паланик',
  category: 'Антиутопия',
  price: 20,
  image: '/images/3.jpg',
  description: 'Мистический триллер Паланика о песне, способной убивать.',
};

const anotherBook: Book = { ...mockBook, id: '4', title: 'Сияние' };

beforeEach(() => {
  clearCart();
});

describe('addBookToCart', () => {
  it('should add new book in cartItems with quantity = 1', () => {
    addBookToCart(mockBook);
    expect(getCartItems()).toEqual([{ book: mockBook, quantity: 1 }]);
  });

  it('should add not new book in cartItems with quantity != 1', () => {
    addBookToCart(mockBook);
    addBookToCart(mockBook);

    expect(getCartItems()).toEqual([{ book: mockBook, quantity: 2 }]);
  });

  it('keeps books with different ids as separate items', () => {
    addBookToCart(mockBook);
    addBookToCart(anotherBook);
    expect(getCartItems()).toHaveLength(2);
  });
});

describe('getCartItems', () => {
  it('should returns an empty array, if cart is empty', () => {
    expect(getCartItems()).toEqual([]);
  });

  it('should returns a list of added books', () => {
    addBookToCart(mockBook);
    expect(getCartItems()).toEqual([{ book: mockBook, quantity: 1 }]);
  });

  it('returns a copy of cartItems', () => {
    addBookToCart(mockBook);

    const currentStateCart = getCartItems();
    currentStateCart.push({ book: anotherBook, quantity: 5 });

    // свежее состояние корзины из store (д/б нетронутым)
    const freshStateCart = getCartItems();

    expect(freshStateCart).toHaveLength(1);
    expect(freshStateCart).not.toEqual(currentStateCart);
  });
});

describe('getBookQuantity', () => {
  it('returns 0 for book that is not in cart', () => {
    expect(getBookQuantity(mockBook)).toBe(0);
  });

  it('returns quantity of the book in cart', () => {
    addBookToCart(mockBook);
    addBookToCart(mockBook);
    expect(getBookQuantity(mockBook)).toBe(2);
  });
});

describe('isInCart', () => {
  it('returns false when the cart is empty', () => {
    expect(isInCart(mockBook)).toBe(false);
  });

  it('returns true after book was added', () => {
    addBookToCart(mockBook);
    expect(isInCart(mockBook)).toBe(true);
  });

  it('returns false after book was removed', () => {
    addBookToCart(mockBook);
    removeBookFromCart(mockBook);
    expect(isInCart(mockBook)).toBe(false);
  });
});
