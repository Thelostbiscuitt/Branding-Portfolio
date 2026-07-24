import Image from 'next/image'
import Link from 'next/link'
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
          <span className={styles.headingMain}>Operator.<br />Designer.</span>
          <span className={styles.headingSub}>Builds both.</span>
        </h1>

        <div className={styles.rule} aria-hidden="true" />

        <p className={styles.description}>
          Brand identity, art direction, music packaging — designed and
          shipped without a team. No handoff. No translation loss between
          vision and execution.
        </p>

        <div className={styles.actions}>
          <Link href="/#contact" className={styles.ctaPrimary}>
            Start a project
          </Link>
          <Link href="/#work" className={styles.ctaSecondary}>
            View work ↓
          </Link>
        </div>
      </div>

      {/* ── Right: logo ── */}
      <div className={styles.right} aria-hidden="true">
        <div className={styles.logoGlow} />
        <Image
          src="/logo.png"
          alt=""
          width={320}
          height={320}
          priority
          className={styles.logo}
        />
        <span className={styles.geoTag}>Lagos — 2026</span>
      </div>
    </section>
  )
}
