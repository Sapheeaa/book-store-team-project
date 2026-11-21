import './style.css';
import { createHeader } from '@/components/header';
import { renderCatalog } from '@/pages/catalog';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.replaceChildren();

const header = createHeader('catalog');
app.appendChild(header);

const catalogPage = renderCatalog();
app.appendChild(catalogPage);
