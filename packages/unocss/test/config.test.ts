import fs from 'node:fs/promises'
import os from 'node:os'

import { createGenerator } from '@unocss/core'
import { resolve } from 'pathe'
import { afterEach, describe, expect, it, onTestFinished, vi } from 'vitest'

import { useConfig } from '../src'

describe('config', () => {
  afterEach(async () => {
    vi.restoreAllMocks()
  })

  it('should generate correct css', async () => {
    const uno = await createGenerator(useConfig({}))

    const { css } = await uno.generate([])

    expect(css).toMatchSnapshot()
  })

  it('should generate correct css with fonts options', async () => {
    const osTmpDir = os.tmpdir()
    const tmpDir = await fs.mkdtemp(resolve(osTmpDir, 'unocss-preset-'))
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir)
    onTestFinished(() => fs.rm(tmpDir, { recursive: true, force: true }))

    const uno = await createGenerator(
      useConfig({
        fonts: {
          sans: 'Inter',
        },
      }),
    )

    const { css } = await uno.generate(['font-sans'])

    expect(css).toMatchSnapshot()
  })

  it('should generate correct css with icons options', async () => {
    const uno = await createGenerator(
      useConfig({
        icons: {
          collections: {
            custom: {
              test: '<svg></svg>',
            },
          },
        },
      }),
    )

    const { css } = await uno.generate(['i-custom:test'])

    expect(css).toMatchSnapshot()
  })
})
