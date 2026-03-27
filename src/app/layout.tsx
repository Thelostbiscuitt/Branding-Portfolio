import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Habib — Creative Director & Developer',
  description:
    'Creative director and visual designer based in Lagos. Brand identity, art direction, music packaging — designed and built by one person.',
  openGraph: {
    title: 'Habib — Creative Director & Developer',
    description:
      'Brand identity, art direction, music packaging — designed and shipped without a team.',
    url: 'https://habib.studio',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habib — Creative Director & Developer',
    description: 'Brand identity, art direction, music packaging — designed and shipped without a team.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
