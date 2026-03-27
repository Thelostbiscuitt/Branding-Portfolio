'use client'

import { useState } from 'react'
import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { projects } from '@/data/projects'
import styles from './Work.module.css'

type Filter = 'all' | 'Brand' | 'Design' | 'Collab'

const filters: Filter[] = ['all', 'Brand', 'Design', 'Collab']

export default function Work() {
  const [active, setActive] = useState<Filter>('all')

  const visible = active === 'all'
    ? projects
    : projects.filter((p) => p.category === active)

  return (
    <section className={styles.section} id="work" aria-label="Selected work">
      <div className={styles.header}>
        <div>
          <p className={styles.sectionLabel}>02 — Work</p>
          <h2 className={styles.heading}>
            <span className={styles.headingLight}>Selected </span>
            <em className={styles.headingItalic}>Projects.</em>
          </h2>
        </div>

        <div className={styles.controls}>
          <nav className={styles.filters} aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`${styles.filterBtn} ${active === f ? styles.filterBtnActive : ''}`}
                aria-pressed={active === f}
              >
                {f}
              </button>
            ))}
          </nav>
          <a
            href="https://www.behance.net/BlvckOreo"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.archiveLink}
          >
            Full archive →
          </a>
        </div>
      </div>

      <div className={styles.grid}>
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
