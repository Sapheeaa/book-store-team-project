import createEl from '@/shared/element';
import { getCartItems, getOrderPrice, getTotalQuantity } from '@/app/store';
import { renderPromoForm } from './cart-promo-form';
import { renderMessage } from './cart-message';

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
  const discountLabel = createEl('dt', { text: 'Скидка 0%' });
  const discountValue = createEl('dd', { text: '-0 ₽' });
  const orderTotalPrice = createEl('dd', { className: 'order-total-price' });

  // Состояние скидки живет здесь
  let discountPercent = 0;

  // Функция обновления полей в заказе
  const updateValues = (): void => {
    const price = getOrderPrice();
    const discountRubles = Math.round((price * discountPercent) / 100);

    totalBookQuantity.textContent = `Товаров: ${getTotalQuantity()}`;
    bookQuantity.textContent = formatPositions(getCartItems().length);
    orderPrice.textContent = `${price} ₽`;

    discountLabel.textContent = `Скидка ${discountPercent}%`;
    discountValue.textContent = `-${discountRubles} ₽`;
    orderTotalPrice.textContent = `${price - discountRubles} ₽`;
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

  const promoForm = renderPromoForm({
    onApplyDiscount: (percent) => {
      discountPercent = percent;
      updateValues();
    },
    onResetDiscount: () => {
      discountPercent = 0;
      updateValues();
    },
  });

  const orderSummaryTotals = createEl('dl', {
    children: [
      createEl('div', {
        className: 'order__row',
        children: [discountLabel, discountValue],
      }),
      createEl('div', {
        className: 'order__row',
        children: [createEl('dt', { className: 'order-total', text: 'Итого' }), orderTotalPrice],
      }),
    ],
  });

  // <dialog>
  const message = renderMessage();

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
        on: { click: () => message.showModal() },
      }),
      createEl('p', {
        className: 'order__note',
        text: 'Доставка рассчитывается при оформлении заказа.',
      }),
      message,
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
