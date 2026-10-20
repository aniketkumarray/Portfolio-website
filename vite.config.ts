import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath, URL } from 'node:url'
import { projectSlugs } from './src/data/slugs'

const SITE_URL = process.env.VITE_SITE_URL ?? 'https://aniketkumarray.vercel.app'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: SITE_URL,
      dynamicRoutes: projectSlugs.map((slug) => `/projects/${slug}`),
      changefreq: 'monthly',
    }),
    mode === 'analyze' &&
      visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true, open: true }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          gsap: ['gsap', 'gsap/ScrollTrigger'],
          motion: ['framer-motion'],
        },
      },
    },
  },
}))
