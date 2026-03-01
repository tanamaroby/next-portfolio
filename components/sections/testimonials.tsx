"use client";

import { Card } from "@/components/ui/card";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import { motion } from "framer-motion";
import { Lock, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  /** Job title of the reviewer */
  title: string;
  /** Broad industry — company name withheld per client request */
  industry: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Roby built our entire workflow automation platform from scratch in under three months. The node-based flow editor alone has saved our operations team 25+ hours a week on manual processes. He anticipated edge cases we hadn't even considered and delivered a system that's been rock-solid in production.",
    title: "Operations Director",
    industry: "Manufacturing",
  },
  {
    quote:
      "We needed a bespoke ERP with inventory management, role-based access, and WhatsApp notifications — all tightly integrated. Roby delivered exactly that, on time and on budget. His architecture decisions have held up as we've grown our team threefold. I'd work with him again without hesitation.",
    title: "CEO & Co-Founder",
    industry: "Logistics & Supply Chain",
  },
  {
    quote:
      "The platform Roby built for us handles thousands of daily transactions without a hitch. What impressed me most was his communication — he kept us informed at every stage, explained trade-offs clearly, and pushed back constructively when a requirement would have created tech debt. Rare qualities in a contractor.",
    title: "Head of Product",
    industry: "Enterprise SaaS",
  },
  {
    quote:
      "After two failed attempts with other agencies, we finally got it right with TrieTech. Roby re-architected our customer portal from the ground up — cleaner codebase, 10× faster page loads, and a UI our team actually enjoys using. He treats your project like it's his own startup.",
    title: "CTO",
    industry: "FinTech",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding mx-auto max-w-6xl">
      {/* Section title */}
      <motion.div
        className="mb-16 flex flex-col items-center gap-3 text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Testimonials
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          What clients say
        </h2>
        <p className="max-w-md text-muted-foreground">
          Feedback from founders, operators, and product leaders I&apos;ve
          partnered with.
        </p>
      </motion.div>

      {/* Testimonial grid */}
      <motion.div
        className="grid gap-5 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={i} variants={fadeInUp}>
            <Card className="flex h-full flex-col gap-5 border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
              {/* Quote icon */}
              <Quote
                size={20}
                className="shrink-0 text-primary/40"
                aria-hidden
              />

              {/* Quote text */}
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between gap-3 border-t border-border/40 pt-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.industry}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-border/50 px-2.5 py-1 text-xs text-muted-foreground">
                  <Lock size={10} />
                  Confidential
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
