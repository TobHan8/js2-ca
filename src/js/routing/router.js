import { displayNotFound } from "../display/displays.js";

export class Router {
    constructor(routes, contentElement) {
        this.routes = routes;
        this.contentElement = contentElement;

        window.addEventListener('hashchange', () => this.resolveRoute());
    }

    navigate(path) {
        window.location.hash = path;
    }

    resolveRoute() {
        const path = window.location.hash.slice(1) || '/';
        const display = this.routes[path] || displayNotFound;
        this.contentElement.innerHTML = display();
    }
}




