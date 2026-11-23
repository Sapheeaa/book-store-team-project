import { parseHash } from './routes';
import { renderAbout } from '@/pages/about';
import { renderCatalog } from '@/pages/catalog/catalog';
import { renderCart } from '@/pages/cart';
import { renderLayout } from '@/shared/layout';
import type { RoutePath } from '@/types';

const RENDERERS: Record<RoutePath, () => HTMLElement> = {
  '/': renderAbout,
  '/catalog': renderCatalog,
  '/cart': renderCart,
};

export function startRouter(mount: HTMLElement): void {
  const render = (): void => {
    const path = parseHash(window.location.hash);

    // замена невалидного hash из адресной строки на '#/'
    if (window.location.hash !== `#${path}`) {
      history.replaceState(null, '', `#${path}`);
    }

    mount.replaceChildren(renderLayout(RENDERERS[path](), path));
  };

  window.addEventListener('hashchange', render);
  render();
}
