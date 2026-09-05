'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Loading.module.css'

/* A restrained loading screen: the mark that used to sit in the hero gets a
   proper entrance here, with a quiet "preparing the showcase" line. It fades
   out once the first paint has landed — fast enough not to annoy on a return
   visit, slow enough to read as deliberate rather than a flash.

   Respects reduced motion: no animation, just a brief static hold. */
export default function Loading() {
  const [hidden, setHidden] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    /* Two gates, both must clear before we hide: the paint has actually
       landed (so we never flash an empty frame), and a short floor has
       elapsed (so the line is legible even on a fast connection). The floor
       is the longer of the two, which is what makes it feel intentional. */
    let paint = false
    let min = false

    const done = () => {
      if (paint && min) setHidden(true)
    }

    const paintTimer = requestAnimationFrame(() => {
      paint = true
      done()
    })

    const minTimer = setTimeout(() => {
      min = true
      done()
    }, 900)

    return () => {
      cancelAnimationFrame(paintTimer)
      clearTimeout(minTimer)
    }
  }, [])

  useEffect(() => {
    if (!hidden) return
    const el = document.getElementById(styles.screen)
    if (!el) return
    /* Next frame so the transition actually runs from the visible state. */
    requestAnimationFrame(() => setReady(true))
  }, [hidden])

  return (
    <div
      id={styles.screen}
      className={`${styles.screen} ${ready ? styles.screenHidden : ''}`}
      aria-hidden="true"
    >
      <div className={styles.inner}>
        <div className={styles.markWrap}>
          <span className={styles.beam} aria-hidden="true" />
          <Image
            src="/logo.png"
            alt=""
            width={96}
            height={96}
            priority
            className={styles.mark}
          />
        </div>
        <p className={styles.line}>Preparing the showcase</p>
      </div>
    </div>
  )
}