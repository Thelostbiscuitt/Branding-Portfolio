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

type Props = {
  title:       string
  heroImage:   string
  heroAlt:     string
  meta:        ProjectMeta
  sections:    ProjectSection[]
  screenshots: { src: string; alt: string }[]
  next?:       { slug: string; category: string; title: string }
}

export default function ProjectLayout({
  title,
  heroImage,
  heroAlt,
  meta,
  sections,
  screenshots,
  next,
}: Props) {
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
            {sections.map((s) => (
              <div key={s.number} className={styles.section}>
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
