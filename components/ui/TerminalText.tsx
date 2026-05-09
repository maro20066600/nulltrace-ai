"use client";

import { motion } from "framer-motion";

export function TerminalText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.018, duration: 0.22 }}
        >
          {char}
        </motion.span>
      ))}
      <span className="ml-1 inline-block h-[1em] w-[2px] translate-y-1 bg-cyan-300 animate-pulse" />
    </span>
  );
}
