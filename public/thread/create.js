import { createThread } from '../lib/createThread.js';
import { DETAIL_PAGE } from '../constants/constants.js';

async function send({ title, content }) {
  // TODO: userId ambil dari localstorage
  const userId = 1;

  const createdThread = await createThread({ title, content, userId });

  window.location.replace(`./${DETAIL_PAGE}?id=${createdThread.id}`);
}

async function submitForm(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await send({ title, content });
}

document.getElementById('submit').addEventListener('click', submitForm);
