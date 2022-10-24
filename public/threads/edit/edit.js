import { Auth } from '../../lib/Auth.js';
import { setupNavbar } from '../../lib/setupNavbar.js';
import { editThread } from '../../lib/threads.js';
import { getThread } from '../../lib/threads.js';

if (!Auth.currentUser) {
  window.location.replace('/signin/');
}

setupNavbar(document.body);

const params = new URLSearchParams(window.location.search);
const threadId = params.get('id');
if (!threadId) {
  window.location.replace('/threads/');
}

const thread = await getThread(threadId);

const form = document.querySelector('form');
const btnSubmit = document.getElementById('submit');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const content = formData.get('content').trim();
  if (title === '') return;

  btnSubmit.disabled = true;
  await editThread(threadId, {
    ...thread,
    title,
    content,
  });
  window.location.replace(`/threads/view/?id=${threadId}`);
});

const inputTitle = document.getElementById('title');
const inputContent = document.getElementById('content');

inputTitle.addEventListener('input', () => {
  btnSubmit.disabled = inputTitle.value.trim() === '';
});

inputTitle.value = thread.title;
inputContent.value = thread.content;
