"use client";

import { fadeIn, viewportConfig } from "@/lib/motion";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="border-t border-border/50 px-6 py-10 text-center text-sm text-muted-foreground"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p>
          &copy; {year}{" "}
          <span className="font-medium text-foreground">Roby Tanama</span>. All
          rights reserved.
        </p>
        <p className="flex items-center gap-1.5">
          Built with{" "}
          <Heart
            size={13}
            className="fill-primary text-primary"
            aria-hidden="true"
          />{" "}
          using Next.js, ShadCN &amp; Framer Motion
        </p>
      </div>
    </motion.footer>
  );
}
