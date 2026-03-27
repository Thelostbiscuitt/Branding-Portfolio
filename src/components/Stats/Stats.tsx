import styles from './Stats.module.css'

const stats = [
  {
    eyebrow: 'Years active',
    value: '5',
    suffix: '+',
    description: 'Shaping brands since before most templates existed.',
  },
  {
    eyebrow: 'Projects delivered',
    value: '30',
    suffix: '+',
    description: 'Every one designed, built, and shipped by one person.',
  },
  {
    eyebrow: 'Brands shaped',
    value: '12',
    suffix: '+',
    description: 'From pension funds to hip-hop artists.',
  },
]

export default function Stats() {
  return (
    <section className={styles.stats} aria-label="Statistics">
      {stats.map((stat) => (
        <div key={stat.eyebrow} className={styles.block}>
          <p className={styles.eyebrow}>{stat.eyebrow}</p>
          <p className={styles.number} aria-label={`${stat.value}${stat.suffix}`}>
            {stat.value}
            <sup className={styles.suffix}>{stat.suffix}</sup>
          </p>
          <p className={styles.description}>{stat.description}</p>
        </div>
      ))}
    </section>
  )
}
