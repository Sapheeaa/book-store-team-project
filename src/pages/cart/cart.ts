import createEl from '@/shared/element';
import emptyCartImg from '@/assets/icon/emptyCart.svg';
import type { Book } from '@/types';
import './cart.css';

export function renderCart(): HTMLElement {
  // заглушки
  const cardIsEmpty = false;
  const booksInCart: Book[] = [
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

  // --- В корзине есть товары ---
  function cardBook(book: Book): HTMLElement {
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
            width: '94.5',
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
          attrs: { type: 'button', 'aria-label': 'Уменьшить', id: 'decreaseBtn' },
        }),
        createEl('span', { className: 'quantity-books', text: '1' }),
        createEl('button', {
          className: 'change-quantity-btn',
          text: '+',
          attrs: { type: 'button', 'aria-label': 'Увеличить', id: 'increaseBtn' },
        }),
      ],
    });
    const priceInfo = createEl('div', {
      className: 'card-price-info',
      children: [
        changeQuantity,
        createEl('output', { className: 'totalPrise-book', text: book.price.toString() + ' ₽' }),
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

  const listBooks = createEl('div', {
    className: 'list-books-cart',
    children: booksInCart.map((book) => cardBook(book)),
  });

  // заглушка
  const order = createEl('div', {
    className: 'order-cart',
  });

  const notEmptyCart = createEl('div', {
    className: 'main-cart__container',
    children: [listBooks, order],
  });

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
