import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'Layo Isaac — Artist EPK | Habib',
  description: 'A 12-page EPK for indie alt singer-songwriter Layo Isaac. Muted tones, serif typography, structured as a narrative.',
  openGraph: {
    title: 'Layo Isaac — Artist EPK | Habib',
    description: 'A 12-page EPK for indie alt singer-songwriter Layo Isaac. Muted tones, serif typography, structured as a narrative.',
    url: 'https://habibcore.com/projects/layo-isaac-epk',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Layo Isaac — Artist EPK | Habib' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layo Isaac — Artist EPK | Habib',
    description: 'A 12-page EPK for indie alt singer-songwriter Layo Isaac. Muted tones, serif typography, structured as a narrative.',
    images: ['/og-image.png'],
  },
}

export default function LayoIsaacEPK() {
  return (
    <ProjectLayout
      title="Layo Isaac — Artist EPK"
      heroImage="/projects/layo-isaac/hero.jpg"
      heroAlt="Layo Isaac Artist EPK hero"
      meta={{
        category:   'Design',
        year:       '2024',
        client:     'Layo Isaac',
        role:       'Designer',
        tools:      ['Figma', 'Adobe InDesign'],
        tags:       ['EPK Design', 'Art Direction', 'Music', 'Print'],
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                Layo Isaac is an indie alt singer-songwriter with a distinct voice, a growing
                following, and the kind of artistic identity that needs space to breathe. The
                problem wasn't that he lacked material — it was that the material had nowhere
                professional to live.
              </p>
              <p>
                Venues and festivals want a concise document that tells them who the artist
                is, what he's done, and how to book him. Press want high-resolution assets and
                context. Fans want the full picture. A scattered collection of links and
                folders serves none of them well.
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
                The design directive was: match the music. Layo's sound is intimate,
                thoughtful, not flashy. The EPK had to feel the same way — it couldn't look
                like it belonged to a pop act or a corporate artist roster.
              </p>
              <p>
                Muted tones, serif typography, generous white space. Structured the EPK as a
                narrative arc rather than a data sheet: who he is, what he's done, where he's
                going. Every section was written to be easy to scan but genuinely rewarding to
                read in full.
              </p>
              <ul>
                <li>12-page document with a clear hierarchy across every spread</li>
                <li>Discography section with per-release context, not just cover art</li>
                <li>Press photo section with download instructions for different use cases</li>
                <li>Music video section with embedded stills and platform links</li>
              </ul>
            </>
          ),
        },
        {
          number:  '03',
          heading: 'The outcome',
          body: (
            <>
              <p>
                A comprehensive 12-page EPK that establishes Layo Isaac's professional
                identity across every surface where it needs to show up. Venues get the
                booking information they need on the first read. Press get high-resolution
                assets and enough context to write an actual piece. Fans get the complete
                picture.
              </p>
              <p>
                The EPK has been submitted to multiple venues and festivals since delivery.
                The design holds up whether it's opened on a desktop browser, printed by a
                festival programmer, or forwarded as a PDF in an email chain.
              </p>
            </>
          ),
        },
      ]}
      screenshots={[
        { src: '/projects/layo-isaac/sc-header.png',      alt: 'Layo Isaac EPK — cover and header' },
        { src: '/projects/layo-isaac/sc-discography.png', alt: 'Layo Isaac EPK — discography section' },
        { src: '/projects/layo-isaac/sc-7days.png',       alt: 'Layo Isaac EPK — 7 Days single release' },
        { src: '/projects/layo-isaac/sc-press.png',       alt: 'Layo Isaac EPK — press photos' },
        { src: '/projects/layo-isaac/sc-videos.png',      alt: 'Layo Isaac EPK — music videos section' },
      ]}
      next={{
        slug:     'blvckoreo-epk',
        category: 'Design',
        title:    'BlvckOreo — Personal EPK',
      }}
    />
  )
}
