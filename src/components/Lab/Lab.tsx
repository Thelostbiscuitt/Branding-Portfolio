import styles from './Lab.module.css'

/* Lab entries live here once they exist. Keep each entry to a title, a
   one-liner, and an optional link. Nothing is fabricated — the list comes
   from Habib, and until it does the section renders its intentional empty
   state rather than pretending. */

export default function Lab() {
  return (
    <section className={styles.section} id="lab" aria-label="Lab">
      <p className={styles.sectionLabel}>05 · Lab</p>
      <h2 className={styles.heading}>Lab.</h2>
      <p className={styles.sub}>
        Things I&rsquo;m building because I wanted to see if I could.
      </p>

      <div className={styles.empty}>
        <p className={styles.emptyTitle}>Experiments are in progress.</p>
        <p className={styles.emptyBody}>
          Prototypes, AI tools, and interfaces that don&rsquo;t fit a client
          brief. The first ones land here.
        </p>
      </div>
    </section>
  )
}