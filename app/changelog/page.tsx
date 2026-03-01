"use client";

import { CHANGELOG, CHANGE_TYPE_META } from "@/data/changelog";
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
          <span className="text-border/60">·</span>
          <span className="text-sm font-medium text-foreground">Changelog</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* ── Page heading ── */}
        <motion.div
          className="mb-16"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Package size={13} />
            Release History
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Changelog
          </h1>
          <p className="max-w-lg text-muted-foreground">
            All notable changes to this project, newest first.
          </p>
        </motion.div>

        {/* ── Version list ── */}
        <motion.div
          className="relative"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Vertical timeline line */}
          <div
            className="absolute left-2.75 top-2 bottom-2 w-px bg-border/40"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16">
            {CHANGELOG.map((release) => (
              <motion.article
                key={release.version}
                variants={fadeInUp}
                className="relative pl-8"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-1.5 h-5.5 w-5.5 rounded-full border-2 border-primary bg-background shadow-sm shadow-primary/20"
                  aria-hidden="true"
                />

                {/* Version header */}
                <div className="mb-6 flex flex-wrap items-baseline gap-3">
                  <h2 className="text-2xl font-bold tracking-tight">
                    v{release.version}
                  </h2>
                  <time
                    dateTime={release.date}
                    className="text-sm text-muted-foreground"
                  >
                    {new Date(release.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                {/* Summary card */}
                <div className="mb-8 rounded-xl border border-border/50 bg-card px-5 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {release.summary}
                  </p>
                </div>

                {/* Change groups */}
                <motion.div
                  className="flex flex-col gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                >
                  {release.groups.map((group) => (
                    <motion.div key={group.title} variants={fadeIn}>
                      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        {group.title}
                      </h3>
                      <ul className="flex flex-col gap-2">
                        {group.entries.map((entry, i) => {
                          const meta = CHANGE_TYPE_META[entry.type];
                          return (
                            <li
                              key={i}
                              className="flex items-start gap-3 rounded-lg border border-border/30 bg-card/50 px-4 py-3 text-sm"
                            >
                              <span
                                className={`mt-px shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${meta.className}`}
                              >
                                {meta.label}
                              </span>
                              <span className="leading-relaxed text-foreground/80">
                                {entry.text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* ── Footer note ── */}
        <motion.p
          className="mt-20 text-center text-xs text-muted-foreground"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          This changelog follows the{" "}
          <a
            href="https://keepachangelog.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Keep a Changelog
          </a>{" "}
          convention.
        </motion.p>
      </main>
    </div>
  );
}
