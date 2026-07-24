import Image from 'next/image'
import styles from './About.module.css'

const meta = [
  { key: 'Base',    value: 'Lagos, NG' },
  { key: 'Status',  value: 'Open to work', highlight: true },
  { key: 'Primary', value: 'Creative Director' },
  { key: 'Also',    value: 'Builds it with AI' },
]

export default function About() {
  return (
    <section className={styles.section} id="about" aria-label="About">
      {/* ── Left: text ── */}
      <div className={styles.left}>
        <p className={styles.sectionLabel}>01 — About</p>

        <h2 className={styles.heading}>
          Designer first.
          <br />
          <em className={styles.headingItalic}>Builder always.</em>
        </h2>

        <p className={styles.body}>
          Creative director based in Lagos, now focused on AI-assisted
          product design and development — SaaS tools, web apps, and the
          brand systems that sit around them.
        </p>

        <blockquote className={styles.pull}>
          "Design is the primary work. The ability to build it is what makes
          the design real."
        </blockquote>

        <p className={styles.body}>
          Spent four years in financial services operations, building automation
          systems and running process improvement at scale. The two practices
          feed each other.
        </p>

        <p className={styles.body}>
          What makes the work different: I build it too. Landing pages, SaaS
          tools, AI-assisted software — designed by me, shipped by me. No
          handoff, no translation loss between vision and execution. Clients
          like Leadway Pensure get the full picture without assembling a team.
        </p>

        <p className={styles.location}>
          Based in Lagos, working globally.
        </p>
      </div>

      {/* ── Right: photo + logo badge + meta ── */}
      <div className={styles.right}>
        <div className={styles.frame}>
          <Image
            src="/photo.jpg"
            alt="Habib"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            className={styles.photo}
          />
          {/* Bottom scrim keeps the badge/caption legible regardless of what's in the photo */}
          <div className={styles.scrim} aria-hidden="true" />
          <div className={styles.badge}>
            <Image src="/logo.png" alt="" width={28} height={28} className={styles.badgeLogo} />
          </div>
          <p className={styles.caption}>Habib — Lagos</p>
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
