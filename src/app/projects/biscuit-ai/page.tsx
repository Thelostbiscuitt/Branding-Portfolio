import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'Biscuit AI: Telegram Bot Design | Habib',
  description: 'A production-ready Telegram assistant built on OpenRouter. Layered memory you can inspect and erase, Tavily web search, a local book library, image generation, and cost visibility, all in one conversation.',
  openGraph: {
    title: 'Biscuit AI: Telegram Bot Design | Habib',
    description: 'A production-ready Telegram assistant built on OpenRouter. Layered memory you can inspect and erase, Tavily web search, a local book library, image generation, and cost visibility, all in one conversation.',
    url: 'https://habibcore.com/projects/biscuit-ai',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Biscuit AI: Telegram Bot Design | Habib' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biscuit AI: Telegram Bot Design | Habib',
    description: 'A production-ready Telegram assistant built on OpenRouter. Layered memory you can inspect and erase, Tavily web search, a local book library, image generation, and cost visibility, all in one conversation.',
    images: ['/og-image.png'],
  },
}

export default function BiscuitAI() {
  return (
    <ProjectLayout
      title="Biscuit AI: Telegram Bot Design"
      heroImage="/projects/biscuit-ai/hero.jpg"
      heroAlt="Biscuit AI Telegram bot interface"
      meta={{
        category:   'Design',
        year:       '2026',
        client:     'Self-initiated',
        role:       'Product Design · UX Research · Development',
        tools:      ['Python', 'python-telegram-bot', 'OpenRouter (MiniMax M3)', 'Tavily', 'Hugging Face', 'SQLite', 'systemd / Render'],
        tags:       ['Product Design', 'UX Research', 'Bot Development', 'Documentation'],
        githubUrl:  'https://github.com/Thelostbiscuitt/BiscuitBot',
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                The strongest models are always one browser tab away, and that tab is the
                problem. Accessing a capable LLM meant opening a browser, navigating to the
                platform, and working inside a UI that wasn't designed around how anyone
                actually works.
              </p>
              <p>
                That friction is a design problem. Switching contexts to a browser tab,
                navigating complex web interfaces, losing conversation history, a poor mobile
                experience. None of this is inevitable. It's just what happens when no one
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
                order as any other design project: problem first, solution second,
                implementation last.
              </p>
              <p>The UX decisions that defined the product:</p>
              <ul>
                <li><strong style={{color:'var(--white)'}}>Smart pagination</strong>: long responses split into navigable chunks. The conversation breathes rather than collapsing under a wall of text.</li>
                <li><strong style={{color:'var(--white)'}}>Natural language triggers</strong>: say "books" or "library" to retrieve your saved shelf. The interface meets language, not the other way around.</li>
                <li><strong style={{color:'var(--white)'}}>Memory you can inspect and erase</strong>: Biscuit only remembers what you say explicitly — never what it infers. <code style={{fontFamily:'var(--font-mono)',fontSize:'13px',color:'var(--orange)'}}>/memory</code> shows everything it holds, <code style={{fontFamily:'var(--font-mono)',fontSize:'13px',color:'var(--orange)'}}>/forget</code> removes any of it. A memory you can't see is a memory you can't trust.</li>
                <li><strong style={{color:'var(--white)'}}>Honest uncertainty</strong>: if the bot can't verify a fact, it says so. Configured deliberately for trust, not just safety.</li>
                <li><strong style={{color:'var(--white)'}}>Cost visibility</strong>: <code style={{fontFamily:'var(--font-mono)',fontSize:'13px',color:'var(--orange)'}}>/stats</code> surfaces token usage and estimated cost at any point. Users deserve to know what's happening on their behalf.</li>
                <li><strong style={{color:'var(--white)'}}>Command architecture</strong>: power features behind slash commands. Casual conversation stays conversational.</li>
                <li><strong style={{color:'var(--white)'}}>Multi-modal integration</strong>: image generation, PDF uploads, photo OCR, and Tavily web search within the same conversational flow.</li>
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
                the LLM router — OpenRouter with Tavily web search as a tool, and an
                automatic fallback model on rate limits or outages — "books"/"library"
                triggers the per-user book store, <code style={{fontFamily:'var(--font-mono)',fontSize:'13px',color:'var(--orange)'}}>/image</code> routes to the image
                handler, and a photo routes to OCR. The response layer handles pagination,
                cost tracking, and delivery uniformly regardless of source.
              </p>
              <p>
                Context is layered, not dumped: recent messages, a rolling conversation
                summary, and capped long-term memory in the system prompt. The memory system
                is deliberately small — explicit statements only, SQLite, keyword-overlap
                retrieval, a hard cap on what reaches the prompt. Transparent and debuggable
                rather than clever.
              </p>
              <p>
                Deployed as a systemd service on a VPS (Render background worker as an
                alternative). Async throughout using httpx. No blocking on API calls.
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
                A production-ready assistant with intelligent chat, persistent conversations,
                layered memory with full user control, a per-user book library, real-time web
                search, image generation, photo OCR, and cost visibility.
                Self-initiated and actively used daily.
              </p>
              <p>
                The interface decisions were made in the same order as any other design
                project: problem first, solution second, implementation last. The result
                is a tool that fits the actual day rather than demanding you reshape the
                day around the tool.
              </p>
            </>
          ),
        },
      ]}
      aiWorkflow={{
        intro:
          'Built with the same kind of tool it exposes. The bot is a wrapper around a model, so most of the real work was prompt design, and most of the code was reviewed rather than typed.',
        tools: [
          {
            name: 'Claude Code',
            use:  'Scaffolded the handler router and the pagination logic, then read line by line before commit. The architecture decisions stayed mine.',
          },
          {
            name: 'OpenRouter (MiniMax M3)',
            use:  "The product's own model, prompted against its failure modes during development to find where it would rather guess than admit it could not verify something.",
          },
          {
            name: 'RCTF prompting',
            use:  'Role, Context, Task, Format. The same structure I teach, applied to the system prompt the bot runs on.',
          },
        ],
        outcome:
          'AI wrote a good deal of the code and none of the decisions. Every behaviour a user actually touches, pagination, cost visibility, honest uncertainty, was specified first and generated second.',
      }}
      /* Shot list for real UI captures (from the live bot — do not fabricate):
           1. sc-chat.jpg        — a casual exchange showing pagination "Read More" buttons
           2. sc-memory.jpg      — /memory output followed by /forget removing an item
           3. sc-library.jpg     — "books" trigger returning the per-user shelf
           4. sc-web-search.jpg  — a web-search answer stating what it could not verify
           5. sc-stats.jpg       — /stats with token usage and estimated cost
         Drop captures into /public/projects/biscuit-ai/ with these names, then list them here. */
      screenshots={[]}
      next={{
        slug:     'chef4me',
        category: 'Design',
        title:    'Chef4Me: Telegram Kitchen Assistant',
      }}
    />
  )
}
