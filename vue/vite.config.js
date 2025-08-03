import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/forecast': {
        target: 'http://localhost:8001/api/forecast',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/forecast/, ''),
      },
    },
  },
})
