import { getTotalQuantity } from '@/app/store';

export function createCartCount(): HTMLSpanElement {
  const cartCount = document.createElement('span');
  cartCount.className = 'header-cart-count';

  const updateCount = () => {
    cartCount.textContent = getTotalQuantity().toString();
  };

  updateCount();

  window.addEventListener('cart-updated', () => {
    if (cartCount.isConnected) {
      updateCount();
    }
  });

  return cartCount;
}
