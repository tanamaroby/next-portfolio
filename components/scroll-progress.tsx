"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin progress bar fixed to the top of the viewport.
 * Tracks page scroll position using Framer Motion's useScroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-[60] h-[3px] origin-left bg-primary"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
