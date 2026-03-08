export const SECTIONS = ["home", "about", "projects", "contact"] as const;
export type SectionId = (typeof SECTIONS)[number];

export interface Project {
  id: string;
  title: string;
  cat: "Brand" | "Design" | "Art" | "Collab";
  desc: string;
  tags: string[];
  url: string;
}

export const PROJECTS: Project[] = [
  {
    id: "leadway-pensure",
    title: "Leadway Pensure — Brand & Comms",
    cat: "Brand",
    desc: "Self-initiated brand extension pitch + CSWK 2024 internal video. Two contributions to one of Nigeria's top pension fund administrators.",
    tags: ["Brand", "Internal Comms", "Video", "Self-Initiated"],
    url: "/projects/leadway-pensure",
  },
  {
    id: "skaame-epk",
    title: "Skaame — Artist Web EPK",
    cat: "Design",
    desc: "Live web EPK for Lagos reggae-Afrobeat artist Skaame — one link covering press, booking, and fan outreach simultaneously.",
    tags: ["EPK", "Web Design", "Music", "Paid Client"],
    url: "/projects/skaame-epk",
  },
  {
    id: "layo-isaac-epk",
    title: "Layo Isaac — Artist EPK",
    cat: "Design",
    desc: "Full press kit for indie alt singer-songwriter Layo Isaac — bio, discography, press photos, video links, and booking info in one document.",
    tags: ["EPK", "Music", "Art Direction", "Paid Client"],
    url: "/projects/layo-isaac-epk",
  },
  {
    id: "blvckoreo-epk",
    title: "BlvckOreo — Personal EPK",
    cat: "Design",
    desc: "Self-designed EPK for BlvckOreo — two distinct album identities, full brand system, no brief. Apple Music HipHop top 200.",
    tags: ["EPK", "Self-Directed", "Hip-Hop", "Brand"],
    url: "/projects/blvckoreo-epk",
  },
  {
    id: "1ethfp",
    title: "1ETHFP — Creative Collaboration",
    cat: "Collab",
    desc: "Paid web3 creative collab — roadmap design, Phase 2 Anthem (written, produced, performed), and promo video editing.",
    tags: ["Web3", "Music", "Design", "Film", "Paid"],
    url: "/projects/1ethfp",
  },
];

export const FILTERS = ["all", "Brand", "Design", "Collab"] as const;
export type FilterType = (typeof FILTERS)[number];

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS - Single source of truth for design and build skills
// Used in: About.tsx, Hero.tsx (via DISCIPLINES)
// ─────────────────────────────────────────────────────────────────────────────
export const DESIGN_SKILLS = [
  "Brand Identity",
  "Art Direction",
  "Design Systems",
  "Music Packaging",
  "EPK Design",
  "Photoshop",
  "Adobe Suite",
];

export const BUILD_SKILLS = [
  "React",
  "Next.js",
  "Landing Pages",
  "Web Apps",
];

// Discipline strip — design first, build second (for Hero marquee)
export const DISCIPLINES = [
  ...DESIGN_SKILLS.slice(0, 5), // Primary design skills
  ...BUILD_SKILLS.slice(0, 3),  // Primary build skills
];

// All skills for About section with terra highlighting
export const ALL_SKILLS = [
  ...DESIGN_SKILLS.map((label) => ({ label, terra: true })),
  ...BUILD_SKILLS.map((label) => ({ label, terra: false })),
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────────────────────────────────────
export const SOCIALS = [
  { label: "Behance",           href: "https://www.behance.net/BlvckOreo" },
  { label: "GitHub",            href: "https://github.com/Thelostbiscuitt" },
  { label: "LinkedIn",          href: "https://www.linkedin.com/in/michael-oguntimehin-480751398" },
  { label: "hello@michael.dev", href: "mailto:hello@michael.dev", isEmail: true },
];
