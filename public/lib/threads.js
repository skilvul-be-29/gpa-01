import { API_URL } from '../constants/API_URL.js';
import { getComments } from './comments.js';
import { getUser } from './users.js';

export async function createThread(title, content, userId, createdAt = new Date()) {
  const response = await fetch(`${API_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content, userId, createdAt }),
  });
  return response.json();
}

export async function getThread(id) {
  const response = await fetch(`${API_URL}/threads/${id}`);
  const thread = await response.json();

  const [user, comments] = await Promise.all([getUser(thread.userId), getComments(thread.id)]);
  return Object.assign(thread, { userId: undefined, user, comments });
}

export async function getThreads() {
  const response = await fetch(`${API_URL}/threads`);
  const threads = await response.json();

  for (const thread of threads) {
    const [user, comments] = await Promise.all([getUser(thread.userId), getComments(thread.id)]);
    Object.assign(thread, { userId: undefined, user, comments });
  }

  return threads;
}
