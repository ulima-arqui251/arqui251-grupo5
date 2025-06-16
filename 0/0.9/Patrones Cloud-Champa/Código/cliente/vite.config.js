import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// server permite configurar el puerto y que use cors.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true
  }
})
