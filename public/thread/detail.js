import { Auth } from '../lib/Auth.js';
import { setupNavbar } from '../lib/setupNavbar.js';
import { getThread } from '../lib/threads.js';
import { createComment } from '../lib/comments.js';

setupNavbar(document.body);

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
if (!id) {
  window.location.replace('/thread/');
}

const thread = await getThread(id);
document.querySelector('main').innerHTML = buildThreadCard(thread);

function buildThreadCard({ createdAt, title, content, user }) {
  const comments = thread.comments;

  let commentsHtml = '';
  comments.forEach((comment) => {
    commentsHtml += buildCommentCard(comment);
  });

  const date = new Date(createdAt);
  return `
    <article>
      <header>
        <div class="meta">
          <img class="avatar-small" src="${user.avatar}" alt="${user.username}" />
          <a class="text-black" href="#">${user.username}</a> ·
          <span>${date.toDateString()}</span>
        </div>
        <h1 class="title fw-bold">${title}</h1>
      </header>
      <section class="thread-content">
        <p>${content}</p>
      </section>
      <h2 class="fw-bold">Comments (1)</h2>
      <section class="thread-comments">
        <form class="comment">
          <div>
            <img class="avatar" src="${user.avatar}" alt="${user.username}" />
          </div>
          <div class="comment-content">
            <textarea id="content" name="comment" placeholder="Write a comment..."></textarea>
            <button type="submit" id="commentSubmit">Submit</button>
          </div>
        </form>
        <!-- Comment Template -->
        ${commentsHtml}
      </section>
    </article>
  `;
}

function buildCommentCard({ content, createdAt, user: { username, avatar } }) {
  const now = new Date();
  const createdAtDate = new Date(createdAt);

  const diffMs = Math.abs(createdAtDate - now);
  const diffMinute = Math.ceil(diffMs / (1000 * 60));

  return `
    <div class="comment">
      <div>
        <img
          class="avatar"
          src="${avatar}"
          alt="User avatar"
        />
      </div>
      <div class="comment-content card">
        <a href="#" class="text-black"><b>${username}</b></a>
        <span> · ${diffMinute}m ago</span>
        <p>
          ${content}
        </p>
      </div>
    </div>
  `;
}

document.querySelector('main').addEventListener(
  'click',
  async function (event) {
    if (event.target === document.querySelector('#commentSubmit')) {
      event.preventDefault();

      const content = document.querySelector('#content').value;

      if (content === '') {
        alert("Content shouldn't be empty");
        return;
      }

      const userId = Auth.currentUser.id;
      const threadId = id;

      await createComment(content, userId, threadId);
      window.location.reload();
    }
  },
  true
);
