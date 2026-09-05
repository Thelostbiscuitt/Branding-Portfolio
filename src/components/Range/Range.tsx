import styles from './Range.module.css'

/* 03 / RANGE — the "wait, he does all this?" moment.
   An editorial poster, not a skills list. Disciplines at shifting scales
   and offsets, like a typeset specimen page. */
const disciplines = [
  { name: 'BRAND',        offset: '0vw',   size: 'l' },
  { name: 'PRODUCT',      offset: '14vw',  size: 'm' },
  { name: 'GRAPHIC DESIGN', offset: '4vw', size: 's' },
  { name: 'SOFTWARE',     offset: '20vw',  size: 'l' },
  { name: 'AI',           offset: '8vw',   size: 'm' },
  { name: 'SYSTEMS',      offset: '16vw',  size: 's' },
  { name: 'AUTOMATION',   offset: '6vw',   size: 'm' },
]

export default function Range() {
  return (
    <section className={styles.section} aria-label="Range">
      <p className={styles.sectionLabel}>03 / Range</p>
      <p className={styles.intro}>I work across</p>

      <div className={styles.poster}>
        {disciplines.map((d) => (
          <span
            key={d.name}
            className={`${styles.word} ${styles[`size${d.size.toUpperCase()}`]}`}
            style={{ marginLeft: d.offset }}
          >
            {d.name}
          </span>
        ))}
      </div>
    </section>
  )
}
