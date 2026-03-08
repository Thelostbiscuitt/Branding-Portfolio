"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ALL_SKILLS } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="py-32 border-b border-rule" aria-label="About Michael">
      <div className="max-w-[1280px] mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_1fr] gap-16 items-start">

          {/* Section number */}
          <RevealOnScroll>
            <div className="font-mono text-[0.7rem] tracking-[0.1em] text-mid pt-1">
              <span className="block font-sans font-light text-[2rem] text-rule leading-none mb-1">01</span>
              About
            </div>
          </RevealOnScroll>

          {/* ID card */}
          <RevealOnScroll delay={0.1}>
            <div className="border border-rule overflow-hidden">
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image
                  src="/photo.jpg"
                  alt="Michael Oguntimehin"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  style={{ objectPosition: "center 8%" }}
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-terra" />
              </div>
              <div className="p-4">
                {[
                  { k: "Name",    v: "Michael Oguntimehin", accent: false },
                  { k: "Base",    v: "Lagos, NG",           accent: true  },
                  { k: "Primary", v: "Creative Director",   accent: false },
                  { k: "Also",    v: "Builds what he designs", accent: false },
                  { k: "Status",  v: "Open to work",        accent: true  },
                ].map(({ k, v, accent }) => (
                  <div key={k} className="flex justify-between border-b border-rule py-2 last:border-b-0">
                    <span className="font-mono text-[0.62rem] text-mid">{k}</span>
                    <span className={`font-mono text-[0.62rem] font-medium text-right ${accent ? "text-terra" : "text-ink"}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Bio */}
          <div>
            <RevealOnScroll delay={0.15}>
              <h2 className="font-sans font-black text-[clamp(1.8rem,3.5vw,3rem)] tracking-[-0.03em] leading-[1.1] mb-7">
                Designer first.<br />
                <em className="italic font-normal text-terra">Builder always.</em>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="space-y-5 mb-6">
                <p className="font-serif text-[1rem] leading-[1.8] text-mid">
                  I&apos;m <strong className="text-ink font-semibold">Michael Oguntimehin</strong> — a creative director and visual designer based in Lagos. My work spans brand identity, art direction, music packaging, and digital design for brands that want to stand out and stay consistent.
                </p>

                <blockquote className="pl-6 border-l-2 border-terra my-6">
                  <p className="font-serif italic text-[1.15rem] leading-[1.7] text-ink">
                    Design is the primary work. The ability to build it is just what makes the design real.
                  </p>
                </blockquote>

                <p className="font-serif text-[1rem] leading-[1.8] text-mid">
                  What makes the work different: I build it too. Landing pages, web apps, knowledge bases, custom tools — <strong className="text-ink font-semibold">designed by me, shipped by me.</strong> No handoff, no translation loss between vision and execution. Clients like Leadway Pensure get the full picture without assembling a team.
                </p>

                <p className="font-serif text-[1rem] leading-[1.8] text-mid">
                  Based in Lagos, working globally. If you need a brand that holds up across every surface — print, screen, and everything in between — let&apos;s talk.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="mb-3">
                <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-mid">
                  Design — <span className="text-terra">primary</span>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  Build — execution layer
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {ALL_SKILLS.map((s) => (
                  <motion.span
                    key={s.label}
                    className={`font-mono text-[0.62rem] tracking-[0.06em] uppercase px-3 py-1.5 border transition-all duration-200 ${
                      s.terra
                        ? "border-terra/30 text-terra hover:bg-terra hover:text-white hover:border-terra"
                        : "border-rule text-mid hover:border-ink hover:text-ink"
                    }`}
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.15 }}
                  >
                    {s.label}
                  </motion.span>
                ))}
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
