import ProjectCard from '@/components/ProjectCard/ProjectCard'
import Interlude from '@/components/Interlude/Interlude'
import Archive from '@/components/Archive/Archive'
import { projects } from '@/data/projects'
import styles from './Work.module.css'

/* Per-project crops. Wide for systems, tall for interfaces, square for
   brands — the stack reads like a publication, not a template. */
const ratios: Record<string, string> = {
  'biscuit-ai':            '16 / 9',
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
              large={i === 0}
            />
          </div>
        ))}
      </div>

      <Interlude />

      <Archive projects={past} />
    </section>
  )
}
