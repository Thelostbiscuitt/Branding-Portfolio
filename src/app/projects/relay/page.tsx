import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'Relay: Operations Portal | Habib',
  description: 'A complete operations rebuild for an immigration firm\u2019s relationship managers: role-scoped data, an append-only audit trail enforced by the database, working-days SLA clocks, and an in-browser CRS calculator.',
  openGraph: {
    title: 'Relay: Operations Portal | Habib',
    description: 'Role-scoped data, an append-only audit trail enforced by the database, working-days SLA clocks, and an in-browser CRS calculator.',
    url: 'https://habibcore.com/projects/relay',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Relay: Operations Portal | Habib' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Relay: Operations Portal | Habib',
    description: 'A complete operations rebuild for an immigration firm\u2019s relationship managers.',
    images: ['/og-image.png'],
  },
}

export default function Relay() {
  return (
    <ProjectLayout
      title="Relay: Operations Portal"
      heroImage="/projects/relay/cover.svg"
      tone="dark"
      heroAlt="Relay: a typographic cover for an internal operations portal build"
      meta={{
        category:  'Product · Systems',
        year:      '2026',
        client:    'Client — immigration firm',
        role:      'Product Design · Systems · Full-stack Engineering',
        tools:     ['Next.js 16', 'TypeScript', 'PostgreSQL + pgvector', 'Prisma 7', 'Tailwind v4', 'JWT (jose)'],
        tags:      ['CRM', 'RBAC', 'Audit Trail', 'SLA Systems', 'CRS Calculator'],
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                Immigration relationship managers run their entire practice through this
                portal: client records, document checklists, roadmap requests with legal
                deadlines, and the CRS score that decides what a client qualifies for.
                The system they had worked, mostly — until the details started to matter.
              </p>
              <p>
                In the previous build, a single query that forgot its scope filter could
                list every client in the system. Not an attack — one missing WHERE clause
                out of thirty. But a client list is not something this system is allowed
                to leak, and &ldquo;mostly&rdquo; is not a security posture.
              </p>
            </>
          ),
        },
        {
          number:  '02',
          heading: 'The rebuild',
          body: (
            <>
              <p>
                A full rebuild on new foundations, with the business logic that had
                already earned trust ported rather than rewritten. The decisions that
                define it:
              </p>
              <ul>
                <li><strong style={{color:'var(--black)'}}>Roles are a table, not a boolean.</strong> Admin, RM, quality assurance and final-level are seeded rows; what a role can see is a column on the role, so narrowing one later is a seed change instead of a rewrite of every query.</li>
                <li><strong style={{color:'var(--black)'}}>A route&rsquo;s path prefix is not a permission.</strong> Every data-layer function that reads or writes on someone&rsquo;s behalf takes a request context and calls the permission check. A function that cannot be passed one cannot sit behind a guarded route.</li>
                <li><strong style={{color:'var(--black)'}}>The audit trail is append-only, enforced by Postgres.</strong> A trigger rejects updates and deletes; corrections are appended, never edited — and a script proves the guarantee against the live database rather than taking it on trust.</li>
                <li><strong style={{color:'var(--black)'}}>The SLA clock does not pause.</strong> Roadmap requests are due ten working days out — weekends and Nigerian public holidays excluded. Holidays are entered, not computed, because lunar-calendar dates are declared days in advance and a guessed holiday would silently shift every due date that spans it.</li>
                <li><strong style={{color:'var(--black)'}}>The CRS point tables are data.</strong> Every published number lives in one table file, and the calculator runs entirely in the browser: nothing is sent anywhere, nothing is stored.</li>
              </ul>
            </>
          ),
        },
        {
          number:  '03',
          heading: 'The outcome',
          body: (
            <>
              <p>
                Designed, engineered, tested, and delivered as a complete rebuild. The
                firm did not adopt it before I left — what ships is their decision, and
                by then it was out of my hands. What carried forward is the thinking:
                several of the rebuild&rsquo;s design decisions informed the CRM and
                mobile app the firm continued with.
              </p>
              <p>
                For me it stands as the fullest expression of the range: not a landing
                page, not a bot — business software where the consequences of a wrong
                query are real, and the design work is making the correct behaviour the
                easy one.
              </p>
            </>
          ),
        },
      ]}
      aiWorkflow={{
        intro:
          'The one piece inherited rather than rebuilt was the assistant. Everything else in the AI column here is the database doing the guarding.',
        tools: [
          {
            name: 'Groq + Tavily',
            use:  'The client-facing assistant, ported unchanged from the previous system because it worked.',
          },
          {
            name: 'Postgres itself',
            use:  'Append-only triggers, role visibility as data, cascade rules — the guarantees live in the database, and verify scripts prove them against a live instance.',
          },
          {
            name: 'Claude Code',
            use:  'Scaffolding and migration work, with the verify scripts as the definition of done: nothing counted as finished until the database could prove it.',
          },
        ],
        outcome:
          'No adoption metrics here — the honest number is zero, and the case for the work rests on the architecture, not on usage.',
      }}
      /* Shot list for sanitized captures (no client data), when the firm's
         confidentiality allows publishing:
           1. sc-dashboard — the RM overview
           2. sc-client    — a client record with checklist and call logs
           3. sc-roadmap   — a roadmap request with the working-days SLA clock
           4. sc-crs       — the in-browser CRS calculator
           5. sc-audit     — the append-only audit trail
         Drop captures into /public/projects/relay/ then list them here. */
      screenshots={[]}
    />
  )
}