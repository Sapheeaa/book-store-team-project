import type { RoutePath } from '@/types';
import { createHeader } from '@/components/header';

export function renderLayout(content: HTMLElement, path: RoutePath): HTMLElement {
  const container = document.createElement('div');
  container.className = 'layout-container';

  const header = createHeader(path);

  container.appendChild(header);

  container.appendChild(content);
  return container;
}
