import styles from './Range.module.css'

/* 04 / RANGE — the "wait, he does all this?" moment.

   Each discipline is an interactive reference: hover or focus it and its
   real use cases trail out beside it. The uses live in the DOM always, so
   screen readers get them regardless; the reveal is visual only. Pure CSS —
   no JavaScript, no state, works on keyboard focus too. */
const disciplines = [
  { name: 'BRAND',          offset: '0vw',  size: 'l', uses: 'Leadway Pensure · artist EPKs · identity systems' },
  { name: 'PRODUCT',        offset: '14vw', size: 'm', uses: 'Biscuit AI · Chef4Me · product thinking' },
  { name: 'GRAPHIC DESIGN', offset: '4vw',  size: 's', uses: 'EPK spreads · social systems · brand guidelines' },
  { name: 'SOFTWARE',       offset: '20vw', size: 'l', uses: 'Relay CRM · BiscuitBot · web builds' },
  { name: 'AI',             offset: '8vw',  size: 'm', uses: 'LLM integration · memory systems · image generation' },
  { name: 'SYSTEMS',        offset: '16vw', size: 's', uses: 'audit trails · RBAC · SLA clocks' },
  { name: 'AUTOMATION',     offset: '6vw',  size: 'm', uses: 'expiry alerts · Notion sync · ops workflows' },
]

export default function Range() {
  return (
    <section className={styles.section} aria-label="Range">
      <p className={styles.sectionLabel}>04 / Range</p>
      <p className={styles.intro}>
        I work across
        <span className={styles.hint}> — hover a discipline</span>
      </p>

      <div className={styles.poster}>
        {disciplines.map((d) => (
          <div
            key={d.name}
            className={styles.item}
            style={{ marginLeft: d.offset }}
            tabIndex={0}
          >
            <span className={`${styles.word} ${styles[`size${d.size.toUpperCase()}`]}`}>
              {d.name}
            </span>
            <span className={styles.uses}>{d.uses}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
