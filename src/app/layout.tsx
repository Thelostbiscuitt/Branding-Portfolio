import type { Metadata } from 'next'
import { Syne, DM_Sans, DM_Mono } from 'next/font/google'
import SiteBackground from '@/components/SiteBackground/SiteBackground'
import Cursor from '@/components/Cursor/Cursor'
import Loading from '@/components/Loading/Loading'
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
  title: 'Habib — Design thinking. Technical execution.',
  description:
    'I design brands, digital products, and AI-powered tools — then build them too. Designed and built by one person, in Lagos.',
  openGraph: {
    title: 'Habib — Design thinking. Technical execution.',
    description:
      'Brands, interfaces, software, AI. Designed and built by one person, with no handoff.',
    url: 'https://habibcore.com',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Habib — Design thinking. Technical execution.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habib — Design thinking. Technical execution.',
    description: 'Brands, interfaces, software, AI. Designed and built by one person.',
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
        <SiteBackground />
        <Loading />
        <Cursor />
        {children}
      </body>
    </html>
  )
}
