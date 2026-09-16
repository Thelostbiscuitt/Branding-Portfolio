import styles from './Position.module.css'

/* 01 / POSITION — what "designer, builder, operator" actually means.
   A typographic sequence, not a skills grid. Each line is a claim the
   work later proves. */
export default function Position() {
  return (
    <section className={styles.section} aria-label="Position">
      <p className={styles.sectionLabel}>02 / Position</p>

      <div className={styles.sequence}>
        <p className={styles.line}>
          <span className={styles.verb}>I design</span>
          <span className={styles.subject}>brands.</span>
        </p>
        <p className={styles.line}>
          <span className={styles.verb}>I design</span>
          <span className={styles.subject}>products.</span>
        </p>
        <p className={styles.line}>
          <span className={styles.verb}>I build</span>
          <span className={styles.subject}>software.</span>
        </p>
        <p className={styles.line}>
          <span className={styles.verb}>I build</span>
          <span className={styles.subject}>AI systems.</span>
        </p>
      </div>

      <p className={styles.support}>
        One person, moving between disciplines. No handoff. No translation
        loss between vision and execution.
      </p>
    </section>
  )
}
