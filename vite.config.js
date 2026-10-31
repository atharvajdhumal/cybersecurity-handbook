import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    preserveSymlinks: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('src/data/domainsData')) {
            return 'data-domains';
          }
          if (id.includes('src/data/cyberArenaData')) {
            return 'data-arena';
          }
          if (id.includes('src/data/arsenalData')) {
            return 'data-arsenal';
          }
          if (id.includes('src/data/roadmapData') || id.includes('src/data/hallOfInfamyData')) {
            return 'data-reference';
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
