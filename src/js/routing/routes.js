import { displayIndexPage, displaySinglePost } from '../display/displays.js';

export const routes = {
  "/": displayIndexPage,
  "/post": displaySinglePost,
  //"/profile": displayProfilePage,
  //"/register": displayRegisterPage,
  //"/login": displayLoginPage,
};
