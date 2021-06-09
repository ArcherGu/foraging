import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents from "vite-plugin-components";
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons';
import ViteWindiCSS from 'vite-plugin-windicss';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0'
    },
    plugins: [
        vue(),

        ViteComponents({
            extensions: ["vue"],
            customComponentResolvers: ViteIconsResolver({
                componentPrefix: '',
            }),
        }),

        ViteIcons(),

        ViteWindiCSS(),

        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Foraging',
                short_name: 'Foraging',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/pwa-250x250.png',
                        sizes: '250x250',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-300x300.png',
                        sizes: '300x300',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-300x300.png',
                        sizes: '300x300',
                        type: 'image/png',
                        purpose: 'maskable any',
                    },
                ],
            },
        }),
    ]
});
