'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import styles from './Nav.module.css'

const links = [
  { href: '/#about',   label: 'About' },
  { href: '/#work',    label: 'Work' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
        Habib.
      </Link>

      <ul className={styles.links} role="list">
        {links.map((l) => (
          <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
        ))}
      </ul>

      <Link href="/#contact" className={styles.cta}>
        Hire me
      </Link>

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
            <Link href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          </li>
        ))}
        <li>
          <Link href="/#contact" className={styles.mobileCta} onClick={() => setOpen(false)}>
            Hire me
          </Link>
        </li>
      </ul>
    </nav>
  )
}
