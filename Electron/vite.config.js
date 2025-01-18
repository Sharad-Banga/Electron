import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
      buffer: 'buffer',
    }
  },
  define: {
    'process.env': {},
    'global': 'globalThis',
    'Buffer': ['buffer', 'Buffer'],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
});
