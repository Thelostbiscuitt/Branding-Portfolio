import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:    "var(--bg)",
        ink:   "var(--ink)",
        terra: "var(--terra)",
        mid:   "var(--mid)",
        rule:  "var(--rule)",
        card:  "var(--card)",
      },
      fontFamily: {
        sans:  ["var(--font-epilogue)", "sans-serif"],
        serif: ["var(--font-lora)", "serif"],
        mono:  ["var(--font-ibm-mono)", "monospace"],
      },
      keyframes: {
        slideUp: {
          from: { opacity: "0", transform: "translateY(105%)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "none" },
        },
        travelDown: {
          "0%":   { top: "-16px", opacity: "0" },
          "15%":  { opacity: "1" },
          "85%":  { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.3" },
        },
      },
      animation: {
        "slide-up":    "slideUp 0.95s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up":     "fadeUp 0.6s ease both",
        "travel-down": "travelDown 1.8s ease-in-out infinite",
        "marquee":     "marquee 22s linear infinite",
        "float":       "float 5s ease-in-out infinite",
        "blink":       "blink 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
