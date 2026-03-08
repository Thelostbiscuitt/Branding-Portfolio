import type { Metadata } from "next";
import { Epilogue, Lora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/layout/CustomCursor";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  style: ["normal","italic"],
  variable: "--font-epilogue",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400","600"],
  style: ["normal","italic"],
  variable: "--font-lora",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400","500"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Michael Oguntimehin — Creative Director & Designer",
  description:
    "Creative director and visual designer based in Lagos. Brand identity, art direction, music packaging — designed and built by one person. No handoff required.",
  keywords: [
    "Michael Oguntimehin",
    "Creative Director",
    "Brand Designer",
    "Frontend Developer",
    "Lagos",
    "Nigeria",
    "React",
    "Next.js",
    "TypeScript",
    "Brand Identity",
    "Design Systems",
    "Music Packaging",
  ],
  openGraph: {
    title: "Michael Oguntimehin — Creative Director & Developer",
    description:
      "Creative director and developer based in Lagos. Brand identity, digital design, and web experiences for companies that mean business.",
    url: "https://michael.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Oguntimehin — Creative Director & Developer",
    description:
      "Creative director and developer based in Lagos. Brand identity, digital design, and web experiences.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${epilogue.variable} ${lora.variable} ${ibmMono.variable} font-sans bg-bg text-ink overflow-x-hidden`}>
        <CustomCursor />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-terra focus:text-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
