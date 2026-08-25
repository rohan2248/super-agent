"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Shared entrance for the landing page's card grids: cards settle in from
 * slightly under-scale, one after another.
 *
 * `features.tsx` still carries its own private copy of this — the two are
 * intentionally identical. Collapsing them into this one module is a safe
 * follow-up; it was left alone here to keep a shipped section untouched.
 */

export const CARD_EASE = [0.22, 1, 0.36, 1] as const;

export function CardShell({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: CARD_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
