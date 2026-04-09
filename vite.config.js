import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 1000, // increase warning limit (1MB)

    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ['react', 'react-dom'],
          uiVendor: ['framer-motion'], // animation lib
          chartVendor: ['recharts'] // if you use charts
        }
      }
    }
  }
})