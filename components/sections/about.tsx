"use client";

import { Badge } from "@/components/ui/badge";

import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";

const HIGHLIGHTS = [
  { value: "6+", label: "Years Experience" },
  { value: "20+", label: "Projects Shipped" },
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
            {/* Profile photo — next/image with priority for faster LCP */}
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-primary/30">
              <Image
                src="/Roby.webp"
                alt="Roby Tanama"
                fill
                priority
                sizes="160px"
                className="object-cover"
              />
            </div>
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
              a software engineer based in Singapore
            </span>
          </h3>

          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} className="text-primary shrink-0" />
            Bukit Merah, Singapore
          </p>

          <p className="leading-relaxed text-muted-foreground">
            I&apos;m a dedicated software engineer and co-founder of{" "}
            <a
              href="https://www.trietech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              TrieTech
            </a>
            , a forward-thinking software consulting company. An alumnus of the
            National University of Singapore, my career has been driven by a
            passion for technology and innovation.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            At TrieTech, we specialize in crafting bespoke web applications,
            focusing on delivering both excellence and efficiency. I&apos;m
            committed to leveraging my expertise to provide top-tier software
            solutions and fostering growth in the tech industry.
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
              "SaaS Builder",
              "UI/UX Enthusiast",
              "Open Source",
              "Entrepreneur",
              "Team Lead",
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
