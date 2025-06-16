import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '8beb-39-37-159-122.ngrok-free.app'
    ],
  },
})
