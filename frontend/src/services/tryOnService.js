import { apiRequest } from './api.js'

// The AI model runs on the backend (or a provider it calls). The frontend only
// sends the photo + garment image and shows whatever the backend returns.

export const getTryOnStatus = () => apiRequest('/api/tryon/status')

export function analyzePhoto(photoBlob) {
  const form = new FormData()
  form.append('person', photoBlob, 'photo.jpg')
  return apiRequest('/api/tryon/analyze', { method: 'POST', form })
}

export async function generateTryOn({ photoBlob, garment, saveHistory, token, signal }) {
  // Load the garment photo so it can be sent to the model.
  const garmentRes = await fetch(garment.image)
  if (!garmentRes.ok) throw new Error('Could not load the garment image.')
  const garmentBlob = await garmentRes.blob()

  const form = new FormData()
  form.append('person', photoBlob, 'photo.jpg')
  form.append('garment', garmentBlob, 'garment.jpg')
  form.append('product_id', garment.id)
  form.append('product_name', garment.name)
  form.append('category', garment.category)
  form.append('description', garment.description)
  form.append('save_history', saveHistory ? 'true' : 'false')
  return apiRequest('/api/tryon', { method: 'POST', form, token, signal })
}

// Try on a garment image the user uploaded themselves.
export function generateCustomTryOn({ photoBlob, garment, saveHistory, token, signal }) {
  const form = new FormData()
  form.append('person', photoBlob, 'photo.jpg')
  form.append('garment', garment.blob, 'garment.jpg')
  form.append('product_id', 'custom')
  form.append('product_name', garment.description?.trim() ? `My garment: ${garment.description.trim()}` : 'My garment')
  form.append('category', garment.category)
  form.append('description', garment.description?.trim() || 'a garment')
  form.append('save_history', saveHistory ? 'true' : 'false')
  return apiRequest('/api/tryon', { method: 'POST', form, token, signal })
}
