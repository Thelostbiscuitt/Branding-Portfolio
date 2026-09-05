import styles from './Career.module.css'

const chapters = [
  {
    year: '2020',
    org:  'Habibcore',
    role: 'Brand & art direction',
    note: 'Identity systems and creative direction for artists and businesses.',
  },
  {
    year: '2022',
    org:  'Leadway Pensure',
    role: 'Operations & process automation',
    note: "Four years inside one of Nigeria's largest pension funds, building the systems that keep the work moving.",
  },
  {
    year: '2026',
    org:  'Product · AI · Software',
    role: 'Designer and builder',
    note: 'CRM development, process automation, AI training — and products designed and shipped solo.',
  },
]

export default function Career() {
  return (
    <section className={styles.section} id="career" aria-label="Career">
      <div className={styles.header}>
        <p className={styles.sectionLabel}>04 · Career</p>
        <h2 className={styles.heading}>
          From brand to <em className={styles.headingItalic}>build.</em>
        </h2>
        <p className={styles.lede}>
          What started as visual design became operations, then automation,
          then software. Each step made the next one possible.
        </p>
      </div>

      <ol className={styles.chapters} role="list">
        {chapters.map((chapter) => (
          <li key={chapter.year} className={styles.chapter}>
            <span className={styles.year}>{chapter.year}</span>
            <div className={styles.info}>
              <p className={styles.org}>{chapter.org}</p>
              <p className={styles.role}>{chapter.role}</p>
              <p className={styles.note}>{chapter.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}