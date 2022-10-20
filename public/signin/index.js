import { Auth } from '../lib/Auth.js';

if (Auth.currentUser) {
  window.location.href = '/';
}

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const username = formData.get('username').trim();
  const password = formData.get('password').trim();

  const res = await Auth.signIn(username, password);
  if (res) {
    window.location.href = '/';
  } else {
    alert('Invalid credentials');
  }
});
