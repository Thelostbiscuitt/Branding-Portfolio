'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './SiteBackground.module.css'

export default function SiteBackground() {
  const [hasMouse, setHasMouse] = useState(false)

  /* Cursor position is written straight to CSS variables on the document — no
     React re-render per mousemove. A single rAF loop eases the layer toward
     the pointer with ~200ms of perceived inertia. */
  const target = useRef({ x: 0.5, y: 0.5 })
  const current = useRef({ x: 0.5, y: 0.5 })
  const raf = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const onMove = (e: PointerEvent) => {
      target.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    /* Scroll depth shifts the grid opacity between 3% and 5% — a very slow,
       barely perceptible breathing of structure as the user reads down the page. */
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const depth = max > 0 ? window.scrollY / max : 0
      document.documentElement.style.setProperty(
        '--grid-opacity',
        (0.03 + depth * 0.02).toFixed(3)
      )
    }

    const tick = () => {
      const k = 0.08
      current.current.x += (target.current.x - current.current.x) * k
      current.current.y += (target.current.y - current.current.y) * k

      document.documentElement.style.setProperty(
        '--mouse-x',
        (current.current.x * 100).toFixed(2) + 'vw'
      )
      document.documentElement.style.setProperty(
        '--mouse-y',
        (current.current.y * 100).toFixed(2) + 'vh'
      )

      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    setHasMouse(true)

    if (!reduced.matches) {
      raf.current = requestAnimationFrame(tick)
    } else {
      /* Reduced motion: static centre, no easing. */
      document.documentElement.style.setProperty('--mouse-x', '50vw')
      document.documentElement.style.setProperty('--mouse-y', '50vh')
    }

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div className={styles.siteBackground} aria-hidden="true">
      <div className={`${styles.layer} ${styles.base}`} />
      <div className={`${styles.layer} ${styles.grid}`} />
      <div className={`${styles.layer} ${styles.guides}`} />
      <div className={`${styles.layer} ${styles.grain}`} />
      <div className={`${styles.layer} ${styles.artifacts}`}>
        <div className={styles.artifactMark}>H</div>
        <div className={`${styles.artifact} ${styles.artifactLogo}`} />
      </div>
      <div
        className={`${styles.layer} ${styles.cursor} ${hasMouse ? styles.cursorActive : ''}`}
      />
    </div>
  )
}
