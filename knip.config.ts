import type { KnipConfig } from 'knip'

export default {
  ignoreDependencies: [
    'eslint-flat-config-utils',
    'stylelint-config-html',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss',
    'stylelint-order',
    'stylelint-plugin-use-baseline',
  ],
} satisfies KnipConfig
