import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'Biscuit AI — Telegram Bot Design | Habib',
  description: 'A production-ready Telegram bot built around GLM-4.7. Intelligent chat, Notion library, image generation, and cost visibility — all in one conversational interface.',
  openGraph: {
    title: 'Biscuit AI — Telegram Bot Design | Habib',
    description: 'A production-ready Telegram bot built around GLM-4.7. Intelligent chat, Notion library, image generation, and cost visibility — all in one conversational interface.',
    url: 'https://habibcore.com/projects/biscuit-ai',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Biscuit AI — Telegram Bot Design | Habib' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biscuit AI — Telegram Bot Design | Habib',
    description: 'A production-ready Telegram bot built around GLM-4.7. Intelligent chat, Notion library, image generation, and cost visibility — all in one conversational interface.',
    images: ['/og-image.png'],
  },
}

export default function BiscuitAI() {
  return (
    <ProjectLayout
      title="Biscuit AI — Telegram Bot Design"
      heroImage="/projects/biscuit-ai/hero.jpg"
      heroAlt="Biscuit AI Telegram bot interface"
      meta={{
        category:   'Design',
        year:       '2026',
        client:     'Self-initiated',
        role:       'Product Design · UX Research · Development',
        tools:      ['Python', 'python-telegram-bot', 'GLM-4.7', 'Notion API', 'Stability AI', 'Render'],
        tags:       ['Product Design', 'UX Research', 'Bot Development', 'Documentation'],
        githubUrl:  'https://github.com/Thelostbiscuitt/biscuit-ai',
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                GLM-4.7 is a capable model with real-time web search built in. The problem
                was the interface — accessing it meant opening a browser, navigating to the
                platform, and working inside a UI that wasn't designed around how anyone
                actually works.
              </p>
              <p>
                That friction is a design problem. Switching contexts to a browser tab,
                navigating complex web interfaces, losing conversation history, a poor mobile
                experience — none of this is inevitable. It's just what happens when no one
                treats the interface as the product.
              </p>
            </>
          ),
        },
        {
          number:  '02',
          heading: 'The shift',
          body: (
            <>
              <p>
                Move the model into the app that's already open all day. Telegram is on every
                device, instant, and familiar. The interface decisions were made in the same
                order as any other design project — problem first, solution second,
                implementation last.
              </p>
              <p>Six UX decisions that defined the product:</p>
              <ul>
                <li><strong style={{color:'var(--white)'}}>Smart pagination</strong> — long responses split into navigable chunks. The conversation breathes rather than collapsing under a wall of text.</li>
                <li><strong style={{color:'var(--white)'}}>Natural language triggers</strong> — say "books" or "notion" to retrieve your saved library. The interface meets language, not the other way around.</li>
                <li><strong style={{color:'var(--white)'}}>Honest uncertainty</strong> — if the bot can't verify a fact, it says so. Configured deliberately for trust, not just safety.</li>
                <li><strong style={{color:'var(--white)'}}>Cost visibility</strong> — /stats surfaces token usage and estimated cost at any point. Users deserve to know what's happening on their behalf.</li>
                <li><strong style={{color:'var(--white)'}}>Command architecture</strong> — power features behind slash commands. Casual conversation stays conversational.</li>
                <li><strong style={{color:'var(--white)'}}>Multi-modal integration</strong> — image generation, PDF uploads, and web search within the same conversational flow.</li>
              </ul>
            </>
          ),
        },
        {
          number:  '03',
          heading: 'Architecture',
          body: (
            <>
              <p>
                Every message enters through a single handler router in <code style={{fontFamily:'var(--font-mono)',fontSize:'13px',color:'var(--orange)'}}>main.py</code> that
                classifies intent and routes accordingly: conversational input goes to
                the LLM router, "books"/"notion" triggers the Notion handler, <code style={{fontFamily:'var(--font-mono)',fontSize:'13px',color:'var(--orange)'}}>/image</code> routes
                to the image handler. The response layer handles pagination, cost
                tracking, and delivery uniformly regardless of source.
              </p>
              <p>
                Deployed as a background worker on Render. Async throughout using
                httpx — no blocking on API calls.
              </p>
            </>
          ),
        },
        {
          number:  '04',
          heading: 'The outcome',
          body: (
            <>
              <p>
                A production-ready Telegram bot with intelligent chat, smart pagination,
                Notion library integration, image generation, and cost visibility.
                Self-initiated and actively used daily.
              </p>
              <p>
                The interface decisions were made in the same order as any other design
                project — problem first, solution second, implementation last. The result
                is a tool that fits the actual day rather than demanding you reshape the
                day around the tool.
              </p>
            </>
          ),
        },
      ]}
      screenshots={[]}
      next={{
        slug:     'meal-planning-bot',
        category: 'Design',
        title:    'Meal Planning Bot — Telegram Kitchen Assistant',
      }}
    />
  )
}
