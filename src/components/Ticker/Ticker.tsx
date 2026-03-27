import styles from './Ticker.module.css'

type TickerItem = {
  text: string
  weight: 'normal' | 'bold' | 'accent'
}

const items: TickerItem[] = [
  { text: 'Brand Identity',       weight: 'bold'   },
  { text: 'Art Direction',        weight: 'normal' },
  { text: 'Music Packaging',      weight: 'bold'   },
  { text: 'Designs it. Builds it.', weight: 'accent' },
  { text: 'EPK Design',           weight: 'normal' },
  { text: 'React & Next.js',      weight: 'bold'   },
  { text: 'Design Systems',       weight: 'normal' },
  { text: 'Lagos → Global',       weight: 'accent' },
  { text: 'Adobe Suite',          weight: 'normal' },
  { text: 'Art Direction',        weight: 'bold'   },
  { text: 'Landing Pages',        weight: 'normal' },
  { text: 'No handoff.',          weight: 'accent' },
]

// Duplicate for seamless loop
const allItems = [...items, ...items]

export default function Ticker() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.track}>
        {allItems.map((item, i) => (
          <span key={`${item.text}-${i}`} className={styles.item}>
            <span className={`${styles.text} ${styles[item.weight]}`}>
              {item.text}
            </span>
            <span className={styles.sep}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
