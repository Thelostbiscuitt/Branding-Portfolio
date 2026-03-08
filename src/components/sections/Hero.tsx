"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/utils";
import { DISCIPLINES } from "@/lib/data";

const DISC_DOUBLED = [...DISCIPLINES, ...DISCIPLINES];

export function Hero() {
  return (
    <section id="home" aria-label="Hero" className="min-h-screen flex flex-col justify-between lg:justify-end border-b border-rule relative overflow-hidden">

      {/* Subtle ambient gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 100% 0%, rgba(200,68,26,0.04) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 0% 100%, rgba(200,68,26,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex items-center justify-between px-8 lg:px-12 pt-24 lg:pt-28 pb-0"
        >
          <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-mid flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-terra animate-blink" />
            Lagos, Nigeria
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-mid">
            Status — <em className="not-italic text-terra">Available for work</em>
          </span>
        </motion.div>

        {/* Main grid: headline + role card */}
        <div className="flex-1 flex items-center lg:items-end">
          <div className="w-full px-8 lg:px-12 pt-6 lg:pt-10 pb-0 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-end">

            {/* Headline */}
            <div>
              <div aria-label="Creative Director & Developer" className="overflow-hidden">
                {["Creative", "Director", "+ Builder"].map((word, i) => (
                  <div key={word} className="overflow-hidden" style={{ lineHeight: 0.88 }}>
                    <motion.span
                      className={`block font-sans font-black tracking-[-0.04em] ${
                        i === 1 ? "text-terra" : i === 2 ? "text-transparent" : "text-ink"
                      }`}
                      style={{
                        fontSize: "clamp(3.5rem, 10.5vw, 11rem)",
                        WebkitTextStroke: i === 2 ? "1.5px var(--ink)" : undefined,
                      }}
                      initial={{ y: "105%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {word}
                    </motion.span>
                  </div>
                ))}
              </div>
            </div>

            {/* Role card — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="hidden lg:block pb-1"
            >
              <div className="border border-rule p-7 flex flex-col gap-5 bg-bg">
                {/* Photo - Using Next.js Image for optimization */}
                <div className="w-full overflow-hidden relative" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src="/photo.jpg"
                    alt="Michael Oguntimehin"
                    fill
                    quality={90}
                    className="object-cover"
                    style={{ objectPosition: "center 15%" }}
                    sizes="(max-width: 1024px) 0px, 380px"
                    priority
                  />
                </div>
                <p className="font-serif italic text-[0.95rem] leading-[1.7] text-mid">
                  <strong className="not-italic text-ink font-semibold">Michael Oguntimehin</strong>{" "}
                  — creative director and visual designer from Lagos. Designs brands, ships the work. No team required.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Brand Identity", "Art Direction", "Music Packaging", "Builds it too"].map((t) => (
                    <span key={t} className="font-mono text-[0.6rem] tracking-[0.06em] uppercase border border-rule text-mid px-3 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats + scroll row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex items-center justify-between px-8 lg:px-12 py-6 lg:py-8 mt-6 lg:mt-10 border-t border-rule"
        >
          <div className="flex gap-12 flex-wrap">
            {[
              { n: "5+", l: "Years active" },
              { n: "30+", l: "Projects delivered" },
              { n: "12+", l: "Brands shaped" },
            ].map(({ n, l }) => (
              <div key={l}>
                <div className="font-sans font-black text-[2rem] tracking-[-0.03em] text-ink leading-none">{n}</div>
                <div className="font-mono text-[0.6rem] tracking-[0.1em] uppercase text-mid mt-1">{l}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("about")}
            aria-label="Scroll to About"
            className="flex items-center gap-3 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-mid bg-transparent border-none hover:text-ink transition-colors"
          >
            <div className="relative w-px h-12 bg-rule overflow-hidden">
              <span className="absolute left-0 w-px h-4 bg-gradient-to-b from-transparent via-terra to-transparent animate-travel-down" />
            </div>
            <span>Scroll</span>
          </button>
        </motion.div>
      </div>

      {/* Discipline strip */}
      <div className="border-t border-rule overflow-hidden bg-bg" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          {DISC_DOUBLED.map((d, i) => (
            <span
              key={i}
              className="font-sans font-bold text-[0.8rem] tracking-[0.04em] uppercase text-mid px-10 py-4 border-r border-rule whitespace-nowrap flex items-center gap-4"
            >
              <span className="text-terra text-[0.4rem]">◆</span>
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
