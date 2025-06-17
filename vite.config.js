import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [react(), flowbiteReact()],
  server: {
    allowedHosts: [
      '3e88-39-37-159-122.ngrok-free.app'
    ],
  },
})