import styles from './Systems.module.css'

const chain = ['Design', 'Operations', 'Product', 'Software', 'Automation']

export default function Systems() {
  return (
    <section className={styles.section} id="systems" aria-label="Systems philosophy">
      <div className={styles.left}>
        <p className={styles.sectionLabel}>03 · Systems</p>
        <h2 className={styles.heading}>
          I like <em className={styles.headingItalic}>systems.</em>
        </h2>
      </div>

      <div className={styles.right}>
        <p className={styles.body}>
          Brands are systems. Products are systems. Businesses are systems.
          Good design makes complicated things easier to understand.
        </p>

        <ol className={styles.chain} role="list">
          {chain.map((step, i) => (
            <li key={step} className={styles.chainItem}>
              <span className={styles.chainText}>{step}</span>
              {i < chain.length - 1 && (
                <span className={styles.chainArrow} aria-hidden="true">→</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}