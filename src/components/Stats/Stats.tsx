'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Stats.module.css'

const stats = [
  { value: 5, suffix: '+', label: 'years' },
  { value: 30, suffix: '+', label: 'projects' },
  { value: 12, suffix: '+', label: 'brands' },
]

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    let raf = requestAnimationFrame(() => {
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReduced) {
        setValue(target)
        return
      }

      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })

    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])

  return value
}

function StatNumber({ stat, active }: { stat: (typeof stats)[number]; active: boolean }) {
  const value = useCountUp(stat.value, active)

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
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

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
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className={styles.stats} aria-label="Statistics">
      <p className={styles.statement}>
        {stats.map((stat) => (
          <StatNumber key={stat.label} stat={stat} active={active} />
        ))}
      </p>
      <p className={styles.differentiator}>From pension funds to AI products.</p>
      <p className={styles.support}>Every one designed, built, and shipped by one person.</p>
    </section>
  )
}
