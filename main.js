import { Router } from './src/js/routing/router.js';
import { routes } from './src/js/routing/routes.js';
import { mainContainer } from './src/js/constants.js';

const contentElement = mainContainer;

const router = new Router(routes, contentElement);

router.resolveRoute();