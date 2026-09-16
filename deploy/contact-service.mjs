import { createServer } from 'node:http'
import { Readable } from 'node:stream'
import { onRequestPost } from '../functions/api/contact.js'

const port = Number(process.env.PORT ?? 3001)
const MAX_BODY_BYTES = 16_384

function requestFromNode(request, body) {
  const origin = `http://${request.headers.host ?? 'localhost'}`
  return new Request(new URL(request.url ?? '/', origin), {
    method: request.method,
    headers: request.headers,
    body: body.length ? body : undefined,
  })
}

function writeResponse(response, result) {
  const headers = Object.fromEntries(result.headers.entries())
  response.writeHead(result.status, headers)
  if (!result.body) return response.end()
  Readable.fromWeb(result.body).pipe(response)
}

const server = createServer(async (request, response) => {
  if (request.url !== '/api/contact') {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    return response.end('Not Found')
  }
  if (request.method !== 'POST') {
    response.writeHead(405, { Allow: 'POST', 'Content-Type': 'application/json' })
    return response.end(JSON.stringify({ error: 'Method not allowed.' }))
  }
  if (Number(request.headers['content-length']) > MAX_BODY_BYTES) {
    response.writeHead(413, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
    return response.end(JSON.stringify({ error: 'Request too large.' }))
  }

  try {
    const chunks = []
    let size = 0
    for await (const chunk of request) {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        response.writeHead(413, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
        return response.end(JSON.stringify({ error: 'Request too large.' }))
      }
      chunks.push(chunk)
    }
    const result = await onRequestPost({
      request: requestFromNode(request, Buffer.concat(chunks)),
      env: process.env,
    })
    return writeResponse(response, result)
  } catch (error) {
    console.error('contact service:', error)
    response.writeHead(500, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
    return response.end(JSON.stringify({ error: 'Unable to process this request.' }))
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`HABIBCORE contact service listening on 127.0.0.1:${port}`)
})
