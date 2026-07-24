import { Resend } from 'resend'
import { NextResponse } from 'next/server'

function getResend(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(process.env.RESEND_API_KEY)
}

/** Escape the five HTML special characters to prevent XSS in email templates. */
function esc(str: unknown): string {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, projectType, timeline, brief } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    // Basic email format guard — Resend will also validate but good to fail fast
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const safeName        = esc(name)
    const safeEmail       = esc(email)
    const safeTimeline    = esc(timeline)
    const safeBrief       = esc(brief)
    const safeProjectType = Array.isArray(projectType)
      ? projectType.map(esc).join(', ')
      : '—'

    const resend = getResend()

    const { error } = await resend.emails.send({
      from:    'Portfolio Contact <onboarding@resend.dev>',
      // Once habibcore.com is verified in Resend, change to:
      // from: 'Habib <contact@habibcore.com>',
      to:      'habib@habibcore.com',
      reply_to: email,
      subject: `New enquiry from ${safeName}`,
      html: `
        <div style="font-family: monospace; max-width: 560px; color: #111;">
          <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin-bottom: 24px;">
            New project enquiry — habibcore.com
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
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px;">${safeProjectType || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #888; font-size: 11px;">Timeline</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px;">${safeTimeline || '—'}</td>
            </tr>
          </table>

          ${safeBrief ? `
            <p style="font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #888; margin-bottom: 8px;">Brief</p>
            <p style="font-size: 13px; line-height: 1.7; background: #f5f5f5; padding: 16px; border-radius: 4px;">${safeBrief}</p>
          ` : ''}
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API route error:', err)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
