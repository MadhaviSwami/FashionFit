import { apiRequest } from './api.js'

export const signup = (name, email, password) =>
  apiRequest('/api/auth/signup', { method: 'POST', body: { name, email, password } })

export const login = (email, password) =>
  apiRequest('/api/auth/login', { method: 'POST', body: { email, password } })

export const fetchMe = (token) => apiRequest('/api/auth/me', { token })

export const updateProfile = (token, name) =>
  apiRequest('/api/auth/me', { method: 'PATCH', body: { name }, token })

export const deleteAccount = (token) => apiRequest('/api/auth/me', { method: 'DELETE', token })
