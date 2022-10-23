import { Auth } from '../../lib/Auth.js';
import { createComment, getComments } from '../../lib/comments.js';
import { formatTime } from '../../lib/formatTime.js';
import { setupNavbar } from '../../lib/setupNavbar.js';
import { getThread } from '../../lib/threads.js';
import { getUser } from '../../lib/users.js';

setupNavbar(document.body);

const params = new URLSearchParams(window.location.search);
const threadId = params.get('id');
if (!threadId) {
  window.location.replace('/threads/');
}

const users = [];
await loadThread();

const form = document.querySelector('form');
const btnSubmit = document.getElementById('submit');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!Auth.currentUser) {
    window.location.href = '/signin/';
    return;
  }

  const formData = new FormData(form);
  const content = formData.get('content').trim();
  if (content === '') return;

  btnSubmit.disabled = true;

  await createComment(content, Auth.currentUser.id, threadId);
  loadComments(await getComments(threadId));

  form.reset();
});

const inputContent = document.getElementById('content');

inputContent.addEventListener('input', () => {
  btnSubmit.disabled = inputContent.value.trim() === '';
});

async function loadThread() {
  const { createdAt, title, content, userId } = await getThread(threadId);
  const [user, comments] = await Promise.all([getUser(userId), getComments(threadId)]);

  document.title = title;
  users.push(user);

  const currentUser = Auth.currentUser ?? { avatar: 'https://www.gravatar.com/avatar/0?d=mp&f=y', username: 'blank' };

  document.querySelector('main').innerHTML = `
    <article>
      <header>
        <div class="meta">
          <img class="avatar-small" src="${user.avatar}" alt="${user.username}" />
          <a class="text-black" href="#">${user.username}</a> ·
          <span>${formatTime(createdAt)}</span>
        </div>
        <h1 class="title fw-bold">${title}</h1>
      </header>
      <section class="thread-content">
        <p>${content}</p>
      </section>
      <h2 class="fw-bold">Comments</h2>
      <form class="comment">
        <div>
          <img class="avatar" src="${currentUser.avatar}" alt="${currentUser.username}" />
        </div>
        <div class="comment-content">
          <textarea id="content" name="content" placeholder="Write a comment..."></textarea>
          <button type="submit" id="submit" disabled>Submit</button>
        </div>
      </form>
      <section class="thread-comments"></section>
    </article>
  `;

  loadComments(comments);
}

async function loadComments(comments) {
  const container = document.querySelector('.thread-comments');
  container.innerHTML = '';

  for (const { createdAt, content, userId } of comments) {
    let user = users.find((user) => user.id === userId);
    if (!user) {
      user = await getUser(userId);
      users.push(user);
    }

    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.innerHTML = `
      <div>
        <img class="avatar" src="${user.avatar}" alt="${user.avatar}" />
      </div>
      <div class="comment-content card">
        <a href="#" class="text-black"><b>${user.username}</b></a>
        <span> · ${formatTime(createdAt)}</span>
        <p>${content}</p>
      </div>
    `;

    container.appendChild(comment);
  }
}
