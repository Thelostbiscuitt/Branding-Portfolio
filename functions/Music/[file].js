/* Habibcore Sound — stream the set from R2 instead of the site bundle.
   URL stays transparent: /Music/<slug>.mp3 → object <slug>.mp3 in the
   habibcore-sound bucket. Range-aware (seek still works), cached at the
   edge for a year, bytes never touch an app origin. Masters stay private
   in a separate "habibcore-masters" bucket. */
function safeIndex(value) {
  if (!value) return null;
  const number = Number(value);
  return Number.isSafeInteger(number) ? number : NaN;
}

function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);
  if (!match || (!match[1] && !match[2]) || size === 0) return null;
  const first = safeIndex(match[1]);
  const last = safeIndex(match[2]);
  if (Number.isNaN(first) || Number.isNaN(last)) return null;
  if (first === null) {
    if (!last) return null;
    return { start: Math.max(0, size - last), end: size - 1 };
  }
  const end = Math.min(last ?? size - 1, size - 1);
  if (first >= size || first > end) return null;
  return { start: first, end };
}

function audioResponse(obj, range, headOnly) {
  const headers = new Headers({
    "Content-Type": "audio/mpeg",
    "Cache-Control": "public, max-age=31536000, immutable",
    "Accept-Ranges": "bytes",
    "ETag": obj.httpEtag,
  });
  if (range) {
    headers.set("Content-Range", `bytes ${range.start}-${range.end}/${obj.size}`);
    headers.set("Content-Length", String(range.end - range.start + 1));
  } else {
    headers.set("Content-Length", String(obj.size));
  }
  return new Response(headOnly ? null : obj.body, { status: range ? 206 : 200, headers });
}

export async function onRequest({ request, env, params }) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const raw = params.file ?? "";
  const key = raw.endsWith(".mp3") ? raw : `${raw}.mp3`;
  if (!/^[a-z0-9-]+\.mp3$/.test(key)) return new Response("Bad Request", { status: 400 });

  const requestedRange = request.headers.get("Range");
  const metadata = requestedRange || request.method === "HEAD" ? await env.SOUND_BUCKET.head(key) : null;
  if ((requestedRange || request.method === "HEAD") && !metadata) return new Response("Not Found", { status: 404 });
  const range = requestedRange ? parseRange(requestedRange, metadata.size) : null;
  if (requestedRange && !range) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${metadata.size}`, "Accept-Ranges": "bytes" } });
  }
  let obj = metadata;
  if (request.method === "GET") {
    const options = range ? { range: { offset: range.start, length: range.end - range.start + 1 } } : undefined;
    obj = await env.SOUND_BUCKET.get(key, options);
  }
  if (!obj) return new Response("Not Found", { status: 404 });
  return audioResponse(obj, range, request.method === "HEAD");
}
