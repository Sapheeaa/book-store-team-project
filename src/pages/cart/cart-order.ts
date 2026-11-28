import createEl from '@/shared/element';
import { getCartItems, getOrderPrice, getTotalQuantity } from '@/app/store';

/** «1 наименование», «3 наименования», «5 наименований» */
function formatPositions(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return `${count} наименование`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} наименования`;
  return `${count} наименований`;
}

export function renderCartOrder(): HTMLElement {
  // --- Изменяемые поля ---
  const totalBookQuantity = createEl('dt', {});
  const bookQuantity = createEl('dd', {});
  const orderPrice = createEl('dd', { className: 'order-price' });
  const orderTotalPrice = createEl('dd', { className: 'order-total-price' });

  // Функция обновления полей в заказе
  const updateValues = (): void => {
    totalBookQuantity.textContent = `Товаров: ${getTotalQuantity()}`;
    bookQuantity.textContent = formatPositions(getCartItems().length);
    orderPrice.textContent = `${getOrderPrice()} ₽`;
    orderTotalPrice.textContent = `${getOrderPrice()} ₽`;
  };

  updateValues();

  const orderSummaryDetails = createEl('dl', {
    children: [
      createEl('div', {
        className: 'order__row',
        children: [totalBookQuantity, bookQuantity],
      }),
      createEl('div', {
        className: 'order__row',
        children: [createEl('dt', { text: 'Стоимость книг' }), orderPrice],
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
        children: [createEl('dt', { className: 'order-total', text: 'Итого' }), orderTotalPrice],
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

  // Подписка на изменение корзины (с самоотпиской)
  const handleCartUpdate = (): void => {
    if (!order.isConnected) {
      window.removeEventListener('cart-updated', handleCartUpdate);
      return;
    }
    updateValues();
  };
  window.addEventListener('cart-updated', handleCartUpdate);

  return order;
}
