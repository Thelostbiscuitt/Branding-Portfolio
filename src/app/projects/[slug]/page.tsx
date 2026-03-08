import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, PROJECT_DETAILS, type ProjectDetail, type MediaEmbed, type ContribSection } from "@/lib/projects";
import { LightSwitch } from "@/components/ui/LightSwitch";

export const dynamicParams = true;

export async function generateStaticParams() {
  return PROJECT_DETAILS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Michael Oguntimehin`,
    description: project.brief || project.title,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// EMBED BLOCK
// ─────────────────────────────────────────────────────────────────────────────
function EmbedBlock({ embed }: { embed: MediaEmbed }) {
  if (embed.type === "youtube") {
    return (
      <div>
        <div className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-mid mb-3">{embed.label}</div>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe src={embed.src} className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
      </div>
    );
  }
  if (embed.type === "soundcloud") {
    return (
      <div>
        <div className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-mid mb-3">{embed.label}</div>
        <iframe width="100%" height={embed.height || 166} scrolling="no" frameBorder="no" allow="autoplay" src={embed.src} className="border-0" />
      </div>
    );
  }
  if (embed.type === "behance") {
    return (
      <div className="flex justify-center">
        <iframe src={embed.src} height={embed.height || 316} width="404" allowFullScreen frameBorder="0"
          allow="clipboard-write" referrerPolicy="strict-origin-when-cross-origin" className="border border-rule rounded" />
      </div>
    );
  }
  // spotify / generic iframe
  return (
    <div>
      <div className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-mid mb-3">{embed.label}</div>
      <iframe style={{ borderRadius: "8px" }} src={embed.src} width="100%" height={embed.height || 160}
        frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR BLOCK
// ─────────────────────────────────────────────────────────────────────────────
function SidebarBlock({ project, role, year, tools, liveUrl, behanceUrl, deliverables }: {
  project?: ProjectDetail;
  role: string;
  year: string;
  tools: string[];
  liveUrl?: string;
  behanceUrl?: string;
  deliverables?: string[];
}) {
  const client = project?.client;
  return (
    <div className="border border-rule p-6 sticky top-24">
      {client && (
        <div className="flex justify-between py-3 border-b border-rule">
          <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-mid">Client</span>
          <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-ink text-right max-w-[58%]">{client}</span>
        </div>
      )}
      <div className="flex justify-between py-3 border-b border-rule">
        <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-mid">Role</span>
        <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-ink text-right max-w-[58%]">{role}</span>
      </div>
      <div className="flex justify-between py-3 border-b border-rule">
        <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-mid">Year</span>
        <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-ink">{year}</span>
      </div>
      <div className="pt-3">
        <div className="font-mono text-[0.6rem] tracking-[0.08em] uppercase text-mid mb-3">
          {deliverables ? "Deliverables" : "Tools"}
        </div>
        <div className="flex flex-wrap gap-2">
          {(deliverables || tools).map((t) => (
            <span key={t} className="font-mono text-[0.55rem] tracking-[0.06em] uppercase border border-rule text-mid px-2 py-1">{t}</span>
          ))}
        </div>
      </div>
      {(liveUrl || behanceUrl) && (
        <div className="pt-4 mt-3 border-t border-rule space-y-2">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.08em] uppercase text-mid hover:text-terra transition-colors no-underline">
              View live <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
          {behanceUrl && (
            <a href={behanceUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.08em] uppercase text-mid hover:text-terra transition-colors no-underline">
              View on Behance <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEADWAY PITCH SAMPLES
// Colour palette · 3 social post templates · brand voice pairs
// ─────────────────────────────────────────────────────────────────────────────
function LeadwayPitchSamples() {
  const swatches = [
    { hex: "#111111", name: "Black",          role: "Primary Dark",   light: false },
    { hex: "#C4520A", name: "Burnt Orange",   role: "Primary Deep",   light: false },
    { hex: "#E8660A", name: "Leadway Orange", role: "Primary Brand",  light: false },
    { hex: "#F5A623", name: "Amber",          role: "Warm Accent",    light: true  },
    { hex: "#FAF7F2", name: "Off-White",      role: "Background",     light: true  },
  ];

  const voicePairs = [
    {
      doText:   '"Your salary stops one day. Your dignity doesn\'t have to."',
      doNote:   "Lead with human outcome. Make retirement feel like dignity preserved, not money saved.",
      dontText: '"Maximize your RSA contributions for optimal portfolio ROI."',
      dontNote: "Jargon creates distance. Talk like a person, not a prospectus.",
    },
    {
      doText:   '"Whether you collect salary or collect hustle — your retirement matters."',
      doNote:   "Speaks directly to both formal and informal sector workers. Inclusive, not generic.",
      dontText: '"We are committed to delivering world-class solutions to all valued stakeholders."',
      dontNote: "Corporate boilerplate says nothing. Every sentence must earn its place.",
    },
    {
      doText:   '"₦10,000 today becomes ₦4.2M in 30 years. That\'s not a promise — it\'s maths."',
      doNote:   "Make the abstract concrete. Real numbers beat vague assurances every time.",
      dontText: '"Don\'t miss out on compound interest! Act now before it\'s too late!!"',
      dontNote: "Hype and alarm undermine trust. Premium brands don't shout.",
    },
  ];

  return (
    <div className="mb-20">
      {/* ── Colour Palette ── */}
      <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mid pb-4 mb-6 border-b border-rule">
        <span className="text-[#E8660A] mr-3">Sample —</span> Brand Colour System
      </div>
      <div className="grid grid-cols-5 gap-[3px] mb-16 overflow-hidden rounded-sm">
        {swatches.map((s) => (
          <div key={s.hex} className="h-36 flex flex-col justify-end p-4" style={{ background: s.hex, border: s.light ? "1px solid #e3dfda" : "none" }}>
            <span className="font-mono text-[0.6rem] tracking-[0.08em] uppercase font-medium" style={{ color: s.light ? "rgba(17,17,17,.9)" : "rgba(255,255,255,.9)" }}>{s.name}</span>
            <span className="font-mono text-[0.55rem] tracking-[0.06em] mt-0.5" style={{ color: s.light ? "rgba(17,17,17,.5)" : "rgba(255,255,255,.55)" }}>{s.hex}</span>
            <span className="font-mono text-[0.5rem] tracking-[0.06em] uppercase mt-0.5" style={{ color: s.light ? "rgba(17,17,17,.35)" : "rgba(255,255,255,.35)" }}>{s.role}</span>
          </div>
        ))}
      </div>

      {/* ── Social Post Templates ── */}
      <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mid pb-4 mb-6 border-b border-rule">
        <span className="text-[#E8660A] mr-3">Sample —</span> Social Media Templates
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {/* Post 1 — dark statement */}
        <div className="aspect-square bg-[#111] p-6 flex flex-col justify-between overflow-hidden">
          <span className="font-mono text-[0.5rem] tracking-[0.14em] uppercase" style={{ color: "rgba(250,247,242,.35)" }}>Leadway Pensure PFA</span>
          <div>
            <div className="font-['Barlow_Condensed',sans-serif] font-black text-[clamp(2rem,5vw,3.5rem)] leading-[.88] uppercase tracking-tight text-[#FAF7F2]">
              EVERY<br />DAY<br /><span className="text-[#E8660A]">COUNTS.</span>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[0.8rem] leading-relaxed font-light max-w-[220px]" style={{ color: "rgba(250,247,242,.55)" }}>
              The earlier you contribute to your RSA, the more your money works while you sleep.
            </p>
            <span className="inline-block font-mono text-[0.5rem] tracking-[0.1em] uppercase bg-[#E8660A] text-white px-3 py-1 rounded-full">Open Your RSA Today</span>
          </div>
        </div>

        {/* Post 2 — orange stat */}
        <div className="aspect-square bg-[#E8660A] p-6 flex flex-col justify-between overflow-hidden">
          <span className="font-mono text-[0.5rem] tracking-[0.14em] uppercase" style={{ color: "rgba(250,247,242,.6)" }}>Did You Know?</span>
          <div>
            <div className="font-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[.9] tracking-tight text-[#FAF7F2]">₦4.2M</div>
            <p className="text-[0.8rem] leading-relaxed mt-2" style={{ color: "rgba(250,247,242,.7)" }}>
              What ₦10,000/month becomes over 30 years with Leadway Pensure.
            </p>
          </div>
          <span className="font-mono text-[0.48rem] tracking-[0.12em] uppercase" style={{ color: "rgba(250,247,242,.4)" }}>Leadway Pensure · @leadwaypensure</span>
        </div>

        {/* Post 3 — quote */}
        <div className="aspect-square bg-[#FAF7F2] p-6 flex flex-col justify-between overflow-hidden border border-rule">
          <span className="font-mono text-[0.48rem] tracking-[0.14em] uppercase font-bold text-[#C4520A]">Words to retire by</span>
          <p className="font-serif italic text-[clamp(.9rem,2vw,1.1rem)] leading-relaxed text-[#111]">
            "The best time to plant a tree was 20 years ago. The second best time is now."
          </p>
          <div>
            <p className="font-mono text-[0.48rem] tracking-[0.1em] uppercase" style={{ color: "rgba(17,17,17,.4)" }}>Chinese Proverb · Applied to your pension</p>
            <p className="font-mono text-[0.5rem] tracking-[0.14em] uppercase font-bold mt-1" style={{ color: "rgba(17,17,17,.25)" }}>LEADWAY PENSURE PFA</p>
          </div>
        </div>
      </div>

      {/* ── Brand Voice ── */}
      <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mid pb-4 mb-6 border-b border-rule">
        <span className="text-[#E8660A] mr-3">Sample —</span> Brand Voice
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-rule border border-rule mb-8">
        {voicePairs.map((pair, i) => (
          <>
            <div key={`do-${i}`} className="bg-bg p-8 border-l-[3px] border-[#E8660A]">
              <div className="font-mono text-[0.52rem] tracking-[0.1em] uppercase text-[#E8660A] mb-3">✓ Do — Say This</div>
              <p className="font-serif italic text-[1rem] leading-[1.65] text-ink mb-3">{pair.doText}</p>
              <p className="font-mono text-[0.55rem] tracking-[0.04em] text-mid leading-relaxed">{pair.doNote}</p>
            </div>
            <div key={`dont-${i}`} className="bg-bg p-8 border-l-[3px] border-rule">
              <div className="font-mono text-[0.52rem] tracking-[0.1em] uppercase text-mid mb-3">✕ Avoid — Not This</div>
              <p className="font-serif italic text-[1rem] leading-[1.65] text-ink mb-3">{pair.dontText}</p>
              <p className="font-mono text-[0.55rem] tracking-[0.04em] text-mid leading-relaxed">{pair.dontNote}</p>
            </div>
          </>
        ))}
      </div>

      {/* Full pitch link */}
      <div className="flex gap-4 flex-wrap mt-8">
        <a href="/leadway-pitch.html" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.08em] uppercase bg-ink text-bg px-6 py-3 hover:bg-terra transition-colors no-underline">
          View full brand pitch <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTRIBUTION BLOCK
// ─────────────────────────────────────────────────────────────────────────────
function ContributionBlock({ contrib, index, showPitchSamples }: { contrib: ContribSection; index: number; showPitchSamples?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mid mb-6">
        {String(index + 1).padStart(2, "0")} — {contrib.title}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 mb-16 items-start">
        <div className="space-y-10">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.1em] uppercase px-3 py-1.5 ${
            contrib.badgeType === "self" ? "bg-terra text-bg" : "bg-ink text-bg"
          }`}>
            {contrib.badgeType === "self" ? "★ " : ""}{contrib.badge}
          </div>
          <div>
            <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-terra mb-4">The Brief</div>
            <p className="font-serif text-[1.1rem] leading-[1.8] text-mid">{contrib.brief}</p>
          </div>
          <div>
            <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-terra mb-4">The Approach</div>
            <p className="font-serif text-[1.1rem] leading-[1.8] text-mid">{contrib.approach}</p>
          </div>
          <div>
            <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-terra mb-4">The Outcome</div>
            <p className="font-serif text-[1.1rem] leading-[1.8] text-mid">{contrib.outcome}</p>
          </div>
        </div>

        <SidebarBlock
          role={contrib.role}
          year={contrib.year}
          tools={[]}
          deliverables={contrib.deliverables}
          liveUrl={contrib.liveUrl}
        />
      </div>

      {/* Pitch samples after contrib 01 */}
      {showPitchSamples && index === 0 && <LeadwayPitchSamples />}

      {/* Embeds for this contribution */}
      {contrib.embeds && contrib.embeds.length > 0 && (
        <div className="mb-16">
          <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mid pb-4 mb-8 border-b border-rule">
            {contrib.title}
          </div>
          <div className={`grid gap-8 ${contrib.embeds.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
            {contrib.embeds.map((e, i) => <EmbedBlock key={i} embed={e} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = PROJECT_DETAILS.findIndex((p) => p.slug === slug);
  const next = PROJECT_DETAILS[(currentIndex + 1) % PROJECT_DETAILS.length];
  const isLeadway = project.slug === "leadway-pensure";
  const is1ETHFP  = project.slug === "1ethfp";

  return (
    <main className="min-h-screen bg-bg">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[300] flex items-center justify-between px-12 py-5 bg-bg/96 backdrop-blur-md border-b border-rule">
        <Link href="/" className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-mid hover:text-ink transition-colors no-underline">
          <ArrowLeft className="w-3 h-3" /> Back to work
        </Link>
        <span className="font-sans font-black text-[1.05rem] tracking-[-0.02em] text-ink">
          Michael<span className="text-terra">.</span>
        </span>
        <div className="flex items-center gap-4">
          <LightSwitch />
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-mid hover:text-terra transition-colors no-underline">
              Live EPK <ArrowUpRight className="w-3 h-3" />
            </a>
          ) : project.behanceUrl ? (
            <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase text-mid hover:text-terra transition-colors no-underline">
              Behance <ArrowUpRight className="w-3 h-3" />
            </a>
          ) : null}
        </div>
      </nav>

      <div className="pt-24 px-12 pb-0 max-w-[1280px] mx-auto">

        {/* ── Meta row ── */}
        <div className="flex flex-wrap items-center gap-3 mb-8 pt-8">
          <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-terra">{project.cat}</span>
          <span className="text-rule">·</span>
          <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-mid">{project.year}</span>
          <span className="text-rule">·</span>
          <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-mid">{project.client}</span>
          {project.selfInitiated && (
            <>
              <span className="text-rule">·</span>
              <span className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-terra">Self-Directed</span>
            </>
          )}
        </div>

        {/* ── Title ── */}
        <h1 className="font-sans font-black text-[clamp(2.5rem,6vw,6rem)] tracking-[-0.04em] leading-[0.92] mb-12">
          {project.title}
        </h1>

        {/* ── Stats band (Leadway) ── */}
        {project.stats && (
          <div className="w-full bg-[#111] p-12 mb-16 relative overflow-hidden">
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #E8660A 0%, transparent 70%)" }} />
            <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#E8660A] mb-6">About the organisation</div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {project.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-sans font-black text-[clamp(1.8rem,4vw,3.5rem)] tracking-[-0.04em] text-[#FAF7F2] leading-none">{s.num}</div>
                  <div className="font-mono text-[0.58rem] tracking-[0.08em] uppercase mt-2" style={{ color: "rgba(250,247,242,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Cover image (non-Leadway) ── */}
        {!isLeadway && (
          <div className="w-full relative overflow-hidden mb-16 bg-card" style={{ aspectRatio: "16/9" }}>
            <Image src={project.coverImage} alt={project.title} fill quality={90}
              className={`${project.coverImage.includes("roadmap") ? "object-contain" : "object-cover object-top"}`}
              priority sizes="100vw" />
          </div>
        )}

        {/* ── LEADWAY: dual contributions + pitch samples ── */}
        {isLeadway && project.contributions && (
          <div>
            {project.contributions.map((contrib, i) => (
              <div key={i}>
                <ContributionBlock contrib={contrib} index={i} showPitchSamples={project.showPitchSamples} />
                {i < project.contributions!.length - 1 && (
                  <div className="relative border-t-2 border-ink my-16">
                    <span className="absolute -top-[10px] left-0 bg-bg pr-4 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mid">
                      02 — {project.contributions![1].title}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── STANDARD: brief/approach/outcome + sidebar ── */}
        {!isLeadway && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 mb-20 items-start">
            <div className="space-y-12">
              {project.brief && (
                <div>
                  <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-terra mb-4">The Brief</div>
                  <p className="font-serif text-[1.1rem] leading-[1.8] text-mid">{project.brief}</p>
                </div>
              )}
              <div>
                <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-terra mb-4">The Approach</div>
                <p className="font-serif text-[1.1rem] leading-[1.8] text-mid">{project.approach}</p>
              </div>
              <div>
                <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-terra mb-4">The Outcome</div>
                <p className="font-serif text-[1.1rem] leading-[1.8] text-mid">{project.outcome}</p>
              </div>
            </div>
            <SidebarBlock
              project={project}
              role={project.role}
              year={project.year}
              tools={project.tools}
              liveUrl={project.liveUrl}
              behanceUrl={project.behanceUrl}
            />
          </div>
        )}

        {/* ── ROLE CARDS (1ETHFP) ── */}
        {is1ETHFP && project.roleCards && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-rule border border-rule mb-20">
            {project.roleCards.map((card) => (
              <div key={card.num} className="bg-bg p-8">
                <div className="font-sans font-black text-[2.5rem] tracking-[-0.04em] text-terra leading-none mb-2">{card.num}</div>
                <div className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-ink mb-2">{card.title}</div>
                <div className="font-serif text-[0.9rem] leading-[1.6] text-mid italic">{card.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── EPK SCREENSHOTS ── */}
        {project.epkScreenshots && project.epkScreenshots.length > 0 && (
          <div className="mb-20">
            <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mid pb-4 mb-8 border-b border-rule">EPK Pages</div>
            <div className="flex flex-col gap-[2px] border border-rule overflow-hidden">
              {project.epkScreenshots.map((img, i) => (
                <div key={i} className="w-full bg-card overflow-hidden relative">
                  <Image src={img.src} alt={img.alt} width={1440} height={900} quality={90} className="w-full h-auto" sizes="100vw" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STANDARD IMAGE GALLERY ── */}
        {project.images && project.images.length > 0 && (
          <div className="mb-20">
            <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mid pb-4 mb-8 border-b border-rule">Project Images</div>
            <div className="space-y-4">
              {project.images.map((img, i) => (
                <div key={i} className="w-full bg-card overflow-hidden">
                  <Image src={img.src} alt={img.alt} width={1440} height={900} quality={90}
                    className={`w-full ${img.display === "contain" ? "object-contain" : "object-cover"}`}
                    style={img.display !== "contain" ? { aspectRatio: "16/9" } : {}}
                    sizes="100vw" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MEDIA EMBEDS (non-Leadway) ── */}
        {project.embeds && project.embeds.length > 0 && (
          <div className="mb-20">
            <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mid pb-4 mb-8 border-b border-rule">
              {is1ETHFP ? "Music & Video" : "Listen"}
            </div>
            <div className={`grid gap-8 ${project.embeds.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
              {project.embeds.map((e, i) => <EmbedBlock key={i} embed={e} />)}
            </div>
          </div>
        )}

        {/* ── Next project ── */}
        <div className="border-t border-rule py-12 mb-8">
          <div className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-mid mb-6">Next project</div>
          <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between no-underline">
            <div>
              <div className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-terra mb-1">{next.cat}</div>
              <h3 className="font-sans font-black text-[clamp(1.5rem,3vw,3rem)] tracking-[-0.03em] text-ink group-hover:text-terra transition-colors">
                {next.title}
              </h3>
            </div>
            <ArrowUpRight className="w-8 h-8 text-mid group-hover:text-terra transition-colors flex-shrink-0" />
          </Link>
        </div>

      </div>
    </main>
  );
}
