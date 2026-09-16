import styles from './Interlude.module.css'

/* A typographic interlude between the current stack and the archive. The
   lines are Habib's own statement from the About section — the interlude
   gives it room to land as a full-width moment before the grid returns. */
export default function Interlude() {
  return (
    <section className={styles.interlude} aria-label="Interlude">
      <p className={styles.lineA}>Design is the primary work.</p>
      <p className={styles.lineB}>
        The ability to build it is what makes it <em className={styles.italic}>real.</em>
      </p>
    </section>
  )
}
