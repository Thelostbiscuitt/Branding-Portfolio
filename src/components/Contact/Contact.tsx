'use client'

import { useState } from 'react'
import styles from './Contact.module.css'

type Selection = {
  projectType: string[]
  timeline:    string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const projectTypes = [
  'Brand identity',
  'Artist EPK',
  'Website / app',
  'Design system',
  'Something else',
]

const timelines = ['ASAP', '1-2 months', '3+ months', 'Just exploring']

const socialLinks = [
  { platform: 'Behance',  handle: 'BlvckOreo',               href: 'https://www.behance.net/BlvckOreo' },
  { platform: 'GitHub',   handle: 'Thelostbiscuitt',          href: 'https://github.com/Thelostbiscuitt' },
  { platform: 'LinkedIn', handle: 'habib-oguntimehin',        href: 'https://www.linkedin.com/in/michael-oguntimehin-480751398' },
  { platform: 'Email',    handle: 'habib@habibcore.com', href: 'mailto:habib@habibcore.com' },
]

export default function Contact() {
  const [sel, setSel]       = useState<Selection>({ projectType: [], timeline: '' })
  const [name, setName]     = useState('')
  const [email, setEmail]   = useState('')
  const [brief, setBrief]   = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function toggleType(type: string) {
    setSel((prev) => ({
      ...prev,
      projectType: prev.projectType.includes(type)
        ? prev.projectType.filter((t) => t !== type)
        : [...prev.projectType, type],
    }))
  }

  function setTimeline(t: string) {
    setSel((prev) => ({ ...prev, timeline: t }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          projectType: sel.projectType,
          timeline:    sel.timeline,
          brief,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send.')
      }

      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <section className={styles.section} id="contact" aria-label="Contact">
      <div className={styles.left}>
        <p className={styles.sectionLabel}>03 · Contact</p>

        <h2 className={styles.heading}>
          Start a<br />
          <em className={styles.headingItalic}>project.</em>
        </h2>

        <p className={styles.sub}>
          Whether you're building a brand from scratch, refreshing an existing
          identity, or shipping a digital product, let's talk.
        </p>

        <ul className={styles.links} role="list">
          {socialLinks.map((link) => (
            <li key={link.platform}>
              <a
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={styles.linkRow}
              >
                <span className={styles.linkPlatform}>{link.platform}</span>
                <span className={styles.linkHandle}>{link.handle}</span>
                <span className={styles.linkArrow} aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.availability}>
          <span className={styles.availDot} aria-hidden="true" />
          Currently available. Open to brand projects, product design, and
          development work.
        </p>
      </div>

      <div className={styles.right}>
        {status === 'success' ? (
          <div className={styles.sentState}>
            <p className={styles.sentMark} aria-hidden="true">◆</p>
            <p className={styles.sentHeading}>Message received.</p>
            <p className={styles.sentBody}>Usually responds within 24h.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <fieldset className={styles.step}>
              <legend className={styles.stepLabel}>
                <span className={styles.stepNum}>01</span> What are you building?{' '}
                <span className={styles.optional}>(select all that apply)</span>
              </legend>
              <div className={styles.pills}>
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={`${styles.pill} ${sel.projectType.includes(type) ? styles.pillActive : ''}`}
                    aria-pressed={sel.projectType.includes(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.step}>
              <legend className={styles.stepLabel}>
                <span className={styles.stepNum}>02</span> When do you need it?
              </legend>
              <div className={styles.pills}>
                {timelines.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    className={`${styles.pill} ${sel.timeline === t ? styles.pillActive : ''}`}
                    aria-pressed={sel.timeline === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.step}>
              <legend className={styles.stepLabel}>
                <span className={styles.stepNum}>03</span> Your name & email
              </legend>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                required
                autoComplete="name"
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                autoComplete="email"
              />
            </fieldset>

            <fieldset className={styles.step}>
              <legend className={styles.stepLabel}>
                <span className={styles.stepNum}>04</span> Brief{' '}
                <span className={styles.optional}>(optional)</span>
              </legend>
              <textarea
                placeholder="What's the project? Any context helps."
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className={`${styles.input} ${styles.textarea}`}
                rows={4}
              />
            </fieldset>

            {status === 'error' && (
              <p className={styles.errorMsg} role="alert">{errorMsg}</p>
            )}

            <button
              type="submit"
              className={styles.submit}
              disabled={!name || !email || status === 'loading'}
            >
              <span>{status === 'loading' ? 'Sending...' : 'Send message'}</span>
              <span aria-hidden="true">{status === 'loading' ? '...' : '→'}</span>
            </button>

            <p className={styles.responseTime}>Usually responds within 24h</p>
          </form>
        )}
      </div>
    </section>
  )
}
