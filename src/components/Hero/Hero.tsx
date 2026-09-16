import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

/* The opening spread of the publication.

   Statement top-left at extreme scale. Metadata stays tiny. And real project
   material — a cropped Biscuit conversation — enters the frame from the
   bottom-right edge, so the first viewport already shows evidence of the work
   rather than an empty lower half. */
export default function Hero() {
  return (
    <section className={styles.hero} id="home" aria-label="Introduction">
      <p className={styles.marker}>Habibcore — 01</p>

      <div className={styles.statement}>
        <h1 className={styles.heading}>
          <span className={styles.line}>Operator.</span>
          <span className={styles.line}>Designer.</span>
          <span className={styles.lineAccent}>Best of both worlds.</span>
        </h1>

        <p className={styles.core}>
          I design brands, digital products, and AI-powered tools — then build them too.
        </p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>Lagos / NG</span>
          <span className={styles.metaItem}>2026</span>
        </div>

        <div className={styles.actions}>
          <Link href="#work" className={styles.ctaPrimary}>
            View selected work <span aria-hidden="true">→</span>
          </Link>
          <Link href="#contact" className={styles.ctaSecondary}>
            Start a project
          </Link>
        </div>
      </div>

      {/* The work begins here: a cropped conversation, bleeding off the right
          edge. Real asset, not decoration. */}
      <figure className={styles.figure}>
        <div className={styles.figureFrame}>
          <Image
            src="/projects/biscuit-ai/hero.jpg"
            alt="Biscuit AI: a Telegram conversation with the assistant"
            fill
            sizes="(max-width: 900px) 0px, 40vw"
            className={styles.figureImg}
          />
        </div>
        <figcaption className={styles.figureCaption}>Fig. 01 — Biscuit AI</figcaption>
      </figure>

      <div className={styles.disciplines} aria-hidden="true">
        <span>Design</span>
        <span className={styles.disciplineSep}>·</span>
        <span>Software</span>
        <span className={styles.disciplineSep}>·</span>
        <span>AI</span>
      </div>
    </section>
  )
}
