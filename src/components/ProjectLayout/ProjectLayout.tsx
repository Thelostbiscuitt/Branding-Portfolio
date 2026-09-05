import Image from 'next/image'
import Link  from 'next/link'
import type { ReactNode } from 'react'
import Nav    from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
import styles from './ProjectLayout.module.css'

export type ProjectMeta = {
  category:   string
  year:       string
  client:     string
  role:       string
  tools:      string[]
  tags:       string[]
  liveUrl?:   string
  githubUrl?: string
}

export type ProjectSection = {
  number:  string    // e.g. '01'
  heading: string    // e.g. 'The problem'
  body:    ReactNode // string or JSX — both are valid ReactNode
}

export type AiWorkflow = {
  intro?:  string
  tools:   { name: string; use: string }[]
  outcome?: string
}

export type ImpactStat = {
  value: string
  label: string
}

type Props = {
  title:       string
  heroImage:   string
  heroAlt:     string
  meta:        ProjectMeta
  sections:    ProjectSection[]
  screenshots: { src: string; alt: string }[]
  aiWorkflow?: AiWorkflow
  impact?:     ImpactStat[]
  next?:       { slug: string; category: string; title: string }
}

/* Rendered as the body of a normal numbered section, so it inherits
   .sectionBody and needs no heading of its own. A <dl> rather than a <ul>:
   these are term/description pairs, and .sectionBody ul already carries the
   orange bullet treatment that would fight with the rows. */
function AiWorkflowBody({ workflow }: { workflow: AiWorkflow }) {
  return (
    <>
      {workflow.intro && <p>{workflow.intro}</p>}

      <dl className={styles.aiToolList}>
        {workflow.tools.map((tool) => (
          <div key={tool.name} className={styles.aiToolRow}>
            <dt className={styles.aiToolName}>{tool.name}</dt>
            <dd className={styles.aiToolUse}>{tool.use}</dd>
          </div>
        ))}
      </dl>

      {workflow.outcome && <p className={styles.aiOutcome}>{workflow.outcome}</p>}
    </>
  )
}

export default function ProjectLayout({
  title,
  heroImage,
  heroAlt,
  meta,
  sections,
  screenshots,
  aiWorkflow,
  impact,
  next,
}: Props) {
  /* Section numbers are author-supplied, so with no AI workflow to insert the
     array is passed through untouched and every existing case study renders
     byte-identically. When there is one, it goes in ahead of the outcome —
     method belongs between how it was approached and what resulted — and the
     run is renumbered so the sequence stays 01, 02, 03 without a collision. */
  const flow: ProjectSection[] = (() => {
    if (!aiWorkflow) return sections

    const outcomeAt = sections.findIndex((s) => /outcome/i.test(s.heading))
    const at = outcomeAt === -1 ? sections.length : outcomeAt

    const merged: ProjectSection[] = [
      ...sections.slice(0, at),
      { number: '', heading: 'AI workflow', body: <AiWorkflowBody workflow={aiWorkflow} /> },
      ...sections.slice(at),
    ]

    return merged.map((s, i) => ({ ...s, number: String(i + 1).padStart(2, '0') }))
  })()

  return (
    <>
      <a href="#project-content" className="skip-link">Skip to content</a>
      <Nav />

      <article id="project-content" className={styles.article}>
        {/* ── Back link ── */}
        <div className={styles.backRow}>
          <Link href="/#work" className={styles.back}>
            ← Back to work
          </Link>
        </div>

        {/* ── Header ── */}
        <header className={styles.header}>
          <p className={styles.headerMeta}>
            {meta.category}
            <span className={styles.dot}>·</span>
            {meta.year}
            <span className={styles.dot}>·</span>
            {meta.client}
          </p>

          <h1 className={styles.title}>{title}</h1>

          {(meta.liveUrl || meta.githubUrl) && (
            <div className={styles.headerLinks}>
              {meta.liveUrl && (
                <a href={meta.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.headerLink}>
                  View live ↗
                </a>
              )}
              {meta.githubUrl && (
                <a href={meta.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.headerLink}>
                  GitHub ↗
                </a>
              )}
            </div>
          )}
        </header>

        {/* ── Hero image ── */}
        <div className={styles.heroWrap}>
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            priority
            sizes="100vw"
            className={styles.heroImg}
          />
        </div>

        {/* ── Meta + sections grid ── */}
        <div className={styles.body}>
          {/* Left: project details */}
          <aside className={styles.aside}>
            <div className={styles.asideBlock}>
              <p className={styles.asideLabel}>Role</p>
              <p className={styles.asideVal}>{meta.role}</p>
            </div>
            <div className={styles.asideBlock}>
              <p className={styles.asideLabel}>Client</p>
              <p className={styles.asideVal}>{meta.client}</p>
            </div>
            <div className={styles.asideBlock}>
              <p className={styles.asideLabel}>Year</p>
              <p className={styles.asideVal}>{meta.year}</p>
            </div>
            <div className={styles.asideBlock}>
              <p className={styles.asideLabel}>Tools</p>
              <ul className={styles.toolsList}>
                {meta.tools.map((t) => (
                  <li key={t} className={styles.toolTag}>{t}</li>
                ))}
              </ul>
            </div>
            <div className={styles.asideBlock}>
              <p className={styles.asideLabel}>Deliverables</p>
              <ul className={styles.toolsList}>
                {meta.tags.map((t) => (
                  <li key={t} className={styles.toolTag}>{t}</li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right: numbered sections */}
          <div className={styles.sections}>
            {flow.map((s) => (
              <div key={`${s.number}-${s.heading}`} className={styles.section}>
                <p className={styles.sectionNum}>
                  <span className={styles.sectionNumOrange}>{s.number}</span>
                  {' · '}
                  {s.heading}
                </p>
                <div className={styles.sectionBody}>
                  {s.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Impact ── */}
        {impact && impact.length > 0 && (
          <section className={styles.impactWrap} aria-label="Impact">
            <p className={styles.impactLabel}>Impact</p>
            <dl className={styles.impactGrid}>
              {impact.map((stat) => {
                // Trailing non-digits (%, +, x, k) take the accent; the number does not
                const match = stat.value.match(/^(.*?)([^0-9]*)$/)
                const num = match?.[1] ?? stat.value
                const symbol = match?.[2] ?? ''

                return (
                  <div key={stat.label} className={styles.impactItem}>
                    <dt className={styles.impactValue}>
                      {num}
                      {symbol && <span className={styles.impactSymbol}>{symbol}</span>}
                    </dt>
                    <dd className={styles.impactStatLabel}>{stat.label}</dd>
                  </div>
                )
              })}
            </dl>
          </section>
        )}

        {/* ── Screenshots grid ── */}
        {screenshots.length > 0 && (
          <div className={styles.screenshotsWrap}>
            <p className={styles.screenshotsLabel}>Project images</p>
            <div className={`${styles.screenshotsGrid} ${screenshots.length === 1 ? styles.screenshotsGridSingle : ''}`}>
              {screenshots.map((s, i) => (
                <div key={i} className={styles.screenshotFrame}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.screenshotImg}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Next project ── */}
        {next && (
          <div className={styles.nextWrap}>
            <p className={styles.nextLabel}>Next project</p>
            <Link href={`/projects/${next.slug}`} className={styles.nextLink}>
              <span className={styles.nextCategory}>{next.category}</span>
              <span className={styles.nextTitle}>{next.title} →</span>
            </Link>
          </div>
        )}
      </article>

      <Footer />
    </>
  )
}
