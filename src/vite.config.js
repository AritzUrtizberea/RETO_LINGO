import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
    ],
    // La configuración 'server' va AQUÍ, fuera del array 'plugins'
    server: { 
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
        },
    },
});
