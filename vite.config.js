import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    // To increase chunk size warning limit (e.g., to 1000 kB)
    chunkSizeWarningLimit: 1000,

    // Rollup options to manually split chunks
    rollupOptions: {
      output: {
        
      }
    }
  }
})
