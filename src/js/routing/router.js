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

    /**
     * Resolves the current route to match the hashed URL with a display and initializing function.
     * It reads the route path from the URL hash string and dissects away the parameters (for example: /#/profile?name=kdkawfgaa).
     * This way the same route for profile page will be called, independent of the parameters that ties it to a specific profile.
     * If a route is not found in the routes object, it will fallback on the notFoundRoute.
     * If a route match is found the routes display function renders the HTML to the main static HTML container.
     * An if check is then performed to check if route is present with an init key. If the route has the init key, the function behind it is called
     * in order to attach additional logic and eventListeners to elements.
     */
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




