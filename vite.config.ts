import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteWindiCSS from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    vue(),

    Components({
      extensions: ['vue'],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    Icons(),

    ViteWindiCSS(),

    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Foraging',
        short_name: 'Foraging',
        theme_color: '#8b5cf6',
        icons: [
          {
            src: '/300x300.png',
            sizes: '300x300',
            type: 'image/png',
          }
        ],
      },
      workbox: {
        disableDevLogs: true,
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps|ico|webp)/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
            },
          },
        ],
      },
    }),
  ]
})
