import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Attendance Manager',
        short_name: 'Attendance',
        description: 'Maintain your attendance',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          }
          // ,
          // {
          //   src: '/icon-512x512.png',
          //   sizes: '512x512',
          //   type: 'image/png'
          // }
        ]
      }
    })
  ],
   base: '/attend/'
});
