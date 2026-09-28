import { displayIndex } from '../displays/index.js';
import { displayRegister, initRegister } from '../displays/register.js';

export const routes = {
  '/': { display: displayIndex },
  '/register': { display: displayRegister, init: initRegister },
  
};
