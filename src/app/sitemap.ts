import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

export const dynamic = 'force-static'

const BASE_URL = 'https://habibcore.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Draft case studies (built, not yet published) stay out of the sitemap.
  const projectRoutes: MetadataRoute.Sitemap = projects
    .filter((project) => !project.draft)
    .map((project) => ({
      url: `${BASE_URL}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectRoutes,
  ]
}
