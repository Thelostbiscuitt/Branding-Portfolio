# Habib — Portfolio

Personal portfolio and case study site for Habib, creative director and developer based in Lagos.

Built with Next.js 16, TypeScript, and CSS Modules. Deployed on Vercel. Contact form powered by Resend.

---

## Getting started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=your_resend_api_key_here
```

Get your API key from the [Resend dashboard](https://resend.com/api-keys). This is required for the contact form to send emails.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

---

## Project structure

```
src/
├── app/
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout, site metadata, and font loading (next/font)
│   ├── page.tsx                 # Homepage
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # Contact form API endpoint
│   └── projects/
│       ├── biscuit-ai/
│       ├── leadway-pensure/
│       ├── skaame-epk/
│       ├── layo-isaac-epk/
│       ├── blvckoreo-epk/
│       └── 1ethfp/
├── components/
│   ├── Nav/
│   ├── Hero/
│   ├── Stats/
│   ├── Ticker/
│   ├── Work/
│   ├── ProjectCard/
│   ├── About/
│   ├── Contact/
│   ├── Footer/
│   └── ProjectLayout/           # Shared template for all project pages
└── data/
    └── projects.ts              # Project index data
```

---

## Adding a new project

### 1. Add images

Place project images in `/public/projects/your-project-slug/`:

```
public/
└── projects/
    └── your-project-slug/
        ├── hero.jpg          # Used as card thumbnail and page hero
        ├── sc-01.png         # Screenshots (name them however you like)
        └── sc-02.png
```

Recommended image sizes:
- `hero.jpg` — 1600×900px minimum, JPG for photos
- Screenshots — actual resolution, PNG or JPG both fine

### 2. Add to the project index

Open `src/data/projects.ts` and add an entry to the `projects` array:

```ts
{
  slug:     'your-project-slug',   // Must match the folder name in /projects/
  index:    '07',                  // Display number
  category: 'Design',              // 'Brand' | 'Design' | 'Collab'
  title:    'Project Name — Subtitle',
  tags:     ['Tag One', 'Tag Two', 'Tag Three'],
  thumb:    '/projects/your-project-slug/hero.jpg',
  // featured: true,               // Uncomment to make this card full-width
}
```

### 3. Create the project page

Create `src/app/projects/your-project-slug/page.tsx`:

```tsx
import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'Project Name | Habib',
  description: 'One sentence describing this project.',
}

export default function YourProject() {
  return (
    <ProjectLayout
      title="Project Name — Subtitle"
      heroImage="/projects/your-project-slug/hero.jpg"
      heroAlt="Description of the hero image"
      meta={{
        category: 'Design',
        year:     '2026',
        client:   'Client Name',
        role:     'Designer · Developer',
        tools:    ['Figma', 'Next.js'],
        tags:     ['Deliverable One', 'Deliverable Two'],
        liveUrl:  'https://example.com',      // optional
        githubUrl: 'https://github.com/...',  // optional
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: <p>Describe the problem this project solved.</p>,
        },
        {
          number:  '02',
          heading: 'The approach',
          body: <p>Describe how you approached it.</p>,
        },
        {
          number:  '03',
          heading: 'The outcome',
          body: <p>Describe what was delivered and its impact.</p>,
        },
      ]}
      screenshots={[
        { src: '/projects/your-project-slug/sc-01.png', alt: 'Description' },
        { src: '/projects/your-project-slug/sc-02.png', alt: 'Description' },
      ]}
      next={{
        slug:     'next-project-slug',
        category: 'Brand',
        title:    'Next Project Title',
      }}
    />
  )
}
```

The `next` prop is optional — leave it out if this is the last project.

---

## Contact form

The contact form at `POST /api/contact` accepts:

| Field         | Type       | Required |
|---------------|------------|----------|
| `name`        | `string`   | Yes      |
| `email`       | `string`   | Yes      |
| `projectType` | `string[]` | No       |
| `timeline`    | `string`   | No       |
| `brief`       | `string`   | No       |

Emails are sent to the address configured in `src/app/api/contact/route.ts`.

### Updating the sender address

Once your domain is verified in Resend, update the `from` field in `route.ts`:

```ts
// Before
from: 'Portfolio Contact <onboarding@resend.dev>',

// After
from: 'Habib <contact@habibcore.com>',
```

---

## Deployment

The site is deployed on [Vercel](https://vercel.com). Every push to `main` triggers a production deployment automatically.

### Environment variables on Vercel

Go to your project in the Vercel dashboard → **Settings** → **Environment Variables** and add:

| Variable          | Value                  | Environments              |
|-------------------|------------------------|---------------------------|
| `RESEND_API_KEY`  | Your Resend API key    | Production, Preview, Dev  |

### Custom domain

To connect `habibcore.com`:

1. Go to your Vercel project → **Settings** → **Domains**
2. Add `habibcore.com` and `www.habibcore.com`
3. Follow the DNS instructions Vercel provides
4. Update the `url` field in `src/app/layout.tsx` metadata if the domain ever changes

---

## Fonts

The site uses three typefaces loaded via Google Fonts:

- **Syne** (400, 600, 700, 800) — headings and display text
- **DM Sans** (300, 400, 500) — body copy and form elements
- **DM Mono** (300, 400, 500) — labels, eyebrows, navigation, tags

Fonts are loaded via `next/font/google` in `src/app/layout.tsx`, which self-hosts the font files at build time (no external request to Google Fonts at runtime, no render-blocking `@import`). Each typeface is exposed as a CSS variable (`--font-display`, `--font-body`, `--font-mono`) consumed throughout `globals.css` and the component stylesheets. No third-party font package is required beyond `next/font`, which ships with Next.js.

---

## Tech stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Framework    | Next.js 16 (App Router)     |
| Language     | TypeScript                  |
| Styling      | CSS Modules                 |
| Images       | next/image                  |
| Email        | Resend                      |
| Deployment   | Vercel                      |

---

## Scripts

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start local development server     |
| `npm run build`   | Build for production               |
| `npm run start`   | Start production server locally    |
| `npm run lint`    | Run ESLint                         |

---

## License

All content, case studies, and project work belong to Habib. The codebase structure may be referenced but not redistributed as a template.
