import Nav         from '@/components/Nav/Nav'
import Hero        from '@/components/Hero/Hero'
import Position    from '@/components/Position/Position'
import Work        from '@/components/Work/Work'
import Testimonial from '@/components/Testimonial/Testimonial'
import Range       from '@/components/Range/Range'
import HowIWork    from '@/components/HowIWork/HowIWork'
import Story       from '@/components/Story/Story'
import About       from '@/components/About/About'
import Contact     from '@/components/Contact/Contact'
import Footer      from '@/components/Footer/Footer'

/* The homepage is a publication with chapters:

     Opening     — Who is this?
     Position    — What does designer-builder-operator mean?
     Work        — Can you actually do it?
     Range       — How broad is the practice?
     How I work  — Why is the combination interesting?
     About       — Who is the person behind it?
     Contact     — What should I do next?

   Every section answers one question. Nothing decorative. */
export default function HomePage() {
  return (
    <>
      <a href="#home" className="skip-link">Skip to content</a>
      <main id="main">
        <Nav />
        <Hero />
        <Position />
        <Work />
        <Testimonial />
        <Range />
        <HowIWork />
        <Story />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
