import createEl from '@/shared/element';
import { checkPromoCode } from '@/features/cart/promo-code';

export interface PromoFormHandlers {
  onApplyDiscount: (discountPercent: number) => void; // Вызов в случае валидного промокода
  onResetDiscount: () => void; // Вызов в случае не валидного промокода
}

export function renderPromoForm({
  onResetDiscount,
  onApplyDiscount,
}: PromoFormHandlers): HTMLElement {
  const input = createEl('input', { attrs: { id: 'promo-form__input', type: 'text' } });
  const status = createEl('p', {
    className: 'promo-form__status',
    text: 'Введите промокод, для применения скидки',
    attrs: { role: 'status', 'aria-live': 'polite' },
  });

  const form = createEl('form', {
    className: 'promo-form',
    children: [
      createEl('label', { text: 'Промокод', attrs: { for: 'promo-form__input' } }),
      createEl('div', {
        className: 'order__row',
        children: [
          input,
          createEl('button', {
            className: 'btn-cart promo-form__btn',
            text: 'Применить',
            attrs: { type: 'submit' },
          }),
        ],
      }),
      status,
    ],
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const promo = checkPromoCode(input.value);

    if (promo === null) {
      status.textContent = 'Промокод не найден';
      onResetDiscount();
      return;
    }

    status.textContent = `${promo.code} применен: скидка ${promo.discountPercent}%`;
    onApplyDiscount(promo.discountPercent);
  });

  input.addEventListener('input', () => {
    status.textContent = 'Введите промокод, для применения скидки';
    onResetDiscount();
  });

  return form;
}
