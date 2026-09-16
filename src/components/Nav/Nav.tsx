'use client'
/* eslint-disable @next/next/no-html-link-for-pages -- The homepage's legacy DOM engine initializes on a document load. */

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import styles from './Nav.module.css'

const links = [
  { href: '/#work',    label: 'Work' },
  { href: '/#about',   label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <a href="/" className={styles.logo} onClick={() => setOpen(false)}>
        Habib.
      </a>

      <ul className={styles.links} role="list">
        {links.map((l) => (
          <li key={l.href}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>

      <a href="/#contact" className={styles.cta}>
        Hire me
      </a>

      <button
        type="button"
        className={styles.menuToggle}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <ul
        id="mobile-nav"
        role="list"
        className={`${styles.mobileLinks} ${open ? styles.mobileLinksOpen : ''}`}
      >
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="/#contact" className={styles.mobileCta} onClick={() => setOpen(false)}>
            Hire me
          </a>
        </li>
      </ul>
    </nav>
  )
}
