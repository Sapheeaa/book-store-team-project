import type { Book, CartItem } from '@/types';

let cartItems: CartItem[] = [];

function notifyCartUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cart-updated'));
  }
}

// --- Функции чтения (не мутируют) ---
export function getCartItems(): CartItem[] {
  return cartItems.map((item) => ({ ...item }));
}

export function getBookQuantity(book: Book): number {
  const bookInCart = cartItems.find((item) => item.book.id === book.id);
  return bookInCart?.quantity ?? 0;
}

export function isInCart(book: Book): boolean {
  return getBookQuantity(book) > 0;
}

// --- Функции записи/перезаписи ---
export function addBookToCart(book: Book): void {
  if (isInCart(book)) {
    increaseBookInCart(book);
    return;
  }

  cartItems = [...cartItems, { book, quantity: 1 }];
  notifyCartUpdate(); //говорит о том, что состояние корзины поменялось
}

export function removeBookFromCart(book: Book): void {
  cartItems = cartItems.filter((item) => item.book.id !== book.id);
  notifyCartUpdate(); //говорит о том, что состояние корзины поменялось
}

export function increaseBookInCart(book: Book): void {
  if (!isInCart(book)) return;

  cartItems = cartItems.map((item) => {
    if (item.book.id !== book.id) return item;
    return { ...item, quantity: item.quantity + 1 };
  });
  notifyCartUpdate(); //говорит о том, что состояние корзины поменялось
}

export function decreaseBookInCart(book: Book): void {
  const quantity = getBookQuantity(book);
  if (quantity === 0) return;
  if (quantity === 1) {
    removeBookFromCart(book);
    return;
  }

  cartItems = cartItems.map((item) => {
    if (item.book.id !== book.id) return item;
    return { ...item, quantity: item.quantity - 1 };
  });

  notifyCartUpdate(); //говорит о том, что состояние корзины поменялось
}

// Использование только в тестах
export function clearCart(): void {
  cartItems = [];

  notifyCartUpdate(); //говорит о том, что состояние корзины поменялось
}

//функция для счетчика в хедере
export function getTotalQuantity(): number {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
