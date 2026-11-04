import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// During development, requests to /api are forwarded to the Flask backend,
// so the frontend never needs to know API keys or the backend address.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // 127.0.0.1 (not "localhost") so Vite notices if another app already uses
    // the port and picks the next free one instead of silently sharing it.
    host: '127.0.0.1',
    port: 5180,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
})
