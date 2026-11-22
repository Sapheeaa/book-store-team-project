// Валидация и нормализация URL-хеша в маршруты приложения (роуты)
import type { RoutePath } from '@/types';

export const ROUTES: readonly RoutePath[] = ['/', '/catalog', '/cart'];

export function parseHash(hash: string): RoutePath {
  const cleanHash = hash.replace(/^#/, '');

  if (cleanHash === '' || cleanHash === '/') return '/';

  const candidate = cleanHash.startsWith('/') ? cleanHash : `/${cleanHash}`;
  const validHash = (ROUTES as readonly string[]).includes(candidate)
    ? (candidate as RoutePath)
    : '/';

  return validHash;
}
