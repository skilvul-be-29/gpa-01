import { API_URL } from '../constants/API_URL.js';

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
  return response.json();
}

export async function getThreads() {
  const response = await fetch(`${API_URL}/threads`);
  const threads = await response.json();
  return threads.reverse();
}
