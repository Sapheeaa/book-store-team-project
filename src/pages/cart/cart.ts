import createEl from '@/shared/element';
import emptyCartImg from '@/assets/icon/emptyCart.svg';
import './cart.css';

export function renderCart(): HTMLElement {
  const cardIsEmpty = true; // заглушка

  // --- Корзина пуста ---
  const emptyCartBlock = createEl('div', {
    className: 'empty-card__leftBlock',
    children: [
      createEl('img', {
        className: 'icon-emptyCart',
        attrs: {
          src: emptyCartImg,
          alt: 'Путая корзина',
          loading: 'lazy',
          width: '80',
          height: '80',
        },
      }),
      createEl('div', {
        children: [
          createEl('h3', { className: '', text: 'Корзина пуста' }),
          createEl('p', {
            className: 'cart-title-caption',
            text: 'Самое время выбрать что-нибудь для чтения.',
          }),
        ],
      }),
    ],
  });

  const emptyCart = createEl('div', {
    className: 'empty-card card__shadow',
    children: [
      emptyCartBlock,
      createEl('button', {
        className: 'btn-cart btn-cart__yellow',
        text: 'Перейти в каталог',
        attrs: { type: 'button', 'aria-label': 'Перейти в каталог' },
        on: { click: () => (window.location.hash = '#/catalog') },
      }),
    ],
  });

  // --- Корзина не пуста ---
  const notEmptyCart = createEl('div', {}); // заглушка

  // --- Общее содержание корзины ---
  const mainCart = createEl('section', {
    className: 'main-cart',
    children: cardIsEmpty ? [emptyCart] : [notEmptyCart],
  });

  const cartPage = createEl('div', {
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
