import styles from './Ticker.module.css'

type TickerItem = {
  text: string
  weight: 'normal' | 'bold' | 'accent'
}

const items: TickerItem[] = [
  { text: 'Brand Identity',       weight: 'bold'   },
  { text: 'Art Direction',        weight: 'normal' },
  { text: 'AI Interfaces',        weight: 'bold'   },
  { text: 'Designs it. Builds it.', weight: 'accent' },
  { text: 'LLM Integration',      weight: 'normal' },
  { text: 'React & Next.js',      weight: 'bold'   },
  { text: 'Design Systems',       weight: 'normal' },
  { text: 'Lagos → Global',       weight: 'accent' },
  { text: 'Process Automation',   weight: 'normal' },
  { text: 'Telegram Bots',        weight: 'bold'   },
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
