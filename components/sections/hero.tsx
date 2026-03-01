"use client";

import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
  { href: "https://github.com/tanamaroby", icon: Github, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/tanamaroby/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  { href: "https://x.com/SCourtest", icon: Twitter, label: "Twitter" },
  { href: "mailto:tanamaroby@gmail.com", icon: Mail, label: "Email" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center"
    >
      {/* ── Animated background orbs ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 left-1/4 h-130 w-130 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--hero-orb-1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-40 right-1/4 h-120 w-120 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--hero-orb-2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        className="mx-auto max-w-3xl px-6 py-32 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="mb-6 inline-flex">
          <span className="inline-flex items-center gap-2 rounded-full border border-available/30 bg-available/10 px-4 py-1.5 text-xs font-medium text-available glow-available-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-available" />
            Open to consulting &amp; opportunities
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="mb-4 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Hi, I&apos;m <span className="text-gradient">Roby Tanama</span>
          <span className="text-primary">.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeInUp}
          className="mb-6 text-xl font-medium text-muted-foreground sm:text-2xl"
        >
          Co-Founder &amp; CTO @{" "}
          <a
            href="https://www.trietech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            TrieTech
          </a>{" "}
          · Full-Stack Engineer
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          I build fast, accessible, and beautiful web experiences — specializing
          in production-ready, industry-grade web applications. As co-founder of
          TrieTech, I help businesses grow through bespoke software solutions,
          from architecture to final delivery.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeInUp}
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" className="glow-primary px-8 font-semibold" asChild>
            <a href="#projects">View My Work</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/60 px-8 font-semibold hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            asChild
          >
            <a href="#contact">Get in Touch</a>
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-3"
        >
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              <Icon size={17} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  );
}
