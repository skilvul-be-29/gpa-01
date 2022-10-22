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
  const confirmPassword = formData.get('confirm-password').trim();

  err.innerText = '';
  btnSubmit.disabled = true;

  if (username === '' || password === '') {
    err.innerText = 'Please fill in all fields';
  } else if (password !== confirmPassword) {
    err.innerText = 'Passwords do not match';
  } else if (await Auth.signUp(username, password)) {
    window.location.replace('/');
  } else {
    err.innerText = 'Username is already taken';
  }

  btnSubmit.disabled = false;
});
