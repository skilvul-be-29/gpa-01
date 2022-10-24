import { Auth } from '../lib/Auth.js';
import { setupNavbar } from '../lib/setupNavbar.js';

if (Auth.currentUser) {
  window.location.replace('/');
}

setupNavbar(document.body);

const form = document.querySelector('form');
const err = document.getElementById('err');
const btnSubmit = document.getElementById('submit');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const username = formData.get('username').trim();
  const password = formData.get('password').trim();

  err.innerText = '';
  btnSubmit.disabled = true;

  if (await Auth.signIn(username, password)) {
    window.location.replace('/');
  } else {
    err.innerText = 'Incorrect username or password';
  }

  btnSubmit.disabled = false;
});
