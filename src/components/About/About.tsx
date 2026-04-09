import Image from 'next/image'
import styles from './About.module.css'

const meta = [
  { key: 'Base',    value: 'Lagos, NG' },
  { key: 'Status',  value: 'Open to work', highlight: true },
  { key: 'Primary', value: 'Creative Director' },
  { key: 'Also',    value: 'Builds what he designs' },
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
          Creative director and visual designer based in Lagos. Work spans brand
          identity, art direction, music packaging, and digital design for brands
          that want to stand out and stay consistent.
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
          What makes the work different: I build it too. Landing pages, web
          apps, custom tools — designed by me, shipped by me. No handoff, no
          translation loss between vision and execution. Clients like Leadway
          Pensure get the full picture without assembling a team.
        </p>

        <p className={styles.location}>
          Based in Lagos, working globally.
        </p>
      </div>

      {/* ── Right: photo + meta ── */}
      <div className={styles.right}>
        {/*
          Photo appears ONLY here — NOT duplicated in the hero.
          Different crop (4:5 portrait), different filter treatment.
        */}
        <div className={styles.photoFrame}>
          <Image
            src="/photo.jpg"
            alt="Habib at work"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            className={styles.photo}
          />
          {/* Scanline texture — distinct from hero treatment */}
          <div className={styles.scanlines} aria-hidden="true" />
          <p className={styles.photoCaption}>Habib — Lagos</p>
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
