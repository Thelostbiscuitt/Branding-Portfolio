import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="home" aria-label="Introduction">
      {/* ── Left: text ── */}
      <div className={styles.left}>
        <p className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          Available for work — Lagos, NG
        </p>

        <h1 className={styles.heading}>
          <span className={styles.headingMain}>Creative<br />Director.</span>
          <span className={styles.headingSub}>Builds it too.</span>
        </h1>

        <div className={styles.rule} aria-hidden="true" />

        <p className={styles.description}>
          Brand identity, art direction, music packaging — designed and
          shipped without a team. No handoff. No translation loss between
          vision and execution.
        </p>

        <div className={styles.actions}>
          <a href="/#contact" className={styles.ctaPrimary}>
            Start a project
          </a>
          <a href="/#work" className={styles.ctaSecondary}>
            View work ↓
          </a>
        </div>
      </div>

      {/* ── Right: photo ── */}
      <div className={styles.right} aria-hidden="true">
        <Image
          src="/photo.jpg"
          alt="Habib"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          className={styles.photo}
        />
        {/* Gradient vignette so left text edge stays readable */}
        <div className={styles.photoOverlay} />
        {/* Scanline texture treatment */}
        <div className={styles.scanlines} />
        <span className={styles.geoTag}>Lagos — 2026</span>
      </div>
    </section>
  )
}
