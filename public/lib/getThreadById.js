import { API_URL } from '../constants/constants.js';

export async function getThreadById(id) {
  const response = await fetch(`${API_URL}/threads/${id}`);
  return response.json();
}
