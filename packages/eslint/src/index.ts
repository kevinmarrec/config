import { antfu, type ConfigNames, type TypedFlatConfigItem } from '@antfu/eslint-config'
import defu from 'defu'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'
import { globSync } from 'tinyglobby'

type Options = Parameters<typeof antfu>[0]
type UserConfig = Parameters<typeof antfu>[1]

export function useConfig(options: Options = {}, ...userConfigs: UserConfig[]): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const [unoConfig] = globSync('**/uno.config.ts', { absolute: true })

  if (options.unocss !== false && unoConfig) {
    options.unocss = true
  }

  if (options.unocss) {
    options.unocss = defu(options.unocss, {
      attributify: false,
      strict: true,
    })
  }

  return antfu(defu<NonNullable<Options>, Options[]>(options, {
    formatters: true,
    ignores: options.ignores,
    vue: {
      a11y: true,
      overrides: {
        'vue/no-unused-properties': 'error',
        'vue-a11y/label-has-for': ['error', {
          required: {
            some: ['nesting', 'id'],
          },
        }],
      },
    },
    rules: {
      'antfu/if-newline': ['off'],
      'import/consistent-type-specifier-style': ['off'],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'perfectionist/sort-imports': ['error', {
        groups: [
          ['value-builtin', 'type-builtin'],
          ['value-external', 'type-external'],
          ['value-internal', 'type-internal'],
          ['value-parent', 'type-parent', 'value-sibling', 'type-sibling', 'value-index', 'type-index'],
          'side-effect',
          'ts-equals-import',
          'unknown',
        ],
        type: 'natural',
      }],
    },
    settings: {
      unocss: {
        configPath: unoConfig,
      },
    },
  }), ...userConfigs)
}

export default useConfig()
