import { defineConfig } from 'vite'
import { vitePlugin as remix } from "@remix-run/dev";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"],
    }),
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