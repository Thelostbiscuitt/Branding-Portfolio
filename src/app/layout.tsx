import type { Metadata } from 'next'
import { Syne, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://habibcore.com'),
  title: 'Habib: Creative Director. Ships software.',
  description:
    'Creative director and AI-assisted product builder based in Lagos. Brand systems, web apps, and AI-driven tools, designed and built by one person.',
  openGraph: {
    title: 'Habib: Creative Director. Ships software.',
    description:
      'Brand systems, web apps, and AI-driven tools. Designed and shipped without a team.',
    url: 'https://habibcore.com',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Habib: Creative Director. Ships software.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habib: Creative Director. Ships software.',
    description: 'Brand systems, web apps, and AI-driven tools. Designed and shipped without a team.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}
