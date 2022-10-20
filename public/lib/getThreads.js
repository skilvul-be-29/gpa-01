import { API_URL } from '../constants/constants.js';

export async function getThreads() {
  const response = await fetch(`${API_URL}/threads`);
  return response.json();
};
