import type { Book } from '@/types';

export function searchBooks(books: Book[], query: string): Book[] {
  const cleanQuery = query.trim().toLowerCase();
  if (cleanQuery === '') {
    return books;
  }

  return books.filter((book) => {
    const bookTitle = book.title.toLowerCase();
    return bookTitle.includes(cleanQuery);
  });
}
