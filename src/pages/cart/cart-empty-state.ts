import createEl from '@/shared/element';
import emptyCartImg from '@/assets/icon/emptyCart.svg';

export function renderEmptyCartState(): HTMLElement {
  const emptyCartBlock = createEl('div', {
    className: 'empty-card__leftBlock',
    children: [
      createEl('img', {
        className: 'icon-emptyCart',
        attrs: {
          src: emptyCartImg,
          alt: 'Пустая корзина',
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
      createEl('a', {
        className: 'btn-cart btn-cart__yellow',
        text: 'Перейти в каталог',
        attrs: { type: 'button', href: '#/catalog' },
      }),
    ],
  });

  return emptyCart;
}
