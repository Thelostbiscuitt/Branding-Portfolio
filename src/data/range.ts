/**
 * HABIBCORE® · Range creative dataset.
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
  /** external link, only URLs that already appear in this repo */
  sourceUrl?: string
  source?: string
  confidence: 'verified' | 'contextual'
}

export const rangeNodes: RangeNode[] = [
  /* ————— disciplines ————— */
  { id: 'n-design', kind: 'discipline', title: 'Design', meta: 'PRACTICE', description: 'Brand identity, editorial and graphic composition, the craft under every project.', related: ['p-blvckoreo', 'p-skaame', 'p-layo', 'p-training', 'p-graphicdesign'], confidence: 'verified' },
  { id: 'n-creative', kind: 'discipline', title: 'Creative', meta: 'PRACTICE', description: 'Art direction, image, video and music, before the software, the foundation everything else stands on.', related: ['p-blvckoreo', 'p-skaame', 'p-layo', 'p-oneethfp'], confidence: 'verified' },
  { id: 'n-artdirection', kind: 'discipline', title: 'Art Direction', meta: 'PRACTICE', parent: 'n-creative', description: 'Photographic worlds and type systems built per release, no templates.', related: ['p-blvckoreo', 'a-mainland', 'a-mars', 'a-buy1', 'a-visitor'], confidence: 'verified' },
  { id: 'n-image', kind: 'discipline', title: 'Image', meta: 'PRACTICE', parent: 'n-creative', description: 'Cover artwork, press photography and illustration as primary material.', related: ['p-blvckoreo', 'p-skaame', 'a-mainland', 'a-bc-covers', 'p-graphicdesign'], confidence: 'verified' },
  { id: 'n-video', kind: 'discipline', title: 'Video', meta: 'PRACTICE', parent: 'n-creative', description: 'Promo film edited to the music it carries, cut to the beat, not to a template.', related: ['p-oneethfp', 'p-skaame', 'a-1ethfp-video', 'a-merch-film'], confidence: 'verified' },
  { id: 'n-music', kind: 'discipline', title: 'Music', meta: 'PRACTICE', parent: 'n-creative', description: 'Production, writing and release work, the first stage of the practice.', related: ['p-blvckoreo', 'p-oneethfp', 'a-buy1', 'a-visitor', 'a-bedroom'], confidence: 'verified' },
  { id: 'n-fashion', kind: 'discipline', title: 'Fashion / Merch', meta: 'PRACTICE', parent: 'n-creative', description: 'The BlvckOreo merch line, the designs shown on film, with the music carrying them.', related: ['a-merch-film', 'p-blvckoreo'], confidence: 'verified' },
  { id: 'n-culture', kind: 'discipline', title: 'Digital Culture', meta: 'PRACTICE', parent: 'n-creative', description: 'Web3 music-and-culture work, community, roadmap, release rhythm.', related: ['p-oneethfp', 'a-1ethfp-roadmap', 'p-yinyanggang', 'p-ether', 'p-gensadiq'], confidence: 'verified' },

  /* ————— projects ————— */
  { id: 'p-blvckoreo', kind: 'project', title: 'BlvckOreo', meta: '2023 · BRAND · SELF-DIRECTED', description: 'Personal press kit holding two albums with opposite visual worlds under one black-and-white foundation.', related: ['a-mainland', 'a-mars', 'a-merch-film', 'a-buy1', 'a-visitor', 'a-bedroom'], imageUrl: '/generated/blvckoreo.webp', sourceUrl: '/projects/blvckoreo-epk', source: 'Case study', confidence: 'verified' },
  { id: 'p-skaame', kind: 'project', title: 'Skaame', meta: '2024 · EPK · LAGOS', description: 'One shareable web EPK replacing a scattered folder of press photos, streaming links and a buried booking contact.', related: ['a-skaame-afghanistan', 'a-skaame-press', 'a-skaame-video'], imageUrl: '/generated/skaame.webp', sourceUrl: '/projects/skaame-epk', source: 'Case study', confidence: 'verified' },
  { id: 'p-layo', kind: 'project', title: 'Layo Isaac', meta: '2024 · EPK · 12 PAGES', description: 'A 12-page EPK structured as a narrative arc, muted tones and serif typography matched to the intimacy of the music.', related: ['a-layo-7days', 'a-layo-epk'], imageUrl: '/generated/layo.webp', sourceUrl: '/projects/layo-isaac-epk', source: 'Case study', confidence: 'verified' },
  { id: 'p-oneethfp', kind: 'project', title: '1ETHFP', meta: '2024 · WEB3 · PHASE 2', description: 'A roadmap, an anthem and a promo video for a web3 music-and-culture collective, three disciplines, one world.', related: ['a-1ethfp-roadmap', 'a-1ethfp-anthem', 'a-1ethfp-video', 'a-1ethfp-collab', 'n-culture'], imageUrl: '/generated/1ethfp.webp', sourceUrl: '/projects/1ethfp', source: 'Case study', confidence: 'verified' },

  /* ————— artifacts ————— */
  { id: 'a-mainland', kind: 'artifact', title: 'Mainland Pack', meta: 'ALBUM · BLVCK OREO', parent: 'p-blvckoreo', description: 'Gritty Lagos street document, ransom-note typography and raw photography as the visual language of the streets that made the music.', related: ['n-artdirection', 'n-image'], imageUrl: '/generated/blvckoreo.webp', sourceUrl: '/projects/blvckoreo-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-mars', kind: 'artifact', title: 'Messages From Mars', meta: '2022 · SIX-TRACK EP · BLVCK OREO', parent: 'p-blvckoreo', description: 'Six-track EP released in 2022, illustrated and cosmic, a different register designed with the same craft, as expansion rather than rebrand.', related: ['n-artdirection', 'n-music', 'n-image'], imageUrl: '/generated/blvckoreo.webp', sourceUrl: '/projects/blvckoreo-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-buy1', kind: 'artifact', title: 'Buy 1 Get 1 Free', meta: 'RELEASE · BLVCK OREO', parent: 'p-blvckoreo', description: 'BlvckOreo release, written, produced and released in-house, carried by its own artwork.', related: ['n-music', 'n-artdirection'], imageUrl: '/generated/blvckoreo.webp', sourceUrl: '/projects/blvckoreo-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-visitor', kind: 'artifact', title: 'Visitor From Mars', meta: 'RELEASE · BLVCK OREO', parent: 'p-blvckoreo', description: 'BlvckOreo release in the Mars register, written, produced and released in-house.', related: ['n-music', 'n-artdirection'], imageUrl: '/generated/blvckoreo.webp', sourceUrl: '/projects/blvckoreo-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-bedroom', kind: 'artifact', title: 'Bedroom Recordings', meta: 'RELEASE · AUDIOMACK', parent: 'p-blvckoreo', description: 'Raw bedroom recordings released on Audiomack, made and released as they were made.', related: ['n-music', 'n-artdirection'], imageUrl: '/projects/Graphic%20Design/Bedroom%20Recordings%202%20Tracklist', confidence: 'verified' },
  { id: 'a-merch-film', kind: 'artifact', title: 'Merch Showcase Film', meta: 'VIDEO · MERCH · BLVCK OREO', parent: 'p-blvckoreo', description: 'Film showcasing the merch designs, the same piece carries the music, so the designs and the tracks sit in one video.', related: ['n-fashion', 'n-music', 'n-video'], imageUrl: 'https://i.ytimg.com/vi/GU30sBnuKmM/hqdefault.jpg', sourceUrl: 'https://youtu.be/GU30sBnuKmM', source: 'YouTube', confidence: 'verified' },
  { id: 'a-bc-covers', kind: 'artifact', title: 'Album Covers', meta: 'ARTWORK · BEHANCE', parent: 'p-blvckoreo', description: 'Album and single cover artwork collected on Behance, the covers behind the releases.', related: ['n-image'], imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/404/9b8254217141071.Y3JvcCwxNDAwLDEwOTUsMCwzMDE.png', sourceUrl: 'https://www.behance.net/gallery/217141071/ALBUM-COVERS', source: 'Behance', confidence: 'verified' },
  { id: 'p-yinyanggang', kind: 'project', title: 'Yin Yang Gang', meta: 'NFT · BRANDING · BEHANCE', description: 'Branding work for the Yin Yang Gang NFT collective, board on Behance.', related: ['n-culture', 'n-image'], imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/404/09d58b217138953.Y3JvcCw4MDgsNjMyLDAsMA.png', sourceUrl: 'https://www.behance.net/gallery/217138953/YIN-YANG-GANG-COLLABORATION', source: 'Behance', confidence: 'verified' },
  { id: 'p-ether', kind: 'project', title: 'Ether', meta: 'NFT · BRANDING · BEHANCE', description: 'Branding work for the Ether NFT collective, board on Behance.', related: ['n-culture', 'n-image'], imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/404/8757de217138415.Y3JvcCw4MDgsNjMyLDAsMA.png', sourceUrl: 'https://www.behance.net/gallery/217138415/ETHER-COLLABORATION', source: 'Behance', confidence: 'verified' },
  { id: 'p-gensadiq', kind: 'project', title: 'Gen.Sadiq · Maradonna', meta: 'NFT · BRANDING · VIDEO', description: 'Branding and promo film for Gen.Sadiq, Maradonna.', related: ['n-culture', 'n-image', 'n-video'], imageUrl: '/projects/Gen.Sadiq%20-%20Maradonna/001.png', sourceUrl: '/projects/Gen.Sadiq%20-%20Maradonna/promo%20video.mp4', source: 'WATCH', confidence: 'verified' },
  { id: 'a-1ethfp-collab', kind: 'artifact', title: '1ETHFP Collaboration', meta: 'BRANDING · BEHANCE', parent: 'p-oneethfp', description: 'Collaboration board for 1ETHFP on Behance.', related: ['n-culture', 'n-image'], imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/404/705301217139673.Y3JvcCw4MDgsNjMyLDAsMA.png', sourceUrl: 'https://www.behance.net/gallery/217139673/1ETHFP-COLLABORATION', source: 'Behance', confidence: 'verified' },
  { id: 'p-graphicdesign', kind: 'project', title: 'Graphic Design', meta: 'GRAPHIC DESIGN · SELECTED WORK', description: 'Selected standalone graphic work, covers, artworks and type pieces.', related: ['n-image', 'n-design'], imageUrl: '/projects/Graphic%20Design/Show%20Me.png', sourceUrl: 'https://www.behance.net/BlvckOreo', source: 'Behance', confidence: 'verified' },
  { id: 'p-training', kind: 'project', title: 'The Basics of Graphic Design', meta: 'TRAINING · GRAPHIC DESIGN', description: 'The complete basics-of-graphic-design training document, the full course material.', related: ['n-design', 'n-image'], sourceUrl: 'https://www.behance.net/BlvckOreo', source: 'Behance', confidence: 'verified' },
  { id: 'a-tbogd', kind: 'artifact', title: 'Training Document (PDF)', meta: 'PDF · TRAINING', parent: 'p-training', description: 'The full training deck as a downloadable PDF.', related: ['n-design'], sourceUrl: '/projects/The%20basics%20of%20graphic%20design%20training/TBOGD.pptx.pdf', source: 'DOWNLOAD', confidence: 'verified' },
  { id: 'a-showme', kind: 'artifact', title: 'Show Me', meta: 'ARTWORK · GRAPHIC DESIGN', parent: 'p-graphicdesign', description: 'Standalone artwork from the graphic design set.', related: ['n-image'], imageUrl: '/projects/Graphic%20Design/Show%20Me.png', sourceUrl: 'https://www.behance.net/BlvckOreo', source: 'Behance', confidence: 'verified' },
  { id: 'a-eppme', kind: 'artifact', title: 'EPP ME!!!', meta: 'ARTWORK · GRAPHIC DESIGN', parent: 'p-graphicdesign', description: 'Standalone artwork from the graphic design set.', related: ['n-image'], imageUrl: '/projects/Graphic%20Design/EPP%20ME%21%21%21.png', sourceUrl: 'https://www.behance.net/BlvckOreo', source: 'Behance', confidence: 'verified' },
  { id: 'a-momoguro', kind: 'artifact', title: 'Momoguro Fan Art', meta: 'ILLUSTRATION · BEHANCE', parent: 'p-graphicdesign', description: 'Momoguro fan art, illustration board on Behance.', related: ['n-image'], imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/404/08c12e217140837.Y3JvcCw4MDgsNjMyLDAsMA.png', sourceUrl: 'https://www.behance.net/gallery/217140837/MOMOGURO-FAN-ART', source: 'Behance', confidence: 'verified' },
  { id: 'a-1984', kind: 'artifact', title: '1984 Fan Art', meta: 'ILLUSTRATION · BEHANCE', parent: 'p-graphicdesign', description: '1984 fan art, illustration board on Behance.', related: ['n-image'], imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/404/fc2501217140261.Y3JvcCw4MDgsNjMyLDAsMA.png', sourceUrl: 'https://www.behance.net/gallery/217140261/1984-FAN-ART', source: 'Behance', confidence: 'verified' },
  { id: 'a-cswk', kind: 'artifact', title: 'CSWK 2024', meta: 'ARTWORK · BEHANCE', parent: 'p-graphicdesign', description: 'CSWK 2024 artwork board on Behance.', related: ['n-image'], imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/404/627a79217236413.Y3JvcCw4MDgsNjMyLDAsMA.png', sourceUrl: 'https://www.behance.net/gallery/217236413/CSWK2024', source: 'Behance', confidence: 'verified' },
  { id: 'a-miah', kind: 'artifact', title: "Miah's Built Camp", meta: 'BRANDING · BEHANCE', parent: 'p-graphicdesign', description: "Branding board for Miah's Built Camp on Behance.", related: ['n-image', 'n-design'], imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/404/34d2b6217138211.Y3JvcCwxNTg2LDEyNDEsMCww.png', sourceUrl: 'https://www.behance.net/gallery/217138211/MIAHS-BUILT-CAMP', source: 'Behance', confidence: 'verified' },
  { id: 'a-returndead', kind: 'artifact', title: 'Return of the Dead', meta: 'ARTWORK · BLVCK OREO', parent: 'p-blvckoreo', description: 'Cover artwork for Return of the Dead, the track streams from the same set the site plays.', related: ['n-image', 'n-music'], imageUrl: '/projects/Graphic%20Design/Return%20of%20the%20dead%20Artwork.png', sourceUrl: '/Music/return-of-the-dead.mp3', source: 'LISTEN', confidence: 'verified' },
  { id: 'a-vpnvisa', kind: 'artifact', title: 'Vpn Visa', meta: 'ARTWORK · BLVCK OREO', parent: 'p-blvckoreo', description: 'Cover artwork for Vpn Visa, the track streams from the same set the site plays.', related: ['n-image', 'n-music'], imageUrl: '/projects/Graphic%20Design/Vpn%20Visa.png', sourceUrl: '/Music/vpn-visa.mp3', source: 'LISTEN', confidence: 'verified' },
  { id: 'a-skaame-afghanistan', kind: 'artifact', title: 'Afghanistan', meta: 'SINGLE RELEASE · SKAAME', parent: 'p-skaame', description: 'Single release built into the web EPK, stream links that go directly to platform.', related: ['n-design'], imageUrl: '/generated/skaame.webp', sourceUrl: '/projects/skaame-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-skaame-press', kind: 'artifact', title: 'Press Photos', meta: 'PRESS KIT · SKAAME', parent: 'p-skaame', description: 'High-resolution press photography, downloadable in one click, no login, no folder navigation.', related: ['n-image'], imageUrl: '/generated/skaame.webp', sourceUrl: '/projects/skaame-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-skaame-video', kind: 'artifact', title: 'Music Video', meta: 'VIDEO · SKAAME', parent: 'p-skaame', description: 'Music video section with embedded stills and platform links.', related: ['n-video'], imageUrl: '/generated/skaame.webp', sourceUrl: '/projects/skaame-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-layo-7days', kind: 'artifact', title: '7 Days', meta: 'SINGLE RELEASE · LAYO ISAAC', parent: 'p-layo', description: 'Single release with per-release context, not just cover art.', related: ['n-design'], imageUrl: '/generated/layo.webp', sourceUrl: '/projects/layo-isaac-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-layo-epk', kind: 'artifact', title: '12-Page EPK', meta: 'DOCUMENT · LAYO ISAAC', parent: 'p-layo', description: 'Print-ready document with clear hierarchy across every spread, built to be read, not skimmed.', related: ['n-design'], imageUrl: '/generated/layo.webp', sourceUrl: '/projects/layo-isaac-epk', source: 'Case study', confidence: 'verified' },
  { id: 'a-1ethfp-roadmap', kind: 'artifact', title: 'Phase 2 Roadmap', meta: 'DESIGN · 1ETHFP', parent: 'p-oneethfp', description: 'Clean and minimal with a sense of motion, every milestone visible at a glance, without overwhelming the community.', related: ['n-culture'], imageUrl: '/generated/1ethfp.webp', sourceUrl: '/projects/1ethfp', source: 'Case study', confidence: 'verified' },
  { id: 'a-1ethfp-anthem', kind: 'artifact', title: 'The Anthem', meta: 'MUSIC · 1ETHFP', parent: 'p-oneethfp', description: 'Trap-influenced, high energy, written, produced and performed entirely in-house. A rallying cry, not a soundtrack.', related: ['n-music'], sourceUrl: '/projects/1ethfp', source: 'Case study', confidence: 'verified' },
  { id: 'a-1ethfp-video', kind: 'artifact', title: 'Promo Video', meta: 'VIDEO · 1ETHFP', parent: 'p-oneethfp', description: 'Quick cuts and glitch pacing locked to the anthem, edited beat-for-beat so the two pieces feel inseparable.', related: ['n-video'], sourceUrl: '/projects/1ethfp', source: 'Case study', confidence: 'verified' },
]

/** validate on import, catches dangling ids during dev/build, not in production */
if (process.env.NODE_ENV !== 'production') {
  const ids = new Set(rangeNodes.map((n) => n.id))
  for (const n of rangeNodes) {
    if (n.parent && !ids.has(n.parent)) throw new Error(`range.ts: ${n.id} has unknown parent ${n.parent}`)
    for (const r of n.related) if (!ids.has(r)) throw new Error(`range.ts: ${n.id} relates to unknown id ${r}`)
  }
}
