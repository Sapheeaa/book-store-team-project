import './about.css';

export function renderAbout(): HTMLElement {
  const main = document.createElement('main');
  main.className = 'about-page';

  const hero = document.createElement('section');
  hero.className = 'hero';

  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';

  const heroLabel = document.createElement('span');
  heroLabel.className = 'hero-label';
  heroLabel.textContent = 'КНИГИ, КОТОРЫЕ ОБЪЕДИНЯЮТ';

  const heroTitle = document.createElement('h1');
  heroTitle.className = 'hero-title';
  heroTitle.textContent = 'Книжный магазин';

  const heroText = document.createElement('p');
  heroText.className = 'hero-text';
  heroText.textContent =
    'Место, где легко найти свою следующую историю. Мы собрали любимые книги, чтобы выбирать было приятно, а читать — ещё приятнее.';

  const heroBtn = document.createElement('a');
  heroBtn.className = 'hero-btn';
  heroBtn.href = '#/catalog';
  heroBtn.textContent = 'Выбрать книгу →';

  heroContent.append(heroLabel, heroTitle, heroText, heroBtn);

  const heroAside = document.createElement('div');
  heroAside.className = 'hero-aside';

  const asideLabel = document.createElement('span');
  asideLabel.className = 'hero-aside-label';
  asideLabel.textContent = 'ОТКРОЙТЕ НОВУЮ ГЛАВУ';

  const asideTitle = document.createElement('p');
  asideTitle.className = 'hero-aside-title';
  asideTitle.innerHTML = 'Для тихих вечеров.<br>Для новых идей.<br>Для себя.';

  const asideFooter = document.createElement('span');
  asideFooter.className = 'hero-aside-footer';
  asideFooter.textContent = 'Хорошая история всегда рядом.';

  heroAside.append(asideLabel, asideTitle, asideFooter);
  hero.append(heroContent, heroAside);

  const team = document.createElement('section');
  team.className = 'team';

  const teamTitle = document.createElement('h2');
  teamTitle.className = 'section-title';
  teamTitle.textContent = 'Наша команда';

  const teamSubtitle = document.createElement('p');
  teamSubtitle.className = 'section-subtitle';
  teamSubtitle.textContent = 'Два человека. Один общий интерес — книги.';

  const teamGrid = document.createElement('div');
  teamGrid.className = 'team-grid';

  const cardPartner = document.createElement('div');
  cardPartner.className = 'team-card';
  cardPartner.innerHTML = `
    <div class="team-card-header">
      <div class="team-avatar">Н</div>
      <div class="team-info">
        <h3>Гузаллия Рамазанова</h3>
        <a href="https://github.com/GuzalliiaR" target="_blank" class="team-github">GitHub: @GuzalliiaR</a>
      </div>
    </div>
    <div class="team-role">Frontend-разработчик</div>
    <p class="team-desc">Отвечает за настройку проекта, SPA-роутинг, хранилище состояния (store), а также логику и верстку страницы корзины.</p>
  `;

  const cardSophia = document.createElement('div');
  cardSophia.className = 'team-card';
  cardSophia.innerHTML = `
    <div class="team-card-header">
      <div class="team-avatar">СЛ</div>
      <div class="team-info">
        <h3>София Лукьянчик</h3>
        <a href="https://github.com/Sapheeaa" target="_blank" class="team-github">GitHub: @Sapheeaa</a>
      </div>
    </div>
    <div class="team-role">Frontend-разработчик</div>
    <p class="team-desc">Занимается разработкой каталога, реализацией поиска, фильтрации, хедера и кнопки добавления в корзину.</p>
  `;

  teamGrid.append(cardPartner, cardSophia);
  team.append(teamTitle, teamSubtitle, teamGrid);
  const cta = document.createElement('section');
  cta.className = 'cta-banner';

  const ctaContent = document.createElement('div');
  ctaContent.className = 'cta-content';

  const ctaTitle = document.createElement('h2');
  ctaTitle.className = 'cta-title';
  ctaTitle.textContent = 'Ваша следующая книга уже здесь';

  const ctaText = document.createElement('p');
  ctaText.className = 'cta-text';
  ctaText.textContent = 'Романы, фантастика и детективы — выбирайте по настроению.';

  ctaContent.append(ctaTitle, ctaText);

  const ctaBtn = document.createElement('a');
  ctaBtn.className = 'cta-btn';
  ctaBtn.href = '#/catalog';
  ctaBtn.textContent = 'Перейти в каталог →';

  cta.append(ctaContent, ctaBtn);
  main.append(hero, team, cta);

  return main;
}
