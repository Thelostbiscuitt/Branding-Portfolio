import styles from './HowIWork.module.css'

/* 04 / HOW I WORK — the one-person thread.
   The sequence that explains the unusual combination. Editorial, not a
   process diagram. */
const steps = [
  { word: 'IDEA',   note: 'The problem, seen clearly.' },
  { word: 'DESIGN', note: 'The interface, the identity, the system.' },
  { word: 'SYSTEM', note: 'The structure behind what the user touches.' },
  { word: 'CODE',   note: 'Built with the tools the product itself uses.' },
  { word: 'SHIP',   note: 'Deployed, running, answerable to one person.' },
]

export default function HowIWork() {
  return (
    <section className={styles.section} aria-label="How I work">
      <p className={styles.sectionLabel}>05 / How I work</p>

      <h2 className={styles.heading}>
        Designed.
        <br />
        Built.
        <br />
        <em className={styles.headingItalic}>Shipped.</em>
      </h2>

      <ol className={styles.steps} role="list">
        {steps.map((step, i) => (
          <li key={step.word} className={styles.step}>
            <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.stepWord}>{step.word}</span>
            <span className={styles.stepNote}>{step.note}</span>
            {i < steps.length - 1 && <span className={styles.stepArrow} aria-hidden="true">↓</span>}
          </li>
        ))}
      </ol>
    </section>
  )
}
