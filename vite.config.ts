import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(import.meta.dirname, 'index.html'),
          products: path.resolve(import.meta.dirname, 'products.html'),
          productDetails: path.resolve(import.meta.dirname, 'product-details.html'),
          cart: path.resolve(import.meta.dirname, 'cart.html'),
          checkout: path.resolve(import.meta.dirname, 'checkout.html'),
          success: path.resolve(import.meta.dirname, 'success.html'),
          about: path.resolve(import.meta.dirname, 'about.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
