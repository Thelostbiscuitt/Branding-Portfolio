"use client";

import { ExternalLink } from "lucide-react";

const SOCIALS = [
  { label: "Behance",  href: "https://www.behance.net/BlvckOreo" },
  { label: "GitHub",   href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-rule px-12 py-7 flex flex-wrap items-center justify-between gap-4 bg-bg" role="contentinfo">
      <div className="font-sans text-[1rem] font-black tracking-[-0.02em]">
        Michael<span className="text-terra">.</span>
      </div>

      <div className="flex gap-2" aria-label="Social links">
        {SOCIALS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-8 h-8 border border-rule flex items-center justify-center text-mid hover:border-ink hover:text-ink transition-colors no-underline"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        ))}
      </div>

      <p className="font-mono text-[0.6rem] tracking-[0.08em] text-mid">
        &copy; {new Date().getFullYear()} Michael Oguntimehin — Lagos, Nigeria
      </p>
    </footer>
  );
}
