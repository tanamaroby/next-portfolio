"use client";

import { Button } from "@/components/ui/button";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* ── Background orbs ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-40 left-1/4 h-130 w-130 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--hero-orb-1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 30, -15, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.06, 0.97, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 right-1/4 h-120 w-120 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--hero-orb-2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 25, -15, 0],
            scale: [1, 1.05, 0.96, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="flex flex-col items-center gap-6 max-w-lg"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Monogram badge */}
        <motion.div variants={fadeIn}>
          <Link href="/" className="group flex items-center gap-2.5 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary glow-primary-sm transition-all duration-300 group-hover:scale-110">
              <span className="font-mono text-sm font-bold text-primary-foreground">
                RT
              </span>
            </div>
          </Link>
        </motion.div>

        {/* 404 heading */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Error 404
          </span>
          <h1 className="text-8xl font-black tracking-tighter text-gradient sm:text-9xl">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            Page not found
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            Looks like this page doesn&apos;t exist. It may have been moved,
            deleted, or you might have mistyped the URL.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <Button asChild className="gap-2 glow-primary-sm">
            <Link href="/">
              <Home size={15} />
              Back home
            </Link>
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-border/60 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={15} />
            Go back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
