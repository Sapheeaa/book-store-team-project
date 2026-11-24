import createEl from '@/shared/element';
import { renderCartBookCard } from './cart-book-card';
import { booksInCart } from './cart.data';
import { renderEmptyCartState } from './cart-empty-state';
import { renderCartOrder } from './cart-order';
import './cart.css';

export function renderCart(): HTMLElement {
  // --- Корзина пуста ---
  const emptyCart = renderEmptyCartState();

  // --- В корзине есть товары ---
  const listBooks = createEl('ul', {
    className: 'list-books-cart',
    children: booksInCart.map((book) => createEl('li', { children: [renderCartBookCard(book)] })),
  });

  const notEmptyCart = createEl('div', {
    className: 'main-cart__container',
    children: [listBooks, renderCartOrder()],
  });

  // --- Общее содержание корзины ---
  const mainCart = createEl('section', {
    className: 'main-cart',
    children: booksInCart.length === 0 ? [emptyCart] : [notEmptyCart],
  });

  const cartPage = createEl('main', {
    className: 'cart-page',
    children: [
      createEl('h2', { className: 'cart-title', text: 'Корзина' }),
      createEl('p', {
        className: 'cart-title-caption',
        text: 'Ещё немного — и новые истории будут вашими.',
      }),
      mainCart,
    ],
  });

  return cartPage;
}
