import { getComments } from '../lib/comments.js';
import { formatTime } from '../lib/formatTime.js';
import { setupNavbar } from '../lib/setupNavbar.js';
import { getThreads } from '../lib/threads.js';
import { getUser } from '../lib/users.js';

setupNavbar(document.body);

document.getElementById('create-thread').addEventListener('click', () => {
  window.location.href = '/threads/create/';
});

const users = [];
const container = document.getElementById('threads');

const threads = await getThreads();

for (const { createdAt, id, title, userId } of threads) {
  let user = users.find((user) => user.id === userId);
  if (!user) {
    user = await getUser(userId);
    users.push(user);
  }

  const thread = document.createElement('div');
  thread.classList.add('card');
  container.appendChild(thread);

  const { avatar, username } = user;
  getComments(id).then((comments) => {
    thread.innerHTML = `
      <header>
        <div class="meta">
          <img class="avatar-small" src="${avatar}" alt="${username}" />
          <a class="text-black" href="#">${username}</a> ·
          <span>${formatTime(createdAt)}</span>
        </div>
        <a class="text-black" href="/threads/view/?id=${id}">
          <h2 class="title fw-bold text-black">${title}</h2>
        </a>
      </header>
      <section>${comments.length} Comments</section>
    `;
  });
}
