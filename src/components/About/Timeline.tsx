'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './About.module.css'

export type TimelineEntry = {
  year:     string
  org:      string
  role:     string
  logo?:    string   // path under /public; falls back to monogram when absent
  monogram: string   // 2-letter fallback tile
}

/* Same IntersectionObserver shape as Stats.tsx: observe, act on first
   intersection, then stop watching that target. One observer for the whole
   list rather than one per entry.

   The hidden state lives behind .armed, which is only applied after mount, so
   the server-rendered markup shows every entry at full opacity. If JS never
   runs or the observer is unavailable, the entries are visible — the failure
   mode is "no animation", never "no content". */
export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const [seen, setSeen] = useState<Set<string>>(new Set())

  useEffect(() => {
    const el = ref.current
    // Without an observer there is nothing to reveal the entries again, so the
    // list is left unarmed and every entry simply stays visible.
    if (!el || typeof IntersectionObserver === 'undefined') return

    // Arming is a DOM concern, not render state — driving it through setState
    // would cascade a second render on mount for no benefit.
    el.classList.add(styles.armed)

    const observer = new IntersectionObserver(
      (observed) => {
        const arrived = observed
          .filter((entry) => entry.isIntersecting)
          .map((entry) => {
            // Unobserve on first sight, so scrolling back up cannot re-trigger
            observer.unobserve(entry.target)
            return (entry.target as HTMLElement).dataset.org
          })
          .filter((org): org is string => Boolean(org))

        if (arrived.length) {
          setSeen((prev) => new Set([...prev, ...arrived]))
        }
      },
      { threshold: 0.25 }
    )

    el.querySelectorAll('[data-org]').forEach((item) => observer.observe(item))

    return () => {
      observer.disconnect()
      el.classList.remove(styles.armed)
    }
  }, [])

  return (
    <ol
      ref={ref}
      className={styles.timeline}
      role="list"
      aria-label="Career timeline"
    >
      {entries.map((entry) => (
        <li
          key={entry.org}
          data-org={entry.org}
          className={`${styles.timelineItem} ${
            seen.has(entry.org) ? styles.timelineItemVisible : ''
          }`}
        >
          <p className={styles.timelineYear}>{entry.year}</p>

          {entry.logo ? (
            /* Tile is white because all the marks are transparent PNGs with
               dark or coloured artwork — they need a light backing to read
               against --black. Never tinted or inverted. */
            <span className={styles.logoTile}>
              <Image
                src={entry.logo}
                alt=""
                width={160}
                height={56}
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
  )
}
