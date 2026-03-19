import { Project } from "./data";

// Type definitions for project details
export interface ProjectDetail extends Project {
  slug: string;
  client?: string;
  role?: string;
  year?: string;
  tools?: string[];
  brief?: string;
  approach?: string;
  outcome?: string;
  liveUrl?: string;
  behanceUrl?: string;
  coverImage?: string;
  selfInitiated?: boolean;
  stats?: Array<{ num: string; label: string }>;
  contributions?: ContribSection[];
  showPitchSamples?: boolean;
  roleCards?: Array<{ num: string; title: string; desc: string }>;
  epkScreenshots?: Array<{ src: string; alt: string }>;
  images?: Array<{ src: string; alt: string; display?: "cover" | "contain" }>;
  embeds?: MediaEmbed[];
}

export interface MediaEmbed {
  type: "youtube" | "soundcloud" | "behance" | "spotify" | "iframe";
  src: string;
  label: string;
  height?: number;
}

export interface ContribSection {
  title: string;
  badge: string;
  badgeType: "self" | "client";
  brief: string;
  approach: string;
  outcome: string;
  role: string;
  year: string;
  deliverables?: string[];
  liveUrl?: string;
  embeds?: MediaEmbed[];
}

// Project details for template pages (not including biscuit-ai which has a custom page)
export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    id: "leadway-pensure",
    slug: "leadway-pensure",
    title: "Leadway Pensure — Brand & Comms",
    cat: "Brand",
    desc: "Self-initiated brand extension pitch + CSWK 2024 internal video. Two contributions to one of Nigeria's top pension fund administrators.",
    tags: ["Brand", "Internal Comms", "Video", "Self-Initiated"],
    url: "/projects/leadway-pensure",
    client: "Leadway Pensure",
    role: "Creative Director • Brand Strategist",
    year: "2024",
    tools: ["Adobe Illustrator", "After Effects", "Figma", "Brand Strategy"],
    brief: "Leadway Pensure is one of Nigeria's top pension fund administrators, but their brand didn't reflect the dignity and security they provide. They needed a brand extension that felt premium, trustworthy, and human.",
    approach: "Started with the problem: retirement marketing often feels distant, corporate, and full of jargon. The solution? Make it feel personal. Focused on human outcomes, not financial products. Used warm, confident colors. Spoke like a person, not a prospectus.",
    outcome: "A comprehensive brand system including color palette, typography, brand voice guidelines, social media templates, and internal communication assets. The brand now speaks with clarity and warmth.",
    selfInitiated: true,
    stats: [
      { num: "300K+", label: "Active RSA holders" },
      { num: "₦1.2T+", label: "Assets under management" },
      { num: "40+", label: "Years of experience" },
      { num: "NGN", label: "Nigeria's No. 1" },
    ],
    showPitchSamples: true,
    contributions: [
      {
        title: "Brand Extension",
        badge: "★ Self-Initiated",
        badgeType: "self",
        brief: "Leadway Pensure is one of Nigeria's top pension fund administrators, but their brand didn't reflect the dignity and security they provide. They needed a brand extension that felt premium, trustworthy, and human.",
        approach: "Started with the problem: retirement marketing often feels distant, corporate, and full of jargon. The solution? Make it feel personal. Focused on human outcomes, not financial products. Used warm, confident colors. Spoke like a person, not a prospectus.",
        outcome: "A comprehensive brand system including color palette, typography, brand voice guidelines, social media templates, and internal communication assets. The brand now speaks with clarity and warmth.",
        role: "Creative Director • Brand Strategist",
        year: "2024",
        deliverables: ["Brand System", "Social Templates", "Brand Voice Guide"],
      },
      {
        title: "Internal Communications",
        badge: "Self-Initiated",
        badgeType: "self",
        brief: "CSWK 2024 (Customer Service Week) is an internal celebration that recognizes customer service excellence. Leadway Pensure needed a video that honored their team while reinforcing brand values.",
        approach: "The video needed to feel celebratory but not cheesy. Focused on real people, real moments. Used dynamic pacing, warm tones, and genuine testimonials to create something that felt authentic to the organization's culture.",
        outcome: "A 3-minute internal video that celebrated the customer service team during CSWK 2024. The video was well-received and shared across internal channels.",
        role: "Video Producer • Editor",
        year: "2024",
        deliverables: ["3-Minute Internal Video", "Motion Graphics", "Sound Design"],
      },
    ],
  },
  {
    id: "skaame-epk",
    slug: "skaame-epk",
    title: "Skaame — Artist Web EPK",
    cat: "Design",
    desc: "Live web EPK for Lagos reggae-Afrobeat artist Skaame — one link covering press, booking, and fan outreach simultaneously.",
    tags: ["EPK", "Web Design", "Music", "Paid Client"],
    url: "/projects/skaame-epk",
    client: "Skaame",
    role: "Designer • Developer",
    year: "2024",
    tools: ["Figma", "Next.js", "Tailwind CSS"],
    brief: "Skaame is a Lagos-based reggae-Afrobeat artist with growing recognition. He needed a single, shareable link that could serve press, booking agents, and fans — replacing scattered Google Drive folders and social media links.",
    approach: "Designed for simplicity above all. One page, all the essential information. Press photos that download with one click. Streaming links that go directly to platforms. Booking contact that's impossible to miss. Clean typography, bold photography, warm colors that match the music.",
    outcome: "A live web EPK that streamlines Skaame's professional outreach. Press can download high-res photos. Booking agents have everything they need. Fans can discover and stream music. All in one responsive, fast-loading page.",
    coverImage: "/projects/skaame/hero.jpg",
    epkScreenshots: [
      { src: "/projects/skaame/sc-hero.png", alt: "Skaame EPK Hero Section" },
      { src: "/projects/skaame/sc-afghanistan.png", alt: "Single: Afghanistan Release" },
      { src: "/projects/skaame/sc-press.png", alt: "Press Photos Section" },
      { src: "/projects/skaame/sc-video.png", alt: "Music Video Section" },
    ],
  },
  {
    id: "layo-isaac-epk",
    slug: "layo-isaac-epk",
    title: "Layo Isaac — Artist EPK",
    cat: "Design",
    desc: "Full press kit for indie alt singer-songwriter Layo Isaac — bio, discography, press photos, video links, and booking info in one document.",
    tags: ["EPK", "Music", "Art Direction", "Paid Client"],
    url: "/projects/layo-isaac-epk",
    client: "Layo Isaac",
    role: "Designer",
    year: "2024",
    tools: ["Figma", "Adobe InDesign"],
    brief: "Layo Isaac is an indie alt singer-songwriter with a distinct voice and growing following. He needed a professional EPK that could serve venues, festivals, press, and fans — consolidating scattered assets into one cohesive document.",
    approach: "The design had to match the music: intimate, thoughtful, not flashy. Used muted tones, serif typography, generous white space. Structured the EPK as a narrative: who he is, what he's done, where he's going. Made it easy to scan but rewarding to read in full.",
    outcome: "A comprehensive 12-page EPK that establishes Layo Isaac's professional identity. Venues get the booking info they need. Press get high-res assets and context. Fans get a complete picture of the artist. The EPK has been shared with multiple venues and festivals.",
    coverImage: "/projects/layo-isaac/hero.jpg",
    epkScreenshots: [
      { src: "/projects/layo-isaac/sc-header.png", alt: "EPK Cover/Header" },
      { src: "/projects/layo-isaac/sc-discography.png", alt: "Discography Section" },
      { src: "/projects/layo-isaac/sc-7days.png", alt: "7 Days Single Release" },
      { src: "/projects/layo-isaac/sc-press.png", alt: "Press Photos" },
      { src: "/projects/layo-isaac/sc-videos.png", alt: "Music Videos" },
    ],
  },
  {
    id: "blvckoreo-epk",
    slug: "blvckoreo-epk",
    title: "BlvckOreo — Personal EPK",
    cat: "Design",
    desc: "Self-designed EPK for BlvckOreo — two distinct album identities, full brand system, no brief. Apple Music HipHop top 200.",
    tags: ["EPK", "Self-Directed", "Hip-Hop", "Brand"],
    url: "/projects/blvckoreo-epk",
    client: "BlvckOreo",
    role: "Creative Director • Designer",
    year: "2024",
    tools: ["Figma", "Adobe Photoshop", "Brand Strategy"],
    brief: "BlvckOreo is a hip-hop artist with two distinct albums that needed unified branding. No client, no brief — total creative freedom. The challenge: create two unique identities that still feel like the same artist.",
    approach: "Treated each album as its own world. First album: dark, gritty, raw. Second album: vibrant, confident, polished. Found the throughline: bold typography, consistent color palette, narrative visual language. The brand system needed to support both without diluting either.",
    outcome: "Two distinct album identities that share a cohesive brand system. The EPK showcases the range — from underground to mainstream, from raw to refined. The work earned placement on Apple Music HipHop top 200, validating the approach.",
    selfInitiated: true,
    coverImage: "/projects/blvckoreo/hero.jpg",
    epkScreenshots: [
      { src: "/projects/blvckoreo/sc-header.png", alt: "EPK Header" },
      { src: "/projects/blvckoreo/sc-bio.png", alt: "Artist Bio" },
      { src: "/projects/blvckoreo/sc-discography.png", alt: "Discography" },
      { src: "/projects/blvckoreo/sc-release.png", alt: "Album Release Art" },
      { src: "/projects/blvckoreo/sc-contact.png", alt: "Contact Info" },
    ],
  },
  {
    id: "1ethfp",
    slug: "1ethfp",
    title: "1ETHFP — Creative Collaboration",
    cat: "Collab",
    desc: "Paid web3 creative collab — roadmap design, Phase 2 Anthem (written, produced, performed), and promo video editing.",
    tags: ["Web3", "Music", "Design", "Film", "Paid"],
    url: "/projects/1ethfp",
    client: "1ETHFP",
    role: "Music Producer • Designer • Video Editor",
    year: "2024",
    tools: ["Ableton Live", "Adobe Premiere Pro", "Figma"],
    brief: "1ETHFP is a web3 project building community through music and culture. They needed creative work that reflected the energy of the movement: a roadmap design, an anthem that captured the vibe, and a promo video to build hype.",
    approach: "For the roadmap: clean, minimal, but with motion. For the anthem: trap-influenced, high energy, anthemic. Wrote, produced, and performed it myself. For the video: quick cuts, glitch effects, match the music's pacing. Every piece had to feel like part of the same world.",
    outcome: "A complete creative package that established 1ETHFP's visual and sonic identity. The roadmap provided clear direction. The anthem became a rallying cry. The promo video generated excitement across social media. All three pieces worked together to build the brand.",
    coverImage: "/projects/1ethfp/roadmap.jpg",
    roleCards: [
      {
        num: "01",
        title: "Music Production",
        desc: "Wrote, produced, and performed the Phase 2 Anthem — a trap-influenced track that became the project's sonic identity.",
      },
      {
        num: "02",
        title: "Design Direction",
        desc: "Created the project roadmap with clean, minimal aesthetics. Designed key visual assets that established the brand's look.",
      },
      {
        num: "03",
        title: "Video Production",
        desc: "Edited the promo video with quick cuts and glitch effects. Matched visual pacing to the anthem's energy for maximum impact.",
      },
    ],
    images: [
      { src: "/projects/1ethfp/roadmap.jpg", alt: "1ETHFP Roadmap Design", display: "contain" },
    ],
    embeds: [
      {
        type: "youtube",
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        label: "Phase 2 Anthem",
      },
    ],
  },
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS.find(project => project.slug === slug);
}

// Export PROJECTS from data.ts for backward compatibility
import { PROJECTS as DATA_PROJECTS } from "./data";
export const PROJECTS = DATA_PROJECTS;