import './main.css';
import './pages/catalog/catalog.css';

import { startRouter } from './app/router';

const app = document.getElementById('app');
if (!app) throw new Error('element id = app not found');
startRouter(app);
