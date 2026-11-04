import { Router } from '../routing/router.js';

export function displayNotFound() {
    return `
        <div id="title-container" class="d-flex justify-content-center my-5">
            <h1>Page not found! Sorry, this page does not exist</h1>
        </div>
    `
}

export function initNotFound() {
    setTimeout(() => {
        Router.navigate('/');
    }, 2000);
}