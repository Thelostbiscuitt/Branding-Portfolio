import Nav     from '@/components/Nav/Nav'
import Hero    from '@/components/Hero/Hero'
import Stats   from '@/components/Stats/Stats'
import Ticker  from '@/components/Ticker/Ticker'
import Work    from '@/components/Work/Work'
import About   from '@/components/About/About'
import Contact from '@/components/Contact/Contact'
import Footer  from '@/components/Footer/Footer'

export default function HomePage() {
  return (
    <main id="main">
      <Nav />
      <Hero />
      <Stats />
      <Ticker />
      <Work />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
