"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PROJECTS, FILTERS, type FilterType } from "@/lib/data";

export function Projects() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  return (
    <section id="projects" className="py-32 border-b border-rule" aria-label="Projects">
      <div className="max-w-[1280px] mx-auto px-12">

        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_auto] gap-8 items-end mb-14">
          <RevealOnScroll>
            <div className="font-mono text-[0.7rem] tracking-[0.1em] text-mid pt-1">
              <span className="block font-sans font-light text-[2rem] text-rule leading-none mb-1">02</span>
              Work
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="font-sans font-black text-[clamp(1.8rem,3.5vw,3rem)] tracking-[-0.03em] leading-[1.1]">
              Selected<br />
              <em className="italic font-normal text-terra">Projects.</em>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-mono text-[0.62rem] tracking-[0.06em] uppercase px-4 py-2 border transition-all duration-200 ${
                    filter === f
                      ? "bg-ink text-bg border-ink"
                      : "bg-transparent border-rule text-mid hover:border-ink hover:text-ink"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* Project list */}
        <div className="flex flex-col">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const isInternal = project.url.startsWith("/projects/");
              const RowContent = (
                <>
                  {/* Number */}
                  <div className="font-mono text-[0.65rem] tracking-[0.1em] text-mid hidden sm:flex items-center gap-4">
                    <span className="flex-1 h-px bg-rule" />
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-terra mb-1.5">
                      {project.cat}
                    </div>
                    <h3 className="font-sans font-bold text-[1.1rem] tracking-[-0.02em] text-ink group-hover:text-terra transition-colors duration-200 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[0.55rem] tracking-[0.04em] uppercase text-mid bg-rule px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex items-center">
                    {project.url !== "#" ? (
                      <ArrowUpRight className="w-4 h-4 text-mid group-hover:text-terra transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    ) : (
                      <span className="font-mono text-[0.62rem] tracking-[0.08em] uppercase text-rule whitespace-nowrap">
                        Soon
                      </span>
                    )}
                  </div>
                </>
              );

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  {project.url !== "#" ? (
                    isInternal ? (
                      <Link
                        href={project.url}
                        className="group grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-6 items-center py-7 border-t border-rule last:border-b hover:bg-card transition-colors duration-200 px-0 hover:px-4 -mx-0 hover:-mx-4 no-underline"
                        style={{ transition: "background 0.2s, padding 0.25s, margin 0.25s" }}
                      >
                        {RowContent}
                      </Link>
                    ) : (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-6 items-center py-7 border-t border-rule last:border-b hover:bg-card transition-colors duration-200 px-0 hover:px-4 -mx-0 hover:-mx-4 no-underline"
                        style={{ transition: "background 0.2s, padding 0.25s, margin 0.25s" }}
                      >
                        {RowContent}
                      </a>
                    )
                  ) : (
                    <div
                      className="group grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-6 items-center py-7 border-t border-rule last:border-b px-0 opacity-50"
                    >
                      {RowContent}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Behance CTA */}
        <RevealOnScroll className="pt-12 text-center">
          <a
            href="https://www.behance.net/BlvckOreo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.08em] uppercase bg-ink text-bg px-8 py-4 hover:bg-terra transition-colors no-underline"
          >
            View full archive on Behance
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
}
