import fs from 'node:fs/promises'

import { defineConfig } from 'bumpp'

const versionRegex = /"version": "(.*?)"/g

async function bumpLockfile(newVersion: string) {
  const lockFile = await fs.readFile('bun.lock', 'utf-8')
  await fs.writeFile('bun.lock', lockFile.replace(
    versionRegex,
    `"version": "${newVersion}"`,
  ))
}

export default defineConfig({
  all: true,
  recursive: true,
  execute: ({ state: { newVersion } }) => bumpLockfile(newVersion),
})
