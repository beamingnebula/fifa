import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'trophy.svg', 'apple-touch-icon.png', 'trophy-192.png', 'trophy-512.png'],
      manifest: {
        name: 'FIFA World Cup 2026',
        short_name: 'WC2026',
        description: 'Premium FIFA World Cup 2026 companion app — live scores, fixtures, standings, teams, highlights, and interactive world map.',
        theme_color: '#C8102E',
        background_color: '#0D0D1A',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'trophy-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'trophy-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'trophy.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/site\.api\.espn\.com\/apis\/site\/v2\/sports\/soccer\/fifa\.world\/scoreboard.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'espn-api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 5 // 5 minutes
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
})
