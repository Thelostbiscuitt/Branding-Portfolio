import { Navbar }        from "@/components/layout/Navbar";
import { Footer }        from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ScrollToTop }   from "@/components/layout/ScrollToTop";
import { SectionDots }   from "@/components/layout/SectionDots";
import { Hero }          from "@/components/sections/Hero";
import { About }         from "@/components/sections/About";
import { Projects }      from "@/components/sections/Projects";
import { Contact }       from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SectionDots />
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
