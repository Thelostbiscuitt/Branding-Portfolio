import styles from './Capabilities.module.css'

const capabilities = [
  {
    name: 'Brand',
    body:  'Identity systems, art direction, visual language, and digital presence that hold up everywhere they appear.',
  },
  {
    name: 'Product',
    body:  'Interfaces, UX, web apps, and design systems — designed from the user back and built to ship.',
  },
  {
    name: 'Build',
    body:  'AI, automation, software, and systems — the part that turns the design into something that runs.',
  },
]

export default function Capabilities() {
  return (
    <section className={styles.section} id="capabilities" aria-label="Capabilities">
      <p className={styles.sectionLabel}>02 · Capabilities</p>
      <h2 className={styles.heading}>What I can do.</h2>

      <div className={styles.grid}>
        {capabilities.map((cap) => (
          <div key={cap.name} className={styles.column}>
            <p className={styles.columnName}>{cap.name}</p>
            <p className={styles.columnBody}>{cap.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}