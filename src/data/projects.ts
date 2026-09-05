export type Project = {
  slug:        string
  index:       string
  category:    string
  era:         'current' | 'past'
  title:       string
  description: string
  /* One-line product pitch shown on the card, above the tags. */
  positioning?: string
  tags:        string[]
  thumb:       string       // path to hero image used as card hover thumbnail
  featured?:   boolean      // if true, card spans full grid width
  liveUrl?:    string       // public URL of the built thing, when one exists
  githubUrl?:  string       // public repo, when one exists
  video?:      string       // path under /public; replaces the thumb image when set
  year:        string       // verified working period, never invented
  draft?:      boolean      // built but kept off the homepage until published
}

export const projects: Project[] = [
  {
    slug:        'biscuit-ai',
    index:       '01',
    category:    'AI · Product',
    era:         'current',
    title:       'Biscuit AI: Telegram Assistant',
    description: 'A production-ready Telegram assistant built on OpenRouter. Layered memory you can inspect and erase, Tavily web search, a local book library, image generation, and cost visibility, all in one conversation.',
    positioning: 'Memory you can inspect and erase — not just a chat.',
    tags:        ['Telegram', 'AI Interface', 'Memory', 'Web Search', 'Image Gen', 'Python'],
    thumb:       '/projects/biscuit-ai/hero.jpg',
    year:        '2026',
    githubUrl:   'https://github.com/Thelostbiscuitt/BiscuitBot',
  },
  {
    slug:        'chef4me',
    index:       '02',
    category:    'Consumer · AI',
    era:         'current',
    title:       'Chef4Me: Kitchen Assistant',
    description: 'An AI kitchen assistant for Telegram. Tracks ingredients and expiry dates, and suggests meals from 40+ cuisines via Google Gemini, all through chat commands.',
    positioning: 'Your kitchen, inventoried and suggested in one conversation.',
    tags:        ['Telegram', 'AI Interface', 'Gemini', 'Inventory', 'UX Design', 'Python'],
    thumb:       '/projects/chef4me/hero.jpg',
    year:        '2026',
  },
  {
    slug:        'leadway-pensure',
    index:       '03',
    category:    'Brand · Systems',
    era:         'current',
    title:       'Leadway Pensure: Brand & Comms',
    description: 'A self-initiated brand extension pitch for Nigeria\u2019s largest pension fund. Covers product redesigns, identity guidelines, social systems, and brand voice. Built from four years of operational experience inside the organisation.',
    positioning: 'An unprompted pitch, delivered as a live web document.',
    tags:        ['Brand', 'Identity', 'Product Design', 'Social System', 'Video'],
    thumb:       '/projects/leadway/hero.jpg',
    year:        '2024\u20132026',
  },
  {
    slug:        'olumayowa-nursing-home',
    index:       '04',
    category:    'Client · Web',
    era:         'current',
    title:       'Olumayowa Nursing Home: Healthcare Site',
    description: "A local healthcare provider's website: six services, full licensing credentials, and every way to reach them, on one page a patient can scan in seconds.",
    tags:        ['Web Design', 'Development', 'Healthcare', 'Local Business'],
    thumb:       '/projects/olumayowa-nursing-home/hero.jpg',
    liveUrl:     'https://olumayowanursinghome.com',
    year:        '2026',
  },
  {
    slug:        'ai-workplace-training',
    index:       '05',
    category:    'Ops · Training',
    era:         'current',
    title:       'AI in the Workplace: Employee Training',
    description: 'A company-wide AI literacy programme for Birdview Travels & Tours: eleven modules delivered in one 90-minute session, with a self-built web hub carrying the curriculum, slides, and flashcards on one link.',
    tags:        ['Curriculum Design', 'Facilitation', 'Web Hub', 'Internal Comms', 'AI Literacy'],
    thumb:       '/projects/ai-workplace-training/hero.jpg',
    year:        '2026',
  },
  {
    slug:        'skaame-epk',
    index:       '01',
    category:    'Design',
    era:         'past',
    title:       'Skaame: Artist Web EPK',
    description: 'A live web EPK for Lagos-based reggae-Afrobeat artist Skaame. One shareable link replacing a scattered folder of press photos, streaming links, and a booking contact buried in an Instagram bio.',
    tags:        ['EPK', 'Web Design', 'Music'],
    thumb:       '/projects/skaame/hero.jpg',
    year:        '2024',
  },
  {
    slug:        'layo-isaac-epk',
    index:       '02',
    category:    'Design',
    era:         'past',
    title:       'Layo Isaac: Artist EPK',
    description: 'A 12-page EPK for indie alt singer-songwriter Layo Isaac, structured as a narrative arc rather than a data sheet. Muted tones and serif typography built to match the intimacy of the music.',
    tags:        ['EPK', 'Music', 'Art Direction'],
    thumb:       '/projects/layo-isaac/hero.jpg',
    year:        '2024',
  },
  {
    slug:        'blvckoreo-epk',
    index:       '03',
    category:    'Brand',
    era:         'past',
    title:       'BlvckOreo: Personal EPK',
    description: 'A personal press kit built around two albums with opposite visual worlds: gritty Lagos street photography for Mainland Pack, illustrated and cosmic for Messages From Mars. A black-and-white foundation and a custom BO dice mark unify the two.',
    tags:        ['EPK', 'Hip-Hop', 'Brand'],
    thumb:       '/projects/blvckoreo/hero.jpg',
    year:        '2023',
  },
  {
    slug:        '1ethfp',
    index:       '04',
    category:    'Collab',
    era:         'past',
    title:       '1ETHFP: Creative Collaboration',
    description: "A roadmap, an anthem, and a promo video for a web3 music-and-culture collective's Phase 2 launch. Three disciplines built to feel like one world, written, produced, and directed in-house.",
    tags:        ['Web3', 'Music', 'Design', 'Film'],
    thumb:       '/projects/1ethfp/roadmap.jpg',
    year:        '2024',
  },
  {
    slug:        'relay',
    index:       '06',
    category:    'Product · Systems',
    era:         'current',
    title:       'Relay: Operations Portal',
    description: 'A complete operations rebuild for an immigration firm\u2019s relationship managers: role-scoped data, an append-only audit trail enforced by the database, working-days SLA clocks, and an in-browser CRS calculator.',
    positioning: 'A client pipeline whose audit trail the database itself enforces.',
    tags:        ['CRM', 'RBAC', 'Audit Trail', 'SLA Systems', 'CRS Calculator', 'Next.js'],
    thumb:       '/projects/relay/cover.svg',
    year:        '2026',
  },
]