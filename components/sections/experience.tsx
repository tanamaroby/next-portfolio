"use client";

import { Badge } from "@/components/ui/badge";
import {
  fadeInUp,
  slideInLeft,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  initials: string;
  description: string;
  highlights?: string[];
  tags: string[];
  current?: boolean;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Co-Founder & CTO",
    company: "TrieTech Private Limited",
    companyUrl: "https://www.trietech.com/",
    period: "December 2023 – Present",
    location: "Singapore",
    initials: "TT",
    description:
      "Co-founding and leading a software consulting company specializing in bespoke web application development. Driving technical strategy, architecture decisions, and client delivery — focused on excellence, efficiency, and innovation.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "ShadCN UI"],
    current: true,
  },
  {
    role: "Software Engineer",
    company: "One X Tech",
    period: "June 2022 – September 2023",
    location: "Singapore",
    initials: "OX",
    description:
      "Full Stack Software Engineer with broad responsibilities across the development lifecycle.",
    highlights: [
      "Built a proprietary React component library used across client projects to standardize features and improve efficiency",
      "Spearheaded project management, dividing projects into sprints and ensuring on-time delivery",
      "Conducted client meetings to understand requirements and align development tasks",
      "Recognized as top earner in company town hall, lauded for extensive stack knowledge and collaborative work ethic",
      "Authored in-depth documentation for the component library using JSDoc",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Supabase",
      "Docusaurus",
    ],
  },
  {
    role: "Software Engineer (Internship)",
    company: "GIC",
    period: "May 2021 – November 2021",
    location: "Singapore",
    initials: "GIC",
    description:
      "Contributed extensively to internal team initiatives and projects. Details under NDA.",
    tags: ["Software Engineering"],
  },
  {
    role: "Full Stack Engineer (Internship)",
    company: "oCap Management",
    period: "May 2020 – July 2020",
    location: "Singapore",
    initials: "OC",
    description: "Contributed to multiple internal engineering initiatives.",
    highlights: [
      "Created a retrieval-based chatbot using the RASA Framework (Python) to assist with onboarding",
      "Built an OCR program to automatically extract data from documents",
      "Reviewed product UI design and functionality",
    ],
    tags: ["Python", "RASA", "OCR", "Full-Stack"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding mx-auto max-w-6xl">
      {/* Section title */}
      <motion.div
        className="mb-16 flex flex-col items-center gap-3 text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Experience
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Where I&apos;ve worked
        </h2>
        <p className="max-w-md text-muted-foreground">
          A journey through the companies and roles that have shaped who I am as
          an engineer.
        </p>
      </motion.div>

      <motion.div
        className="relative flex flex-col gap-0"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border/50 hidden sm:block" />

        {EXPERIENCES.map((exp, i) => (
          <motion.div
            key={i}
            variants={slideInLeft}
            className="relative flex gap-6 pb-10 last:pb-0"
          >
            {/* Timeline dot + company initials */}
            <div className="relative hidden sm:flex flex-col items-center">
              <div
                className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 text-xs font-bold transition-all duration-300 ${
                  exp.current
                    ? "border-primary bg-primary text-primary-foreground glow-primary-sm"
                    : "border-border/60 bg-card text-muted-foreground"
                }`}
              >
                {exp.initials}
              </div>
            </div>

            {/* Content card */}
            <div className="flex-1 rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <Badge className="border-primary/40 bg-primary/10 text-primary text-xs">
                        <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-primary inline-block" />
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium text-primary">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      · {exp.location}
                    </span>
                  </p>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                  <Calendar size={12} />
                  {exp.period}
                </p>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>

              {exp.highlights && (
                <ul className="mb-4 flex flex-col gap-1.5">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="border border-border/40 bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Education note */}
      <motion.div
        className="mt-12 flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-muted text-sm font-bold text-muted-foreground">
          NUS
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">
            National University of Singapore
          </p>
          <p className="text-sm text-muted-foreground">
            Bachelor of Computing in Computer Science ·{" "}
            <span className="text-primary">
              Specialization: Software Engineering
            </span>{" "}
            · 2018 – 2022
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <Briefcase size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Education</span>
        </div>
      </motion.div>
    </section>
  );
}
