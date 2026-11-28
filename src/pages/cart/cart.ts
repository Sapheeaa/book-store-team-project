import createEl from '@/shared/element';
import { getCartItems } from '@/app/store';
import { renderCartBookCard } from './cart-book-card';
import { renderEmptyCartState } from './cart-empty-state';
import { renderCartOrder } from './cart-order';
import './cart.css';

export function renderCart(): HTMLElement {
  // --- Общее содержание корзины ---
  const mainCart = createEl('section', { className: 'main-cart' });
  const cartOrder = renderCartOrder();

  // id всех товаров в корзине
  let booksInCartIds: string = '';

  const renderMainCart = (): void => {
    const itemsInCart = getCartItems();
    booksInCartIds = itemsInCart.map((item) => item.book.id).join('|');

    if (itemsInCart.length === 0) {
      mainCart.replaceChildren(renderEmptyCartState());
    } else {
      // --- В корзине есть товары ---
      const listBooks = createEl('ul', {
        className: 'list-books-cart',
        children: itemsInCart.map((item) =>
          createEl('li', { children: [renderCartBookCard(item)] }),
        ),
      });

      const notEmptyCart = createEl('div', {
        className: 'main-cart__container',
        children: [listBooks, cartOrder],
      });

      mainCart.replaceChildren(notEmptyCart);
    }
  };

  renderMainCart();

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

  // Подписка на изменение корзины (с самоотпиской)
  const handleCartUpdate = (): void => {
    if (!mainCart.isConnected) {
      window.removeEventListener('cart-updated', handleCartUpdate);
      return;
    }
    const nextBooksInCartIds = getCartItems()
      .map((item) => item.book.id)
      .join('|');
    if (nextBooksInCartIds === booksInCartIds) return; // то есть изменилось только количество
    renderMainCart();
  };
  window.addEventListener('cart-updated', handleCartUpdate);

  return cartPage;
}
