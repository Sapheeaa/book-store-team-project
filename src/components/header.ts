import type { RoutePath } from '@/types';
import { createCartCount } from './cartCount';

export function createHeader(currentPage: RoutePath = '/'): HTMLElement {
  const header = document.createElement('header');
  header.className = 'header';

  const headerContent = document.createElement('div');
  headerContent.className = 'header-content';

  const headerLogo = document.createElement('div');
  headerLogo.className = 'header-logo';

  const logoLink = document.createElement('a');
  logoLink.href = '#/';
  logoLink.className = 'header-logo-link';

  const logoImg = document.createElement('img');
  logoImg.className = 'header-logo-icon';
  logoImg.alt = 'Logo';
  logoImg.src = '/images/book.png';

  const logoTitle = document.createElement('h1');
  logoTitle.textContent = 'Book Shop';

  logoLink.append(logoImg, logoTitle);
  headerLogo.append(logoLink);

  //навигация
  const nav = document.createElement('nav');
  nav.className = 'header-nav';

  const ul = document.createElement('ul');
  ul.className = 'header-menu';

  //о нас
  const liAbout = document.createElement('li');
  const aAbout = document.createElement('a');
  aAbout.href = '#/';
  aAbout.textContent = 'О нас';
  if (currentPage === '/') aAbout.classList.add('active');
  liAbout.appendChild(aAbout);

  //каталог
  const liCatalog = document.createElement('li');
  const aCatalog = document.createElement('a');
  aCatalog.href = '#/catalog';
  aCatalog.textContent = 'Каталог';
  if (currentPage === '/catalog') aCatalog.classList.add('active');
  liCatalog.appendChild(aCatalog);

  ul.append(liAbout, liCatalog);

  //корзина
  const cartDiv = document.createElement('div');
  cartDiv.className = 'header-cart';

  const cartImg = document.createElement('img');
  cartImg.src = '/images/cart.png';
  cartImg.alt = 'Cart';
  cartImg.className = 'header-cart-icon';

  const cartLink = document.createElement('a');
  cartLink.href = '#/cart';
  cartLink.textContent = 'Корзина';
  if (currentPage === '/cart') cartLink.classList.add('active');

  //счетчик возле корзины
  const cartCount = createCartCount();

  cartDiv.append(cartImg, cartLink, cartCount);

  nav.append(ul, cartDiv);
  headerContent.append(headerLogo, nav);
  header.appendChild(headerContent);

  return header;
}
