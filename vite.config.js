import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '0444-182-185-169-68.ngrok-free.app'
    ],
  },
})
