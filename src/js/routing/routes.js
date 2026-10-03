import { displayIndex, initIndex } from '../displays/index.js';
import { displayRegister, initRegister } from '../displays/register.js';
import { displayLogin, initLogin } from '../displays/login.js';
import { displaySinglePost, initSinglePost } from '../displays/singlePost.js';
import { displayProfile, initProfile } from '../displays/profile.js';

export const routes = {
  '/': { display: displayIndex, init: initIndex },
  '/register': { display: displayRegister, init: initRegister },
  '/login': { display: displayLogin, init: initLogin },
  '/post': { display: displaySinglePost, init: initSinglePost },
  '/profile': { display: displayProfile, init: initProfile },
  
};
