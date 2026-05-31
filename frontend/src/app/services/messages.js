import { API_BASE_URL } from "../config/api";

export async function fetchPublicMessages() {
  const response = await fetch(`${API_BASE_URL}/message/public`);
  if (!response.ok) return [];

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function createMessage({ nickname, content, isPublic }) {
  return fetch(`${API_BASE_URL}/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname, content, isPublic }),
  });
}
