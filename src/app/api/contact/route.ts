import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY: HTML escape function to prevent XSS attacks
// ─────────────────────────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY: Simple in-memory rate limiting (resets on server restart)
// For production, consider using Upstash Redis or similar
// ─────────────────────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per window per IP

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetIn: entry.resetTime - now };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count, resetIn: entry.resetTime - now };
}

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY: Input validation with length limits
// ─────────────────────────────────────────────────────────────────────────────
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254; // RFC 5321 max
const MAX_MESSAGE_LENGTH = 5000;

function validateInput(name: string, email: string, message: string): { valid: boolean; error?: string } {
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { valid: false, error: "All fields are required." };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return { valid: false, error: `Name must be ${MAX_NAME_LENGTH} characters or less.` };
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    return { valid: false, error: `Email must be ${MAX_EMAIL_LENGTH} characters or less.` };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less.` };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email address." };
  }

  return { valid: true };
}

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ──
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || req.headers.get("x-real-ip") 
      || "unknown";
    
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateCheck.resetIn / 1000)),
          }
        }
      );
    }

    const body = await req.json();
    const { name, email, message } = body;

    // ── Input validation ──
    const validation = validateInput(name, email, message);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // ── Sanitize inputs for email HTML ──
    const sanitizedName = escapeHtml(name.trim());
    const sanitizedEmail = escapeHtml(email.trim().toLowerCase());
    const sanitizedMessage = escapeHtml(message.trim());

    // --- EMAIL TRANSPORT ---
    // If RESEND_API_KEY or SMTP env vars are set, use them.
    // Otherwise we log and return success (for local/demo).
    // To wire up Resend: npm install resend, add RESEND_API_KEY to .env.local
    // To wire up Nodemailer SMTP: npm install nodemailer, add SMTP_* vars to .env.local

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL  = process.env.CONTACT_EMAIL ?? "hello@michael.dev";

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from:    "Portfolio Contact <noreply@michael.dev>",
          to:      [CONTACT_EMAIL],
          subject: `New enquiry from ${sanitizedName}`,
          html: `
            <p><strong>From:</strong> ${sanitizedName} &lt;${sanitizedEmail}&gt;</p>
            <p><strong>Message:</strong></p>
            <p>${sanitizedMessage.replace(/\n/g, "<br>")}</p>
          `,
          reply_to: sanitizedEmail,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
      }
    } else {
      // Development fallback — log to console (sanitized)
      console.log("[Contact Form]", { name: sanitizedName, email: sanitizedEmail });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
