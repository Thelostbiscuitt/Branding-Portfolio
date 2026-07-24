import ProjectCard from '@/components/ProjectCard/ProjectCard'
import { projects } from '@/data/projects'
import styles from './Work.module.css'

export default function Work() {
  const current = projects.filter((p) => p.era === 'current')
  const past = projects.filter((p) => p.era === 'past')

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

        <a
          href="https://www.behance.net/BlvckOreo"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.archiveLink}
        >
          Full archive →
        </a>
      </div>

      {/* Current work is a sticky scroll-stack of full-width cards; past work
          stays a plain grid. The difference between the two reinforces which
          set matters. */}
      <div className={styles.stack}>
        {current.map((project, i) => (
          <div key={project.slug} className={styles.stackItem}>
            <ProjectCard project={project} stacked flip={i % 2 === 1} />
          </div>
        ))}
      </div>

      <div className={styles.pastHeader}>
        <p className={styles.pastLabel}>Past work</p>
        <p className={styles.pastNote}>Brand and music work from before the shift into tech.</p>
      </div>

      <div className={styles.grid}>
        {past.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
