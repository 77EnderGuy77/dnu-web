import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/dnu-web/',
  plugins: [react()],
  server: {
    open: '/dnu-web/'
  }
})