import { setupNavbar } from '../lib/setupNavbar.js';
import { getThread } from '../lib/threads.js';

setupNavbar(document.body);

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
if (!id) {
  window.location.replace('/thread/');
}

const thread = await getThread(id);
document.querySelector('main').innerHTML = buildThreadCard(thread);

function buildThreadCard({ createdAt, title, content, user }) {
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
            <textarea name="comment" placeholder="Write a comment..."></textarea>
            <button type="submit">Submit</button>
          </div>
        </form>
        <!-- Comment Template -->
        <div class="comment">
          <div>
            <img
              class="avatar"
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
              alt="User avatar"
            />
          </div>
          <div class="comment-content card">
            <a href="#" class="text-black"><b>Comment Author</b></a>
            <span> · 1m ago</span>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae saepe architecto distinctio repellat
              delectus velit ullam earum, incidunt nihil, provident voluptatem quasi reiciendis est nesciunt nam culpa
              ex aut rerum. Nemo molestias voluptatibus laboriosam, eius quos sint molestiae soluta eaque officia
              nostrum maiores vel error veniam ea neque itaque mollitia?
            </p>
          </div>
        </div>
      </section>
    </article>
  `;
}
