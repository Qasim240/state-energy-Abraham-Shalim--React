import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [react(), flowbiteReact()],
  server: {
    allowedHosts: [
      'e66e-39-37-143-62.ngrok-free.app'
    ],
  },
})