/// <reference types="vitest/config" />
import { copyFileSync } from 'node:fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'unplugin-dts/vite'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
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
  plugins: [
    dts({
      bundleTypes: true,
      copyDtsFiles: true,
      afterBuild: () => {
        copyFileSync('dist/i18n-js-validations.d.ts', 'dist/i18n-js-validations.d.cts')
      },
    }),
  ],
  test: {
    coverage: {
      provider: 'v8',
      enabled: true,
      include: ['src/**'],
    },
  },
})
