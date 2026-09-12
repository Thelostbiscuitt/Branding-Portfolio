/* Habibcore Sound — stream the set from R2 instead of the site bundle.
   URL stays transparent: /Music/<slug>.mp3 → object <slug>.mp3 in the
   habibcore-sound bucket. Range-aware (seek still works), cached at the
   edge for a year, bytes never touch an app origin. Masters stay private
   in a separate "habibcore-masters" bucket. */
export async function onRequest({ request, env, params }) {
  const raw = params.file ?? '';
  const key = raw.endsWith('.mp3') ? raw : `${raw}.mp3`;
  if (!/^[a-z0-9-]+\.mp3$/.test(key)) return new Response("Bad Request", { status: 400 });

  // R2 get() needs { offset, length } — parse the Range header ourselves
  // ("bytes=0-1023", "bytes=512-", "bytes=-500" all handled).
  let range;
  const m = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("Range") ?? '');
  if (m) {
    const [, a, b] = m;
    if (a === '' && b !== '') range = { offset: undefined, length: Number(b), suffix: true };
    else if (a !== '') range = { offset: Number(a), length: b !== '' ? Number(b) - Number(a) + 1 : undefined };
  }
  if (range?.suffix) {
    const head = await env.SOUND_BUCKET.head(key);
    if (!head) return new Response("Not Found", { status: 404 });
    range = { offset: Math.max(0, head.size - range.length), length: Math.min(range.length, head.size) };
  }
  const obj = range
    ? await env.SOUND_BUCKET.get(key, { range })
    : await env.SOUND_BUCKET.get(key);
  if (!obj) return new Response("Not Found", { status: 404 });

  const headers = new Headers({
    "Content-Type": "audio/mpeg",
    "Cache-Control": "public, max-age=31536000, immutable",
    "Accept-Ranges": "bytes",
    "ETag": obj.httpEtag,
  });

  if (obj.range) {
    const start = obj.range.offset;
    const end = obj.range.end ?? obj.size - 1;
    headers.set("Content-Range", `bytes ${start}-${end}/${obj.size}`);
    headers.set("Content-Length", String(end - start + 1));
    return new Response(obj.body, { status: 206, headers });
  }
  headers.set("Content-Length", String(obj.size));
  return new Response(obj.body, { status: 200, headers });
}
