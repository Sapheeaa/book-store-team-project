import createEl from '@/shared/element';

export function renderCartOrder(): HTMLElement {
  const orderSummaryDetails = createEl('dl', {
    children: [
      createEl('div', {
        className: 'order__row',
        children: [
          createEl('dt', { text: 'Товаров: 3' }),
          createEl('dd', { text: '3 наименования' }),
        ],
      }),
      createEl('div', {
        className: 'order__row',
        children: [
          createEl('dt', { text: 'Стоимость книг' }),
          createEl('dd', { className: 'order-price', text: '62 ₽' }),
        ],
      }),
    ],
  });

  const promoForm = createEl('form', {
    className: 'promo-form',
    children: [
      createEl('label', { text: 'Промокод', attrs: { for: 'promo-form__input' } }),
      createEl('div', {
        className: 'order__row',
        children: [
          createEl('input', { attrs: { id: 'promo-form__input', type: 'text' } }),
          createEl('button', {
            className: 'btn-cart promo-form__btn',
            text: 'Применить',
            attrs: { type: 'submit' },
          }),
        ],
      }),
      createEl('p', {
        className: 'promo-form__status',
        text: 'Введите промокод, для применения скидки',
        attrs: { role: 'status', 'aria-live': 'polite' },
      }),
    ],
  });

  const orderSummaryTotals = createEl('dl', {
    children: [
      createEl('div', {
        className: 'order__row',
        children: [createEl('dt', { text: 'Скидка 0%' }), createEl('dd', { text: '-0 ₽' })],
      }),
      createEl('div', {
        className: 'order__row',
        children: [
          createEl('dt', { className: 'order-total', text: 'Итого' }),
          createEl('dd', { className: 'order-total-price', text: '62 ₽' }),
        ],
      }),
    ],
  });

  const order = createEl('aside', {
    className: 'order-cart card__shadow',
    children: [
      createEl('h3', { text: 'Ваш заказ' }),
      orderSummaryDetails,
      createEl('hr', { className: 'order-divider', attrs: { 'aria-hidden': 'true' } }),
      promoForm,
      createEl('hr', { className: 'order-divider', attrs: { 'aria-hidden': 'true' } }),
      orderSummaryTotals,
      createEl('button', {
        className: 'order-submit btn-cart btn-cart__yellow',
        text: 'Оформить заказ',
        attrs: { type: 'button' },
      }),
      createEl('p', {
        className: 'order__note',
        text: 'Доставка рассчитывается при оформлении заказа.',
      }),
    ],
  });

  return order;
}
