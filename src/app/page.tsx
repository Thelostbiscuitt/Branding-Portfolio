import Nav     from '@/components/Nav/Nav'
import Hero    from '@/components/Hero/Hero'
import Stats   from '@/components/Stats/Stats'
import Ticker  from '@/components/Ticker/Ticker'
import Work    from '@/components/Work/Work'
import Testimonial from '@/components/Testimonial/Testimonial'
import About   from '@/components/About/About'
import Contact from '@/components/Contact/Contact'
import Footer  from '@/components/Footer/Footer'

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
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
