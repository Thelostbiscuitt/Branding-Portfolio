import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

export const metadata = {
  title: 'Leadway Pensure — Brand & Communications | Habib',
  description: 'A self-initiated brand extension pitch for Nigeria\'s most capitalised pension fund. Nine sections covering product redesigns, social system, identity guidelines, and brand voice.',
}

export default function LeadwayPensure() {
  return (
    <ProjectLayout
      title="Leadway Pensure — Brand & Communications"
      heroImage="/projects/leadway/cover.svg"
      heroAlt="Leadway Pensure brand extension pitch"
      meta={{
        category:   'Brand',
        year:       '2024–2026',
        client:     'Leadway Pensure PFA',
        role:       'Brand Designer · Copywriter · Strategist',
        tools:      ['Figma', 'Adobe Suite', 'Copywriting'],
        tags:       ['Brand Extension', 'Product Design', 'Social System', 'Brand Guidelines', 'Copywriting', 'Identity'],
        liveUrl:    'https://branding-portfolio-ochre.vercel.app/leadway-pitch.html',
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                Leadway Pensure has spent over 20 years earning the trust of Nigerian
                workers. The brand equity is real — the camel mark, the orange, two decades
                of authority in the pension space. But the brand materials hadn't evolved
                to reach the workers who needed them most: employed Nigerians aged 25–45
                who don't think about their pension until it's too late.
              </p>
              <p>
                As an internal creative, the gap was visible every day. No one had built
                the case for fixing it. So this was done unprompted.
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
                A full brand extension pitch built around the brand's existing equity —
                not a rebrand, an evolution. Nine sections delivered as a designed web
                document covering every surface where the brand needed to improve:
              </p>
              <ul>
                <li>Product suite redesigns for all six Leadway Pensure offerings</li>
                <li>Brand identity system with colour, type, and logo usage rules</li>
                <li>Voice guidelines with explicit do/don't examples throughout</li>
                <li>Eight social post templates ready for immediate use</li>
                <li>Full brand guidelines document</li>
              </ul>
              <p>
                The brand voice work was as rigorous as the visual work. Every guideline
                was written with a concrete example: lead with human outcome, never with
                jargon. Make the abstract concrete — real numbers beat vague assurances.
                Premium brands don't shout.
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
                A complete brand extension pitch delivered as a live web document —
                not a PDF, not a slide deck. Interactive, shareable, designed to be read
                rather than skimmed.
              </p>
              <p>
                Self-initiated. Built on the belief that the best brief is the one you
                write yourself when you can see the problem clearly and no one else is
                moving on it. The work demonstrates what happens when a designer has
                both the strategic conviction and the execution ability to make the case
                and deliver it in the same breath.
              </p>
            </>
          ),
        },
      ]}
      screenshots={[]}
      next={{
        slug:     'skaame-epk',
        category: 'Design',
        title:    'Skaame — Artist Web EPK',
      }}
    />
  )
}
