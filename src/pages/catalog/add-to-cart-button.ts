import type { Book } from '@/types';
import { addBookToCart, removeBookFromCart, isInCart } from '@/app/store';

export function createAddToCartButton(book: Book): HTMLButtonElement {
  const btnAdd = document.createElement('button');
  btnAdd.className = 'btn-add';

  const updateButtonState = () => {
    if (isInCart(book)) {
      btnAdd.textContent = 'Добавлено';
      btnAdd.style.backgroundColor = '#ccc';
    } else {
      btnAdd.textContent = 'В корзину';
      btnAdd.style.backgroundColor = ' #ffd700';
    }
  };

  updateButtonState();

  btnAdd.addEventListener('click', () => {
    if (isInCart(book)) {
      removeBookFromCart(book);
    } else {
      addBookToCart(book);
    }
    updateButtonState();
  });

  return btnAdd;
}
