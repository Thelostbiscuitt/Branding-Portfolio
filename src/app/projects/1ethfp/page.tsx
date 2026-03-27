import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: '1ETHFP — Creative Collaboration | Habib',
  description: 'A complete creative package for a web3 music and culture project — roadmap design, a produced anthem, and a promo video, all from one person.',
}

export default function OneEthFP() {
  return (
    <ProjectLayout
      title="1ETHFP — Creative Collaboration"
      heroImage="/projects/1ethfp/roadmap.jpg"
      heroAlt="1ETHFP roadmap design"
      meta={{
        category:   'Collab',
        year:       '2024',
        client:     '1ETHFP',
        role:       'Music Producer · Designer · Video Editor',
        tools:      ['Ableton Live', 'Adobe Premiere Pro', 'Figma'],
        tags:       ['Music Production', 'Design Direction', 'Video Production', 'Web3'],
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                1ETHFP is a web3 project building community through music and culture.
                Phase 2 needed to launch with real momentum — and momentum requires assets
                that match the energy of what's being built.
              </p>
              <p>
                Three things were needed simultaneously: a roadmap that gave the community
                clear direction, an anthem that could become a rallying cry, and a promo
                video that built hype before launch. Three disciplines, one creative
                vision, one person to execute it.
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
                Every piece had to feel like part of the same world. That constraint
                came first — before any individual brief for each deliverable.
              </p>
              <ul>
                <li>
                  <strong style={{color:'var(--white)'}}>Roadmap</strong> — clean and minimal but with a sense of motion.
                  Designed to communicate direction without overwhelming the community with
                  complexity. Every milestone visible at a glance.
                </li>
                <li>
                  <strong style={{color:'var(--white)'}}>Anthem</strong> — trap-influenced, high energy, anthemic.
                  Written, produced, and performed entirely in-house. The brief was simple:
                  it needs to sound like a rallying cry, not a soundtrack.
                </li>
                <li>
                  <strong style={{color:'var(--white)'}}>Promo video</strong> — quick cuts, glitch effects, pacing
                  locked to the music. Edited to match the anthem beat-for-beat so the two
                  pieces feel inseparable.
                </li>
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
                A complete creative package that established 1ETHFP's visual and sonic
                identity for Phase 2. The roadmap gave the community direction. The anthem
                became the project's sonic signature. The promo video generated excitement
                across social media ahead of launch.
              </p>
              <p>
                All three pieces worked together because they were made together — the
                advantage of having one creative directing across every medium rather than
                briefing separate specialists and hoping for coherence.
              </p>
            </>
          ),
        },
      ]}
      screenshots={[
        { src: '/projects/1ethfp/roadmap.jpg', alt: '1ETHFP roadmap design' },
      ]}
      next={{
        slug:     'biscuit-ai',
        category: 'Design',
        title:    'Biscuit AI — Telegram Bot Design',
      }}
    />
  )
}
