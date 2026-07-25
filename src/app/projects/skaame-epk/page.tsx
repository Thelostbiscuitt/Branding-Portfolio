import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'Skaame: Artist Web EPK | Habib',
  description: 'A live web EPK for Lagos-based reggae-Afrobeat artist Skaame. Designed and built as a single shareable link for press, booking agents, and fans.',
  openGraph: {
    title: 'Skaame: Artist Web EPK | Habib',
    description: 'A live web EPK for Lagos-based reggae-Afrobeat artist Skaame. Designed and built as a single shareable link for press, booking agents, and fans.',
    url: 'https://habibcore.com/projects/skaame-epk',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Skaame: Artist Web EPK | Habib' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skaame: Artist Web EPK | Habib',
    description: 'A live web EPK for Lagos-based reggae-Afrobeat artist Skaame. Designed and built as a single shareable link for press, booking agents, and fans.',
    images: ['/og-image.png'],
  },
}

export default function SkaameEPK() {
  return (
    <ProjectLayout
      title="Skaame: Artist Web EPK"
      heroImage="/projects/skaame/hero.jpg"
      heroAlt="Skaame Artist Web EPK hero"
      meta={{
        category:   'Design',
        year:       '2024',
        client:     'Skaame',
        role:       'Designer · Developer',
        tools:      ['Figma', 'Next.js', 'Tailwind CSS'],
        tags:       ['EPK Design', 'Web Design', 'Music', 'Development'],
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                Skaame is a Lagos-based reggae-Afrobeat artist with a growing following and
                real press momentum. But his professional assets were scattered: high-res
                press photos in a Google Drive folder, streaming links spread across four
                platforms, a booking contact buried three taps deep in an Instagram bio.
              </p>
              <p>
                Press contacts and booking agents had to piece the picture together
                themselves. The friction was costing him real opportunities. He needed one
                link that could go everywhere and do everything a physical press kit once did.
              </p>
            </>
          ),
        },
        {
          number:  '02',
          heading: 'The approach',
          body: (
            <>
              <p>
                Designed for simplicity above everything else. One page, all essential
                information, zero ambiguity about what to do next. Three design priorities set
                before opening Figma, in order of importance:
              </p>
              <ul>
                <li>Press photo download in one click: no login, no folder navigation</li>
                <li>Streaming links that go directly to platform, not a link aggregator</li>
                <li>Booking contact that cannot be missed on any screen size</li>
              </ul>
              <p>
                Typography and colour palette were matched to the music: warm, organic, with
                enough weight to hold up in a press context without feeling corporate. Not a
                template. Not a theme. Built from scratch in Next.js for speed and full
                control over the output.
              </p>
            </>
          ),
        },
        {
          number:  '03',
          heading: 'The outcome',
          body: (
            <>
              <p>
                A live, responsive web EPK that replaced the scattered folder system entirely.
                Press can download high-res assets in one click. Booking agents find everything
                on a single page that loads in under two seconds on any connection.
              </p>
              <p>
                The EPK has been shared with multiple venues and festivals since launch.
                Skaame now has a single professional address that works whether it's opened on
                a desktop by a music journalist or on mobile by a festival programmer scanning
                submissions.
              </p>
            </>
          ),
        },
      ]}
      screenshots={[
        { src: '/projects/skaame/sc-hero.png',        alt: 'Skaame EPK: hero section' },
        { src: '/projects/skaame/sc-afghanistan.png', alt: 'Skaame EPK: Afghanistan single release' },
        { src: '/projects/skaame/sc-press.png',       alt: 'Skaame EPK: press photos section' },
        { src: '/projects/skaame/sc-video.png',       alt: 'Skaame EPK: music video section' },
      ]}
      next={{
        slug:     'layo-isaac-epk',
        category: 'Design',
        title:    'Layo Isaac: Artist EPK',
      }}
    />
  )
}
