import { apiRequest } from './api.js'

// Try-on history (only exists when the user chose to save a result)
export const getHistory = (token) => apiRequest('/api/history', { token })
export const deleteHistory = (token, id) => apiRequest(`/api/history/${id}`, { method: 'DELETE', token })
export async function getHistoryImageBlob(token, id) {
  const res = await apiRequest(`/api/history/${id}/image`, { token, raw: true })
  return res.blob()
}

// Contact form
export const sendContactMessage = (data) => apiRequest('/api/contact', { method: 'POST', body: data })
