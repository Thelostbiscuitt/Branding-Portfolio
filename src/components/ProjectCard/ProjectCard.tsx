'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Project } from '@/data/projects'
import styles from './ProjectCard.module.css'

type Props = {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`${styles.card} ${project.featured ? styles.featured : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`View project: ${project.title}`}
    >
      {/* Thumbnail — revealed on hover */}
      <div className={`${styles.thumb} ${hovered ? styles.thumbVisible : ''}`}>
        <Image
          src={project.thumb}
          alt=""
          fill
          sizes={project.featured ? '100vw' : '50vw'}
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

        <span className={`${styles.arrow} ${hovered ? styles.arrowHovered : ''}`} aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  )
}
