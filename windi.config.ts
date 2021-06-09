import { defineConfig } from 'windicss/helpers';

export default defineConfig({
    attributify: true,
    extract: {
        include: [
            'index.html',
            'src/**/*.{vue,ts}',
        ],
    },
    darkMode: 'class'
});
