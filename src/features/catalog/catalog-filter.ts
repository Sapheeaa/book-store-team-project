import type { Book, FilterParams } from '@/types';

export function filterBooks(books: Book[], params: FilterParams): Book[] {
  return books.filter((book) => {
    const isGenreMatch =
      params.categories.length === 0 || params.categories.includes(book.category);

    const isMinPriceMatch = params.minPrice === null || book.price >= params.minPrice;

    const isMaxPriceMatch = params.maxPrice === null || book.price <= params.maxPrice;

    return isGenreMatch && isMinPriceMatch && isMaxPriceMatch;
  });
}
