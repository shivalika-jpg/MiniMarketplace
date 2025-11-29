const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export async function apiFetch(path, options = {}) {
  const headers = options.headers || {};
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
