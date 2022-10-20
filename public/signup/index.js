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
  const confirmPassword = formData.get('confirmPassword').trim();

  if (password !== confirmPassword) return alert('Passwords do not match');

  const res = await Auth.signUp(username, password);
  if (res) {
    window.location.href = '/';
  } else {
    alert('Username already exists');
  }
});
