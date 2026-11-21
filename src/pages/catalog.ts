import books from '@/data/books.json';

export function renderCatalog(): HTMLElement {
  const main = document.createElement('main');
  main.className = 'catalog-page';

  //обертка для заголовка с описанием и поиска
  const headerRow = document.createElement('div');
  headerRow.className = 'catalog-header-row';

  //заголовок и описание
  const titleContainer = document.createElement('div');
  titleContainer.className = 'catalog-title';

  const title = document.createElement('h2');
  title.textContent = 'Каталог';

  const subtitle = document.createElement('p');
  subtitle.textContent = 'Найдите историю, которую не захочется откладывать.';

  titleContainer.append(title, subtitle);

  //поиск
  const searchContainer = document.createElement('div');
  searchContainer.className = 'catalog-search';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Название книги';

  const searchBtn = document.createElement('button');
  searchBtn.className = 'btn-search';
  searchBtn.textContent = 'Найти';

  searchContainer.append(searchInput, searchBtn);
  headerRow.append(titleContainer, searchContainer);

  //контейнер для карточек и фильтра
  const catalogContent = document.createElement('div');
  catalogContent.className = 'catalog-content';

  //меню слева
  const aside = document.createElement('aside');
  aside.className = 'filters';

  const filterTitle = document.createElement('h2');
  filterTitle.className = 'filter-title';
  filterTitle.textContent = 'Фильтры';

  const genreGroup = document.createElement('div');
  genreGroup.className = 'filter-group';

  const genreTitle = document.createElement('h3');
  genreTitle.textContent = 'Жанры';

  const createLabel = (text: string) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    label.append(input, text);
    return label;
  };

  genreGroup.append(
    genreTitle,
    createLabel('Ужасы'),
    createLabel('Антиутопия'),
    createLabel('Детектив'),
  );

  // Группа Цена
  const priceGroup = document.createElement('div');
  priceGroup.className = 'filter-group';

  const priceTitle = document.createElement('h3');
  priceTitle.textContent = 'Цена, ₽';

  const priceInputs = document.createElement('div');
  priceInputs.className = 'price-inputs';

  const inputFrom = document.createElement('input');
  inputFrom.type = 'number';
  inputFrom.placeholder = 'От';

  const inputTo = document.createElement('input');
  inputTo.type = 'number';
  inputTo.placeholder = 'До';

  priceInputs.append(inputFrom, inputTo);
  priceGroup.append(priceTitle, priceInputs);

  // Кнопки фильтров
  const btnApply = document.createElement('button');
  btnApply.className = 'btn-apply';
  btnApply.textContent = 'Применить';

  const btnReset = document.createElement('button');
  btnReset.className = 'btn-reset';
  btnReset.textContent = 'Сбросить фильтры';

  // Собираем панель фильтров
  aside.append(filterTitle, genreGroup, priceGroup, btnApply, btnReset);

  //грид секция
  const catalogGrid = document.createElement('div');
  catalogGrid.className = 'catalog-grid';

  books.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'book-card';
    //блок с картинкой
    const imgContainer = document.createElement('div');
    imgContainer.className = 'book-image';

    const img = document.createElement('img');
    img.src = book.image;
    img.alt = book.title;
    imgContainer.appendChild(img);

    //блок с тектом
    const infoContainer = document.createElement('div');
    infoContainer.className = 'book-info';

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = book.title;
    bookTitle.className = 'book-title';

    const category = document.createElement('p');
    category.className = 'book-meta';
    category.textContent = `Категория: ${book.category}`;

    const author = document.createElement('p');
    author.className = 'book-meta';
    author.textContent = book.author;

    //блок с ценой и кнопкой
    const bottomContainer = document.createElement('div');
    bottomContainer.className = 'card-bottom';

    const price = document.createElement('span');
    price.className = 'book-price';
    price.textContent = `${book.price} ₽`;

    const btnAdd = document.createElement('button');
    btnAdd.className = 'btn-add';
    btnAdd.textContent = 'В корзину';
    btnAdd.dataset.id = book.id;

    bottomContainer.append(price, btnAdd);
    infoContainer.append(bookTitle, category, author, bottomContainer);

    card.append(imgContainer, infoContainer);

    catalogGrid.appendChild(card);
  });

  catalogContent.append(aside, catalogGrid);

  main.append(headerRow, catalogContent);

  return main;
}
