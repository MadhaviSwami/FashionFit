// Small wrapper around fetch for talking to the Flask backend.
// In development, Vite forwards /api to http://127.0.0.1:5000 (see vite.config.js).
// Set VITE_API_URL to point at a different backend (e.g. in production).
const API_BASE = import.meta.env.VITE_API_URL || ''

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message)
    this.status = status
    this.data = data
  }
}

export const OFFLINE_MESSAGE =
  'Cannot reach the Fashion Fit server. Make sure the backend is running (see README).'

export async function apiRequest(path, { method = 'GET', body, form, token, raw = false, signal } = {}) {
  const headers = {}
  if (token) headers.Authorization = `Bearer ${token}`
  let payload
  if (form) {
    payload = form
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    payload = JSON.stringify(body)
  }

  let response
  try {
    response = await fetch(`${API_BASE}${path}`, { method, headers, body: payload, signal })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError(OFFLINE_MESSAGE, 0)
  }

  if (raw && response.ok) return response

  let data = null
  const type = response.headers.get('content-type') || ''
  if (type.includes('application/json')) {
    data = await response.json().catch(() => null)
  }
  if (!response.ok) {
    // The Vite proxy answers with 500/502/504 and no JSON when Flask is not running.
    if (!data && [500, 502, 503, 504].includes(response.status)) {
      throw new ApiError(OFFLINE_MESSAGE, 0)
    }
    throw new ApiError(data?.error || `Request failed (${response.status}).`, response.status, data)
  }
  return data
}
