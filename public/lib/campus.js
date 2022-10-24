import { API_URL } from '../constants/API_URL.js';

export async function getCampus(id) {
  const response = await fetch(`${API_URL}/campus/${id}`);
  return response.json();
}

export async function getCampuses() {
  const response = await fetch(`${API_URL}/campus`);
  return response.json();
}
