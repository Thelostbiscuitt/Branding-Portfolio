import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/data/projects'
import styles from './Archive.module.css'

/* Before software — the creative foundation. Image-led, not card-led:
   each entry leads with its visual, the title and year follow quietly.
   Deliberately a different rhythm from the product stack above. */
export default function Archive({ projects }: { projects: Project[] }) {
  return (
    <div className={styles.archive}>
      <div className={styles.header}>
        <p className={styles.label}>Before software</p>
        <p className={styles.note}>
          Brand, music, and creative direction — the foundation everything else stands on.
        </p>
      </div>

      <div className={styles.entries}>
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.entry}>
            <div className={styles.imageWrap}>
              <Image
                src={project.thumb}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
            <div className={styles.meta}>
              <span className={styles.title}>{project.title}</span>
              <span className={styles.year}>{project.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
