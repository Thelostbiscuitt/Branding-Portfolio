import Nav          from '@/components/Nav/Nav'
import Hero         from '@/components/Hero/Hero'
import Stats        from '@/components/Stats/Stats'
import Ticker       from '@/components/Ticker/Ticker'
import Work         from '@/components/Work/Work'
import Testimonial  from '@/components/Testimonial/Testimonial'
import Capabilities from '@/components/Capabilities/Capabilities'
import Systems      from '@/components/Systems/Systems'
import Career       from '@/components/Career/Career'
import Lab          from '@/components/Lab/Lab'
import About        from '@/components/About/About'
import Contact      from '@/components/Contact/Contact'
import Footer       from '@/components/Footer/Footer'

/* Narrative order: who I am (hero) → what I make (work) → how I think
   (systems) → why I'm different (career) → what I'm building (lab) → who I am
   now (about) → how to reach me (contact). Testimonial sits right after the
   work so the proof follows the portfolio. */
export default function HomePage() {
  return (
    <>
      <a href="#home" className="skip-link">Skip to content</a>
      <main id="main">
        <Nav />
        <Hero />
        <Stats />
        <Ticker />
        <Work />
        <Testimonial />
        <Capabilities />
        <Systems />
        <Career />
        <Lab />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
