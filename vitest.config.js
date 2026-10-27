import { defineConfig } from 'vitest/config'

// Tests only. The site build uses vite.config.js.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
})
