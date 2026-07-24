export type Project = {
  slug:        string
  index:       string
  category:    'Brand' | 'Design' | 'Collab'
  era:         'current' | 'past'
  title:       string
  description: string
  tags:        string[]
  thumb:       string       // path to hero image used as card hover thumbnail
  featured?:   boolean      // if true, card spans full grid width
}

export const projects: Project[] = [
  {
    slug:        'biscuit-ai',
    index:       '01',
    category:    'Design',
    era:         'current',
    title:       'Biscuit AI — Telegram Bot Design',
    description: 'A production-ready Telegram bot built on GLM-4.7 with intelligent chat, image generation via Stability AI, a Notion-backed library system, and real-time cost tracking — all in one conversational interface.',
    tags:        ['Telegram Bot', 'AI Interface', 'LLM Integration', 'Image Generation', 'UX Design', 'Python'],
    thumb:       '/projects/biscuit-ai/hero.jpg',
  },
  {
    slug:        'meal-planning-bot',
    index:       '02',
    category:    'Design',
    era:         'current',
    title:       'Meal Planning Bot — Telegram Kitchen Assistant',
    description: 'An AI kitchen assistant for Telegram — tracks ingredients and expiry dates, and suggests meals from 40+ cuisines via Google Gemini, all through chat commands.',
    tags:        ['Telegram Bot', 'AI Interface', 'LLM Integration', 'UX Design', 'Python'],
    thumb:       '/projects/meal-planning-bot/hero.jpg',
  },
  {
    slug:        'leadway-pensure',
    index:       '03',
    category:    'Brand',
    era:         'current',
    title:       'Leadway Pensure — Brand & Comms',
    description: 'A self-initiated brand extension pitch for Nigeria\'s largest pension fund. Covers product redesigns, identity guidelines, social systems, and brand voice — built from four years of operational experience inside the organisation.',
    tags:        ['Brand', 'Internal Comms', 'Self-Service Platform', 'Process Design', 'Video'],
    thumb:       '/projects/leadway/cover.svg',
    featured:    true,
  },
  {
    slug:        'olumayowa-nursing-home',
    index:       '04',
    category:    'Design',
    era:         'current',
    title:       'Olumayowa Nursing Home — Healthcare Website',
    description: "A local healthcare provider's website — six services, full licensing credentials, and every way to reach them, on one page a patient can scan in seconds.",
    tags:        ['Web Design', 'Development', 'Healthcare', 'Local Business'],
    thumb:       '/projects/olumayowa-nursing-home/hero.jpg',
  },
  {
    slug:        'skaame-epk',
    index:       '01',
    category:    'Design',
    era:         'past',
    title:       'Skaame — Artist Web EPK',
    description: 'A live web EPK for Lagos-based reggae-Afrobeat artist Skaame — one shareable link replacing a scattered folder of press photos, streaming links, and a booking contact buried in an Instagram bio.',
    tags:        ['EPK', 'Web Design', 'Music'],
    thumb:       '/projects/skaame/hero.jpg',
  },
  {
    slug:        'layo-isaac-epk',
    index:       '02',
    category:    'Design',
    era:         'past',
    title:       'Layo Isaac — Artist EPK',
    description: 'A 12-page EPK for indie alt singer-songwriter Layo Isaac, structured as a narrative arc rather than a data sheet — muted tones and serif typography built to match the intimacy of the music.',
    tags:        ['EPK', 'Music', 'Art Direction'],
    thumb:       '/projects/layo-isaac/hero.jpg',
  },
  {
    slug:        'blvckoreo-epk',
    index:       '03',
    category:    'Design',
    era:         'past',
    title:       'BlvckOreo — Personal EPK',
    description: 'A personal press kit built around two albums with opposite visual worlds — gritty Lagos street photography for Mainland Pack, illustrated and cosmic for Messages From Mars — unified by a black-and-white foundation and a custom BO dice mark.',
    tags:        ['EPK', 'Hip-Hop', 'Brand'],
    thumb:       '/projects/blvckoreo/hero.jpg',
  },
  {
    slug:        '1ethfp',
    index:       '04',
    category:    'Collab',
    era:         'past',
    title:       '1ETHFP — Creative Collaboration',
    description: "A roadmap, an anthem, and a promo video for a web3 music-and-culture collective's Phase 2 launch — three disciplines built to feel like one world, written, produced, and directed in-house.",
    tags:        ['Web3', 'Music', 'Design', 'Film'],
    thumb:       '/projects/1ethfp/roadmap.jpg',
  },
]
