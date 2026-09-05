'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/data/projects'
import styles from './ProjectCard.module.css'

type Props = {
  project: Project
  /** Full-width scroll-stack variant — image one side, text the other */
  stacked?: boolean
  /** Puts the image on the left instead of the right; alternates down the stack */
  flip?: boolean
}

/* The card used to be a single <Link> wrapping everything, which left nowhere
   to put a second link: an anchor inside an anchor is invalid and browsers
   recover from it by splitting the markup, which loses keyboard access to the
   inner link. The card is now a plain <article> with the case-study link
   stretched across it by CSS, and the live link as an ordinary sibling that
   sits above it in the stacking order.

   The stretched link is deliberately the FIRST child: the hover states below
   are mirrored on focus through `~` sibling selectors, which only reach
   forwards. */
export default function ProjectCard({ project, stacked = false, flip = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const className = [
    styles.card,
    stacked ? styles.stacked : '',
    stacked && flip ? styles.stackedFlip : '',
    // `featured` spans a grid column, which means nothing in the full-width stack
    !stacked && project.featured ? styles.featured : '',
  ].filter(Boolean).join(' ')

  /* autoplay is what `prefers-reduced-motion: reduce` exists to prevent, and
     CSS cannot stop it. load() rewinds the element to its poster rather than
     leaving a paused still frame, so the card falls back to exactly the image
     it would have shown anyway. Re-runs on change so toggling the OS setting
     takes effect without a reload. */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const apply = () => {
      if (mq.matches) {
        el.pause()
        el.load()
      } else {
        // Autoplay can still be refused by the browser; the poster stays up.
        void el.play().catch(() => {})
      }
    }

    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <article className={className}>
      {/* Stretched by CSS to cover the card. Empty by design — the card's text
          is already rendered below, so the accessible name comes from the label. */}
      <Link
        href={`/projects/${project.slug}`}
        className={styles.cardLink}
        aria-label={`View project: ${project.title}`}
      />

      {/* Thumbnail — always visible when stacked, revealed on hover/keyboard
          focus in the grid (pure CSS, see .module.css) */}
      <div className={styles.thumb}>
        {project.video ? (
          <video
            ref={videoRef}
            className={`${styles.thumbImg} ${styles.thumbVideo}`}
            src={project.video}
            poster={project.thumb}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <Image
            src={project.thumb}
            alt=""
            fill
            sizes={stacked || project.featured ? '(max-width: 768px) 100vw, 50vw' : '50vw'}
            className={styles.thumbImg}
          />
        )}
        <div className={styles.thumbOverlay} />
      </div>

      {/* Content — always visible */}
      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.index}>{project.index}</span>
          <span className={styles.category}>{project.category}</span>
          {project.year && <span className={styles.year}>{project.year}</span>}
        </div>

        <div className={styles.bottom}>
          <h3 className={styles.title}>{project.title}</h3>
          {project.positioning && (
            <p className={styles.positioning}>{project.positioning}</p>
          )}
          {project.description && (
            <p className={styles.description}>{project.description}</p>
          )}
          <ul className={styles.tags} aria-label="Project tags">
            {project.tags.map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>

          {(project.liveUrl || project.githubUrl) && (
            <div className={styles.links}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveLink}
                >
                  Live <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveLink}
                >
                  Code <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </div>

        <span className={styles.arrow} aria-hidden="true">
          ↗
        </span>
      </div>
    </article>
  )
}
