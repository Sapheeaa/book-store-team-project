import { searchBooks } from './catalog-search';
import type { Book } from '@/types';

export function initSearch(
  input: HTMLInputElement,
  button: HTMLButtonElement,
  books: Book[],
  onSearch: (result: Book[]) => void, // когда нашел книги
  onReset: () => void, // когда нажали на крестик, чтобы очистить инпут
) {
  let timeout: ReturnType<typeof setTimeout>;

  input.addEventListener('input', () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const query = input.value;
      const filteredSearchBooks = searchBooks(books, query);

      onSearch(filteredSearchBooks);
    }, 300);
  });

  button.addEventListener('click', () => {
    input.value = '';

    onReset();
  });
}
