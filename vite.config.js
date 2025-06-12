import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '89ed-39-37-159-122.ngrok-free.app'
    ],
  },
})
