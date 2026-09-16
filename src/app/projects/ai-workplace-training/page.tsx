import ProjectLayout from '@/components/ProjectLayout/ProjectLayout'

const description =
  'A company-wide AI literacy programme for Birdview Travels & Tours: a Monday talk on the fundamentals, then a 90-minute session across eleven modules, delivered through a self-built web hub.'

export const metadata = {
  title: 'AI in the Workplace: Employee Training | Habib',
  description,
  openGraph: {
    title: 'AI in the Workplace: Employee Training | Habib',
    description,
    url: 'https://habibcore.com/projects/ai-workplace-training',
    siteName: 'Habib',
    locale: 'en_NG',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AI in the Workplace: Employee Training | Habib' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI in the Workplace: Employee Training | Habib',
    description,
    images: ['/og-image.png'],
  },
}

export default function AIWorkplaceTraining() {
  return (
    <ProjectLayout
      title="AI in the Workplace: Employee Training"
      heroImage="/projects/ai-workplace-training/hero.jpg"
      heroAlt="AI in the Workplace training hub: session curriculum overview"
      meta={{
        category:  'Design',
        year:      '2026',
        client:    'Birdview Travels & Tours',
        role:      'Curriculum Design · Facilitation · Development',
        tools:     ['HTML', 'CSS', 'JavaScript', 'Newsreader', 'Inter Tight', 'IBM Plex Mono'],
        tags:      ['Curriculum Design', 'Slide Deck', 'Web Hub', 'Flashcards', 'Facilitation'],
        liveUrl:   '/ai-training-hub.html',
      }}
      sections={[
        {
          number:  '01',
          heading: 'The problem',
          body: (
            <>
              <p>
                Everyone at work had already heard of AI, and almost nobody had been shown
                what to actually do with it. The gap wasn't enthusiasm. It was that the
                available material sat at two useless extremes: breathless posts promising
                the tools would replace the whole department, or technical explainers
                written for people who already knew the vocabulary.
              </p>
              <p>
                What the workforce needed was neither. It was a plain-language starting
                point, aimed at people with no prior experience, that ended with them
                doing something differently on Monday morning.
              </p>
            </>
          ),
        },
        {
          number:  '02',
          heading: 'Starting with the Monday talk',
          body: (
            <>
              <p>
                The first outing was the weekly Monday talk session, anchored on an
                introduction to AI. Short, conversational, and deliberately unambitious:
                one working definition, the difference between the narrow AI that exists
                and the general AI that doesn't, and the myths worth clearing out before
                anything useful can be built on top.
              </p>
              <p>
                That session was the diagnostic. It surfaced what people actually wanted
                to know, and made the case for a longer, structured programme rather than
                a one-off talk.
              </p>
            </>
          ),
        },
        {
          number:  '03',
          heading: 'Designing the curriculum',
          body: (
            <>
              <p>
                The full programme was scoped as two one-hour sessions, then delivered as
                one 90-minute session covering both. Overlapping topics were merged into
                deeper modules rather than shortened, which is how automation ended up
                with a genuine ten minutes instead of being split thinly across two dates.
                Nothing was cut.
              </p>
              <p>Eleven modules, each written against a single stated outcome:</p>
              <ul>
                <li><strong style={{color:'var(--black)'}}>Foundations</strong>: what AI is in plain language, narrow versus general, and the myths worth busting.</li>
                <li><strong style={{color:'var(--black)'}}>Prompt writing</strong>: the RCTF framework, Role, Context, Task, Format, taught through a vague prompt rebuilt live into a full one.</li>
                <li><strong style={{color:'var(--black)'}}>Applied work</strong>: communication and documentation, customer service delivery, reporting and research, each with the same standing rule that AI drafts and a person finalizes.</li>
                <li><strong style={{color:'var(--black)'}}>Responsible use</strong>: hallucination explained as confident but not certain, plus the three rules on sensitive data, verification, and where accountability sits.</li>
                <li><strong style={{color:'var(--black)'}}>Automation</strong>: the distinction between judgment-based assistance and rule-based action, and the three-part test for a genuine candidate.</li>
                <li><strong style={{color:'var(--black)'}}>Adoption</strong>: daily habits and team practices, because consistency across a team beats individual cleverness.</li>
              </ul>
            </>
          ),
        },
        {
          number:  '04',
          heading: 'One link, three modes',
          body: (
            <>
              <p>
                Training material normally scatters: a deck in one place, a facilitator
                guide in another, handouts that go home and get lost. The hub collapses
                all of it into a single page with three modes, joined by a nav built as a
                connected path of stops rather than a flat tab bar.
              </p>
              <ul>
                <li><strong style={{color:'var(--black)'}}>Overview</strong>: objectives, a timed run of the session, and the full module breakdown as an accordion, cross-linked so clicking a point on the timeline opens the module it belongs to.</li>
                <li><strong style={{color:'var(--black)'}}>Slides</strong>: eighteen presentation slides driven by arrow keys with a fullscreen mode, so the same file that documents the session also delivers it.</li>
                <li><strong style={{color:'var(--black)'}}>Flashcards</strong>: ten flip cards mirroring the printed set handed out at close, kept online so people can review after the room empties.</li>
              </ul>
              <p>
                Built as one self-contained HTML file with no dependencies and no build
                step, so it opens from a shared link or a laptop with no wifi, and it will
                still open in a year.
              </p>
            </>
          ),
        },
        {
          number:  '05',
          heading: 'The outcome',
          body: (
            <>
              <p>
                Delivered to all employees on 7 August 2026. The measure of it was never
                attendance: it was whether people could state the RCTF framework without
                being prompted, name two AI applications relevant to their own role, and
                leave with the habit of verifying anything factual or customer-facing
                before it goes out.
              </p>
              <p>
                Written, designed, built, and facilitated end to end, the same way as the
                rest of this portfolio: no handoff, no separate team.
              </p>
            </>
          ),
        },
      ]}
      aiWorkflow={{
        intro:
          'The subject and the method were the same thing. The session teaches a prompt framework and a verification habit, so the materials had to be built the way the session says to build things.',
        tools: [
          {
            name: 'Claude Code',
            use:  'Built the hub from a written spec: the three-mode interface, the slide engine, and the flashcard flips.',
          },
          {
            name: 'RCTF prompting',
            use:  'Drafted module outlines and first-pass slide copy, then rewritten by hand so it sounded like a person briefing colleagues rather than a document.',
          },
          {
            name: 'Manual verification',
            use:  'Every factual claim in the deck checked against source before it went in front of staff.',
          },
        ],
        outcome:
          'The curriculum is mine and the scaffolding was generated. The rule that did not bend is the one taught in Module 8: nothing factual or customer-facing ships without a person checking it first.',
      }}
      screenshots={[
        { src: '/projects/ai-workplace-training/sc-curriculum.png', alt: 'Training hub: session timeline and the eleven-module breakdown, with the prompt writing module expanded' },
        { src: '/projects/ai-workplace-training/sc-slides.png',     alt: 'Training hub slides mode: the RCTF prompt framework broken into Role, Context, Task, and Format' },
        { src: '/projects/ai-workplace-training/sc-flashcards.png', alt: 'Training hub flashcards mode: ten flip cards covering the core concepts' },
      ]}
      next={{
        slug:     'skaame-epk',
        category: 'Design',
        title:    'Skaame: Artist Web EPK',
      }}
    />
  )
}
