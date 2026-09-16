import test from 'node:test'
import assert from 'node:assert/strict'
import { readdir, readFile, access } from 'node:fs/promises'
import path from 'node:path'

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const name = path.join(directory, entry.name)
    return entry.isDirectory() ? sourceFiles(name) : /\.(ts|tsx)$/.test(name) ? [name] : []
  }))
  return nested.flat()
}

test('local project and generated media references exist in public', async () => {
  const missing = []
  for (const file of await sourceFiles('src')) {
    const text = await readFile(file, 'utf8')
    for (const match of text.matchAll(/['"](\/(?:projects|generated)\/[^'"]+\.(?:jpg|jpeg|png|webp|svg|mp4))['"]/g)) {
      const asset = path.join('public', decodeURIComponent(match[1]))
      try { await access(asset) } catch { missing.push(`${file}: ${match[1]}`) }
    }
  }
  assert.deepEqual(missing, [])
})
