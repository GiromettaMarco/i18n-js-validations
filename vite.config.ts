import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: 'src/validation.ts',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
  },
})
