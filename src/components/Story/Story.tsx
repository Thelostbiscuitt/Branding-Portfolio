import styles from './Story.module.css'

/* The story of how the practice evolved:

     design  →  operations  →  product · AI · software

   The years are the visual event — huge display numerals. The roles stay
   small. It reads as a progression, not a résumé. */
const chapters = [
  {
    year: '2020',
    org: 'Habibcore',
    role: 'Design & creative direction',
    note: 'Identity systems and art direction for artists and businesses.',
  },
  {
    year: '2022',
    org: 'Leadway Pensure',
    role: 'Operations & process automation',
    note: "Four years inside one of Nigeria's largest pension funds, building the systems that keep the work moving.",
  },
  {
    year: '2026',
    org: 'Product · AI · Software',
    role: 'Designer and builder',
    note: 'CRM development, process automation, AI training — and products designed and shipped solo.',
  },
]

export default function Story() {
  return (
    <section className={styles.section} id="story" aria-label="How I got here">
      <p className={styles.sectionLabel}>06 / Story</p>

      <div className={styles.headingRow}>
        <h2 className={styles.heading}>
          Design led to<br />
          <em className={styles.headingItalic}>systems.</em>
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
