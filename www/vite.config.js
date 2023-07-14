import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import wasm from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  plugins: [
    vue(),
    wasm(),
  ],
  server: {
    port: 8080,
    proxy: {
      '/^api/': 'http://localhost:8010',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: '../dist',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
})
