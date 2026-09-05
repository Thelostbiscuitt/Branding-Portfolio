import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'Chef4Me: Telegram Kitchen Assistant | Habib',
  description: 'An AI kitchen assistant for Telegram. Tracks ingredients and expiry dates, and suggests meals from 40+ cuisines via Google Gemini, all through chat commands.',
  openGraph: {
    title: 'Chef4Me: Telegram Kitchen Assistant | Habib',
    description: 'An AI kitchen assistant for Telegram. Tracks ingredients and expiry dates, and suggests meals from 40+ cuisines via Google Gemini, all through chat commands.',
    url: 'https://habibcore.com/projects/chef4me',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Chef4Me: Telegram Kitchen Assistant | Habib' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef4Me: Telegram Kitchen Assistant | Habib',
    description: 'An AI kitchen assistant for Telegram. Tracks ingredients and expiry dates, and suggests meals from 40+ cuisines via Google Gemini, all through chat commands.',
    images: ['/og-image.png'],
  },
}

export default function MealPlanningBot() {
  return (
    <ProjectLayout
      title="Chef4Me: Telegram Kitchen Assistant"
      heroImage="/projects/chef4me/hero.jpg"
      tone="warm"
      heroAlt="Chef4Me Telegram interface"
      meta={{
        category:  'Design',
        year:      '2026',
        client:    'Self-initiated',
        role:      'Product Design · Development',
        tools:     ['Python', 'aiogram', 'Google Gemini', 'SQLite', 'Notion API', 'Docker'],
        tags:      ['Product Design', 'Bot Development', 'AI Integration', 'Documentation'],
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                Meal planning runs on two frictions most people never solve: knowing
                what's actually in the kitchen before it goes off, and knowing what
                to cook with it. Ingredients expire unused, and "what should I make"
                becomes a decision made from scratch every single day.
              </p>
            </>
          ),
        },
        {
          number:  '02',
          heading: 'The approach',
          body: (
            <>
              <p>
                Same starting point as Biscuit AI: meet people where they already
                are. Telegram is the interface, not a separate app to install.
                Ingredients can be added one at a time through a guided flow, or in
                bulk as a freeform list the AI parses into names, quantities, and
                categories on its own.
              </p>
              <ul>
                <li>Google Gemini turns whatever's on hand into ranked suggestions across 40+ cuisines: match percentage, difficulty, and cook time included, not just a recipe name</li>
                <li>A scheduler checks expiry dates in the background and proactively flags what's about to go bad, before it's wasted</li>
                <li>Cooking history and 1-5 ratings quietly shape future suggestions, so the bot stops repeating cuisines the user rates low</li>
                <li>An optional Notion sync gives anyone who wants a visual dashboard one, without forcing it on everyone else</li>
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
                A full command-driven kitchen assistant: inventory, expiry alerts,
                cuisine- and diet-filtered AI suggestions, detailed recipes, cook
                history, ratings, and an AI-generated shopping list. Built and
                deployed the same way as Biscuit AI: solo, end to end, no handoff.
              </p>
            </>
          ),
        },
      ]}
      aiWorkflow={{
        intro:
          'A smaller build, and a deliberately fast one. The question was how much working product could come out of a weekend when the scaffolding is generated rather than written.',
        tools: [
          {
            name: 'Claude Code',
            use:  'Command handlers, the SQLite schema, and the Docker setup. Generated from a written spec, then corrected where it guessed at intent.',
          },
          {
            name: 'Google Gemini',
            use:  'The suggestion engine. Prompt work went into holding it to ingredients actually on hand rather than inventing a shopping list.',
          },
          {
            name: 'RCTF prompting',
            use:  'Kept the model briefed on role and constraints, which is most of the difference between a usable suggestion and a generic recipe.',
          },
        ],
        outcome:
          'Built in a weekend. The constraint that mattered was not speed but scope: generation makes features cheap, which makes them tempting, and most of the work was deciding what not to add.',
      }}
      screenshots={[]}
      next={{
        slug:     'leadway-pensure',
        category: 'Brand',
        title:    'Leadway Pensure: Brand & Comms',
      }}
    />
  )
}
