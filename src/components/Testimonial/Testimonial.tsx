import Link from 'next/link'
import styles from './Testimonial.module.css'

type Quote = {
  text: string
  name: string
  role: string
  href?: string
}

/* All quotes are verbatim — including the casual grammar and lowercase "ai".
   Polished-up testimonials read as marketing; these read as people. */
const quotes: Quote[] = [
  {
    text: "These designs were exactly what I needed. It's rare to be able to describe what I want and have someone actually deliver that.",
    name: 'Skaame',
    role: 'Artist',
    href: '/projects/skaame-epk',
  },
  {
    text: 'Michael is a solution thinker, he came into the company and within 2 months had already thought of solutions, effective solutions to optimize our workflow and positioned us become more AI inclined',
    name: 'Abidemi Amodu',
    role: 'MD',
  },
  {
    text: 'This was a very insightful session to be honest, as someone who uses ai, its refreshing to see and hear someone with more insight expand on troubling topics',
    name: 'Adebayo Adebanjo',
    role: 'Finance Dept',
  },
]

export default function Testimonial() {
  return (
    <section className={styles.section} aria-label="What clients say">
      <span className={styles.mark} aria-hidden="true">&ldquo;</span>

      <div className={styles.grid}>
        {quotes.map((quote) => (
          <figure key={quote.name} className={styles.quote}>
            <blockquote className={styles.text}>
              <p>{quote.text}</p>
            </blockquote>
            <figcaption className={styles.attribution}>
              <span className={styles.name}>{quote.name}</span>
              <span className={styles.role}>{quote.role}</span>
              {quote.href && (
                <Link href={quote.href} className={styles.link}>
                  Skaame EPK ↗
                </Link>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
