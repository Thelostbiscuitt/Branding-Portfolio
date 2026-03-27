export type Project = {
  slug:      string
  index:     string
  category:  'Brand' | 'Design' | 'Collab'
  title:     string
  tags:      string[]
  thumb:     string       // path to hero image used as card hover thumbnail
  featured?: boolean      // if true, card spans full grid width
}

export const projects: Project[] = [
  {
    slug:     'biscuit-ai',
    index:    '01',
    category: 'Design',
    title:    'Biscuit AI — Telegram Bot Design',
    tags:     ['Telegram Bot', 'AI Interface', 'UX Design', 'Python'],
    thumb:    '/projects/biscuit-ai/hero.jpg',
  },
  {
    slug:     'leadway-pensure',
    index:    '02',
    category: 'Brand',
    title:    'Leadway Pensure — Brand & Comms',
    tags:     ['Brand', 'Internal Comms', 'Video'],
    thumb:    '/projects/leadway/cover.svg',
    featured: true,
  },
  {
    slug:     'skaame-epk',
    index:    '03',
    category: 'Design',
    title:    'Skaame — Artist Web EPK',
    tags:     ['EPK', 'Web Design', 'Music'],
    thumb:    '/projects/skaame/hero.jpg',
  },
  {
    slug:     'layo-isaac-epk',
    index:    '04',
    category: 'Design',
    title:    'Layo Isaac — Artist EPK',
    tags:     ['EPK', 'Music', 'Art Direction'],
    thumb:    '/projects/layo-isaac/hero.jpg',
  },
  {
    slug:     'blvckoreo-epk',
    index:    '05',
    category: 'Design',
    title:    'BlvckOreo — Personal EPK',
    tags:     ['EPK', 'Hip-Hop', 'Brand'],
    thumb:    '/projects/blvckoreo/hero.jpg',
  },
  {
    slug:     '1ethfp',
    index:    '06',
    category: 'Collab',
    title:    '1ETHFP — Creative Collaboration',
    tags:     ['Web3', 'Music', 'Design', 'Film'],
    thumb:    '/projects/1ethfp/roadmap.jpg',
  },
]
