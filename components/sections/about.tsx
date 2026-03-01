"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import { motion } from "framer-motion";

const HIGHLIGHTS = [
  { value: "5+", label: "Years Experience" },
  { value: "30+", label: "Projects Shipped" },
  { value: "10+", label: "Happy Clients" },
  { value: "∞", label: "Bugs Fixed" },
];

export default function About() {
  return (
    <section id="about" className="section-padding mx-auto max-w-6xl">
      {/* Section title */}
      <motion.div
        className="mb-16 flex flex-col items-center gap-3 text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          About
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          The person behind the code
        </h2>
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Avatar side */}
        <motion.div
          className="flex flex-col items-center gap-8 lg:items-start"
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-full bg-linear-to-br from-primary/40 via-primary/10 to-transparent blur-md" />
            <Avatar className="relative h-40 w-40 border-2 border-primary/30 text-4xl">
              <AvatarFallback className="bg-muted text-3xl font-bold text-primary">
                RT
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {HIGHLIGHTS.map(({ value, label }) => (
              <div
                key={label}
                className="glass rounded-xl px-4 py-4 text-center"
              >
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          className="flex flex-col gap-5"
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h3 className="text-2xl font-semibold leading-snug">
            Hi there! I&apos;m Roby —{" "}
            <span className="text-gradient">
              a software engineer based in [City, Country]
            </span>
          </h3>

          <p className="leading-relaxed text-muted-foreground">
            [Placeholder — share your story here. Where did you grow up? When
            did you start coding? What drives you?]
          </p>
          <p className="leading-relaxed text-muted-foreground">
            [Placeholder — your professional focus. What kind of problems do you
            love solving? What technologies excite you?]
          </p>
          <p className="leading-relaxed text-muted-foreground">
            [Placeholder — outside of work. Hobbies, interests, what you do when
            you&apos;re not coding.]
          </p>

          {/* Interests / quick facts */}
          <motion.div
            className="flex flex-wrap gap-2 pt-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {[
              "Full-Stack Dev",
              "Open Source",
              "UI/UX Enthusiast",
              "Coffee Lover ☕",
              "[Add your interest]",
            ].map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border border-border/50 bg-card px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
