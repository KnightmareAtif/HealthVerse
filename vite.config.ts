import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const modules = ['react', 'react-router-dom', 'framer-motion'];
            for (const module of modules) {
              if (id.includes(module)) {
                return module;
              }
            }
            return 'vendor';
          }
        },
      },
      chunkSizeWarningLimit: 500, // Adjust this value if needed
    },
  },
});