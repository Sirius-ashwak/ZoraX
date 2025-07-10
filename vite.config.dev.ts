import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Development configuration with Replit host allowance
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@contracts': path.resolve(__dirname, './artifacts/contracts'),
      process: 'process/browser',
      buffer: 'buffer',
      util: 'util',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
    allowedHosts: 'all',
    hmr: {
      clientPort: 443,
    },
  },
});