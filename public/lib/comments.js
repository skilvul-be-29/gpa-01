import { API_URL } from '../constants/API_URL.js';
import { getUser } from './users.js';

export async function getComments(threadId) {
  const response = await fetch(`${API_URL}/threads/${threadId}/comments`);
  const comments = await response.json();

  for (const comment of comments) {
    const user = await getUser(comment.userId);
    Object.assign(comment, { user });
  }

  return comments;
}

export async function createComment(content, userId, threadId, createdAt = new Date()) {
  const response = await fetch(`${API_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, userId, threadId, createdAt }),
  });
  return response.json();
}
