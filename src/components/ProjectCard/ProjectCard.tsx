'use client'

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

export default function ProjectCard({ project, stacked = false, flip = false }: Props) {
  const className = [
    styles.card,
    stacked ? styles.stacked : '',
    stacked && flip ? styles.stackedFlip : '',
    // `featured` spans a grid column, which means nothing in the full-width stack
    !stacked && project.featured ? styles.featured : '',
  ].filter(Boolean).join(' ')

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={className}
      aria-label={`View project: ${project.title}`}
    >
      {/* Thumbnail — always visible when stacked, revealed on hover/keyboard
          focus in the grid (pure CSS, see .module.css) */}
      <div className={styles.thumb}>
        <Image
          src={project.thumb}
          alt=""
          fill
          sizes={stacked || project.featured ? '(max-width: 768px) 100vw, 50vw' : '50vw'}
          className={styles.thumbImg}
        />
        <div className={styles.thumbOverlay} />
      </div>

      {/* Content — always visible */}
      <div className={styles.content}>
        <div className={styles.top}>
          <span className={styles.index}>{project.index}</span>
          <span className={styles.category}>{project.category}</span>
        </div>

        <div className={styles.bottom}>
          <h3 className={styles.title}>{project.title}</h3>
          {project.description && (
            <p className={styles.description}>{project.description}</p>
          )}
          <ul className={styles.tags} aria-label="Project tags">
            {project.tags.map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <span className={styles.arrow} aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  )
}
