import test from 'node:test'
import assert from 'node:assert/strict'
import { onRequestPost } from '../functions/api/contact.js'
import { onRequest } from '../functions/Music/[file].js'

function enquiry(body, headers = {}) {
  return new Request('https://habibcore.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

test('contact rejects malformed, oversized, and wrongly typed enquiries', async () => {
  const env = { RESEND_API_KEY: 'test' }
  const malformed = await onRequestPost({ request: enquiry({ name: {}, email: ['a@b.com'] }), env })
  assert.equal(malformed.status, 400)
  const oversized = await onRequestPost({
    request: enquiry({ name: 'A', email: 'a@b.com', brief: 'x'.repeat(20_000) }, { 'Content-Length': '1' }), env,
  })
  assert.equal(oversized.status, 413)
  const wrongType = await onRequestPost({ request: new Request('https://habibcore.com/api/contact', { method: 'POST', body: 'x' }), env })
  assert.equal(wrongType.status, 415)
})

test('contact escapes HTML and sends a validated enquiry', async () => {
  const originalFetch = globalThis.fetch
  const payloads = []
  globalThis.fetch = async (_url, options) => {
    payloads.push(JSON.parse(options.body))
    return new Response('{}', { status: 200 })
  }
  try {
    const response = await onRequestPost({
      request: enquiry({ name: '<Habib>', email: 'person@example.com', brief: '<script>alert(1)</script>', projectType: ['Web'] }),
      env: { RESEND_API_KEY: 'test' },
    })
    assert.equal(response.status, 200)
    assert.equal(payloads.length, 2)
    assert.match(payloads[0].html, /&lt;script&gt;/)
    assert.doesNotMatch(payloads[0].html, /<script>/)
    assert.equal(payloads[0].reply_to, 'person@example.com')
  } finally {
    globalThis.fetch = originalFetch
  }
})

const sound = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
const bucket = {
  async head(key) { return key === 'song.mp3' ? { size: sound.length, httpEtag: '"test"' } : null },
  async get(key, options) {
    if (key !== 'song.mp3') return null
    const start = options?.range?.offset ?? 0
    const end = start + (options?.range?.length ?? sound.length)
    return { size: sound.length, httpEtag: '"test"', body: new Blob([sound.slice(start, end)]).stream() }
  },
}
const audioRequest = (method = 'GET', range) => onRequest({
  request: new Request('https://habibcore.com/Music/song.mp3', { method, headers: range ? { Range: range } : {} }),
  env: { SOUND_BUCKET: bucket }, params: { file: 'song.mp3' },
})

test('audio serves complete, bounded, suffix, and HEAD responses', async () => {
  const full = await audioRequest()
  assert.equal(full.status, 200)
  assert.equal((await full.arrayBuffer()).byteLength, 10)
  const partial = await audioRequest('GET', 'bytes=8-99')
  assert.equal(partial.status, 206)
  assert.equal(partial.headers.get('Content-Range'), 'bytes 8-9/10')
  assert.deepEqual(new Uint8Array(await partial.arrayBuffer()), new Uint8Array([8, 9]))
  const suffix = await audioRequest('GET', 'bytes=-3')
  assert.equal(suffix.headers.get('Content-Range'), 'bytes 7-9/10')
  const head = await audioRequest('HEAD')
  assert.equal(head.status, 200)
  assert.equal(head.body, null)
})

test('audio rejects invalid ranges and methods', async () => {
  for (const range of ['bytes=9-8', 'bytes=10-', 'bytes=-0', 'bytes=0-1,4-5', 'bytes=999999999999999999999-']) {
    const response = await audioRequest('GET', range)
    assert.equal(response.status, 416, range)
    assert.equal(response.headers.get('Content-Range'), 'bytes */10')
  }
  assert.equal((await audioRequest('POST')).status, 405)
})
