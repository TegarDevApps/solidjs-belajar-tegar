import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    solidPlugin(),
  ],
  optimizeDeps: {
    include: ["ag-grid-community", "ag-grid-solid"]
  },
  build: {
    target: "esnext"
  }
})
