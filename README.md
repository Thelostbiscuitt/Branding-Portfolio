# Michael Oguntimehin — Portfolio

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| Icons | Lucide React |
| Fonts | Space Grotesk + Syne (next/font/google) |
| Utils | clsx + tailwind-merge |

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout — fonts, metadata, globals
│   ├── page.tsx          # Home page — assembles all sections
│   └── globals.css       # Global styles + Tailwind directives
├── components/
│   ├── layout/
│   │   ├── CustomCursor.tsx    # Spring-following custom cursor
│   │   ├── Navbar.tsx          # Fixed nav + mobile menu
│   │   ├── Footer.tsx          # Footer with social links
│   │   ├── ScrollProgress.tsx  # Top scroll progress bar
│   │   ├── ScrollToTop.tsx     # Floating scroll-to-top button
│   │   └── SectionDots.tsx     # Side section indicator dots
│   ├── sections/
│   │   ├── Hero.tsx            # Hero with parallax + avatar ring
│   │   ├── About.tsx           # Bio, skills grid, fun pills
│   │   ├── Projects.tsx        # Filterable project cards grid
│   │   └── Contact.tsx         # Contact form + social links
│   └── ui/
│       ├── OffsetCard.tsx      # Reusable card with blue shadow
│       ├── RevealOnScroll.tsx  # Scroll-triggered fade-in wrapper
│       └── SectionHeader.tsx   # Consistent section titles
├── hooks/
│   ├── useActiveSection.ts     # Tracks which section is in view
│   └── useReducedMotion.ts     # Respects prefers-reduced-motion
└── lib/
    ├── data.ts                 # All project data + constants
    └── utils.ts                # cn() helper + scrollToSection
public/
└── logo.png                    # Your logo (replace with final asset)
```

## Before Deploying — Checklist

- [ ] Replace social links in `Footer.tsx` and `Contact.tsx` with real URLs
- [ ] Update `hello@michael.dev` email with real address
- [ ] Add Behance profile URL to the "View More" button in `Projects.tsx`
- [ ] Wire contact form to a real email service (Resend, Formspree, or EmailJS)
- [ ] Update `og:url` in `layout.tsx` with real domain
- [ ] Add Behance URL for the Leadway Pensure project in `lib/data.ts`
- [ ] Replace `public/logo.png` with optimised final logo asset if needed

## Wiring the Contact Form (Recommended: Resend)

```bash
npm install resend
```

Create `src/app/api/contact/route.ts`:

```ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  await resend.emails.send({
    from: "portfolio@yourdomain.com",
    to: "hello@michael.dev",
    subject: `New message from ${name}`,
    text: `From: ${email}\n\n${message}`,
  });
  return NextResponse.json({ ok: true });
}
```

Then update `Contact.tsx` to POST to `/api/contact` on submit.

## Deployment

Recommended: [Vercel](https://vercel.com) — zero config for Next.js.

```bash
npm install -g vercel
vercel
```
