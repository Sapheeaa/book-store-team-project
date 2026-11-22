import type { RoutePath } from '@/types';

export function renderLayout(content: HTMLElement, _path: RoutePath): HTMLElement {
  // заглушка
  const container = document.createElement('div');
  container.appendChild(content);
  return container;
}
