import { getThreads } from '../lib/getThreads.js';

let threads = [];

async function load() {
  threads = await getThreads();
  refresh();
}

function buildThreadCard({ id, title, content }) {
  if (content.length > 50) {
    content = content.substring(0, 47) + '...';
  }

  return `
    <div class="col-md-4">
      <a href="detail.html?id=${id}">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${content}</p>
          </div>
        </div>
      </a>
    </div>
  `;
}

function refresh() {
  const threadsHtml = document.getElementById('threads');

  threads.forEach((thread) => {
    threadsHtml.innerHTML += buildThreadCard(thread);
  });
}

window.onload = load;
