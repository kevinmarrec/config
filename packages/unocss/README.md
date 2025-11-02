# @kevinmarrec/unocss-config

## Description

Opinionated [UnoCSS](https://unocss.dev) [config](https://unocss.dev/config).

## Opinions

- Supports all [UnoCSS config](https://unocss.dev/config) options

- Uses the following opinionated [UnoCSS preset](#preset) by default:
  - Extends the following official presets:
    - [UnoCSS Wind preset](https://unocss.dev/presets/wind)
    - [UnoCSS Icons preset](https://unocss.dev/presets/icons)
    - [UnoCSS Web Fonts preset](https://unocss.dev/presets/web-fonts) (with [local fonts](https://unocss.dev/presets/web-fonts#serve-fonts-locally) enabled)

  - Extends the following official transformers:
    - [UnoCSS Directives transformer](https://unocss.dev/transformers/directives)
    - [UnoCSS Variant group transformer](https://unocss.dev/transformers/variant-group)

  - Adds a custom layer to enforce full height on top-level elements:

    ```css
    /* layer: default */
    html,
    body,
    #app {
      height: 100%;
    }
    ```

- Hoists `fonts` and `icons` preset options to the config level

## Usage

> Requires [UnoCSS](https://unocss.dev) v66 _or later_.

### Default

```ts
// uno.config.ts
export { default } from '@kevinmarrec/unocss-config'
```

### Extended

```ts
// uno.config.ts
import { useConfig } from '@kevinmarrec/unocss-config'

export default useConfig({ /* options */ })
```
