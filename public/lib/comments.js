import { API_URL } from '../constants/API_URL.js';

export async function getComments(threadId) {
  const response = await fetch(`${API_URL}/threads/${threadId}/comments`);
  return response.json();
}
