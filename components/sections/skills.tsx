"use client";

import { Badge } from "@/components/ui/badge";
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  viewportConfig,
} from "@/lib/motion";
import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    category: "Languages",
    items: [
      "TypeScript",
      "JavaScript (ES6+)",
      "Python",
      "Java",
      "C++",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "ShadCN UI",
      "Framer Motion",
      "Docusaurus",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Next.js",
      "Flask",
      "REST APIs",
      "JWT",
      "Auth Middleware",
      "Edge Functions",
    ],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "Supabase", "RLS Policies", "Query Optimization"],
  },
  {
    category: "DevOps & Cloud",
    items: [
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Heroku",
      "Google App Engine",
      "Linux",
    ],
  },
  {
    category: "Tools & Practices",
    items: ["Git", "ESLint", "Prettier", "JSDoc", "Sprint Planning", "CI/CD"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-muted/30">
      <div className="mx-auto max-w-6xl">
        {/* Section title */}
        <motion.div
          className="mb-16 flex flex-col items-center gap-3 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Skills
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My technical toolkit
          </h2>
          <p className="max-w-md text-muted-foreground">
            Technologies and tools I reach for to build robust, scalable
            products.
          </p>
        </motion.div>

        {/* Grid of skill categories */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {SKILL_GROUPS.map(({ category, items }) => (
            <motion.div
              key={category}
              variants={scaleIn}
              className="group rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="border border-border/40 bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
