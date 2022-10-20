import { API_URL } from '../constants/API_URL.js';

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}
