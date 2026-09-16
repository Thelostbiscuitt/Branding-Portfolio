#!/usr/bin/env python3
"""v4.0: apply HABIBCORE_Copy_and_Content_System_2026 copy deck in place.

Baseline rule: the existing site is the immutable visual/structural baseline.
TEXT-ONLY swaps into existing slots (same classes, hierarchy, interactions).
Additive exceptions only, all reusing existing classes:
  - /work page gets a heading block (deck gives the page a hero for the first time)
  - three inserted paragraphs (selected-work intro, capability + approach bridges)
  - two extra contact checkboxes (deck's "What are you building?" list)
"""
import re, sys

PATH = 'index.html'
H = open(PATH, encoding='utf-8').read()
ORIG = H
MISSES = []
FIRED = 0

def block(route):
    m = re.search(r'<div class="page[^>]*data-route="%s"' % re.escape(route), H)
    if not m:
        return None
    start = m.start()
    j1 = H.find('<div class="page"', start + 10)
    j2 = H.find('<div class="page ', start + 10)
    js = [x for x in (j1, j2) if x >= 0]
    return start, (min(js) if js else len(H))

def rep(route, old, new, optional=False, count=-1):
    global H, FIRED
    s = block(route)
    if not s:
        MISSES.append((route, old[:60], 'NO PAGE')); return
    a, b = s
    seg = H[a:b]
    n = seg.count(old)
    if n == 0:
        if not optional: MISSES.append((route, old[:60], 'not found'))
        return
    seg = seg.replace(old, new) if count < 0 else seg.replace(old, new, count)
    H = H[:a] + seg + H[b:]
    FIRED += 1

def rrep(route, pat, repl, optional=False, count=0):
    global H, FIRED
    s = block(route)
    if not s:
        MISSES.append((route, pat[:60], 'NO PAGE')); return
    a, b = s
    seg = H[a:b]
    new, k = re.subn(pat, repl, seg, count=count, flags=re.S)
    if k == 0 and not optional:
        MISSES.append((route, pat[:60], 'no match'))
    H = H[:a] + new + H[b:]
    if k: FIRED += 1

# ============================================================ GLOBAL MICROCOPY
H2 = H.replace('DISCOVER CASE &rarr;', 'VIEW CASE &rarr;')
if H2 != H: FIRED += 1
H = H2
H = H.replace('QUESTIONS I ACTUALLY GET', 'QUESTIONS WORTH ANSWERING')
H = H.replace('QUESTIONS WE ACTUALLY GET', 'QUESTIONS WORTH ANSWERING')
H = re.sub(r'Shipped(?:\s|&nbsp;|<em>|</em>)+proof\.?', 'Relevant work.', H)
H = H.replace('<span class="kicker">WHAT I BUILD</span>',
              '<span class="kicker">WHAT I ACTUALLY DO</span>')
FIRED += 3

# ============================================================ HOME
R = '/'
rrep(R, r'Brands, digital products and AI tools[^<]*',
     'Brand, product, software, AI and the systems behind them. I move between '
     'disciplines because real problems rarely stay in one. Based in Lagos. '
     'Working wherever the work is.')
rep(R, 'View selected work &darr;', 'SEE THE WORK &darr;')
rrep(R, r'(<h2[^>]*>)\s*Selected work\s*(</h2>)', r'\1Things I actually made.\2')
rrep(R, r'(<h2[^>]*>Things I actually made\.</h2>)',
     r'\1<p class="hc-body" style="max-width:52ch;margin-top:12px">'
     'A few recent builds. The full archive is much bigger.</p>')
rep(R, 'All work &mdash; the full index &nearr;', 'SEE EVERYTHING &nearr;')
rrep(R, r'(<h2 class="hc-display">One practice &mdash; many expressions</h2>)',
     r'\1<p class="hc-body" style="max-width:60ch;margin-top:12px">'
     'I do not separate design from building because the work does not. Identity '
     'can become interface. Interface can become software. Software can become an '
     'operation. Sometimes the project starts with a poster and ends with a '
     'database.</p>')
rep(R, 'The full capability index &rarr;', 'WHAT I CAN DO &rarr;')
rrep(R, r'(<h2 class="hc-display-xl">Designed\. Built\. Shipped\.</h2>)',
     r'\1<p class="hc-body" style="max-width:60ch;margin-top:12px">'
     'I do not have a 23-step methodology deck. Most projects need the same thing: '
     'see the real problem, give it structure, make the thing, put it in front of '
     'someone, and stay long enough to see what breaks.</p>')
rep(R, 'The full approach &mdash; brief to operate &rarr;', 'HOW I WORK &rarr;')
rrep(R, r'Creative director by training, builder by practice\.[^<]*',
     'I started in music and visual design. Then I spent years inside '
     'financial-services operations, where a beautiful idea is useless if nobody '
     'can actually run it. Somewhere between the two, I started building software. '
     'Now I design the thing, build the thing and stay around when the thing '
     'starts doing real work.')
rrep(R, r'Today that means product: interfaces, web apps and AI-assisted software[^<]*',
     'I came into this through music and design. I stayed long enough to end up '
     'building software and fixing operations.')
rrep(R, r'An idea, a problem, or something that should exist but doesn&rsquo;t yet[^<]*',
     'Have an idea, a problem, or something that should exist but does not yet? '
     'Bring the rough version.')

# ============================================================ /WORK
R = '/work'
rep(R, '<section class="sectionwrap" id="work" aria-label="Work index">',
    '<section class="sectionwrap" id="work" aria-label="Work index">'
    '<div class="sec-head" style="padding:var(--hc-space-64) clamp(20px,4vw,56px) 0">'
    '<div class="idx"><span class="kicker">02 / WORK</span>'
    '<span class="kicker">THE FULL ARCHIVE</span></div>'
    '<h2 class="hc-display-xl">A lot more than six projects.</h2>'
    '<p class="hc-body" style="max-width:62ch;margin-top:16px">'
    'The homepage shows you what I am doing now. This is the longer trail: brands, '
    'products, software, systems, graphics, music and the experiments in between. '
    'Some were commissioned. Some were self-initiated. Some started as design work '
    'and became software. Some started as songs. They all stay here because they '
    'explain how the practice got built.</p></div>', optional=True)
rrep(R, r'(explain how the practice got built\.</p></div>)',
     r'\1<div class="sec-head" style="padding:0 clamp(20px,4vw,56px)">'
     '<div class="idx"><span class="kicker">&mdash; NOW</span>'
     '<span class="kicker">CURRENT AND RECENT WORK</span></div></div>', optional=True)
rrep(R, r'(SCROLL TO MOVE THE PROJECTS[^<]*</p>)',
     r'\1<p style="text-align:center;margin-top:28px">'
     '<a class="tlink" href="#/contact">THERE IS MORE &rarr;</a></p>', optional=True)

# ============================================================ /CAPABILITIES
R = '/capabilities'
rep(R, 'EIGHT DISCIPLINES · ONE PAIR OF HANDS',
    'EIGHT DISCIPLINES · ONE OPERATING PRINCIPLE')
rrep(R, r'What HABIBCORE actually does[^<]*',
     'Eight disciplines. One very specific habit: make the thing real. '
     'Brand, product, software, AI, automation, creative direction, graphic design '
     'and training &mdash; the labels are different, the operating principle is not. '
     'I do not believe design, code and systems need to live in separate boxes. '
     'Sometimes the best solution is a brand system. Sometimes it is a database '
     'constraint. Sometimes it is a better sentence. The job is figuring out which '
     'one actually fixes the problem.')

# ============================================================ CAPABILITY PAGES
CAPS = {
 '/capabilities/brand-identity': dict(
  h1='I do not really do logos. <em>I build the thing the logo has to survive.</em>',
  sub='A brand needs to work after the launch deck is closed: on screens, in '
      'documents, in social posts, in products and in the hands of people who were '
      'not in the room when it was made.',
  why_h='<em>A mark without specifications</em> is a drawing.',
  p1='I came into this through graphic design and art direction, then learned what '
     'happens when an identity meets a real organisation. That is why I care about '
     'the boring parts: rules, voice, usage, templates, hierarchy &mdash; the stuff '
     'that keeps the thing recognisable six months later.',
  p2='Leadway Pensure is the clearest example: an unprompted brand extension pitch '
     'built from four years of operational context, then expanded into commissioned '
     'work.',
  svcs=[('Brand identity systems',
         'Mark, type, colour and usage specified for real teams &mdash; not a brand '
         'book that dies in a drive.'),
        ('Visual direction',
         'Cover art, image systems and the composition rules that make a body of '
         'work read as one hand.'),
        ('Brand voice and copy frameworks',
         'Voice definitions and copy frameworks that keep the brand coherent across '
         'product, social and correspondence.'),
        ('Guidelines, production and social systems',
         'Rules, templates and rhythm specified tightly enough that an internal '
         'team runs the system without me.')],
  faqs=[('Do you do logo-only work?', None),
        ('Can you build on an existing identity?', None),
        ('Can the system be used by an internal team without me?',
         'Yes &mdash; that is the point of specifying it tightly. The identity is '
         'delivered in the medium it lives in: live web documents, working '
         'templates, production files &mdash; not a PDF that dies in a drawer.')],
  close='Bring the brand problem.'),
 '/capabilities/product-design': dict(
  h1='<em>If the interface cannot survive contact with a real user,</em> I have not '
     'finished designing it.',
  sub='I design interfaces with the build in the room. That changes what gets '
      'designed: states, edge cases, data, empty screens, errors &mdash; the things '
      'that usually appear after the handoff.',
  why_h='<em>The goal is not</em> a beautiful prototype.',
  p1='The goal is not a beautiful prototype. It is a product whose decisions '
     'survive production.',
  p2='Biscuit AI, Chef4Me, Relay and the Olumayowa site show the range: '
     'conversation-first products, operational software and high-clarity public '
     'sites.',
  svcs=[('Product interfaces and flows',
         'Designed with the build in the room &mdash; states, edge cases, data and '
         'empty screens included.'),
        ('Web apps and internal tools',
         'Interfaces for software people actually operate, not demos that die after '
         'the walkthrough.'),
        ('Conversational UX',
         'No forms, no dashboards when a sentence will do &mdash; conversation-first '
         'products, proved live.'),
        ('Design systems and information architecture',
         'Tokens, components and states documented tightly enough that even a '
         'future you can&rsquo;t get it wrong.')],
  faqs=[('Do you design from research, constraints or both?',
         'Both. Research says what is broken; constraints say what is buildable. '
         'The interface is designed where they intersect.'),
        ('Will you work directly in code?', None),
        ('What happens after the first version ships?',
         'I stay near it. Real use writes the fix list &mdash; the first version is '
         'the start of the data, not the end of the work.')],
  close='Bring the interface problem.'),
}
CAPS['/capabilities/software'] = dict(
 h1='<em>At some point</em> the mockup has to stop being a picture.',
 sub='I write the software behind the interface: web apps, chat products, internal '
     'portals, data flows, deployment and the unglamorous code that keeps the thing '
     'alive.',
 why_h='<em>Software that ships</em> behaves differently from software that demos.',
 p1='I care about the part portfolios usually hide: what happens when the user does '
    'the wrong thing, the network fails, the data is ugly, or somebody needs to '
    'maintain the code six months later.',
 p2='Relay is the cleanest example: an operations rebuild with role-scoped access, '
    'database-level audit enforcement, working-days SLA clocks and a CRS calculator. '
    'The practice also runs on the tools it sells: Biscuit AI and Chef4Me are in '
    'daily use.',
 svcs=[('Production web apps',
        'Full-stack builds that go from schema to deployment &mdash; not prototypes '
        'that die at the demo.'),
       ('Telegram and chat products',
        'Assistants that live where the user already is &mdash; API and model '
        'integrations wired to real providers and real cost visibility.'),
       ('Internal tools and portals',
        'The unglamorous software an operation actually runs on &mdash; pipelines, '
        'trackers, audit trails.'),
       ('Deployment and operational support',
        'DNS, hosting, logs and the 2am answer. The product is finished when it '
        'runs, not when the repo looks done.')],
 faqs=[('Do you handle deployment as well as code?',
        'Yes &mdash; DNS, hosting, logs and the 2am answer included. The product is '
        'finished when it runs, not when the repo looks done.'),
       ('How do you decide what belongs in the first release?',
        'The smallest slice that touches the real workflow. If the first release '
        'doesn&rsquo;t meet the operation it is for, the roadmap is guesswork.'),
       ('Can you take over an existing codebase?', None)],
 close='Bring the thing that has to run.')

CAPS['/capabilities/ai-systems'] = dict(
 h1='I am interested in AI <em>when it earns the right to be in the workflow.</em>',
 sub='Not every product needs an assistant. Not every assistant needs to remember '
     'everything. The useful question is what the model should actually do, what '
     'the user should be able to inspect, and what happens when the model is wrong.',
 why_h='<em>Trust in an assistant</em> you can&rsquo;t inspect is misplaced.',
 p1='The work here is practical: assistants, model routing, search, memory, '
    'evaluation, cost visibility and the training that makes AI useful after the '
    'demo ends.',
 p2='Biscuit AI and Chef4Me are live product examples. The workplace programme '
    'extends the same thinking into teams.',
 svcs=[('AI assistants',
        'Assistants with memory you can inspect and costs you can see &mdash; wired '
        'to real providers, in production, not in a pitch.'),
       ('Model and tool integration',
        'OpenRouter, Gemini, Tavily &mdash; whichever the task demands, routed and '
        'wired into the product.'),
       ('Memory systems',
        'Layered memory that can be opened, read and wiped from inside the product '
        'itself.'),
       ('AI evaluation and literacy',
        'Cost visibility, evaluation, and the training that makes AI useful after '
        'the demo ends.')],
 faqs=[('Where should AI actually sit in our workflow?',
        'Where it removes a real bottleneck &mdash; not where it photographs well. '
        'The useful question is what the model should do, what the user can '
        'inspect, and what happens when it is wrong.'),
       ('How do you handle model cost and reliability?', None),
       ('Can you train the team alongside the build?', None)],
 close='Bring the workflow.')

CAPS['/capabilities/automation'] = dict(
 h1='I do not automate things <em>I have not understood.</em>',
 sub='Four years inside financial-services operations taught me the difference '
     'between a process diagram and the process people actually use.',
 why_h='<em>Operations keep</em> what they understand.',
 p1='The right automation starts with the real workflow, the weird exceptions, the '
    'handoffs, the audit trail and the Friday afternoon behaviour. Then software '
    'carries what is worth keeping.',
 p2='10,000+ end-clients were moved to self-service channels; the live pipeline '
    'work spans 18 stages and 250+ clients.',
 svcs=[('Workflow automation',
        'Built from the real workflow &mdash; the weird exceptions, the handoffs, '
        'the Friday afternoon behaviour.'),
       ('CRM and pipeline systems',
        'Live pipeline work spanning 18 stages and 250+ clients, run for four years '
        'inside operations.'),
       ('Process documentation',
        'The difference between a process diagram and the process people actually '
        'use, written down.'),
       ('Audit trails and data hygiene',
        '10,000+ end-clients moved to self-service channels &mdash; with the audit '
        'trail to prove it.')],
 faqs=[('What happens before you automate a workflow?', None),
       ('Can you work with tools we already use?', None),
       ('How do you keep automation understandable after launch?',
        'Documentation, naming and audit trails a human can read &mdash; you own '
        'the system, with the paperwork to prove it. Dependency is a design '
        'failure, not a business model.')],
 close='Bring the process.')

CAPS['/capabilities/creative-direction'] = dict(
 h1='This started with music. <em>The image has to sound like the record.</em>',
 sub='Creative direction here is not moodboarding for the sake of moodboarding. It '
     'is deciding what the work should feel like, then making the visual, motion '
     'and release materials agree.',
 why_h='<em>The image has to sound</em> like the record.',
 p1='Music trained the instinct: cover, image, video, rollout and sound need to '
    'belong to the same world.',
 p2='The archive includes two EP releases, cover-art systems, artist EPKs and the '
    'Leadway Customer Service Week film.',
 svcs=[('Art direction',
        'Deciding what the work should feel like, then making everything agree.'),
       ('Campaign visuals',
        'Visual systems for brands and artists that survive contact with a real '
        'rollout.'),
       ('Film and promo work',
        'Promo films cut to the music, not to a generic edit template &mdash; '
        'including the Leadway Customer Service Week film.'),
       ('Music release direction',
        'Cover, image, video, rollout and sound belonging to the same world '
        '&mdash; trained on two EP releases.')],
 faqs=[('Can the work cover strategy and execution?',
        'Yes &mdash; direction decides what the work should feel like; execution '
        'makes the visual, motion and release materials agree. Co-production '
        'credits on two released EPs.'),
       ('Do you handle motion and sound as well as stills?', None),
       ('Can you direct an existing team rather than produce everything yourself?',
        'Yes. Direction is deciding what the work should feel like and holding the '
        'bar &mdash; whoever&rsquo;s hands make it.')],
 close='Bring the idea.')

CAPS['/capabilities/graphic-design'] = dict(
 h1='I still trust the grid. <em>I just do not worship it.</em>',
 sub='Graphic design is still the base layer underneath everything: type, '
     'composition, rhythm, hierarchy, image and the ability to make information '
     'feel inevitable.',
 why_h='<em>Different outputs,</em> same craft.',
 p1='The work ranges from cover art and cassette packaging to pitch decks, lyric '
    'visuals and training material. Different outputs, same craft.',
 p2='The BlvckOreo cover series, Bedroom Recordings II and The Basics of Graphic '
    'Design make that range visible.',
 svcs=[('Cover art and packaging',
        'Cassette packages and cover series where each release adds to the world '
        'instead of restarting it.'),
       ('Editorial and decks',
        'Pitch decks and editorial layout &mdash; information arranged to feel '
        'inevitable.'),
       ('Promo and lyric visuals',
        'Beat-locked promo films and lyric videos built from the song itself.'),
       ('Composition and information design',
        'Type, rhythm, hierarchy and image &mdash; the base layer underneath '
        'everything.')],
 faqs=[('Can you handle print as well as digital?', None),
       ('What makes a layout feel finished?',
        'When nothing is decorative &mdash; type, rhythm and hierarchy carry the '
        'information and the feeling at the same time, and removing anything else '
        'makes it worse.'),
       ('Do you work from an existing brand system?',
        'Yes &mdash; several engagements extend or repair an existing system. The '
        'wider archive lives on Behance, linked from the Singles &amp; Cover Art '
        'case.')],
 close='Bring the message.')

CAPS['/capabilities/training'] = dict(
 h1='Teach it well enough that <em>you are not needed for the next step.</em>',
 sub='I build training like products: clear structure, useful pacing, things people '
     'can practise, and material that still exists after the session ends.',
 why_h='<em>Material built like</em> a product.',
 p1='The goal is not to sound clever in a room. It is to leave people with a '
    'working vocabulary and something they can use tomorrow.',
 p2='AI in the Workplace is an 11-module, 90-minute programme with its own web hub, '
    'slides and flashcards. The Basics of Graphic Design teaches the craft itself.',
 svcs=[('AI literacy programmes',
        'Eleven modules, ninety minutes, one live link &mdash; company-wide, '
        'already run.'),
       ('Curriculum design',
        'Clear structure and useful pacing, built like a product: each module earns '
        'the next.'),
       ('Facilitation',
        'The goal is not to sound clever in a room. It is to leave people with '
        'something they can use tomorrow.'),
       ('Training decks and learning hubs',
        'Slides, flashcards and web hubs that carry the material after the session '
        'ends.')],
 faqs=[('Who is the training for?', None),
       ('Do you build the curriculum and the learning materials?', None),
       ('Does the material stay available after the session?', None)],
 close='Bring the team.')

# ---- apply capability pages
def esc_q(s):  # escape for regex
    return re.escape(s)

for route, c in CAPS.items():
    rrep(route, r'(class="cap-hero-h">).*?(</h1>)', lambda m: m.group(1) + c['h1'] + m.group(2))
    rrep(route, r'(class="cap-sub">)[^<]*', lambda m: m.group(1) + c['sub'])
    rrep(route, r'(aria-label="Why it matters">\s*<span class="kicker">WHY IT MATTERS</span>\s*'
                r'<h2 class="cap-state-h">).*?(</h2>)',
         lambda m: m.group(1) + c['why_h'] + m.group(2))
    rrep(route, r'(aria-label="Why it matters".*?cap-cols">\s*<p class="b">)[^<]*',
         lambda m: m.group(1) + c['p1'])
    rrep(route, r'(aria-label="Why it matters".*?<p class="b">[^<]*</p>\s*<p class="b">)[^<]*',
         lambda m: m.group(1) + c['p2'])
    rrep(route, r'(kicker">WHAT I ACTUALLY DO</span>\s*<h2 class="cap-state-h">).*?(</h2>)',
         lambda m: m.group(1) + '<em>What I</em> actually do.' + m.group(2))
    for i, (t, d) in enumerate(c['svcs'], 1):
        rrep(route, r'(class="cap-svc"><span class="no">0%d</span>\s*<div>\s*<b>)[^<]*(</b>)' % i,
             lambda m, t=t: m.group(1) + t + m.group(2))
        rrep(route, r'(<b>' + esc_q(t) + r'</b>\s*<p class="b">)[^<]*',
             lambda m, d=d: m.group(1) + d)
    # FAQ swap: replace Q&A positionally where a new answer is supplied,
    # otherwise only the summary text
    faqs = re.findall(r'<summary>(.*?)</summary>', H[block(route)[0]:block(route)[1]], flags=re.S)
    for old_q, (new_q, new_a) in zip(faqs, c['faqs']):
        rrep(route, r'(<summary>)' + esc_q(old_q) + r'(</summary>)',
             lambda m, q=new_q: m.group(1) + q + m.group(2))
        if new_a:
            rrep(route, r'(<summary>' + esc_q(new_q) + r'</summary>\s*<p class="b">)[^<]*',
                 lambda m, a=new_a: m.group(1) + a)
    rrep(route, r'(class="cap-close-h">)[^<]*', lambda m: m.group(1) + c['close'])

# ============================================================ APPROACH
R = '/approach'
rrep(R, r'(class="cap-hero-h">).*?(</h1>)',
     r'\1<em>I do not have</em> a 23-step process.\2')
rrep(R, r'(class="cap-sub">)[^<]*',
     r'\g<1>Most projects do not need one. They need the real problem, a clear '
     'structure, a good build, a user who can actually use it, and someone who is '
     'still around when something breaks.')
STEPS = [
 ('Find the real problem',
  'Start with what is actually happening, not the polished version in the brief. '
  'What is broken? Who feels it? What does it currently cost? What would '
  '&ldquo;done&rdquo; change?'),
 ('Make the thing make sense',
  'Before pixels and code, I work out the structure: the story, the interface, the '
  'information, the workflow, the system behind the surface.'),
 ('Build the ugly parts too',
  'Errors. Empty states. Data. Permissions. Content. The bits nobody puts in the '
  'hero shot. If those are not designed, the product is not designed yet.'),
 ('Put it in someone&rsquo;s hands',
  'A prototype tells me what I think. A real user tells me what I missed. The '
  'fastest way to validate a design is usually to get it into production.'),
 ('Stay long enough to learn',
  'Launch is not the finish line. The useful part is seeing what real use does to '
  'the thing and fixing what the first version could not know.'),
]
for i, (t, d) in enumerate(STEPS, 1):
    rrep(R, r'(class="cap-svc"><span class="no">0%d</span>\s*<div>\s*<b>)[^<]*(</b>)' % i,
         lambda m, t=t: m.group(1) + t + m.group(2))
    rrep(R, r'(<b>' + esc_q(t) + r'</b>\s*<p class="b">)[^<]*',
         lambda m, d=d: m.group(1) + d)
rep(R, '<span class="kicker">ONE PAIR OF HANDS</span>',
    '<span class="kicker">DESIGN &amp; BUILD</span>')
rrep(R, r'(class="cap-close-h">)[^<]*',
     r'\g<1>The work is finished when it works, not when it looks finished.')

# ============================================================ ABOUT
R = '/about'
rrep(R, r'(<h1[^>]*>)\s*Designer\. Builder\. Operator\.\s*(</h1>)',
     r'\1How I got here is slightly inconvenient for neat portfolios.\2')
rrep(R, r'Creative director by training, builder by practice\.[^<]*',
     'I started in music and visual design. Then I spent years inside '
     'financial-services operations. Then software became part of the job. Now '
     'HABIBCORE sits in the middle of all three.')
rrep(R, r'&ldquo;Design is the primary work\.[^&]*?&rdquo;', r'\g<0>', optional=True)
rrep(R, r'Design is the primary work\. The ability to build it is what makes it real\.',
     'I learned taste in music. I learned systems in operations. I learned patience '
     'in software.')
rrep(R, r'Most work loses something between the drawing and the shipping\.[^<]*',
     'Music was the first place I learned that taste is not decoration. A cover '
     'changes how a record feels before the first track starts. A rollout either '
     'belongs together or it does not. That became graphic design, art direction '
     'and brand work.')
rrep(R, r'The path here isn&rsquo;t a straight agency line:[^<]*',
     'Four years inside a financial-services organisation changed the way I think. '
     'I saw what happens when processes are real: people skip steps, spreadsheets '
     'become infrastructure, the same questions appear every day, and the '
     'difference between a good idea and a usable one gets expensive very quickly.')
rrep(R, r'(Clients don&rsquo;t buy deliverables here\.[^<]*)(</p>)',
     r'\1</p><p class="b">Eventually I stopped waiting for someone else to build '
     'the thing. I started writing it. First as tools and automations, then as '
     'products, assistants, portals and the systems underneath them.</p>'
     '<p class="b">Today I work across brand, product, software, AI, automation, '
     'creative direction, graphic design and training. That sounds like a lot until '
     'you look at the common thread: I like figuring out how a thing should work, '
     'then getting close enough to it to make it real.</p>\2')
rrep(R, r'(<b>)ONE PAIR OF HANDS(</b>)',
     r'\1ONE PERSON, START TO FINISH\2')

# ============================================================ CONTACT
R = '/contact'
rrep(R, r'(<h1[^>]*>)\s*Let&rsquo;s make something\.\s*(</h1>)',
     r'\1Bring me the problem before you polish the brief.\2')
rrep(R, r'An idea, a problem, or something that should exist but doesn&rsquo;t yet[^<]*',
     'Tell me what is broken, what you are trying to make, or what should exist but '
     'does not yet. The rough version is fine. We can make it clearer together.')
rrep(R, r'(<label class="check"><input type="checkbox" name="scope"\s*value="other">)',
     r'<label class="check"><input type="checkbox" name="scope" value="creative">'
     'CREATIVE / CAMPAIGN</label>'
     '<label class="check"><input type="checkbox" name="scope" value="training">'
     'TRAINING</label>\1')
rep(R, '04 &mdash; BRIEF (OPTIONAL)', '04 &mdash; WHAT NEEDS TO EXIST?')
rep(R, 'Send it &rarr;', 'SEND THE PROBLEM &rarr;')
rep(R, 'SENDS DIRECTLY &middot; USUALLY RESPONDS WITHIN24H',
    'SENDS DIRECTLY &middot; USUALLY RESPONDS WITHIN 24H &middot; NO AGENCY MAZE '
    '&mdash; JUST THE PERSON YOU ARE TALKING TO', optional=True)

# ============================================================ CASE PAGES
# 6 substantial cases: hero-support (ch-tag), challenge h3 #1 (deck HERO HEADLINE),
# overview (deck Context), result paragraph (deck Result/proof), FAQ Q&A swap.
BIG = {
 '/work/biscuit-ai': dict(
  tag='Most assistants either forget everything useful or remember everything with '
      'no way to inspect it. Biscuit treats memory as part of the interface, not a '
      'hidden backend trick.',
  h3='I built a Telegram assistant that can tell you what it remembers.',
  ov='The brief was simple: make an assistant I would actually want to use. That '
     'meant inspectable memory, the ability to erase it, web search, a local book '
     'library, image generation and visible costs &mdash; all inside one conversation.',
  res='Production-ready and in daily use. The important part is not that it can '
      'chat. It is that the useful parts are inspectable.',
  faqs=[('What is inspectable memory?',
         'The memory is structured in layers you can open, read and wipe from '
         'inside the chat itself &mdash; nothing useful forgotten, nothing hidden '
         'in a backend.'),
        ('Why make cost visible inside the conversation?',
         'Because usage should be a decision, not a surprise. Costs are surfaced '
         'in the chat, so you always know what the conversation is spending.'),
        ('Why Telegram instead of a separate app?', None)]),
 '/work/chef4me': dict(
  tag='Recipe apps start with a dish and work backwards to shopping. Real kitchens '
      'are messier. Chef4Me starts with what is actually there.',
  h3='Dinner starts with what is already in the kitchen.',
  ov='The assistant tracks ingredients and expiry dates, then suggests meals from '
     '40+ cuisines through plain Telegram commands. No forms. No dashboard. The '
     'interface is the conversation.',
  res='The whole product is a chat, which means updating the inventory costs '
      'roughly one sentence.',
  faqs=[('Why start from inventory instead of recipes?',
         'Because real kitchens cook from what exists. Recipe apps assume you shop '
         'for a plan; Chef4Me suggests meals from the ingredients and expiry dates '
         'it already tracks.'),
        ('How does conversational input reduce friction?',
         'Updating the inventory costs roughly one sentence &mdash; add what you '
         'bought, say what expired, ask what to cook. No forms, no dashboards.'),
        ('What does the 40+ cuisine layer actually change?',
         'Range without reordering your life. The suggestion engine (Gemini) works '
         'across more than forty cuisines from the same live inventory.')]),
}
BIG['/work/leadway-pensure'] = dict(
 tag='I had four years of operational context inside the organisation. I could see '
     'where the brand, product and communication system were leaving value on the '
     'table. So I built the argument before anyone asked me to.',
 h3='I did not wait for the brief.',
 ov='The result was a live web-document pitch covering identity guidelines, product '
    'redesigns, social systems and brand voice. Leadway later commissioned the '
    'Customer Service Week 2024 film as a follow-on engagement.',
 res='The unusual part is the starting point: self-initiated work grounded in '
     'inside knowledge rather than an external audit from a distance.',
 faqs=[('Why was the pitch self-initiated?',
        'I had four years of operational context inside the organisation and could '
        'see where the brand, product and communication system were leaving value '
        'on the table. So I built the argument before anyone asked.'),
       ('What did four years inside operations change?',
        'It made the work specific: identity guidelines, product redesigns, a '
        'social system and a brand voice grounded in how the organisation actually '
        'runs &mdash; not an external audit from a distance.'),
       ('What happened after the pitch?',
        'Leadway commissioned the Customer Service Week 2024 film as a follow-on '
        'engagement.')])

BIG['/work/olumayowa-nursing-home'] = dict(
 tag='A local practice needed a site that could answer the important questions '
     'quickly: what do you do, are you credible, can I reach you?',
 h3='A healthcare site built for the moment when someone is already worried.',
 ov='Six services, licensing credentials and every contact route are arranged for '
    'a fast scan. The site had to work on the devices and networks a local patient '
    'would actually use, not an imaginary broadband connection.',
 res='Designed, built and shipped end to end. The result is deliberately simple: '
     'see the service, see the proof, know how to reach the practice.',
 faqs=[('What information had to be found immediately?',
        'What do you do, are you credible, can I reach you &mdash; six services, '
        'licensing credentials and every contact route, arranged for a fast scan.'),
       ('Why was one-page architecture appropriate?',
        'A worried visitor should not have to learn a navigation system. One page '
        'answers the three real questions in one scroll.')])

BIG['/work/ai-in-the-workplace'] = dict(
 tag='One session is easy to deliver. It is harder to make the material useful a '
     'week later.',
 h3='AI training that still exists after the trainer leaves.',
 ov='I built an 11-module, 90-minute company-wide programme for Birdview, then '
    'built the web hub that carried the curriculum, slides and flashcards on one '
    'link.',
 res='The training became a reference point instead of a one-off event.',
 faqs=[('Why eleven modules?',
        'One session evaporates. Eleven modules give the vocabulary time to become '
        'usable &mdash; company-wide, not just in the room.'),
       ('What makes the web hub necessary?',
        'One link carries the whole curriculum, slides and flashcards &mdash; the '
        'training exists after the trainer leaves.')])

BIG['/work/relay'] = dict(
 tag='The operation needed more than another dashboard. It needed the system itself '
     'to enforce the rules: permissions, auditability and deadlines.',
 h3='Make compliance impossible to forget.',
 ov='Relay was rebuilt as an operations portal with role-scoped access, an '
    'append-only audit trail at the database level, working-days SLA clocks and a '
    'CRS calculator in the browser.',
 res='The important design decision sits low in the stack: if compliance matters, '
     'the database should help enforce it.',
 faqs=[('Why enforce auditability in the database?',
        'Because policy that lives in documentation gets skipped. The system itself '
        'should enforce the rules &mdash; Relay&rsquo;s audit trail is append-only '
        'at the database level.'),
       ('How are SLA clocks calculated?',
        'In working days &mdash; deadlines reflect the calendar the operation '
        'actually runs on, with a CRS calculator in the browser.')])

SMALL = {
 '/work/skaame': dict(
  tag='A press kit has to carry more than facts. It needs to carry tone.',
  ov='Built the artist web EPK for Skaame and cut the promo film to the music '
     'instead of a generic edit template.'),
 '/work/layo-isaac': dict(
  tag='The EPK had to be scannable without becoming bland. Image, story and '
      'credentials had to land quickly.',
  ov='Built a 12-page press-ready artist EPK designed around the decision a '
     'promoter actually needs to make.'),
 '/work/blvckoreo': dict(
  tag='BlvckOreo is part of the foundation of the practice: music, writing, image, '
      'identity and the discipline of putting work into the world.',
  ov='Self-directed personal brand and EPK work, including the BO dice mark, music '
     'production and release work.'),
 '/work/1ethfp': dict(
  tag='1ETHFP was creative collaboration in a space where community, roadmap and '
      'release rhythm were part of the product.',
  ov='The work lived between culture, community and design rather than inside a '
     'traditional brand brief.'),
 '/work/bedroom-recordings-ii': dict(
  tag='Bedroom Recordings II was made with YE!!OWSOUL. I co-produced the record, '
      'led the creative and designed the physical release.',
  ov='The cassette cover carries the mood. The tracklist carries the sequence. The '
     'release is treated as an object, not just an upload.'),
 '/work/singles-cover-art': dict(
  tag='Return of the Dead, Vpn Visa, Show Me and EPP ME!!! were treated as four '
      'records, not one repeated template.',
  ov='The cover series gives each track its own image language while keeping the '
     'artist world coherent.'),
 '/work/visitor-from-mars': dict(
  tag='Visitor from Mars was the Alien Inc x Blvck Oreo tape, co-produced with The '
      'Beatoven.',
  ov='I held the creative lead, directed the visual world and co-produced the '
     'record. The cover and release materials had to belong to the same universe '
     'as the music.'),
 '/work/gen-sadiq': dict(
  tag='Gen.Sadiq came for the full visual package for Maradonna: cover, promo film '
      'and lyric video.',
  ov='The cover was built from the song itself, then the motion pieces were cut to '
     'the beat. The package was signed off in the first round.'),
 '/work/tbogd': dict(
  tag='This was a fundamentals course built from scratch: curriculum, deck and '
      'facilitation material.',
  ov='The training itself uses the principles it teaches &mdash; grid, type, '
     'hierarchy, composition &mdash; so the material is not just information about '
     'design. It is designed to demonstrate it.'),
}

for route, c in BIG.items():
    rrep(route, r'(class="ch-tag">)[^<]*', lambda m: m.group(1) + c['tag'])
    rrep(route, r'(class="ch-card"><h3>)[^<]*', lambda m: m.group(1) + c['h3'], count=1)
    rrep(route, r'(<span class="svc-k">OVERVIEW</span>\s*<p>)[^<]*',
         lambda m: m.group(1) + c['ov'])
    rrep(route, r'(data-cs="result".*?<h3>[^<]*</h3>\s*<p class="b">)[^<]*',
         lambda m: m.group(1) + c['res'])
    faqs = re.findall(r'<summary>(.*?)</summary>', H[block(route)[0]:block(route)[1]], flags=re.S)
    for old_q, (new_q, new_a) in zip(faqs, c['faqs']):
        rrep(route, r'(<summary>)' + esc_q(old_q) + r'(</summary>)',
             lambda m, q=new_q: m.group(1) + q + m.group(2))
        if new_a:
            rrep(route, r'(<summary>' + esc_q(new_q) + r'</summary>\s*<p class="b">)[^<]*',
                 lambda m, a=new_a: m.group(1) + a)

for route, c in SMALL.items():
    rrep(route, r'(class="ch-tag">)[^<]*', lambda m: m.group(1) + c['tag'])
    rrep(route, r'(<span class="svc-k">OVERVIEW</span>\s*<p>)[^<]*',
         lambda m: m.group(1) + c['ov'])

# ============================================================ WRITE + REPORT
if MISSES:
    print('MISSES (%d):' % len(MISSES))
    for m in MISSES:
        print('  ', m)
print('applied:', FIRED, 'replacement groups')
open(PATH, 'w', encoding='utf-8').write(H)
print('written:', PATH, '- changed' if H != ORIG else '- UNCHANGED')
