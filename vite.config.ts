import { vitePlugin as remix, cloudflareDevProxyVitePlugin as remixCloudflareDevProxy } from "@remix-run/dev";
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths()
  ]
})