import { defineConfig } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default defineConfig({
    base: './', // Generate relative paths for assets
  
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html'), // Main entry
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "./sass/_variables.scss";', // Example for shared styles
      },
    },
    postcss: {
      plugins: [autoprefixer(), cssnano()],
    },
  },
  server: {
    open: true, // Automatically opens the app in your browser
  },
});