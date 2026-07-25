import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'Olumayowa Nursing Home: Healthcare Website | Habib',
  description: 'A website for a family healthcare provider in Iba, Ojo LGA, Lagos: six services, full licensing credentials, and every way to reach them, on one page.',
  openGraph: {
    title: 'Olumayowa Nursing Home: Healthcare Website | Habib',
    description: 'A website for a family healthcare provider in Iba, Ojo LGA, Lagos: six services, full licensing credentials, and every way to reach them, on one page.',
    url: 'https://habibcore.com/projects/olumayowa-nursing-home',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Olumayowa Nursing Home: Healthcare Website | Habib' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Olumayowa Nursing Home: Healthcare Website | Habib',
    description: 'A website for a family healthcare provider in Iba, Ojo LGA, Lagos: six services, full licensing credentials, and every way to reach them, on one page.',
    images: ['/og-image.png'],
  },
}

export default function OlumayowaNursingHome() {
  return (
    <ProjectLayout
      title="Olumayowa Nursing Home: Healthcare Website"
      heroImage="/projects/olumayowa-nursing-home/hero.jpg"
      heroAlt="Olumayowa Nursing Home website hero"
      meta={{
        category:  'Design',
        year:      '2026',
        client:    'Olumayowa Nursing Home',
        role:      'Designer · Developer',
        tools:     ['HTML', 'CSS', 'JavaScript', 'Python'],
        tags:      ['Web Design', 'Development'],
        liveUrl:   'https://olumayowanursinghome.com',
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                Olumayowa Nursing Home has run out of Iba, Ojo LGA since 2009, offering six
                services under one roof: in and out-patient care, family planning, child
                welfare, home visits, psycho-social therapy, and laboratory work. But a phone
                number and a street address don't communicate any of that.
              </p>
              <p>
                Someone searching for a family clinic nearby had no way to know what the home
                actually offers, whether it's properly licensed, or how to reach it, before
                they'd already walked through the door.
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
                Trust comes first for a healthcare provider, so the credentials that usually
                sit buried in a footer sit up front instead, next to the services themselves:
                CAC registration, HEFAMAA licensing, AGPNP membership.
              </p>
              <ul>
                <li>All six services given equal billing in one grid, not folded under a generic "Services" link</li>
                <li>Licensing and registration details surfaced early, not left for an About page nobody reaches</li>
                <li>A dedicated team section, putting named roles behind the practice instead of leaving "our staff" anonymous</li>
                <li>Call, WhatsApp, email, and directions reachable from anywhere on the page</li>
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
                A live site that puts licensing, services, the care team, and every contact
                method on one page a patient can scan in seconds. Designed and built end to
                end, the same way as the rest of this portfolio: no handoff, no separate team.
              </p>
            </>
          ),
        },
      ]}
      screenshots={[
        { src: '/projects/olumayowa-nursing-home/sc-services.png', alt: 'Olumayowa Nursing Home: six services grid' },
        { src: '/projects/olumayowa-nursing-home/sc-about.png',    alt: 'Olumayowa Nursing Home: about section with licensing credentials' },
        { src: '/projects/olumayowa-nursing-home/sc-team.png',     alt: 'Olumayowa Nursing Home: team section' },
        { src: '/projects/olumayowa-nursing-home/sc-contact.png',  alt: 'Olumayowa Nursing Home: contact section with map' },
      ]}
      next={{
        slug:     'skaame-epk',
        category: 'Design',
        title:    'Skaame: Artist Web EPK',
      }}
    />
  )
}
