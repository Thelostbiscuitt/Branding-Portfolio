"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/utils";

const SECTIONS = ["home", "about", "projects", "contact"];

export function SectionDots() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && mid >= el.offsetTop && mid < el.offsetTop + el.offsetHeight) {
          setActive(id);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed right-10 top-1/2 -translate-y-1/2 z-[150] hidden lg:flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      {SECTIONS.map((id) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          aria-label={id}
          className={`w-[5px] h-[5px] rounded-full border-none transition-all duration-300 ${
            active === id
              ? "bg-terra scale-[1.4]"
              : "bg-rule"
          }`}
        />
      ))}
    </div>
  );
}
