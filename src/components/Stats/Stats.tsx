'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Stats.module.css'

const stats = [
  { value: 5, suffix: '+', label: 'years' },
  { value: 30, suffix: '+', label: 'projects' },
  { value: 12, suffix: '+', label: 'brands' },
]

/* The count-up starts from the target rather than from 0, so the value in the
   server-rendered HTML is the real number. Anyone without JavaScript, and
   anything that indexes the raw markup, sees "5+ years" and not "0+ years".

   `armed` is set on mount, and only when an animation is genuinely going to
   run. The drop to 0 is a pure consequence of it during render rather than a
   write from an effect, so there is no reset to schedule and nothing to undo:
   un-armed always renders the target. Stats sits below the hero, so by the time
   the section is on screen the drop has long since happened off-screen. */
function useCountUp(target: number, armed: boolean, active: boolean, duration = 1200) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!active) return

    const start = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1)
      setProgress(elapsed)
      if (elapsed < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, duration])

  // Reduced motion, no IntersectionObserver, and the server render all land
  // here: the real figure, never a zero.
  if (!armed) return target

  const eased = 1 - Math.pow(1 - progress, 3)
  return Math.round(eased * target)
}

function StatNumber({
  stat,
  armed,
  active,
}: {
  stat: (typeof stats)[number]
  armed: boolean
  active: boolean
}) {
  const value = useCountUp(stat.value, armed, active)

  return (
    <span className={styles.statItem} aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
      <span aria-hidden="true">
        <span className={styles.number}>
          {value}
          <span className={styles.suffix}>{stat.suffix}</span>
        </span>{' '}
        <span className={styles.label}>{stat.label}.</span>
      </span>
    </span>
  )
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  const [armed, setArmed] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion: the numbers stay at their target. No reset, no animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Without an observer nothing would ever start the count, so resetting to 0
    // here would strand the numbers at zero. Leave the targets in place.
    if (typeof IntersectionObserver === 'undefined') return

    // Deferred by a frame: a synchronous setState in an effect body cascades
    // renders, and this only has to land before the section is scrolled to.
    const raf = requestAnimationFrame(() => setArmed(true))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={ref} className={styles.stats} aria-label="Statistics">
      <p className={styles.statement}>
        {stats.map((stat) => (
          <StatNumber key={stat.label} stat={stat} armed={armed} active={active} />
        ))}
      </p>
      <p className={styles.differentiator}>From pension funds to AI products.</p>
      <p className={styles.support}>Every one designed, built, and shipped by one person.</p>
    </section>
  )
}
