import type { Preflight, Preset, SourceCodeTransformer, UserConfig } from '@unocss/core'
import presetIcons, { type IconsOptions } from '@unocss/preset-icons'
import presetWebFonts, { type WebFontsOptions } from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import presetWind, { type PresetWind4Options, type Theme } from '@unocss/preset-wind4'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export interface Config extends UserConfig<Theme> {
  icons?: IconsOptions
  fonts?: WebFontsOptions['fonts']
  wind?: PresetWind4Options
}

export function useConfig(config: Config = {}): UserConfig<Theme> {
  const { icons, fonts, wind, ...userConfig } = config

  const presets: Preset<Theme>[] = [
    presetWind(wind),
    presetIcons(icons),
    presetWebFonts({
      processors: createLocalFontProcessor(),
      fonts,
    }),
  ]

  const transformers: SourceCodeTransformer[] = [
    transformerDirectives(),
    transformerVariantGroup(),
  ]

  const preflight: Preflight<Theme> = {
    layer: 'default',
    getCSS: () => 'html, body, #app {height: 100%;}',
  }

  return {
    presets,
    transformers,
    preflights: [preflight],
    ...userConfig,
  }
}

export default useConfig()
