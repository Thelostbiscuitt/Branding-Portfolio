import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'Meal Planning Bot — Telegram Kitchen Assistant | Habib',
  description: 'An AI kitchen assistant for Telegram — tracks ingredients and expiry dates, and suggests meals from 40+ cuisines via Google Gemini, all through chat commands.',
  openGraph: {
    title: 'Meal Planning Bot — Telegram Kitchen Assistant | Habib',
    description: 'An AI kitchen assistant for Telegram — tracks ingredients and expiry dates, and suggests meals from 40+ cuisines via Google Gemini, all through chat commands.',
    url: 'https://habibcore.com/projects/meal-planning-bot',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Meal Planning Bot — Telegram Kitchen Assistant | Habib' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meal Planning Bot — Telegram Kitchen Assistant | Habib',
    description: 'An AI kitchen assistant for Telegram — tracks ingredients and expiry dates, and suggests meals from 40+ cuisines via Google Gemini, all through chat commands.',
    images: ['/og-image.png'],
  },
}

export default function MealPlanningBot() {
  return (
    <ProjectLayout
      title="Meal Planning Bot — Telegram Kitchen Assistant"
      heroImage="/projects/meal-planning-bot/hero.jpg"
      heroAlt="Meal Planning Bot Telegram interface"
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
                <li>Google Gemini turns whatever's on hand into ranked suggestions across 40+ cuisines — match percentage, difficulty, and cook time included, not just a recipe name</li>
                <li>A scheduler checks expiry dates in the background and proactively flags what's about to go bad, before it's wasted</li>
                <li>Cooking history and 1–5 ratings quietly shape future suggestions, so the bot stops repeating cuisines the user rates low</li>
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
                A full command-driven kitchen assistant — inventory, expiry alerts,
                cuisine- and diet-filtered AI suggestions, detailed recipes, cook
                history, ratings, and an AI-generated shopping list — built and
                deployed the same way as Biscuit AI: solo, end to end, no handoff.
              </p>
            </>
          ),
        },
      ]}
      screenshots={[]}
      next={{
        slug:     'leadway-pensure',
        category: 'Brand',
        title:    'Leadway Pensure — Brand & Comms',
      }}
    />
  )
}
