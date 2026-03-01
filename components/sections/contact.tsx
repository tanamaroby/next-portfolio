"use client";

import { Button } from "@/components/ui/button";
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";

const CONTACT_LINKS = [
  {
    href: "mailto:tanamaroby@gmail.com",
    icon: Mail,
    label: "Email",
    value: "tanamaroby@gmail.com",
    description: "Drop me a message",
  },
  {
    href: "https://www.linkedin.com/in/tanamaroby/",
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/tanamaroby",
    description: "Let's connect",
  },
  {
    href: "https://github.com/tanamaroby",
    icon: Github,
    label: "GitHub",
    value: "github.com/tanamaroby",
    description: "See my code",
  },
  {
    href: "https://x.com/SCourtest",
    icon: Twitter,
    label: "Twitter / X",
    value: "x.com/SCourtest",
    description: "Follow my thoughts",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="mx-auto max-w-3xl">
        {/* Section title */}
        <motion.div
          className="mb-16 flex flex-col items-center gap-3 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="max-w-md text-muted-foreground">
            Have a project in mind, a role to fill, or just want to say hi?
            I&apos;m always happy to chat.
          </p>
        </motion.div>

        {/* Big email CTA */}
        <motion.div
          className="mb-12 flex justify-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <Button
            size="lg"
            className="glow-primary gap-2 px-10 py-6 text-base font-semibold"
            asChild
          >
            <a href="mailto:tanamaroby@gmail.com">
              <Mail size={18} />
              Say Hello
              <ArrowUpRight size={16} className="ml-1" />
            </a>
          </Button>
        </motion.div>

        {/* Social links grid */}
        <motion.div
          className="grid gap-3 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {CONTACT_LINKS.map(({ href, icon: Icon, label, description }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground group-hover:glow-primary-sm">
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {description}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="ml-auto shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
