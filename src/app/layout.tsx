import type { Metadata } from 'next'
import Script from 'next/script'
import Player from '../components/Player/Player'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://habibcore.com'),
  title: 'Habib — Designer & Builder, Lagos',
  description:
    'Brands, digital products and AI tools — drawn, coded and shipped by the same pair of hands in Lagos. No handoff, no translation loss between vision and execution.',
  openGraph: {
    title: 'Habib — Designer & Builder, Lagos',
    description:
      'I design it. I build it. I answer for it. Portfolio of Habib — Habibcore, Lagos.',
    url: 'https://habibcore.com',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habib — Designer & Builder, Lagos',
    description: 'I design it. I build it. I answer for it. Portfolio of Habib — Habibcore, Lagos.',
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
        <link rel="preload" href="/fonts/fraunces-100-900-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/fraunces-100-900-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/archivo-100-900-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-mono-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-mono-700-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/logo-mark.png" as="image" fetchPriority="high" />
        {children}
        <Player />
        <Script src="/engine.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
