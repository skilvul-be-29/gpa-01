import { Auth } from '../../lib/Auth.js';
import { setupNavbar } from '../../lib/setupNavbar.js';
import { createThread } from '../../lib/threads.js';

if (!Auth.currentUser) {
  window.location.replace('/signin/');
}

setupNavbar(document.body);

const form = document.querySelector('form');
const btnSubmit = document.getElementById('submit');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const content = formData.get('content').trim();
  if (title === '') return;

  btnSubmit.disabled = true;
  const userId = Auth.currentUser.id;
  const thread = await createThread(title, content, userId);
  window.location.replace(`/threads/view/?id=${thread.id}`);
});

const inputTitle = document.getElementById('title');

inputTitle.addEventListener('input', () => {
  btnSubmit.disabled = inputTitle.value.trim() === '';
});
