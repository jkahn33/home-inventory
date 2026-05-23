// home-inventory-front-end/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Must be 8080 to match FastAPI!
        changeOrigin: true,
        // Remove rewrite line if your FastAPI code explicitly listens to "@app.get('/api')"
      }
    }
  }
})