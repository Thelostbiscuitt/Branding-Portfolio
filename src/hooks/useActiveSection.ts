"use client";

import { useState, useEffect } from "react";
import { SECTIONS, type SectionId } from "@/lib/data";

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    function onScroll() {
      const mid = window.scrollY + window.innerHeight / 2;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (mid >= top && mid < bottom) {
          setActive(id);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}
