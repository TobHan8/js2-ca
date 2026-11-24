export const mainContainer = document.getElementById('main');
export const titleContainer = document.getElementById('title-container');
export const toastContainer = document.getElementById('toast-container');
export const header = document.getElementById('header');

export const BASE_URL = 'https://v2.api.noroff.dev/';
export const ALL_POSTS_URL = 'social/posts';

// The Noroff API key is not a secret. Anyone can create their own key after registering (POST /auth/create-api-key).
// Frontend code is always visible in the browser, and this project is developed without a build step, which means that an .env file would not hide the key anyways.
// All data is fictional and for educational purposes only
export const API_KEY = '970acfb6-7e3f-431c-91ab-1ecca8130f8a';
export const SINGLE_POST_URL = 'social/posts/';

export const PROFILE_URL = 'social/profiles/';
export const PROFILE_POSTS_URL = 'social/profiles/';

export const AUTH_REGISTER_URL = 'auth/register';
export const AUTH_LOGIN_URL = 'auth/login';