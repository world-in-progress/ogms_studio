import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            react(),
            tailwindcss(),
        ],
        server: {
            fs: {
                allow: ['..', '../src/'],
            },
            proxy: {
                '/local': {
                    target: env.VITE_LOCAL_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/local/, ''),
                },
                '/remote': {
                    target: env.VITE_REMOTE_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/remote/, ''),
                },
                '/model': {
                    target: env.VITE_MODEL_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/model/, ''),
                },
                '/resource': {
                    target: env.VITE_RESOURCE_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/resource/, ''),
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "@scenario": path.resolve(process.cwd(), "./scenario"),
            },
        },
        optimizeDeps: {
            include: ['react', 'react-dom'],
        },
        worker: {
            format: 'es',
        },
    }
})  
