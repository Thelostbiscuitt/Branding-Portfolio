import Link from 'next/link'
import styles from './Testimonial.module.css'

export default function Testimonial() {
  return (
    <section className={styles.section} aria-label="Client testimonial">
      <span className={styles.mark} aria-hidden="true">&ldquo;</span>
      <blockquote className={styles.quote}>
        <p>
          These designs were exactly what I needed. It&rsquo;s rare to be
          able to describe what I want and have someone actually deliver
          that.
        </p>
        <footer className={styles.attribution}>
          <span className={styles.name}>Skaame</span>
          <span className={styles.role}>Artist</span>
          <Link href="/projects/skaame-epk" className={styles.link}>
            Skaame EPK ↗
          </Link>
        </footer>
      </blockquote>
    </section>
  )
}
