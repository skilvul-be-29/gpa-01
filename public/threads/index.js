import { formatTime } from '../lib/formatTime.js';
import { setupNavbar } from '../lib/setupNavbar.js';
import { getThreads } from '../lib/threads.js';

setupNavbar(document.body);

document.getElementById('create-thread').addEventListener('click', () => {
  window.location.href = '/threads/create/';
});

const threads = await getThreads();
const threadsHtml = document.getElementById('threads');

threads.forEach((thread) => {
  threadsHtml.innerHTML += buildThreadCard(thread);
});

function buildThreadCard({ createdAt, id, title, user: { username, avatar }, comments }) {
  const time = formatTime(createdAt);
  return `
    <div class="card">
      <header>
        <div class="meta">
          <img class="avatar-small" src="${avatar}" alt="${username}" />
          <a class="text-black" href="#">${username}</a> ·
          <span>${time}</span>
        </div>
        <a class="text-black" href="/threads/view/?id=${id}">
          <h2 class="title fw-bold text-black">${title}</h2>
        </a>
      </header>
      <section>${comments.length} Comments</section>
    </div>
  `;
}
