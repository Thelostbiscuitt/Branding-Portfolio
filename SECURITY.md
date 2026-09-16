# Security policy

The portfolio is a static Next.js export on Cloudflare Pages. The only server
code in this repository is the Pages contact function and the R2 audio
function. Report suspected vulnerabilities to habib@habibcore.com with a
description and reproduction steps.

## Controls in this repository

- `public/_headers` supplies the production Content Security Policy, frame
  protection, MIME sniffing protection, referrer policy, and device permission
  restrictions. Production scripts do not require `unsafe-eval`.
- `functions/api/contact.js` accepts JSON requests up to 16 KiB, validates
  field types and lengths, escapes user text before putting it into email HTML,
  and keeps the Resend key in the Cloudflare `RESEND_API_KEY` secret.
- `functions/Music/[file].js` allows only slug-like MP3 object keys and
  validates byte ranges before asking R2 for a stream.
- `.env` and `.env*.local` are ignored. There are no credentials committed
  in application source.
- `npm audit --audit-level=moderate`, `npm test`, and `npm run lint`
  are available as local checks. The dependency audit reported zero known
  vulnerabilities on 2026-09-16.

## Deployment controls still needed

- The public contact endpoint has no distributed rate limit in application
  code. Configure a Cloudflare WAF rate rule for `/api/contact` to limit
  automated mail abuse. An in-memory counter in a Pages Function would not
  enforce a site-wide limit.
- The static export currently needs `script-src 'unsafe-inline'` for Next
  hydration scripts and the small session bootstrap for the loader. The CSP
  does not use `unsafe-eval`. Moving to script hashes or nonces requires a
  compatible export and deployment pipeline.
- There is no CSP violation reporting endpoint and no automated security CI
  gate in this repository. Run the checks above before deployment and verify
  response headers on the deployed Pages site.

Set `RESEND_API_KEY` as a Cloudflare Pages secret, not a public variable.
`CONTACT_FROM` is optional and should name a verified sender domain before
the acknowledgement email is enabled. Rotate the key if it is ever exposed.
