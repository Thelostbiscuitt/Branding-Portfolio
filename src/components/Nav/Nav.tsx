'use client'

import Link from 'next/link'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.logo}>
        Habib.
      </Link>

      <ul className={styles.links} role="list">
        <li><a href="/#about">About</a></li>
        <li><a href="/#work">Work</a></li>
        <li><a href="/#contact">Contact</a></li>
      </ul>

      <a href="/#contact" className={styles.cta}>
        Hire me
      </a>
    </nav>
  )
}
