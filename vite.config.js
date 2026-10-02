import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: '/',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
    strictPort: !!process.env.PORT,
  },
  preview: {
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
    strictPort: !!process.env.PORT,
  },
  // gsap ships untyped-ESM files Node can't import directly; bundle it
  // into the SSR build instead of leaving it external.
  ssr: {
    noExternal: ['gsap'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    // Client manifest tells scripts/prerender.js which CSS each lazy
    // route needs, so prerendered subpages are styled before JS runs.
    manifest: !isSsrBuild,
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
            manualChunks(id) {
              if (!id.includes('node_modules')) return
              if (id.includes('gsap')) return 'gsap'
              if (id.includes('react-router')) return 'router'
              if (id.includes('react-dom') || id.includes('/react/')) return 'react'
            },
          },
    },
  },
}))
