import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'BlvckOreo: Personal EPK | Habib',
  description: 'Self-directed EPK for BlvckOreo: rapper, singer, songwriter from Lagos. Two distinct album identities, full creative ownership.',
  openGraph: {
    title: 'BlvckOreo: Personal EPK | Habib',
    description: 'Self-directed EPK for BlvckOreo: rapper, singer, songwriter from Lagos. Two distinct album identities, full creative ownership.',
    url: 'https://habibcore.com/projects/blvckoreo-epk',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BlvckOreo: Personal EPK | Habib' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlvckOreo: Personal EPK | Habib',
    description: 'Self-directed EPK for BlvckOreo: rapper, singer, songwriter from Lagos. Two distinct album identities, full creative ownership.',
    images: ['/og-image.png'],
  },
}

export default function BlvckOreoEPK() {
  return (
    <ProjectLayout
      title="BlvckOreo: Personal EPK"
      heroImage="/projects/blvckoreo/hero.jpg"
      heroAlt="BlvckOreo Personal EPK hero"
      meta={{
        category:   'Design',
        year:       '2023',
        client:     'Self-directed',
        role:       'Designer · Art Director · Subject',
        tools:      ['Adobe Express', 'Photoshop', 'Copywriting'],
        tags:       ['EPK Design', 'Art Direction', 'Brand Identity', 'Copywriting'],
        liveUrl:    'https://express.adobe.com/page/XIUCowDFNxqo9',
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                No client brief. No external pressure. Just a clear-eyed look at what was
                missing: a press kit that matched the confidence of the music.
              </p>
              <p>
                BlvckOreo is a rapper, singer, and songwriter from Lagos, aka The Lost
                Biscuit. Two distinct bodies of work, with completely different worlds
                behind them.
                Most EPKs flatten an artist into a single tone. This one had to hold two
                identities without either one compromising the other.
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
                Black-and-white palette as the foundation: strong enough to anchor both
                album identities without competing with either. Heavy type. A logo identity
                built around the BO dice mark.
              </p>
              <p>
                Two albums, two completely different visual worlds, one artist:
              </p>
              <ul>
                <li>
                  <strong style={{color: 'var(--white)'}}>Mainland Pack</strong>: gritty Lagos street document. Ransom-note
                  typography, raw photography, the visual language of the streets that made the music.
                </li>
                <li>
                  <strong style={{color: 'var(--white)'}}>Messages From Mars</strong>: illustrated and cosmic. A completely
                  different register. Same artist, different world. Designed with the same level
                  of craft, not as a rebrand but as an expansion.
                </li>
              </ul>
              <p>
                Written, art directed, and designed without a brief. Every word of copy
                was written specifically for the context. No filler, no boilerplate.
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
                A self-designed EPK that works as both a press kit and a portfolio piece,
                demonstrating what it looks like when a designer has full creative ownership
                of the subject matter.
              </p>
              <p>
                Accolades since release: Apple Music HipHop top 200 chart placement, Noble
                Awards nomination, SmashFM artiste unveil. The EPK was built to hold up in
                professional contexts while staying true to the artist's identity.
              </p>
              <p>
                Designed, written, and shipped without a brief. The process mirrors the music:
                vision first, execution second, no compromise between the two.
              </p>
            </>
          ),
        },
      ]}
      screenshots={[
        { src: '/projects/blvckoreo/sc-header.png',      alt: 'BlvckOreo EPK: header and logo' },
        { src: '/projects/blvckoreo/sc-release.png',     alt: 'BlvckOreo EPK: upcoming release section' },
        { src: '/projects/blvckoreo/sc-bio.png',         alt: 'BlvckOreo EPK: bio and portrait' },
        { src: '/projects/blvckoreo/sc-discography.png', alt: 'BlvckOreo EPK: discography' },
        { src: '/projects/blvckoreo/sc-contact.png',     alt: 'BlvckOreo EPK: contact and links' },
      ]}
      next={{
        slug:     '1ethfp',
        category: 'Collab',
        title:    '1ETHFP: Creative Collaboration',
      }}
    />
  )
}
