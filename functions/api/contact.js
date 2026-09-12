/* Habibcore — enquiry endpoint (Cloudflare Pages Function).
   The site is a static export (next.config.mjs → output: "export"), so there is
   no server runtime to host an API route; /api/contact is served from here, the
   same mechanism that streams the sound set from R2.

   Two emails go out through Resend:

     1. the enquiry itself  → habib@habibcore.com   (reply-to = the enquirer)
     2. an acknowledgement  → the enquirer          (automated follow-up)

   The acknowledgement is best-effort. Resend will only deliver to arbitrary
   addresses once habibcore.com is verified on the account, so a failure there
   is logged and swallowed: the enquiry notification is the one that must not be
   lost. Failure mode is "degrade", never "block" — a broken courtesy email must
   not cost the portfolio a real lead.

   Uses the Resend REST API via fetch() rather than the resend SDK: no bundling,
   no node-compat layer, consistent with functions/Music/[file].js.

   Requires the Pages secret RESEND_API_KEY.
   Optional: CONTACT_FROM — set to "Habib <contact@habibcore.com>" once the
   domain is verified, which also switches the acknowledgement on. */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Habibcore <onboarding@resend.dev>";
const TO = "habib@habibcore.com";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

/** Escape the five HTML special characters so nothing user-supplied injects markup. */
function esc(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function send(key, payload) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Resend responded ${res.status}`);
  return data;
}

function notificationHtml({ safeName, safeEmail, safeProjectType, safeTimeline, safeBrief }) {
  return `
    <div style="font-family: monospace; max-width: 560px; color: #111;">
      <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin-bottom: 24px;">
        New project enquiry · habibcore.com
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 11px; width: 120px;">Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 11px;">Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px;">
            <a href="mailto:${safeEmail}" style="color: #E8660A;">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 11px;">Project type</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px;">${safeProjectType || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 11px;">Timeline</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px;">${safeTimeline || 'Not specified'}</td>
        </tr>
      </table>

      ${safeBrief ? `
        <p style="font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #888; margin-bottom: 8px;">Brief</p>
        <p style="font-size: 13px; line-height: 1.7; background: #f5f5f5; padding: 16px; border-radius: 4px;">${safeBrief}</p>
      ` : ''}
    </div>
  `;
}
function acknowledgementHtml({ safeName, safeProjectType, safeTimeline }) {
  return `
    <div style="font-family: monospace; max-width: 560px; color: #111;">
      <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin-bottom: 24px;">
        Habibcore · habibcore.com
      </p>

      <p style="font-size: 14px; line-height: 1.7; margin-bottom: 20px;">
        ${safeName}, your message arrived. Thank you.
      </p>

      <p style="font-size: 13px; line-height: 1.7; color: #444; margin-bottom: 24px;">
        I read every enquiry myself and usually reply within 24 hours. Nothing else
        is needed from you in the meantime.
      </p>

      ${(safeProjectType || safeTimeline) ? `
        <p style="font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #888; margin-bottom: 8px;">What you sent</p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          ${safeProjectType ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888; font-size: 11px; width: 120px;">Project type</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-size: 13px;">${safeProjectType}</td>
            </tr>` : ''}
          ${safeTimeline ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #888; font-size: 11px;">Timeline</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-size: 13px;">${safeTimeline}</td>
            </tr>` : ''}
        </table>
      ` : ''}

      <p style="font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #888; margin-bottom: 8px;">Direct</p>
      <p style="font-size: 13px; line-height: 1.7;">
        <a href="mailto:habib@habibcore.com" style="color: #E8660A;">habib@habibcore.com</a><br />
        <a href="https://wa.me/2347013573240" style="color: #E8660A;">WhatsApp +234 701 357 3240</a>
      </p>

      <p style="font-size: 11px; color: #999; margin-top: 32px;">Habib · Designer &amp; Builder · Lagos</p>
    </div>
  `;
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Malformed request." }, 400);
  }

  const { name, email, projectType, timeline, brief } = body ?? {};

  if (!name || !email) {
    return json({ error: "Name and email are required." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }
  if (!env.RESEND_API_KEY) {
    console.error("contact: RESEND_API_KEY is not configured");
    return json({ error: "Mail is not configured. Please email habib@habibcore.com directly." }, 500);
  }

  const from = env.CONTACT_FROM || DEFAULT_FROM;
  const safeName = esc(name);
  const safeEmail = esc(email);
  const safeTimeline = esc(timeline);
  const safeBrief = esc(brief);
  const safeProjectType = Array.isArray(projectType)
    ? projectType.map(esc).join(", ")
    : "Not specified";

  // 1. The enquiry. If this fails the visitor is told, and offered a fallback.
  try {
    await send(env.RESEND_API_KEY, {
      from,
      to: TO,
      reply_to: email,
      subject: `New enquiry from ${safeName}`,
      html: notificationHtml({ safeName, safeEmail, safeProjectType, safeTimeline, safeBrief }),
    });
  } catch (err) {
    console.error("contact: notification failed:", err.message);
    return json({ error: "Could not send your message. Please email habib@habibcore.com directly." }, 502);
  }

  // 2. The courtesy acknowledgement. Best-effort: an unverified sending domain
  //    rejects it, and that must never turn a delivered enquiry into an error.
  try {
    await send(env.RESEND_API_KEY, {
      from,
      to: email,
      reply_to: TO,
      subject: "Your message reached Habibcore",
      html: acknowledgementHtml({ safeName, safeProjectType, safeTimeline }),
    });
  } catch (err) {
    console.error("contact: acknowledgement skipped:", err.message);
  }

  return json({ success: true });
}


