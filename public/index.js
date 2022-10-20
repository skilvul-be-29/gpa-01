import { Auth } from './lib/Auth.js';

document.getElementById('signout').addEventListener('click', (event) => {
  Auth.signOut();
});
