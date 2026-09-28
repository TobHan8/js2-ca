import { displayIndex } from '../displays/index.js';
import { displayRegister, initRegister } from '../displays/register.js';
import { displayLogin, initLogin } from '../displays/login.js';

export const routes = {
  '/': { display: displayIndex },
  '/register': { display: displayRegister, init: initRegister },
  '/login': { display: displayLogin, init: initLogin },
  
};
