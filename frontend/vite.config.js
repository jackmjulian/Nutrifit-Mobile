import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import the plugin
import eslintPlugin from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

const manifestForPlugin = {
  registerType: 'prompt',
  includedAssets: ['favicon.ico', 'apple-touch-icon.png', 'logo-flavicon.svg'],
  manifest: {
    name: 'Nutrifit-Mobile',
    short_name: 'nutrifit-Mobile',
    description:
      'Nutrifit Mobile App to track your diet and fitness activities',
    icons: [
      {
        src: '/public/images/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/public/images/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/public/images/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/public/images/logo-flavicon.svg',
        sizes: '512x512',
        type: 'image/svg',
        purpose: 'image/svg',
      },
      {
        src: '/public/images/logo-flavicon.svg',
        sizes: '512x512',
        type: 'image/svg',
        purpose: 'any',
      },
    ],
    theme_color: '#181818',
    background_color: '#e0cc3b',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Nutrifit-Mobile',
        short_name: 'nutrifit-Mobile',
        description:
          'Nutrifit Mobile App to track your diet and fitness activities',
        icons: [
          {
            src: '/public/images/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'favicon',
          },
          {
            src: '/public/images/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'favicon',
          },
          {
            src: '/public/images/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon',
          },
          {
            src: '/public/images/logo-flavicon.svg',
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'image/svg',
          },
          {
            src: '/public/images/logo-flavicon.svg',
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'any',
          },
        ],
        theme_color: '#181818',
        background_color: '#e0cc3b',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
      },
    }),
    eslintPlugin({
      // setup the plugin
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
      '/uploads': 'http://localhost:8000',
    },
  },
});

// Original
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
