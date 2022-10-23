import { Auth } from '../lib/Auth.js';
import { createComment } from '../lib/comments.js';
import { formatTime } from '../lib/formatTime.js';
import { setupNavbar } from '../lib/setupNavbar.js';
import { getThread } from '../lib/threads.js';

setupNavbar(document.body);

const params = new URLSearchParams(window.location.search);
const threadId = params.get('id');
if (!threadId) {
  window.location.replace('/thread/');
}

const thread = await getThread(threadId);
document.querySelector('main').innerHTML = buildThreadCard(thread);

function buildThreadCard({ createdAt, title, content, user: { username, avatar } }) {
  const time = formatTime(createdAt);
  const comments = thread.comments.map(buildCommentCard).join('');
  return `
    <article>
      <header>
        <div class="meta">
          <img class="avatar-small" src="${avatar}" alt="${username}" />
          <a class="text-black" href="#">${username}</a> ·
          <span>${time}</span>
        </div>
        <h1 class="title fw-bold">${title}</h1>
      </header>
      <section class="thread-content">
        <p>${content}</p>
      </section>
      <h2 class="fw-bold">Comments (${thread.comments.length})</h2>
      <section class="thread-comments">
        <form class="comment">
          <div>
            <img class="avatar" src="${avatar}" alt="${username}" />
          </div>
          <div class="comment-content">
            <textarea id="content" name="content" placeholder="Write a comment..."></textarea>
            <button type="submit" id="submit" disabled>Submit</button>
          </div>
        </form>
        ${comments}
      </section>
    </article>
  `;
}

function buildCommentCard({ createdAt, content, user: { username, avatar } }) {
  const time = formatTime(createdAt);
  return `
    <div class="comment">
      <div>
        <img class="avatar" src="${avatar}" alt="${avatar}" />
      </div>
      <div class="comment-content card">
        <a href="#" class="text-black"><b>${username}</b></a>
        <span> · ${time}</span>
        <p>${content}</p>
      </div>
    </div>
  `;
}

const form = document.querySelector('form');
const btnSubmit = document.getElementById('submit');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const content = formData.get('content').trim();
  if (content === '') return;

  btnSubmit.disabled = true;

  await createComment(content, Auth.currentUser.id, threadId);
  window.location.reload();
});

const inputContent = document.getElementById('content');

inputContent.addEventListener('input', () => {
  btnSubmit.disabled = inputContent.value.trim() === '';
});
