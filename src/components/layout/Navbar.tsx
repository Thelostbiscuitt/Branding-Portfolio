"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/utils";
import { LightSwitch } from "@/components/ui/LightSwitch";

const NAV_LINKS = ["Home", "About", "Projects", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (label: string) => {
    scrollToSection(label.toLowerCase());
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-12 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-bg/96 backdrop-blur-md border-b border-rule"
            : "py-7"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
          className="font-sans text-[1.1rem] font-black tracking-[-0.02em] text-ink no-underline"
          aria-label="Michael — back to top"
        >
          Michael<span className="text-terra">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          <ul className="flex gap-10 list-none">
            {NAV_LINKS.map((label) => (
              <li key={label}>
                <button
                  onClick={() => handleNav(label)}
                  className="relative font-mono text-[0.7rem] tracking-[0.06em] uppercase text-mid hover:text-ink transition-colors bg-transparent border-none group"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-terra transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>
          <LightSwitch />
          <button
            onClick={() => scrollToSection("contact")}
            className="font-mono text-[0.7rem] tracking-[0.06em] uppercase bg-ink text-bg px-6 py-2.5 hover:bg-terra transition-colors border-none"
          >
            Hire Me
          </button>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <motion.span className="block w-5 h-px bg-ink origin-center" animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
          <motion.span className="block w-5 h-px bg-ink" animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.3 }} />
          <motion.span className="block w-5 h-px bg-ink origin-center" animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-bg z-[190] flex flex-col items-center justify-center"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <ul className="list-none text-center space-y-6">
              {NAV_LINKS.map((label, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    onClick={() => handleNav(label)}
                    className="font-sans text-[3rem] font-black tracking-[-0.03em] text-ink hover:text-terra transition-colors bg-transparent border-none"
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
