import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tsconfigPaths()
  ],
  server: {
    port: 3000,
    proxy: {
      '/proxy': {
        target: 'https://pub-5ba95de8cc2f4dada22bfe563b284734.r2.dev',
        rewrite: (path) => path.replace(/^\/proxy/, ''),
        secure: false,
        changeOrigin: true
      },
    }
  }
})