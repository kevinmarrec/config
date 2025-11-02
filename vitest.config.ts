import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['eslint', 'stylelint', 'unocss'].map((name, idx) => ({
      test: {
        name: {
          label: name,
          color: (['blue', 'white', 'red'] as const)[idx],
        },
        include: [`packages/${name}/test/**/*.test.ts`],
      },
    })),
    reporters: ['verbose'],
    coverage: {
      include: ['packages/*/src/**/*.ts'],
      reporter: ['text', 'text-summary'],
    },
  },
})
