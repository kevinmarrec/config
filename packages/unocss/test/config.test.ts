import { describe, expect, it } from 'vitest'

import { useConfig } from '../src'

describe('config', () => {
  it('should use @kevinmarrec/unocss-preset', () => {
    expect(useConfig().presets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: '@kevinmarrec/unocss-preset',
        }),
      ]),
    )
  })
})
