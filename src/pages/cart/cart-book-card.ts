import createEl from '@/shared/element';
import type { Book } from '@/types';

export function renderCartBookCard(book: Book): HTMLElement {
  // левая часть карточки книги
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
      createEl('p', { className: 'price-book', text: book.price.toString() + ' ₽' }),
    ],
  });

  // правая часть карточки книги
  const changeQuantity = createEl('div', {
    className: 'change-quantity-books',
    children: [
      createEl('button', {
        className: 'change-quantity-btn',
        text: '-',
        attrs: { type: 'button', 'aria-label': 'Уменьшить' },
      }),
      createEl('span', { className: 'quantity-books', text: '1' }),
      createEl('button', {
        className: 'change-quantity-btn',
        text: '+',
        attrs: { type: 'button', 'aria-label': 'Увеличить' },
      }),
    ],
  });

  const priceInfo = createEl('div', {
    className: 'card-price-info',
    children: [
      changeQuantity,
      createEl('output', { className: 'totalPrice-book', text: book.price.toString() + ' ₽' }),
      createEl('button', {
        className: 'card-cart__remove',
        attrs: { type: 'button', 'aria-label': 'Удалить товар' },
      }),
    ],
  });

  const card = createEl('article', {
    className: 'card-cart card__shadow',
    children: [bookInfo, priceInfo],
  });

  return card;
}
