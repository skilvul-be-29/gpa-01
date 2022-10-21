import { Auth } from '../lib/Auth.js';
import { createThread } from '../lib/threads.js';

if (!Auth.currentUser) {
  window.location.replace('/signin/');
}

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const content = formData.get('content').trim();

  if (title === '' || content === '') {
    alert('Please fill all the fields');
    return;
  }

  const userId = Auth.currentUser.id;
  const thread = await createThread({ title, content, userId });
  window.location.replace(`/thread/detail.html?id=${thread.id}`);
});
