export type Project = {
  slug:        string
  index:       string
  category:    'Brand' | 'Design' | 'Collab'
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
    title:       'Biscuit AI — Telegram Bot Design',
    description: 'A production-ready Telegram bot built on GLM-4.7 with intelligent chat, image generation via Stability AI, a Notion-backed library system, and real-time cost tracking — all in one conversational interface.',
    tags:        ['Telegram Bot', 'AI Interface', 'LLM Integration', 'Image Generation', 'UX Design', 'Python'],
    thumb:       '/projects/biscuit-ai/hero.jpg',
  },
  {
    slug:        'leadway-pensure',
    index:       '02',
    category:    'Brand',
    title:       'Leadway Pensure — Brand & Comms',
    description: 'A self-initiated brand extension pitch for Nigeria\'s largest pension fund. Covers product redesigns, identity guidelines, social systems, and brand voice — built from four years of operational experience inside the organisation.',
    tags:        ['Brand', 'Internal Comms', 'Self-Service Platform', 'Process Design', 'Video'],
    thumb:       '/projects/leadway/cover.svg',
    featured:    true,
  },
  {
    slug:        'skaame-epk',
    index:       '03',
    category:    'Design',
    title:       'Skaame — Artist Web EPK',
    description: '',
    tags:        ['EPK', 'Web Design', 'Music'],
    thumb:       '/projects/skaame/hero.jpg',
  },
  {
    slug:        'layo-isaac-epk',
    index:       '04',
    category:    'Design',
    title:       'Layo Isaac — Artist EPK',
    description: '',
    tags:        ['EPK', 'Music', 'Art Direction'],
    thumb:       '/projects/layo-isaac/hero.jpg',
  },
  {
    slug:        'blvckoreo-epk',
    index:       '05',
    category:    'Design',
    title:       'BlvckOreo — Personal EPK',
    description: '',
    tags:        ['EPK', 'Hip-Hop', 'Brand'],
    thumb:       '/projects/blvckoreo/hero.jpg',
  },
  {
    slug:        '1ethfp',
    index:       '06',
    category:    'Collab',
    title:       '1ETHFP — Creative Collaboration',
    description: '',
    tags:        ['Web3', 'Music', 'Design', 'Film'],
    thumb:       '/projects/1ethfp/roadmap.jpg',
  },
]
