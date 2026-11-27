import type { FilterParams } from '@/types';

// Функция принимает элементы интерфейса и ДВЕ инструкции (коллбэка)

export function initFilters(
  applyBtn: HTMLButtonElement,
  resetBtn: HTMLButtonElement,
  genreGroup: HTMLElement,
  inputFrom: HTMLInputElement,
  inputTo: HTMLInputElement,
  onFilter: (params: FilterParams) => void, // Что делать, когда нажали "Применить"
  onReset: () => void, // Что делать, когда нажали "Сбросить"
) {
  //кнопка применить
  applyBtn.addEventListener('click', () => {
    const categories: string[] = [];
    const checkedBoxes = genreGroup.querySelectorAll('input[type="checkbox"]:checked');

    checkedBoxes.forEach((checkbox) => {
      const label = checkbox.parentElement;
      if (label) {
        categories.push(label.textContent?.trim() || '');
      }
    });

    const minPrice = inputFrom.value ? Number(inputFrom.value) : null;
    const maxPrice = inputTo.value ? Number(inputTo.value) : null;

    onFilter({ categories, minPrice, maxPrice });
  });

  //кнопка сбросить
  resetBtn.addEventListener('click', () => {
    inputFrom.value = '';
    inputTo.value = '';

    const allCheckboxes = genreGroup.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });

    onReset();
  });
}
