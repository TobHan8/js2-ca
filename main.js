import { Router } from './src/js/routing/router.js';
import { routes } from './src/js/routing/routes.js';
import { mainContainer } from './src/js/constants.js';
import { hydrateState } from './src/js/state/manageState.js';
import { displayHeader } from './src/js/components/header.js';

const contentElement = mainContainer;

const router = new Router(routes, contentElement);

hydrateState();

router.resolveRoute();

displayHeader();