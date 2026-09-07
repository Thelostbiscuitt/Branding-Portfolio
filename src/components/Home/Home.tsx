import type * as React from 'react'

/* Habibcore — the homepage, ported from the 2026 index.html design.
   Warm paper / ink / rust. Fraunces / Archivo / Space Mono.
   Interaction engine lives in public/engine.js. */
export default function Home() {
  return (
    <>

<a className="skip-link" href="#work">Skip to work</a>

{/* paper grain  */}
<div className="grain" aria-hidden="true"></div>
{/* scroll progress  */}
<div className="progress" aria-hidden="true"></div>
{/* crop marks  */}
<div className="cropmarks" aria-hidden="true"><b></b><b></b><b></b><b></b></div>
{/* running folio  */}
<div className="folio" aria-hidden="true">SECTION <b>00 — COVER</b></div>

{/* preloader — multilingual greeting: Lagos → Nigeria → World */}
<div className="preloader" aria-hidden="true">
  <div className="pl-top">
    <span>HABIBCORE® — PORTFOLIO, 2026</span>
    <span>6°27′N, 3°24′E — LAGOS, NG</span>
  </div>
  <div className="pl-greet"><b className="pl-word">Hello</b></div>
  <p className="pl-lang"><b>01 — ENGLISH · LAGOS</b></p>
  <div className="pl-bar"></div>
</div>

{/* custom cursor  */}
<div className="cursor-dot" aria-hidden="true"></div>
<div className="cursor-ring" aria-hidden="true"><span className="cursor-tag">VIEW ↗</span></div>

{/* nav  */}
<header className="nav">
  <div className="nav-inner">
    <a href="#top" className="brand" aria-label="Habib — back to top">Habib<b>.</b></a>
    <nav className="nav-links" aria-label="Primary">
      <a href="#work">WORK</a>
      <a href="#about">ABOUT</a>
      <a href="#contact">CONTACT</a>
    </nav>
    <div className="nav-right">
      <span className="nav-clock"><span className="dot-live"></span><span data-clock>00:00:00 WAT</span></span>
      <a href="#contact" className="btn-solid magnetic">START A PROJECT</a>
      <button type="button" className="menu-btn" aria-expanded="false" aria-controls="mmenu" aria-label="Toggle menu"><i></i><i></i></button>
    </div>
  </div>
</header>

{/* mobile menu  */}
<div className="mobile-menu" id="mmenu">
  <a className="mm-link" style={{ '--d': '120ms' } as React.CSSProperties} href="#work">Work<span>01</span></a>
  <a className="mm-link" style={{ '--d': '200ms' } as React.CSSProperties} href="#about">About<span>07</span></a>
  <a className="mm-link" style={{ '--d': '280ms' } as React.CSSProperties} href="#contact">Contact<span>08</span></a>
  <p className="mm-foot">HABIB@HABIBCORE.COM — LAGOS, NG</p>
</div>

<main id="top">

  {/* ————— hero —————  */}
  <section className="hero" data-folio="00 — COVER">
    <div className="container">
      <div className="hero-meta rv" style={{ '--d': '60ms' } as React.CSSProperties}>
        <span>HABIBCORE® — PORTFOLIO, 2026</span>
        <span className="hm-right">6°27′N, 3°24′E — LAGOS, NG</span>
      </div>

      <div className="hero-grid">
        <h1 aria-label="I design it. I build it. I answer for it.">
          <span className="lm"><span>I design it.</span></span><br />
          <span className="lm"><span>I <em>build</em> it.</span></span><br />
          <span className="lm"><span>I answer for it.</span></span>
        </h1>

        <div className="hero-aside">
          <div className="stamp-wrap" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="stamp-rot" style={{ width: '100%', height: '100%', color: 'var(--rust)' } as React.CSSProperties}>
              <defs><path id="stampcircle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" fill="none"/></defs>
              <text fontSize="7.4" letterSpacing="1.2" fill="currentColor" fontFamily="Space Mono,monospace">
                <textPath href="#stampcircle" textLength="236">AVAILABLE FOR SELECT PROJECTS • LAGOS •</textPath>
              </text>
            </svg>
            <svg viewBox="0 0 100 100" className="stamp-arrow" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', color: 'var(--rust)' } as React.CSSProperties}>
              <path d="M50 42 v16 m0 0 l-6 -6 m6 6 l6 -6" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="square"/>
            </svg>
          </div>
          <p className="rv" style={{ '--d': '480ms' } as React.CSSProperties}>Brands, digital products and AI tools — drawn, coded and shipped by the same pair of hands in Lagos. No handoff, no translation loss between vision and execution.</p>
          <div className="hero-ctas rv" style={{ '--d': '620ms' } as React.CSSProperties}>
            <a href="#work" className="btn btn-ink magnetic"><span>VIEW SELECTED WORK ↓</span></a>
            <a href="#contact" className="btn btn-line magnetic"><span>START A PROJECT</span></a>
          </div>
        </div>
      </div>

      <div className="facts" data-stagger="90">
        <div className="rv"><p className="fk">DISCIPLINES</p><p className="fv">Design → Build</p></div>
        <div className="rv"><p className="fk">CURRENTLY</p><p className="fv">Biscuit AI · Relay</p></div>
        <div className="rv"><p className="fk">SINCE</p><p className="fv">2020 — five years deep</p></div>
        <div className="rv"><p className="fk">STATUS</p><p className="fv">Taking select projects</p></div>
      </div>
    </div>

    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-row"><span>BRAND IDENTITY</span><i>◆</i><span>PRODUCT DESIGN</span><i>◆</i><span>SOFTWARE</span><i>◆</i><span>AI SYSTEMS</span><i>◆</i><span>AUTOMATION</span><i>◆</i><span>CREATIVE DIRECTION</span><i>◆</i><span>GRAPHIC DESIGN</span><i>◆</i><span>TRAINING</span><i>◆</i></div>
        <div className="marquee-row"><span>BRAND IDENTITY</span><i>◆</i><span>PRODUCT DESIGN</span><i>◆</i><span>SOFTWARE</span><i>◆</i><span>AI SYSTEMS</span><i>◆</i><span>AUTOMATION</span><i>◆</i><span>CREATIVE DIRECTION</span><i>◆</i><span>GRAPHIC DESIGN</span><i>◆</i><span>TRAINING</span><i>◆</i></div>
      </div>
    </div>
  </section>

  {/* ————— 01 position —————  */}
  <section className="block" data-folio="01 — POSITION">
    <div className="container">
      <div className="sec-head">
        <p><span className="sh-idx">01</span> / POSITION</p>
        <p className="sh-note">WHAT I ACTUALLY DO</p>
      </div>
      <div className="pos-grid">
        <h2 className="h-display skewable rv">One person, moving between <em>disciplines</em>.</h2>
        <p className="pos-copy rv" style={{ '--d': '120ms' } as React.CSSProperties}>Most projects lose something in translation — designer to engineer, vision to build. These don&rsquo;t. The person who draws the interface is the person who ships it, and the person you brief is the person who answers when something breaks at 2am.</p>
      </div>
      <div className="pos-lists" data-stagger="100">
        <div className="rv">
          <p className="pos-label">I DESIGN</p>
          <ul>
            <li><span className="row-link"><span className="it">Brand identity &amp; art direction</span><span className="ar">→</span></span></li>
            <li><span className="row-link"><span className="it">Digital products &amp; interfaces</span><span className="ar">→</span></span></li>
            <li><span className="row-link"><span className="it">Creative direction &amp; campaigns</span><span className="ar">→</span></span></li>
          </ul>
        </div>
        <div className="rv" style={{ '--d': '120ms' } as React.CSSProperties}>
          <p className="pos-label">I BUILD</p>
          <ul>
            <li><span className="row-link"><span className="it">Web apps &amp; production sites</span><span className="ar">→</span></span></li>
            <li><span className="row-link"><span className="it">AI systems &amp; assistants</span><span className="ar">→</span></span></li>
            <li><span className="row-link"><span className="it">Automations &amp; internal tools</span><span className="ar">→</span></span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  {/* ————— 02 work —————  */}
  <section className="block" id="work" data-folio="02 — SELECTED WORK">
    <div className="container">
      <div className="sec-head">
        <p><span className="sh-idx">02</span> / SELECTED WORK</p>
        <p className="sh-note">2023 — 2026</p>
      </div>
      <div className="work-intro">
        <h2 className="h-display skewable rv">Selected <em>work</em>.</h2>
        <a className="archive rv" style={{ '--d': '100ms' } as React.CSSProperties} href="mailto:habib@habibcore.com?subject=Full%20archive%20request"><span className="u-line">GET THE FULL ARCHIVE ↗</span></a>
      </div>

      <div className="rv">
        {/* 01  */}
        <article className="p-row open" data-idx="01" data-cap="BISCUIT AI — AI · PRODUCT">
          <div className="p-wipe" aria-hidden="true"></div>
          <button type="button" className="p-btn" aria-expanded="true" aria-controls="project-01">
            <span className="p-idx">01</span>
            <span>
              <span className="p-title">Biscuit AI — Telegram Assistant</span>
              <span className="p-kmeta-m">AI · PRODUCT — 2025</span>
            </span>
            <span className="p-kmeta"><span className="p-kind">AI · PRODUCT</span><span className="p-year">2025</span><span className="p-plus" aria-hidden="true">+</span></span>
          </button>
          <div className="p-panel" id="project-01" role="region" aria-label="Biscuit AI details">
            <div>
              <div className="p-panel-inner">
                <div>
                  <figure className="p-fig img-reveal"><img src="/generated/biscuit-chat.webp" alt="Biscuit AI — Telegram assistant conversation" loading="lazy" /></figure>
                  <p className="p-figcap">FIG. 01 — AI · PRODUCT</p>
                </div>
                <div className="p-body">
                  <p className="p-blurb">Memory you can inspect and erase — not just a chat.</p>
                  <p className="p-desc">A production-ready Telegram assistant built on OpenRouter. Layered memory you can inspect and erase, Tavily web search, a local book library, image generation and cost visibility — all inside one conversation.</p>
                  <div className="p-tags"><span>PYTHON</span><span>OPENROUTER</span><span>TELEGRAM</span><span>MEMORY SYSTEMS</span><span>TAVILY</span></div>
                  <div className="p-actions">
                    <a className="a-live" href="https://github.com/Thelostbiscuitt/BiscuitBot" target="_blank" rel="noopener noreferrer"><span className="u-line">VIEW LIVE ↗</span></a>
                    <a className="a-dis" href="mailto:habib@habibcore.com?subject=Re%3A%20Biscuit%20AI%20%E2%80%94%20Telegram%20Assistant"><span className="u-line">DISCUSS THIS PROJECT →</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* 02  */}
        <article className="p-row" data-idx="02" data-cap="CHEF4ME — CONSUMER · AI">
          <div className="p-wipe" aria-hidden="true"></div>
          <button type="button" className="p-btn" aria-expanded="false" aria-controls="project-02">
            <span className="p-idx">02</span>
            <span>
              <span className="p-title">Chef4Me — Kitchen Assistant</span>
              <span className="p-kmeta-m">CONSUMER · AI — 2025</span>
            </span>
            <span className="p-kmeta"><span className="p-kind">CONSUMER · AI</span><span className="p-year">2025</span><span className="p-plus" aria-hidden="true">+</span></span>
          </button>
          <div className="p-panel" id="project-02" role="region" aria-label="Chef4Me details">
            <div>
              <div className="p-panel-inner">
                <div>
                  <figure className="p-fig img-reveal"><img src="/generated/chef4me.webp" alt="Chef4Me — kitchen assistant" loading="lazy" /></figure>
                  <p className="p-figcap">FIG. 02 — CONSUMER · AI</p>
                </div>
                <div className="p-body">
                  <p className="p-blurb">Your kitchen, inventoried and suggested in one conversation.</p>
                  <p className="p-desc">An AI kitchen assistant for Telegram. Tracks ingredients and expiry dates, then suggests meals from over forty cuisines via Google Gemini — all through plain chat commands. No forms, no dashboards, just conversation.</p>
                  <div className="p-tags"><span>GEMINI</span><span>TELEGRAM</span><span>INVENTORY</span><span>UX DESIGN</span></div>
                  <div className="p-actions">
                    <a className="a-dis" href="mailto:habib@habibcore.com?subject=Re%3A%20Chef4Me%20%E2%80%94%20Kitchen%20Assistant"><span className="u-line">DISCUSS THIS PROJECT →</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* 03  */}
        <article className="p-row" data-idx="03" data-cap="LEADWAY PENSURE — BRAND · SYSTEMS">
          <div className="p-wipe" aria-hidden="true"></div>
          <button type="button" className="p-btn" aria-expanded="false" aria-controls="project-03">
            <span className="p-idx">03</span>
            <span>
              <span className="p-title">Leadway Pensure — Brand &amp; Comms</span>
              <span className="p-kmeta-m">BRAND · SYSTEMS — 2024–26</span>
            </span>
            <span className="p-kmeta"><span className="p-kind">BRAND · SYSTEMS</span><span className="p-year">2024–26</span><span className="p-plus" aria-hidden="true">+</span></span>
          </button>
          <div className="p-panel" id="project-03" role="region" aria-label="Leadway Pensure details">
            <div>
              <div className="p-panel-inner">
                <div>
                  <figure className="p-fig img-reveal"><img src="/generated/leadway.webp" alt="Leadway Pensure — brand and communications" loading="lazy" /></figure>
                  <p className="p-figcap">FIG. 03 — BRAND · SYSTEMS</p>
                </div>
                <div className="p-body">
                  <p className="p-blurb">An unprompted pitch, delivered as a live web document.</p>
                  <p className="p-desc">A self-initiated brand extension pitch for one of Nigeria&rsquo;s largest pension funds: product redesigns, identity guidelines, social systems and brand voice — built on four years of operational experience inside the organisation.</p>
                  <div className="p-tags"><span>BRAND</span><span>IDENTITY</span><span>PRODUCT DESIGN</span><span>SOCIAL SYSTEM</span><span>VIDEO</span></div>
                  <div className="p-actions">
                    <a className="a-dis" href="mailto:habib@habibcore.com?subject=Re%3A%20Leadway%20Pensure%20%E2%80%94%20Brand%20%26%20Comms"><span className="u-line">DISCUSS THIS PROJECT →</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* 04  */}
        <article className="p-row" data-idx="04" data-cap="OLUMAYOWA — CLIENT · WEB">
          <div className="p-wipe" aria-hidden="true"></div>
          <button type="button" className="p-btn" aria-expanded="false" aria-controls="project-04">
            <span className="p-idx">04</span>
            <span>
              <span className="p-title">Olumayowa Nursing Home — Healthcare Site</span>
              <span className="p-kmeta-m">CLIENT · WEB — 2025</span>
            </span>
            <span className="p-kmeta"><span className="p-kind">CLIENT · WEB</span><span className="p-year">2025</span><span className="p-plus" aria-hidden="true">+</span></span>
          </button>
          <div className="p-panel" id="project-04" role="region" aria-label="Olumayowa Nursing Home details">
            <div>
              <div className="p-panel-inner">
                <div>
                  <figure className="p-fig img-reveal"><img src="/generated/olumayowa.webp" alt="Olumayowa Nursing Home website" loading="lazy" /></figure>
                  <p className="p-figcap">FIG. 04 — CLIENT · WEB</p>
                </div>
                <div className="p-body">
                  <p className="p-blurb">A patient can scan the whole practice in seconds.</p>
                  <p className="p-desc">A local healthcare provider&rsquo;s website: six services, full licensing credentials and every way to reach them, arranged on one page a patient can scan in seconds. Designed, built and shipped end to end.</p>
                  <div className="p-tags"><span>WEB DESIGN</span><span>DEVELOPMENT</span><span>HEALTHCARE</span><span>LOCAL BUSINESS</span></div>
                  <div className="p-actions">
                    <a className="a-live" href="https://olumayowanursinghome.com" target="_blank" rel="noopener noreferrer"><span className="u-line">VIEW LIVE ↗</span></a>
                    <a className="a-dis" href="mailto:habib@habibcore.com?subject=Re%3A%20Olumayowa%20Nursing%20Home"><span className="u-line">DISCUSS THIS PROJECT →</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* 05  */}
        <article className="p-row" data-idx="05" data-cap="AI IN THE WORKPLACE — OPS · TRAINING">
          <div className="p-wipe" aria-hidden="true"></div>
          <button type="button" className="p-btn" aria-expanded="false" aria-controls="project-05">
            <span className="p-idx">05</span>
            <span>
              <span className="p-title">AI in the Workplace — Employee Training</span>
              <span className="p-kmeta-m">OPS · TRAINING — 2025</span>
            </span>
            <span className="p-kmeta"><span className="p-kind">OPS · TRAINING</span><span className="p-year">2025</span><span className="p-plus" aria-hidden="true">+</span></span>
          </button>
          <div className="p-panel" id="project-05" role="region" aria-label="AI in the Workplace details">
            <div>
              <div className="p-panel-inner">
                <div>
                  <figure className="p-fig img-reveal"><img src="/generated/ai-training.webp" alt="AI in the Workplace training hub" loading="lazy" /></figure>
                  <p className="p-figcap">FIG. 05 — OPS · TRAINING</p>
                </div>
                <div className="p-body">
                  <p className="p-blurb">Eleven modules, ninety minutes, one link.</p>
                  <p className="p-desc">A company-wide AI literacy programme for Birdview Travels &amp; Tours: eleven modules delivered in one 90-minute session, with a self-built web hub carrying the curriculum, slides and flashcards on a single link.</p>
                  <div className="p-tags"><span>CURRICULUM DESIGN</span><span>FACILITATION</span><span>WEB HUB</span><span>AI LITERACY</span></div>
                  <div className="p-actions">
                    <a className="a-dis" href="mailto:habib@habibcore.com?subject=Re%3A%20AI%20in%20the%20Workplace"><span className="u-line">DISCUSS THIS PROJECT →</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* 06  */}
        <article className="p-row" data-idx="06" data-cap="RELAY — PRODUCT · SYSTEMS">
          <div className="p-wipe" aria-hidden="true"></div>
          <button type="button" className="p-btn" aria-expanded="false" aria-controls="project-06">
            <span className="p-idx">06</span>
            <span>
              <span className="p-title">Relay — Operations Portal</span>
              <span className="p-kmeta-m">PRODUCT · SYSTEMS — 2024</span>
            </span>
            <span className="p-kmeta"><span className="p-kind">PRODUCT · SYSTEMS</span><span className="p-year">2024</span><span className="p-plus" aria-hidden="true">+</span></span>
          </button>
          <div className="p-panel" id="project-06" role="region" aria-label="Relay details">
            <div>
              <div className="p-panel-inner">
                <div>
                  <figure className="p-fig img-reveal"><img src="/generated/relay.svg" alt="Relay operations portal diagram" loading="lazy" /></figure>
                  <p className="p-figcap">FIG. 06 — PRODUCT · SYSTEMS</p>
                </div>
                <div className="p-body">
                  <p className="p-blurb">An audit trail the database itself enforces.</p>
                  <p className="p-desc">A complete operations rebuild for an immigration firm&rsquo;s relationship managers: role-scoped data, an append-only audit trail enforced at the database level, working-days SLA clocks and an in-browser CRS calculator.</p>
                  <div className="p-tags"><span>NEXT.JS</span><span>CRM</span><span>RBAC</span><span>AUDIT TRAIL</span><span>SLA SYSTEMS</span></div>
                  <div className="p-actions">
                    <a className="a-dis" href="mailto:habib@habibcore.com?subject=Re%3A%20Relay%20%E2%80%94%20Operations%20Portal"><span className="u-line">DISCUSS THIS PROJECT →</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* before software — EPK archive  */}
      <div className="epk-head rv"><span className="rust">—</span> BEFORE THE SOFTWARE <span className="fog">/ BRAND &amp; CREATIVE DIRECTION, 2023–2024</span></div>
      <p className="epk-copy rv" style={{ '--d': '100ms' } as React.CSSProperties}>Before systems and software there was music and image — EPKs, cover art and creative direction for artists. The foundation everything else stands on.</p>
      <div className="epk-grid" data-stagger="90">
        <figure className="rv"><a className="epk-link" href="mailto:habib@habibcore.com?subject=Full%20archive%20request"><div className="epk-frame img-reveal"><img src="/generated/skaame.webp" alt="Skaame artist web EPK" loading="lazy" /></div></a><figcaption><span>Skaame — Artist Web EPK</span><span className="epk-year">2024</span></figcaption></figure>
        <figure className="rv"><a className="epk-link" href="mailto:habib@habibcore.com?subject=Full%20archive%20request"><div className="epk-frame img-reveal"><img src="/generated/layo.webp" alt="Layo Isaac artist EPK" loading="lazy" /></div></a><figcaption><span>Layo Isaac — Artist EPK</span><span className="epk-year">2024</span></figcaption></figure>
        <figure className="rv"><a className="epk-link" href="mailto:habib@habibcore.com?subject=Full%20archive%20request"><div className="epk-frame img-reveal"><img src="/generated/blvckoreo.webp" alt="BlvckOreo personal EPK" loading="lazy" /></div></a><figcaption><span>BlvckOreo — Personal EPK</span><span className="epk-year">2023</span></figcaption></figure>
        <figure className="rv"><a className="epk-link" href="mailto:habib@habibcore.com?subject=Full%20archive%20request"><div className="epk-frame img-reveal"><img src="/generated/1ethfp.webp" alt="1ETHFP creative collaboration" loading="lazy" /></div></a><figcaption><span>1ETHFP — Creative Collaboration</span><span className="epk-year">2023</span></figcaption></figure>
      </div>
    </div>
  </section>

  {/* ————— 03 voices —————  */}
  <section className="block" data-folio="03 — VOICES">
    <div className="container">
      <div className="sec-head">
        <p><span className="sh-idx">03</span> / VOICES</p>
        <p className="sh-note">CLIENTS &amp; COLLEAGUES</p>
      </div>
      <div className="voices-grid" data-stagger="110">
        <figure className="v-lead rv">
          <blockquote><span className="q">&ldquo;</span>These designs were exactly what I needed. It&rsquo;s rare to be able to describe what I want and have someone actually deliver that.<span className="q">&rdquo;</span></blockquote>
          <figcaption><span className="v-name">SKAAME</span><span className="v-role">— ARTIST</span></figcaption>
        </figure>
        <figure className="rv" style={{ '--d': '110ms' } as React.CSSProperties}>
          <blockquote><span className="q">&ldquo;</span>Michael is a solution thinker — he came into the company and within two months had already thought of effective solutions to optimise our workflow and positioned us to become more AI-inclined.<span className="q">&rdquo;</span></blockquote>
          <figcaption><span className="v-name">ABIDEMI AMODU</span><span className="v-role">— MANAGING DIRECTOR</span></figcaption>
        </figure>
        <figure className="rv" style={{ '--d': '220ms' } as React.CSSProperties}>
          <blockquote><span className="q">&ldquo;</span>As someone who uses AI, it&rsquo;s refreshing to see and hear someone with more insight expand on troubling topics.<span className="q">&rdquo;</span></blockquote>
          <figcaption><span className="v-name">ADEBAYO ADEBANJO</span><span className="v-role">— FINANCE DEPT</span></figcaption>
        </figure>
      </div>
    </div>
  </section>

  {/* ————— 04 how i work —————  */}
  <section className="block" data-folio="04 — HOW I WORK">
    <div className="container">
      <div className="sec-head">
        <p><span className="sh-idx">04</span> / HOW I WORK</p>
        <p className="sh-note">IDEA → SHIP</p>
      </div>
      <h2 className="h-display process-h skewable rv">Designed. Built. <em>Shipped.</em></h2>
      <div className="steps" data-stagger="90">
        <div className="step rv" data-n="01"><p className="st-n">01</p><h3>Idea</h3><p>The problem, seen clearly.</p></div>
        <div className="step rv" data-n="02"><p className="st-n">02</p><h3>Design</h3><p>The interface, the identity, the system.</p></div>
        <div className="step rv" data-n="03"><p className="st-n">03</p><h3>Structure</h3><p>What the user never sees, but always feels.</p></div>
        <div className="step rv" data-n="04"><p className="st-n">04</p><h3>Code</h3><p>Built with the tools the product itself uses.</p></div>
        <div className="step rv" data-n="05"><p className="st-n">05</p><h3>Ship</h3><p>Deployed, running, answerable to one person.</p></div>
      </div>
    </div>
  </section>

  {/* ————— 05 range —————  */}
  <section className="block range" data-folio="05 — RANGE">
    <div className="range-pin">
      <div className="range-sticky">
        <div className="container">
          <div className="sec-head rv">
            <p><span className="sh-idx">05</span> / RANGE</p>
            <p className="sh-note">ONE PRACTICE — SEVEN EXPRESSIONS</p>
          </div>
          <div className="range-stage">
            <p className="range-word" data-i="1"><span className="rw">Design.</span><span className="rm">BRAND · IDENTITY · ART DIRECTION</span></p>
            <p className="range-word" data-i="2"><span className="rw">Product.</span><span className="rm">INTERFACES · WEB APPS · TOOLS</span></p>
            <p className="range-word" data-i="3"><span className="rw">Systems.</span><span className="rm">PROCESS · STRUCTURE · DOCUMENTATION</span></p>
            <p className="range-word" data-i="4"><span className="rw">Automation.</span><span className="rm">WORKFLOWS · PIPELINES · SLAS</span></p>
            <p className="range-word" data-i="5"><span className="rw">AI.</span><span className="rm">ASSISTANTS · LITERACY · INTEGRATION</span></p>
            <p className="range-word" data-i="6"><span className="rw">Software.</span><span className="rm">DESIGNED, BUILT &amp; SHIPPED END TO END</span></p>
            <p className="range-word" data-i="7"><span className="rw"><em>Habibcore.</em></span><span className="rm">ALL OF IT — ONE PAIR OF HANDS</span></p>
          </div>
          <p className="range-foot"><span className="range-count">01 / 07</span>DESIGN → OPERATIONS → AUTOMATION → SYSTEMS → AI → PRODUCT → SOFTWARE</p>
        </div>
      </div>
    </div>
  </section>

  {/* ————— 06 path —————  */}
  <section className="block" data-folio="06 — PATH">
    <div className="container">
      <div className="sec-head">
        <p><span className="sh-idx">06</span> / PATH</p>
        <p className="sh-note">2020 — NOW</p>
      </div>
      <div className="path-wrap">
        <div className="path-line" aria-hidden="true"></div>
        <div className="path-row rv">
          <p className="path-year">2020</p>
          <h3>Habibcore</h3>
          <p className="path-role">DESIGN &amp; CREATIVE DIRECTION</p>
          <p className="path-desc">Identity systems and art direction for artists and businesses. Where the eye got trained.</p>
        </div>
        <div className="path-row rv" style={{ '--d': '90ms' } as React.CSSProperties}>
          <p className="path-year">2022</p>
          <h3>Leadway Pensure</h3>
          <p className="path-role">OPERATIONS &amp; AUTOMATION</p>
          <p className="path-desc">Four years inside one of Nigeria&rsquo;s largest pension funds, building the systems that keep the work moving.</p>
          <p className="path-stat">250+ CLIENTS MANAGED · 18-STAGE PIPELINE · 10,000+ CLIENTS MOVED TO SELF-SERVICE</p>
        </div>
        <div className="path-row rv" style={{ '--d': '180ms' } as React.CSSProperties}>
          <p className="path-year">2026</p>
          <h3>Birdview</h3>
          <p className="path-role">CRM · AI · PROCESS SYSTEMS</p>
          <p className="path-desc">Systems work at Birdview Travels &amp; Tours — role-scoped data, audit trails, SLA clocks, and an eleven-module AI literacy programme for the whole company.</p>
        </div>
        <div className="path-row rv" style={{ '--d': '270ms' } as React.CSSProperties}>
          <p className="path-year">NOW</p>
          <h3>Independent</h3>
          <p className="path-role">PRODUCT · AI · SOFTWARE</p>
          <p className="path-desc">CRM builds, process automation, AI training — and products designed and shipped solo, end to end.</p>
        </div>
      </div>
    </div>
  </section>

  {/* ————— 07 about —————  */}
  <section className="block" id="about" data-folio="07 — ABOUT">
    <div className="container">
      <div className="sec-head">
        <p><span className="sh-idx">07</span> / ABOUT</p>
        <p className="sh-note">THE OPERATOR</p>
      </div>
      <div className="about-grid">
        <figure className="about-fig rv">
          <div className="fig-frame">
            <div className="fig-crop img-reveal">
              <div className="parallax" data-speed="0.055">
                <img src="/generated/portrait.webp" alt="Habib, seated in Lagos sunlight" loading="lazy" />
              </div>
            </div>
          </div>
          <figcaption>FIG. 07 — THE OPERATOR. LAGOS, NATURAL LIGHT.</figcaption>
        </figure>
        <div className="about-body">
          <h2 className="h-display skewable rv" style={{ '--d': '100ms' } as React.CSSProperties}>Designer. Builder. <em>Operator.</em></h2>
          <div className="about-cols rv" style={{ '--d': '160ms' } as React.CSSProperties}>
            <p>Creative director by training, builder by practice. I designed brands and art direction first, then spent four years inside financial-services operations building the automation that keeps the work moving. Each step made the next one possible.</p>
            <p>Today that means product: interfaces, web apps and AI-assisted software — designed by me, shipped by me. One person answerable for the whole thing, from the first sketch to the production logs.</p>
          </div>
          <blockquote className="about-quote rv" style={{ '--d': '220ms' } as React.CSSProperties}>&ldquo;Design is the primary work. The ability to build it is what makes it real.&rdquo;</blockquote>
          <div className="rv" style={{ '--d': '280ms' } as React.CSSProperties}>
            <div className="about-facts" data-stagger="70">
              <div><p className="fk">BASE</p><p className="fv">Lagos, Nigeria — working globally</p></div>
              <div><p className="fk">STATUS</p><p className="fv">Available for select projects</p></div>
              <div><p className="fk">MODE</p><p className="fv">One person. Full stack of one.</p></div>
              <div><p className="fk">FOCUS</p><p className="fv">Brand, product, AI systems</p></div>
            </div>
            <div className="caps" data-stagger="45">
              <span>GRAPHIC DESIGN</span><span>CREATIVE DIRECTION</span><span>PRODUCT DESIGN</span><span>SYSTEMS</span><span>AUTOMATION</span><span>AI INTEGRATION</span><span>TRAINING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* ————— 08 contact —————  */}
  <section className="contact" id="contact" data-folio="08 — CONTACT">
    <div className="container">
      <div className="sec-head">
        <p><span className="sh-idx">08</span> / CONTACT</p>
        <p className="sh-note">RESPONDS WITHIN 24H</p>
      </div>
      <div className="contact-grid">
        <div>
          <h2 className="h-display rv">Let&rsquo;s make <em>something</em>.</h2>
          <p className="c-copy rv" style={{ '--d': '120ms' } as React.CSSProperties}>An idea, a problem, or something that should exist but doesn&rsquo;t yet — bring any of the three.</p>
          <ul className="c-links rv" style={{ '--d': '200ms' } as React.CSSProperties}>
            <li>
              <span className="ck">EMAIL</span>
              <span className="cv">
                <a href="mailto:habib@habibcore.com"><span className="u-line">habib@habibcore.com</span></a>
                <button type="button" className="copy-btn magnetic">COPY</button>
              </span>
            </li>
            <li><span className="ck">WHATSAPP</span><a href="https://wa.me/2347013573240" target="_blank" rel="noopener noreferrer"><span className="u-line">+234 701 357 3240 ↗</span></a></li>
            <li><span className="ck">GITHUB</span><a href="https://github.com/Thelostbiscuitt" target="_blank" rel="noopener noreferrer"><span className="u-line">@Thelostbiscuitt ↗</span></a></li>
            <li><span className="ck">BEHANCE</span><a href="https://www.behance.net/BlvckOreo" target="_blank" rel="noopener noreferrer"><span className="u-line">/BlvckOreo ↗</span></a></li>
            <li><span className="ck">LINKEDIN</span><a href="https://www.linkedin.com/in/michael-oguntimehin-480751398" target="_blank" rel="noopener noreferrer"><span className="u-line">/michael-oguntimehin ↗</span></a></li>
          </ul>
          <p className="c-avail rv" style={{ '--d': '280ms' } as React.CSSProperties}><span className="dot-live"></span>AVAILABLE — OPEN TO BRAND, PRODUCT &amp; DEVELOPMENT WORK</p>
        </div>

        <form className="c-form rv" style={{ '--d': '150ms' } as React.CSSProperties} noValidate>
          <fieldset style={{ border: 0 } as React.CSSProperties}>
            <legend className="f-legend"><span className="fn">01</span> — WHAT ARE YOU BUILDING? <span className="f-opt">(select all that apply)</span></legend>
            <div className="chips">
              <button type="button" className="chip magnetic" data-v="BRAND IDENTITY" aria-pressed="false"><span><i className="tick">✓</i>BRAND IDENTITY</span></button>
              <button type="button" className="chip magnetic" data-v="WEBSITE / APP" aria-pressed="false"><span><i className="tick">✓</i>WEBSITE / APP</span></button>
              <button type="button" className="chip magnetic" data-v="DESIGN SYSTEM" aria-pressed="false"><span><i className="tick">✓</i>DESIGN SYSTEM</span></button>
              <button type="button" className="chip magnetic" data-v="AI / AUTOMATION" aria-pressed="false"><span><i className="tick">✓</i>AI / AUTOMATION</span></button>
              <button type="button" className="chip magnetic" data-v="PRODUCT / SOFTWARE" aria-pressed="false"><span><i className="tick">✓</i>PRODUCT / SOFTWARE</span></button>
              <button type="button" className="chip magnetic" data-v="SOMETHING ELSE" aria-pressed="false"><span><i className="tick">✓</i>SOMETHING ELSE</span></button>
            </div>
          </fieldset>
          <div className="f-row">
            <fieldset style={{ border: 0 } as React.CSSProperties} className="f-field">
              <legend className="f-legend"><span className="fn">02</span> — YOUR NAME</legend>
              <input type="text" id="f-name" placeholder="Ada Lovelace" autoComplete="name" />
              <span className="f-underline"></span>
            </fieldset>
            <fieldset style={{ border: 0 } as React.CSSProperties} className="f-field">
              <legend className="f-legend"><span className="fn">03</span> — EMAIL</legend>
              <input type="email" id="f-email" placeholder="ada@studio.com" autoComplete="email" />
              <span className="f-underline"></span>
            </fieldset>
          </div>
          <div style={{ marginTop: '36px' } as React.CSSProperties} className="f-field">
            <p className="f-legend"><span className="fn">04</span> — BRIEF <span className="f-opt">(optional)</span></p>
            <textarea id="f-brief" rows={4} placeholder="What are we making, and when do you need it?"></textarea>
            <span className="f-underline"></span>
          </div>
          <button type="submit" className="f-submit magnetic"><span>SEND IT <i>→</i></span></button>
          <p className="f-note">OPENS YOUR MAIL APP — USUALLY RESPONDS WITHIN 24H</p>
        </form>
      </div>
    </div>
  </section>
</main>

{/* ————— footer —————  */}
<footer className="footer">
  <div className="container">
    <div className="foot-row">
      <p>© 2026 HABIB — LAGOS, NIGERIA</p>
      <p className="fr-mid">SET IN FRAUNCES, ARCHIVO &amp; SPACE MONO — DESIGNED IN LAGOS</p>
      <div className="foot-right">
        <span className="clock" data-clock>00:00:00 WAT</span>
        <a href="#top"><span className="u-line">BACK TO TOP ↑</span></a>
      </div>
    </div>
  </div>
  <div className="wordmark" aria-hidden="true">
    <p><span style={{ '--d': '0ms' } as React.CSSProperties}>H</span><span style={{ '--d': '45ms' } as React.CSSProperties}>A</span><span style={{ '--d': '90ms' } as React.CSSProperties}>B</span><span style={{ '--d': '135ms' } as React.CSSProperties}>I</span><span style={{ '--d': '180ms' } as React.CSSProperties}>B</span><span style={{ '--d': '225ms' } as React.CSSProperties}>C</span><span style={{ '--d': '270ms' } as React.CSSProperties}>O</span><span style={{ '--d': '315ms' } as React.CSSProperties}>R</span><span style={{ '--d': '360ms' } as React.CSSProperties}>E</span></p>
  </div>
</footer>

{/* toasts  */}
<div className="toasts" aria-live="polite"></div>

{/* cursor-following work preview  */}
<div className="work-preview" aria-hidden="true">
  <div className="wp-frame"><img alt="" /></div>
  <p className="wp-cap"><b></b><span>HABIBCORE®</span></p>
</div>


    </>
  )
}
