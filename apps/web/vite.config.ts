import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    /* Sitemap({
      hostname: 'https://eaoverseas.com',
      generateRobotsTxt: true,
      dynamicRoutes: [
        '/about',
        '/colleges',
        '/countries',
        '/blogs',
        '/contact-us',
        '/courses',
      ]
    }) */
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@workspace/common": path.resolve(__dirname, "../../packages/common/src"),
      "@workspace/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
})
