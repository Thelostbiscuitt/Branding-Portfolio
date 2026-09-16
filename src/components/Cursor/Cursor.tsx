'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Cursor.module.css'

type Mode = 'dot' | 'link' | 'project' | 'external'

/* Desktop-only decorative cursor. It is never required for navigation — the
   native cursor stays visible underneath — and it never renders at all for
   touch users or anyone who prefers reduced motion, because a lerping
   follower is exactly the kind of motion that setting exists to stop.

   The wrapper element is moved by JavaScript (transform only). The inner
   visual responds to mode and press with pure CSS transitions, so the two
   concerns never fight over the same property. */
export default function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('dot')
  const [pressed, setPressed] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return
    /* Deferred by a frame, same as Stats: a synchronous setState in an effect
       body cascades renders, and this only has to land before first paint. */
    const raf = requestAnimationFrame(() => setSupported(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (!supported) return
    const wrap = wrapRef.current
    if (!wrap) return

    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let x = tx
    let y = ty
    let raf = 0

    const loop = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      wrap.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY

      const target = e.target as HTMLElement | null
      const link = target?.closest<HTMLAnchorElement>('a')
      const interactive = target?.closest('button, [role="button"], input, select, textarea')

      if (link) {
        const external = link.target === '_blank' || link.getAttribute('rel')?.includes('external')
        const project = link.getAttribute('href')?.includes('/projects/')
        setMode(external ? 'external' : project ? 'project' : 'link')
      } else if (interactive) {
        setMode('link')
      } else {
        setMode('dot')
      }
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [supported])

  if (!supported) return null

  const label = mode === 'project' ? 'VIEW' : mode === 'external' ? 'OPEN' : ''

  return (
    <div ref={wrapRef} className={styles.wrapper} aria-hidden="true">
      <div className={`${styles.vis} ${styles[mode]} ${pressed ? styles.pressed : ''}`}>
        {label && (
          <span className={styles.label}>
            {label} <span aria-hidden="true">↗</span>
          </span>
        )}
      </div>
    </div>
  )
}