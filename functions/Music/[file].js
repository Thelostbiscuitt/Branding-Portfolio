/* Habibcore Sound — stream the set from R2 instead of the site bundle.
   URL stays transparent: /Music/<slug>.mp3 → object <slug>.mp3 in the
   habibcore-sound bucket. Range-aware (seek still works), cached at the
   edge for a year, bytes never touch an app origin. Masters stay private
   in a separate "habibcore-masters" bucket. */
export async function onRequest({ request, env, params }) {
  const key = params.file;
  if (!/^[a-z0-9-]+\.mp3$/.test(key)) return new Response("Bad Request", { status: 400 });

  const range = request.headers.get("Range") || undefined;
  const obj = await env.SOUND_BUCKET.get(key, { range });
  if (!obj) return new Response("Not Found", { status: 404 });

  const headers = new Headers({
    "Content-Type": "audio/mpeg",
    "Cache-Control": "public, max-age=31536000, immutable",
    "Accept-Ranges": "bytes",
    "ETag": obj.httpEtag,
    "Content-Length": String(obj.size),
  });

  if (obj.range) {
    const start = obj.range.offset;
    const end = obj.range.end ?? obj.size - 1;
    headers.set("Content-Range", `bytes ${start}-${end}/${obj.size}`);
    return new Response(obj.body, { status: 206, headers });
  }
  return new Response(obj.body, { status: 200, headers });
}
