import Link from 'next/link'
import styles from './Hero.module.css'

/* The opening page of the publication: one massive statement, tiny metadata,
   deliberate tension between the two scales. Left-aligned, asymmetric —
   nothing is centred. */
export default function Hero() {
  return (
    <section className={styles.hero} id="home" aria-label="Introduction">
      <p className={styles.marker}>HABIBCORE</p>

      <h1 className={styles.heading}>
        <span className={styles.line}>Operator.</span>
        <span className={styles.line}>Designer.</span>
        <span className={styles.lineAccent}>Best of both worlds.</span>
      </h1>

      <div className={styles.meta}>
        <span className={styles.metaItem}>LAGOS / NG</span>
        <span className={styles.metaItem}>2026</span>
      </div>

      <p className={styles.core}>
        I design brands, digital products, and AI-powered tools — then build them too.
      </p>

      <div className={styles.actions}>
        <Link href="#work" className={styles.ctaPrimary}>
          View selected work <span aria-hidden="true">→</span>
        </Link>
        <Link href="#contact" className={styles.ctaSecondary}>
          Start a project
        </Link>
      </div>

      <div className={styles.disciplines} aria-hidden="true">
        <span>DESIGN</span>
        <span className={styles.disciplineSep}>·</span>
        <span>SOFTWARE</span>
        <span className={styles.disciplineSep}>·</span>
        <span>AI</span>
      </div>
    </section>
  )
}
