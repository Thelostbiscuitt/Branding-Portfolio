import type { Metadata } from 'next'
import { Fraunces, Archivo, Space_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

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
    <html lang="en" className={`${fraunces.variable} ${archivo.variable} ${spaceMono.variable}`}>
      <body>
        {children}
        <Script src="/engine.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
