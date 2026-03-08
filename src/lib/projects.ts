export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  display?: "cover" | "tall" | "contain";
}

export interface MediaEmbed {
  type: "youtube" | "soundcloud" | "behance" | "iframe";
  src: string;
  label: string;
  height?: number;
}

export interface ContribSection {
  badge: string;
  badgeType: "self" | "requested";
  title: string;
  brief: string;
  approach: string;
  outcome: string;
  role: string;
  year: string;
  deliverables: string[];
  images?: ProjectImage[];
  embeds?: MediaEmbed[];
  liveUrl?: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  cat: "Brand" | "Design" | "Art" | "Collab";
  year: string;
  client: string;
  role: string;
  tools: string[];
  coverImage: string;
  brief: string;
  approach: string;
  outcome: string;
  epkScreenshots?: ProjectImage[];
  images?: ProjectImage[];
  embeds?: MediaEmbed[];
  contributions?: ContribSection[];
  roleCards?: { num: string; title: string; desc: string }[];
  stats?: { num: string; label: string }[];
  behanceUrl?: string;
  liveUrl?: string;
  selfInitiated?: boolean;
  showPitchSamples?: boolean;
}

export const PROJECT_DETAILS: ProjectDetail[] = [
  // ── 01 LEADWAY PENSURE ─────────────────────────────────────────────────────
  {
    slug: "leadway-pensure",
    title: "Leadway Pensure — Brand & Communications",
    cat: "Brand",
    year: "2024–2026",
    client: "Leadway Pensure PFA",
    role: "Brand Designer · Videographer · Photographer",
    tools: ["Brand Design", "Copywriting", "Video Editing", "Photography"],
    coverImage: "/projects/leadway/cover.svg",
    brief: "",
    approach: "",
    outcome: "",
    showPitchSamples: true,
    stats: [
      { num: "2004",  label: "Year Established" },
      { num: "₦8.7B+", label: "Shareholders' Fund" },
      { num: "#1",   label: "Most Capitalised PFA in Nigeria" },
      { num: "8",    label: "Industry Awards 2023–2025" },
    ],
    contributions: [
      {
        badge: "Self-Initiated",
        badgeType: "self",
        title: "Brand Extension Pitch",
        brief: "Leadway Pensure has spent over 20 years earning the trust of Nigerian workers. That legacy is powerful — but the brand materials hadn't evolved to reach working Nigerians aged 25–45. As an internal creative, I saw the gap and built the case unprompted.",
        approach: "A full brand extension pitch covering product showcases, a social media content system, identity guidelines, brand voice principles, and logo usage rules — all built around the brand's existing equity: the camel mark, the orange, and two decades of earned authority.",
        outcome: "Nine sections delivered as a designed web document: product suite redesigns for all six offerings, brand identity system, voice guidelines, eight social post templates, client roster, logo usage, and full brand guidelines.",
        role: "Brand Designer · Copywriter · Strategist",
        year: "2026",
        deliverables: ["Brand Extension", "Product Design", "Social System", "Brand Guidelines", "Copywriting", "Identity"],
        liveUrl: "/leadway-pitch.html",
      },
      {
        badge: "Requested by team lead",
        badgeType: "requested",
        title: "Customer Service Week 2024",
        brief: "Customer Service Week 2024 — an industry-wide celebration of service excellence. The team lead commissioned a video capturing the week's activities, team moments, and internal culture. The brief: make it feel human, not corporate.",
        approach: "Shot and edited in-house. Photography across the week's events combined with video footage, cut into a highlight reel that captured colleagues authentically — not posed, not stiff.",
        outcome: "An internal comms video that documented the week across the full team. Delivered on brief — candid, warm, and watchable.",
        role: "Videographer · Photographer · Editor",
        year: "2024",
        deliverables: ["Video Editing", "Photography", "Internal Comms"],
        embeds: [
          { type: "behance", src: "https://www.behance.net/embed/project/217236413?ilo0=1", label: "Customer Service Week 2024", height: 316 },
        ],
      },
    ],
  },

  // ── 02 SKAAME EPK ──────────────────────────────────────────────────────────
  {
    slug: "skaame-epk",
    title: "Skaame — Artist Web EPK",
    cat: "Design",
    year: "2025",
    client: "Skaame",
    role: "Designer & Creative Director",
    tools: ["Adobe Express", "Art Direction", "Copywriting"],
    coverImage: "/projects/skaame/hero.jpg",
    brief: "Skaame is a Lagos-based reggae-infused Afrobeat artist launching his professional music career. He needed more than a PDF — a live, shareable web presence that could introduce him to labels, press, and fans in one link, while holding multiple campaigns at once.",
    approach: "Built in Adobe Express as a scrollable webpage rather than a static document — making it shareable anywhere without attachment friction. The visual identity leans into deep reds and blacks matching Skaame's moody photography. Each section serves a distinct purpose: bio, upcoming release (Afghanistan), collab feature (Hot Shot with Tara Devine), and artist teaser (GRL FRND Purple Project) — all within one URL.",
    outcome: "A live artist hub that does the work of a website without needing one. One link covers press, booking, and fan outreach simultaneously.",
    epkScreenshots: [
      { src: "/projects/skaame/sc-hero.png",        alt: "Hero header",               display: "contain" },
      { src: "/projects/skaame/sc-afghanistan.png", alt: "Afghanistan release section", display: "contain" },
      { src: "/projects/skaame/sc-press.png",       alt: "Press photos section",       display: "contain" },
      { src: "/projects/skaame/sc-video.png",       alt: "Videos section",             display: "contain" },
    ],
    liveUrl: "https://new.express.adobe.com/webpage/yjlG57DUFKpP4",
    embeds: [
      { type: "iframe", src: "https://open.spotify.com/embed/album/2pW92rVuXlmjBwRQmvimuk?utm_source=generator", label: "Afghanistan — Stream on Spotify", height: 160 },
    ],
  },

  // ── 03 LAYO ISAAC EPK ─────────────────────────────────────────────────────
  {
    slug: "layo-isaac-epk",
    title: "Layo Isaac — Artist EPK",
    cat: "Design",
    year: "2022",
    client: "Layo Isaac",
    role: "Designer & Art Director",
    tools: ["Adobe Express", "Art Direction"],
    coverImage: "/projects/layo-isaac/hero.jpg",
    brief: "Layo Isaac is a Lagos-based indie alternative singer-songwriter with radio-aired singles and a growing live performance circuit — shows with Gbenga Adeyinka, Moelogo, and Watti Boaz. She needed a press kit ahead of her 2022 EP that could open doors with labels, bookers, and press.",
    approach: "The design reflects Layo's aesthetic — feminine, adventurous, artistically grounded. A script logotype treatment gives her name warmth and personality. The layout separates music catalogue, bio, press photos, and video links into distinct sections so a booker or A&R can navigate directly to what they need.",
    outcome: "A complete press kit covering biography, discography, press photography, video content, and booking information — all in one shareable document. Designed to match the level of craft Layo puts into her music.",
    epkScreenshots: [
      { src: "/projects/layo-isaac/sc-header.png",      alt: "Hero header",          display: "contain" },
      { src: "/projects/layo-isaac/sc-7days.png",       alt: "7 Days latest release", display: "contain" },
      { src: "/projects/layo-isaac/sc-discography.png", alt: "Discography",           display: "contain" },
      { src: "/projects/layo-isaac/sc-press.png",       alt: "Press photos section",  display: "contain" },
      { src: "/projects/layo-isaac/sc-videos.png",      alt: "Videos section",        display: "contain" },
    ],
    liveUrl: "https://new.express.adobe.com/webpage/gWJaA9f2kpIs7",
  },

  // ── 04 BLVCKOREO EPK ──────────────────────────────────────────────────────
  {
    slug: "blvckoreo-epk",
    title: "BlvckOreo — Personal EPK",
    cat: "Design",
    year: "2023",
    client: "Self-directed",
    role: "Designer · Art Director · Subject",
    tools: ["Adobe Express", "Art Direction", "Copywriting"],
    coverImage: "/projects/blvckoreo/hero.jpg",
    selfInitiated: true,
    brief: "A self-initiated EPK for BlvckOreo — rapper, singer, songwriter from Lagos, aka The Lost Biscuit. No client, no brief, full creative ownership. The goal was to build a press kit that matched the confidence of the music.",
    approach: "Black-and-white palette, heavy type, strong logo identity built around the BO dice mark. Two distinct album identities: Mainland Pack as a gritty Lagos street document with ransom-note typography; Messages From Mars as illustrated and cosmic. Same artist, completely different worlds — both designed with the same level of craft.",
    outcome: "A self-designed EPK that doubles as a portfolio piece. Accolades include an Apple Music HipHop top 200 chart placement, Noble Awards nomination, and a SmashFM artiste unveil. Designed, written, and shipped without a brief.",
    epkScreenshots: [
      { src: "/projects/blvckoreo/sc-header.png",      alt: "Header — logo and latest release", display: "contain" },
      { src: "/projects/blvckoreo/sc-release.png",     alt: "Upcoming release section",         display: "contain" },
      { src: "/projects/blvckoreo/sc-bio.png",         alt: "Bio and portrait",                 display: "contain" },
      { src: "/projects/blvckoreo/sc-discography.png", alt: "Discography",                      display: "contain" },
      { src: "/projects/blvckoreo/sc-contact.png",     alt: "Contact and links",                display: "contain" },
    ],
    liveUrl: "https://express.adobe.com/page/XIUCowDFNxqo9",
    embeds: [
      { type: "iframe", src: "https://open.spotify.com/embed/album/0XOdV6o3rycvOmPaOUumkB?utm_source=generator", label: "Mainland Pack — Spotify",      height: 160 },
      { type: "iframe", src: "https://open.spotify.com/embed/album/55EuxrSqOfqmBFspADTy7O?utm_source=generator", label: "Messages From Mars — Spotify", height: 160 },
    ],
  },

  // ── 05 1ETHFP ─────────────────────────────────────────────────────────────
  {
    slug: "1ethfp",
    title: "1ETHFP — Creative Collaboration",
    cat: "Collab",
    year: "2022–2023",
    client: "1ETHFP",
    role: "Designer · Songwriter · Producer · Rapper · Video Editor",
    tools: ["Design", "Music Production", "Songwriting", "Rap", "Video Editing"],
    coverImage: "/projects/1ethfp/roadmap.jpg",
    brief: "1ETHFP is a web3 NFT project built around community, music, and creative ownership. As the project moved from Phase 2 into Phase 3, they needed a collaborator who could contribute across multiple disciplines — not just design, but music and video as well.",
    approach: "Three distinct deliverables, one cohesive creative contribution. The roadmap infographic mapped out the full project journey in a bold, digestible visual format. The Phase 2 Anthem was written, produced, and performed. The promo video sections were edited to complete the audio-visual package.",
    outcome: "A paid creative collaboration spanning design, music production, and video — rare for a single contributor. The roadmap gave the community a clear picture of where the project was heading. The anthem and video gave them something to rally around during Phase 2.",
    roleCards: [
      { num: "01", title: "Design", desc: "Roadmap infographic charting Phase 1 through Phase 3 for the 1ETHFP community" },
      { num: "02", title: "Music", desc: "Phase 2 Anthem — written, produced, and performed. Songwriter, producer, and rapper on the record" },
      { num: "03", title: "Film",  desc: "Edited the promo video sections tied to the anthem for the Phase 2 rollout" },
    ],
    images: [
      { src: "/projects/1ethfp/roadmap.jpg", alt: "1ETHFP Phase roadmap infographic", display: "contain" },
    ],
    embeds: [
      { type: "youtube",     src: "https://www.youtube.com/embed/FiroSI0pWNY", label: "Promo Video — YouTube" },
      { type: "soundcloud",  src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1454343751&color=%23c8441a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false", label: "Phase 2 Anthem — SoundCloud", height: 166 },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS.find((p) => p.slug === slug);
}
