import Link from 'next/link'
import styles from './Hero.module.css'

const design = ['Brand', 'Art Direction', 'Typography', 'Identity']
const build = ['AI', 'Software', 'Automation', 'Systems']

export default function Hero() {
  return (
    <section className={styles.hero} id="home" aria-label="Introduction">
      {/* ── Left: the statement ── */}
      <div className={styles.left}>
        <p className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          Available for select projects
        </p>

        <h1 className={styles.heading}>
          <span className={styles.headingMain}>Best of both</span>
          <span className={styles.headingItalic}>worlds.</span>
        </h1>

        <p className={styles.split}>
          Design thinking.<span aria-hidden="true"> · </span>Technical execution.
        </p>

        <p className={styles.core}>
          I design brands, digital products, and AI-powered tools — then build them too.
        </p>

        <div className={styles.actions}>
          <Link href="/#work" className={styles.ctaPrimary}>
            View selected work <span aria-hidden="true">→</span>
          </Link>
          <Link href="/#contact" className={styles.ctaSecondary}>
            Start a project
          </Link>
        </div>

        <p className={styles.operator}>Operator · Lagos, NG · 2026</p>
      </div>

      {/* ── Right: the DESIGN/BUILD motif ──
          Decorative but truthful: two facing lists that the one-person arrow
          connects. aria-hidden — the left column already says the same thing
          in prose. */}
      <div className={styles.right} aria-hidden="true">
        <div className={styles.buildPanel}>
          <div className={styles.buildColumn}>
            <p className={styles.buildHeading}>Design</p>
            <ul className={styles.buildList}>
              {design.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <span className={styles.buildConnector}>⟷</span>

          <div className={styles.buildColumn}>
            <p className={styles.buildHeading}>Build</p>
            <ul className={styles.buildList}>
              {build.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className={styles.buildCaption}>From first sketch to shipped system. Same room.</p>
        <span className={styles.geoTag}>Lagos · 2026</span>
      </div>
    </section>
  )
}
