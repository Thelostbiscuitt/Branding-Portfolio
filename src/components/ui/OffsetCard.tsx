"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OffsetCardProps {
  children: React.ReactNode;
  className?: string;
  rotate?: string;
}

export function OffsetCard({ children, className, rotate }: OffsetCardProps) {
  return (
    <motion.div
      className="relative w-full"
      whileHover="hover"
    >
      {/* Blue shadow */}
      <motion.div
        className="absolute inset-0 bg-[#0066FF] rounded-2xl"
        variants={{
          hover: { x: 10, y: 10 },
          rest: { x: 6, y: 6 },
        }}
        initial="rest"
        transition={{ duration: 0.2 }}
      />
      {/* Card */}
      <motion.div
        className={cn(
          "relative z-10 bg-white border-2 border-[#0a0a0a] rounded-2xl card-brackets",
          rotate,
          className
        )}
        variants={{
          hover: { y: -3 },
          rest: { y: 0 },
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
