import createEl from '@/shared/element';
import { clearCart } from '@/app/store';

export function renderMessage(): HTMLDialogElement {
  const closeBtn = createEl('button', {
    className: 'btn-cart btn-cart__yellow modal__btn',
    text: 'Закрыть',
    attrs: { type: 'button' },
  });

  const modalContent = createEl('div', {
    className: 'modal__content',
    children: [
      createEl('div', { className: 'modal__icon', text: '✓' }),
      createEl('h2', { className: 'modal__title', text: 'Заказ оформлен!' }),
      closeBtn,
    ],
  });

  const modalWindow = createEl('dialog', {
    className: 'modal',
    children: [modalContent],
  });

  closeBtn.addEventListener('click', () => modalWindow.close());

  modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow) modalWindow.close();
  });

  modalWindow.addEventListener('close', () => clearCart());

  return modalWindow;
}
