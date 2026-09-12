/**
 * HABIBCORE® — Range creative dataset.
 *
 * Every entry is drawn from material already published on this site
 * (case studies under /projects/*) or from the site's own project data.
 * `confidence: 'verified'` = fact stated in this repo's own content.
 * `confidence: 'contextual'` = reasonable framing of verified work.
 * Nothing invented. If it isn't documented here, it isn't in the graph.
 */

export type RangeKind = 'discipline' | 'medium' | 'project' | 'artifact'

export type RangeNode = {
  id: string
  kind: RangeKind
  title: string
  /** mono meta line, e.g. "2022 · MUSIC · BLVCK OREO" */
  meta: string
  description: string
  /** id of the node this hangs beneath (empty for disciplines) */
  parent?: string
  /** ids this node is visibly related to */
  related: string[]
  imageUrl?: string
  /** external link — only URLs that already appear in this repo */
  sourceUrl?: string
  source?: string
  confidence: 'verified' | 'contextual'
}

export const rangeNodes: RangeNode[] = [
  /* ————— disciplines ————— */
  { id: 'n-design', kind: 'discipline', title: 'Design', meta: 'PRACTICE', description: 'Brand identity, editorial and graphic composition — the craft under every project.', related: ['p-blvckoreo', 'p-skaame', 'p-layo'], confidence: 'verified' },
  { id: 'n-creative', kind: 'discipline', title: 'Creative', meta: 'PRACTICE', description: 'Art direction, image, video and music — before the software, the foundation everything else stands on.', related: ['p-blvckoreo', 'p-skaame', 'p-layo', 'p-oneethfp'], confidence: 'verified' },
  { id: 'n-artdirection', kind: 'discipline', title: 'Art Direction', meta: 'PRACTICE', parent: 'n-creative', description: 'Photographic worlds and type systems built per release — no templates.', related: ['p-blvckoreo', 'a-mainland', 'a-mars'], confidence: 'verified' },
  { id: 'n-image', kind: 'discipline', title: 'Image', meta: 'PRACTICE', parent: 'n-creative', description: 'Cover artwork, press photography and illustration as primary material.', related: ['p-blvckoreo', 'p-skaame', 'a-mainland'], confidence: 'verified' },
  { id: 'n-video', kind: 'discipline', title: 'Video', meta: 'PRACTICE', parent: 'n-creative', description: 'Promo film edited to the music it carries — cut to the beat, not to a template.', related: ['p-oneethfp', 'p-skaame', 'a-1ethfp-video'], confidence: 'verified' },
  { id: 'n-music', kind: 'discipline', title: 'Music', meta: 'PRACTICE', parent: 'n-creative', description: 'Production, writing and release work — the first stage of the practice.', related: ['p-blvckoreo', 'p-oneethfp', 'p-skaame', 'p-layo'], confidence: 'verified' },
  { id: 'n-fashion', kind: 'discipline', title: 'Fashion / Merch', meta: 'PRACTICE', parent: 'n-creative', description: 'The BO dice mark as a wearable identity — one mark, many surfaces.', related: ['a-bo-dice', 'p-blvckoreo'], confidence: 'contextual' },
  { id: 'n-culture', kind: 'discipline', title: 'Digital Culture', meta: 'PRACTICE', parent: 'n-creative', description: 'Web3 music-and-culture work — community, roadmap, release rhythm.', related: ['p-oneethfp', 'a-1ethfp-roadmap'], confidence: 'verified' },

  /* ————— projects ————— */
  { id: 'p-blvckoreo', kind: 'project', title: 'BlvckOreo', meta: '2023 · BRAND · SELF-DIRECTED', description: 'Personal press kit holding two albums with opposite visual worlds under one black-and-white foundation.', related: ['a-mainland', 'a-mars', 'a-bo-dice'], imageUrl: '/generated/blvckoreo.webp', sourceUrl: '/projects/blvckoreo-epk', source: 'Case study', confidence: 'verified' },
  { id: 'p-skaame', kind: 'project', title: 'Skaame', meta: '2024 · EPK · LAGOS', description: 'One shareable web EPK replacing a scattered folder of press photos, streaming links and a buried booking contact.', related: ['a-skaame-afghanistan', 'a-skaame-press', 'a-skaame-video'], imageUrl: '/generated/skaame.webp', sourceUrl: '/projects/skaame-epk', source: 'Case study', confidence: 'verified' },
  { id: 'p-layo', kind: 'project', title: 'Layo Isaac', meta: '2024 · EPK · 12 PAGES', description: 'A 12-page EPK structured as a narrative arc — muted tones and serif typography matched to the intimacy of the music.', related: ['a-layo-7days', 'a-layo-epk'], imageUrl: '/generated/layo.webp', sourceUrl: '/projects/layo-isaac-epk', source: 'Case study', confidence: 'verified' },
  { id: 'p-oneethfp', kind: 'project', title: '1ETHFP', meta: '2024 · WEB3 · PHASE 2', description: 'A roadmap, an anthem and a promo video for a web3 music-and-culture collective — three disciplines, one world.', related: ['a-1ethfp-roadmap', 'a-1ethfp-anthem', 'a-1ethfp-video', 'n-culture'], imageUrl: '/generated/1ethfp.webp', sourceUrl: '/projects/1ethfp', source: 'Case study', confidence: 'verified' },

  /* ————— artifacts ————— */
  { id: 'a-mainland', kind: 'artifact', title: 'Mainland Pack', meta: 'ALBUM · BLVCK OREO', parent: 'p-blvckoreo', description: 'Gritty Lagos street document — ransom-note typography and raw photography as the visual language of the streets that made the music.', related: ['n-artdirection'], imageUrl: '/generated/blvckoreo.webp', sourceUrl: '/projects/blvckoreo-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-mars', kind: 'artifact', title: 'Messages From Mars', meta: '2022 · SIX-TRACK EP · BLVCK OREO', parent: 'p-blvckoreo', description: 'Six-track EP released in 2022 — illustrated and cosmic, a different register designed with the same craft, as expansion rather than rebrand.', related: ['n-artdirection', 'n-music'], imageUrl: '/generated/blvckoreo.webp', sourceUrl: '/projects/blvckoreo-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-bo-dice', kind: 'artifact', title: 'BO Dice Mark', meta: 'LOGO · BLVCK OREO', parent: 'p-blvckoreo', description: 'A custom mark unifying two opposite visual worlds — and the seed of the merch surfaces.', related: ['n-fashion'], imageUrl: '/generated/blvckoreo.webp', sourceUrl: '/projects/blvckoreo-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-skaame-afghanistan', kind: 'artifact', title: 'Afghanistan', meta: 'SINGLE RELEASE · SKAAME', parent: 'p-skaame', description: 'Single release built into the web EPK — stream links that go directly to platform.', related: ['n-music'], imageUrl: '/generated/skaame.webp', sourceUrl: '/projects/skaame-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-skaame-press', kind: 'artifact', title: 'Press Photos', meta: 'PRESS KIT · SKAAME', parent: 'p-skaame', description: 'High-resolution press photography, downloadable in one click — no login, no folder navigation.', related: ['n-image'], imageUrl: '/generated/skaame.webp', sourceUrl: '/projects/skaame-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-skaame-video', kind: 'artifact', title: 'Music Video', meta: 'VIDEO · SKAAME', parent: 'p-skaame', description: 'Music video section with embedded stills and platform links.', related: ['n-video'], imageUrl: '/generated/skaame.webp', sourceUrl: '/projects/skaame-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-layo-7days', kind: 'artifact', title: '7 Days', meta: 'SINGLE RELEASE · LAYO ISAAC', parent: 'p-layo', description: 'Single release with per-release context, not just cover art.', related: ['n-music'], imageUrl: '/generated/layo.webp', sourceUrl: '/projects/layo-isaac-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-layo-epk', kind: 'artifact', title: '12-Page EPK', meta: 'DOCUMENT · LAYO ISAAC', parent: 'p-layo', description: 'Print-ready document with clear hierarchy across every spread — built to be read, not skimmed.', related: ['n-design'], imageUrl: '/generated/layo.webp', sourceUrl: '/projects/layo-isaac-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-1ethfp-roadmap', kind: 'artifact', title: 'Phase 2 Roadmap', meta: 'DESIGN · 1ETHFP', parent: 'p-oneethfp', description: 'Clean and minimal with a sense of motion — every milestone visible at a glance, without overwhelming the community.', related: ['n-culture'], imageUrl: '/generated/1ethfp.webp', sourceUrl: '/projects/1ethfp', source: 'Case study', confidence: 'verified' },
  { id: 'a-1ethfp-anthem', kind: 'artifact', title: 'The Anthem', meta: 'MUSIC · 1ETHFP', parent: 'p-oneethfp', description: 'Trap-influenced, high energy — written, produced and performed entirely in-house. A rallying cry, not a soundtrack.', related: ['n-music'], sourceUrl: '/projects/1ethfp', source: 'Case study', confidence: 'verified' },
  { id: 'a-1ethfp-video', kind: 'artifact', title: 'Promo Video', meta: 'VIDEO · 1ETHFP', parent: 'p-oneethfp', description: 'Quick cuts and glitch pacing locked to the anthem — edited beat-for-beat so the two pieces feel inseparable.', related: ['n-video'], sourceUrl: '/projects/1ethfp', source: 'Case study', confidence: 'verified' },
]

/** validate on import — catches dangling ids during dev/build, not in production */
if (process.env.NODE_ENV !== 'production') {
  const ids = new Set(rangeNodes.map((n) => n.id))
  for (const n of rangeNodes) {
    if (n.parent && !ids.has(n.parent)) throw new Error(`range.ts: ${n.id} has unknown parent ${n.parent}`)
    for (const r of n.related) if (!ids.has(r)) throw new Error(`range.ts: ${n.id} relates to unknown id ${r}`)
  }
}
