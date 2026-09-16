import Link from 'next/link'
import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
import styles from './not-found.module.css'

export const metadata = {
  title: 'Page not found | Habib',
  description: 'The page you were looking for doesn\'t exist.',
}

export default function NotFound() {
  return (
    <>
      <a href="#not-found-content" className="skip-link">Skip to content</a>
      <Nav />
      <main id="not-found-content" className={styles.wrap}>
        <p className={styles.eyebrow}>404</p>
        <h1 className={styles.heading}>Page not found.</h1>
        <p className={styles.body}>
          The page you're looking for doesn't exist, or the link's out of date.
        </p>
        <Link href="/" className={styles.cta}>Back to home →</Link>
      </main>
      <Footer />
    </>
  )
}
