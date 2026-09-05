import ProjectCard from '@/components/ProjectCard/ProjectCard'
import Interlude from '@/components/Interlude/Interlude'
import { projects } from '@/data/projects'
import styles from './Work.module.css'

/* Per-project crops. Wide for systems, tall for interfaces, square for
   brands — the stack reads like a publication, not a template. */
const ratios: Record<string, string> = {
  'biscuit-ai':            '3 / 2',
  'chef4me':               '4 / 5',
  'relay':                 '16 / 9',
  'leadway-pensure':       '4 / 3',
  'olumayowa-nursing-home': '16 / 10',
  'ai-workplace-training': '3 / 2',
}

export default function Work() {
  const visible = projects.filter((p) => !p.draft)
  const current = visible.filter((p) => p.era === 'current')
  const past = visible.filter((p) => p.era === 'past')

  return (
    <section className={styles.section} id="work" aria-label="Selected work">
      <div className={styles.header}>
        <div>
          <p className={styles.sectionLabel}>03 / Selected work</p>
          <h2 className={styles.heading}>
            <span className={styles.headingLight}>Selected</span>
            <em className={styles.headingItalic}>work.</em>
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

      <p className={styles.lede}>
        Products, systems, brands, and experiments — the strongest work first.
      </p>

      {/* Current work is a sticky scroll-stack of full-width cards; past work
          stays a plain grid. The difference between the two reinforces which
          set matters. Each card gets its own image crop — projects are not
          all the same shape. */}
      <div className={styles.stack}>
        {current.map((project, i) => (
          <div key={project.slug} className={styles.stackItem}>
            <ProjectCard
              project={project}
              stacked
              flip={i % 2 === 1}
              ratio={ratios[project.slug]}
            />
          </div>
        ))}
      </div>

      <Interlude />

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
