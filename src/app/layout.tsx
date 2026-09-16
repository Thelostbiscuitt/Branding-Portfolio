import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Player from '../components/Player/Player'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // lets the docked sound bar pad into the iOS home-indicator strip
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://habibcore.com'),
  title: 'HABIBCORE® · Habib, Designer & Builder, Lagos',
  description:
    'Brands, digital products and AI tools, drawn, coded and shipped by the same pair of hands in Lagos. No handoff, no translation loss between vision and execution.',
  openGraph: {
    title: 'HABIBCORE® · Habib, Designer & Builder, Lagos',
    description:
      'I design it. I build it. I answer for it. Portfolio of Habib · Habibcore, Lagos.',
    url: 'https://habibcore.com',
    siteName: 'HABIBCORE®',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HABIBCORE® · Habib, Designer & Builder, Lagos',
    description: 'I design it. I build it. I answer for it. Portfolio of Habib · Habibcore, Lagos.',
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
        <meta name="theme-color" content="#f2ede3" />
        <link rel="preload" href="/fonts/fraunces-100-900-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/fraunces-100-900-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/archivo-100-900-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-mono-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-mono-700-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/habibcore-logo-transparent.png" as="image" fetchPriority="high" />
        {/* Loader gate: flag repeat visits / reduced motion BEFORE first paint
            so the v6 fill-to-logo loader shows once per session and never for
            reduced-motion users. See engine.js (hc-loader). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('hc-loader-seen')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('hc-loader-off')}catch(e){}",
          }}
        />
        {children}
        <Player />
        {/* ?v= busts browser-cached copies of engine.js across deploys —
            bump it whenever public/engine.js changes */}
        <Script src="/engine.js?v=loader-v6-2" strategy="afterInteractive" />
      </body>
    </html>
  )
}
