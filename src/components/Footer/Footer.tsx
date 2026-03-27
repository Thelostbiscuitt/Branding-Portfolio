import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>Habib.</span>
      <span className={styles.copy}>© 2026 Habib — Lagos, Nigeria</span>
    </footer>
  )
}
