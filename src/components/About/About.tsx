import Image from 'next/image'
import styles from './About.module.css'

const meta = [
  { key: 'Base',    value: 'Lagos, NG' },
  { key: 'Status',  value: 'Open to work', highlight: true },
  { key: 'Primary', value: 'Creative Director' },
  { key: 'Also',    value: 'Builds it with AI' },
]

type TimelineEntry = {
  year:     string
  org:      string
  role:     string
  logo?:    string   // path under /public; falls back to monogram when absent
  monogram: string   // 2-letter fallback tile
}

const timeline: TimelineEntry[] = [
  {
    year:     '2026',
    org:      'Birdview Travels & Tours',
    role:     'CRM development, process automation & AI training',
    logo:     '/timeline/birdview.png',
    monogram: 'BV',
  },
  {
    year:     '2022',
    org:      'Leadway Pensure',
    role:     'Operations & process automation',
    logo:     '/timeline/leadway.png',
    monogram: 'LP',
  },
  {
    year:     '2020',   // TODO: confirm the year the design practice started
    org:      'Habibcore',
    role:     'Brand & art direction',
    logo:     '/logo.png',
    monogram: 'HC',
  },
]

export default function About() {
  return (
    <section className={styles.section} id="about" aria-label="About">
      {/* ── Left: text ── */}
      <div className={styles.left}>
        <p className={styles.sectionLabel}>01 · About</p>

        <h2 className={styles.heading}>
          Designer first.
          <br />
          <em className={styles.headingItalic}>Builder always.</em>
        </h2>

        <p className={styles.body}>
          Creative director based in Lagos, now focused on AI-assisted
          product design and development: SaaS tools, web apps, and the
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
          tools, AI-assisted software. Designed by me, shipped by me. No
          handoff, no translation loss between vision and execution. Clients
          like Leadway Pensure get the full picture without assembling a team.
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
              sizes="(max-width: 900px) 100vw, 45vw"
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

        <ol className={styles.timeline} role="list" aria-label="Career timeline">
          {timeline.map((entry) => (
            <li key={entry.org} className={styles.timelineItem}>
              <p className={styles.timelineYear}>{entry.year}</p>

              {entry.logo ? (
                /* Tile is white because all the marks are transparent PNGs with
                   dark or coloured artwork — they need a light backing to read
                   against --black. Never tinted or inverted. */
                <span className={styles.logoTile}>
                  <Image
                    src={entry.logo}
                    alt=""
                    width={130}
                    height={44}
                    className={styles.logoImg}
                  />
                </span>
              ) : (
                <span className={styles.monogram} aria-hidden="true">{entry.monogram}</span>
              )}

              <div>
                <p className={styles.timelineOrg}>{entry.org}</p>
                <p className={styles.timelineRole}>{entry.role}</p>
              </div>
            </li>
          ))}
        </ol>

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
