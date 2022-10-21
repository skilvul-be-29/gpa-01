import { getThreads } from '../lib/threads.js';
import { setupNavbar } from '../lib/setupNavbar.js';

setupNavbar(document.body);

document.getElementById('create-thread').addEventListener('click', () => {
  window.location.href = '/thread/create.html';
});

const threads = await getThreads();
const threadsHtml = document.querySelector('.threads');

threads.forEach((thread) => {
  threadsHtml.innerHTML += buildThreadCard(thread);
});

function buildThreadCard({ createdAt, id, title, user, comments }) {
  const date = new Date(createdAt);
  return `
    <div class="card">
      <header>
        <div class="meta">
          <img class="avatar-small" src="${user.avatar}" alt="${user.username}" />
          <a class="text-black" href="#">${user.username}</a> ·
          <span>${date.toDateString()}</span>
        </div>
        <a class="text-black" href="/thread/detail.html?id=${id}">
          <h2 class="title fw-bold text-black">${title}</h2>
        </a>
      </header>
      <section>${comments.length} Comments</section>
    </div>
  `;
}
