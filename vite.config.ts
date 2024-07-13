import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: resolve('src/index.ts'),
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
  },
  plugins: [dts({ rollupTypes: true })],
})
