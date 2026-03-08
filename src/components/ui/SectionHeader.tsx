import { RevealOnScroll } from "./RevealOnScroll";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <RevealOnScroll className="text-center mb-16">
      <h2
        className="font-display font-black tracking-[-0.02em] leading-none mb-4"
        style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
      >
        {title}
      </h2>
      <div className="h-1 bg-[#0066FF] w-1/2 max-w-[200px] rounded-full mx-auto" />
      {subtitle && (
        <p className="text-gray-500 mt-4 text-[0.95rem] max-w-lg mx-auto">
          {subtitle}
        </p>
      )}
    </RevealOnScroll>
  );
}
