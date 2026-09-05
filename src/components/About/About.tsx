import Image from 'next/image'
import styles from './About.module.css'

const meta = [
  { key: 'Base',    value: 'Lagos, NG' },
  { key: 'Status',  value: 'Available for select projects', highlight: true },
  { key: 'Primary', value: 'Operator' },
  { key: 'Also',    value: 'Designs & builds' },
]

export default function About() {
  return (
    <section className={styles.section} id="about" aria-label="About">
      {/* ── Left: text ── */}
      <div className={styles.left}>
        <p className={styles.sectionLabel}>06 · About</p>

        <h2 className={styles.heading}>
          Designer first.
          <br />
          <em className={styles.headingItalic}>Builder always.</em>
        </h2>

        <p className={styles.body}>
          Creative director by training, builder by practice. I designed
          brands and art direction first, then spent four years inside
          financial services operations building the automation systems that
          keep the work moving.
        </p>

        <blockquote className={styles.pull}>
          "Design is the primary work. The ability to build it is what makes
          the design real."
        </blockquote>

        <p className={styles.body}>
          Today that means product. Interfaces, web apps, and AI-assisted
          software — designed by me, shipped by me. No handoff, no translation
          loss between vision and execution, and one person answerable for the
          whole thing.
        </p>

        <p className={styles.location}>
          Based in Lagos, working globally.
        </p>
      </div>

      {/* ── Right: photo + logo badge + meta ── */}
      <div className={styles.right}>
        <div className={styles.frameWrap}>
          <div className={styles.frame}>
            <Image
              src="/photo.jpg"
              alt="Habib"
              fill
              sizes="(max-width: 600px) calc(100vw - 96px), (max-width: 900px) 460px, 45vw"
              className={styles.photo}
            />
            {/* Bottom scrim keeps the caption legible regardless of what's in the photo */}
            <div className={styles.scrim} aria-hidden="true" />
            <p className={styles.caption}>Habib · Lagos</p>
          </div>

          {/* Sibling of the frame, not a child — it can't overhang the corner
              from inside an overflow: hidden box. */}
          <div className={styles.badge}>
            <Image src="/logo.png" alt="" width={28} height={28} className={styles.badgeLogo} />
          </div>
        </div>

        <div className={styles.metaGrid} role="list" aria-label="Profile details">
          {meta.map((row) => (
            <div key={row.key} className={styles.metaRow} role="listitem">
              <span className={styles.metaKey}>{row.key}</span>
              <span className={`${styles.metaVal} ${row.highlight ? styles.metaValHighlight : ''}`}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
