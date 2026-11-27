import createEl from '@/shared/element';
import {
  getBookQuantity,
  removeBookFromCart,
  increaseBookInCart,
  decreaseBookInCart,
} from '@/app/store';
import type { CartItem } from '@/types';

export function renderCartBookCard(
  { book, quantity }: CartItem,
  rerenderCart: () => void,
): HTMLElement {
  // --- Изменяемые поля ---
  const quantityBooks = createEl('span', {
    className: 'quantity-books',
    text: quantity.toString(),
  });
  const totalPrice = createEl('output', {
    className: 'totalPrice-book',
    text: `${quantity * book.price} ₽`,
  });

  /** Синхронизирует поля со store  */
  const changeCardFields = (): void => {
    const nextQuantity = getBookQuantity(book);
    quantityBooks.textContent = nextQuantity.toString();
    totalPrice.textContent = `${nextQuantity * book.price} ₽`;
  };

  // --- Управление количеством товаров (кнопки btn)---
  const decreaseBtn = createEl('button', {
    className: 'change-quantity-btn',
    text: '-',
    attrs: { type: 'button', 'aria-label': 'Уменьшить' },
    on: {
      click: () => {
        decreaseBookInCart(book);
        changeCardFields();
        if (getBookQuantity(book) === 0) {
          rerenderCart();
        }
      },
    },
  });

  const increaseBtn = createEl('button', {
    className: 'change-quantity-btn',
    text: '+',
    attrs: { type: 'button', 'aria-label': 'Увеличить' },
    on: {
      click: () => {
        increaseBookInCart(book);
        changeCardFields();
      },
    },
  });

  const removeBtn = createEl('button', {
    className: 'card-cart__remove',
    attrs: { type: 'button', 'aria-label': 'Удалить товар' },
    on: {
      click: () => {
        removeBookFromCart(book);
        rerenderCart();
      },
    },
  });

  // --- Правая часть карточки товара ---
  const changeQuantity = createEl('div', {
    className: 'change-quantity-books',
    children: [decreaseBtn, quantityBooks, increaseBtn],
  });

  const priceInfo = createEl('div', {
    className: 'card-price-info',
    children: [changeQuantity, totalPrice, removeBtn],
  });

  // --- Левая часть карточки товара (статичная) ---
  const bookInfo = createEl('div', {
    className: 'card-book-info',
    children: [
      createEl('img', {
        className: 'img-book-cart',
        attrs: {
          src: book.image,
          alt: book.title,
          loading: 'lazy',
          height: '126',
        },
      }),
      createEl('div', {
        className: 'info-book',
        children: [createEl('h3', { text: book.title }), createEl('p', { text: book.author })],
      }),
      createEl('p', { className: 'price-book', text: `${book.price} ₽` }),
    ],
  });

  // --- Контейнер карточки товара ---
  const card = createEl('article', {
    className: 'card-cart card__shadow',
    children: [bookInfo, priceInfo],
  });

  return card;
}
