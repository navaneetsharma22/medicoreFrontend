import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 1000, // increase warning limit (1MB)

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'reactVendor';
            if (id.includes('framer-motion')) return 'uiVendor';
            if (id.includes('recharts')) return 'chartVendor';
            return 'vendor';
          }
        }
      }
    }
  }
})