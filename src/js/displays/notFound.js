import { Router } from '../routing/router.js';

export function displayNotFound() {
    return `
        <h1>Page not found! Sorry, this page does not exist</h1>
    `
}

export function initNotFound() {
    setTimeout(() => {
        Router.navigate('/');
    }, 2000);
}