import { displayNotFound, initNotFound } from '../displays/notFound.js';

const notFoundRoute = { display: displayNotFound, init: initNotFound };

export class Router {
    constructor(routes, contentElement) {
        this.routes = routes;
        this.contentElement = contentElement;

        window.addEventListener('hashchange', () => this.resolveRoute());
    }

    static navigate(path) {
        window.location.hash = path;
    }

    resolveRoute() {
        const raw = window.location.hash.slice(1) || '/';
        const path = raw.split('?')[0];
        const route = this.routes[path] || notFoundRoute;
        this.contentElement.innerHTML = route.display();
        if (route && route.init) {
            route.init();
        }
    }
}




