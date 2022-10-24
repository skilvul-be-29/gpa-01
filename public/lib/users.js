import { API_URL } from '../constants/API_URL.js';

export async function createUser(username, password) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

export async function getUser(id) {
  const response = await fetch(`${API_URL}/users/${id}`);
  return response.json();
}

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
}
