import { getThreadById } from '../lib/getThreadById.js';

let thread = {};

function parseQuery(queryString) {
  const query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

async function load() {
  const { id } = parseQuery(window.location.search);
  thread = await getThreadById(id);
  refresh();
}

function buildThreadCard({ title, content }) {
  return `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${content}</p>
      </div>
    </div>
  `;
}

function refresh() {
  const threadHtml = document.getElementById('thread');
  threadHtml.innerHTML = buildThreadCard(thread);
}

window.onload = load;
