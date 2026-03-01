"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "[Project Name]",
    description:
      "[Placeholder — describe what this project does, the problem it solves, and any interesting technical challenges you tackled.]",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "[Project Name]",
    description:
      "[Placeholder — describe what this project does, the problem it solves, and any interesting technical challenges you tackled.]",
    tech: ["React", "Node.js", "MongoDB"],
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "[Project Name]",
    description:
      "[Placeholder — describe what this project does, the problem it solves, and any interesting technical challenges you tackled.]",
    tech: ["Python", "FastAPI", "Redis"],
    github: "#",
  },
  {
    title: "[Project Name]",
    description:
      "[Placeholder — describe what this project does, the problem it solves, and any interesting technical challenges you tackled.]",
    tech: ["Vue.js", "Tailwind CSS", "Supabase"],
    github: "#",
    demo: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding mx-auto max-w-6xl">
      {/* Section title */}
      <motion.div
        className="mb-16 flex flex-col items-center gap-3 text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Projects
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Things I&apos;ve built
        </h2>
        <p className="max-w-md text-muted-foreground">
          A selection of projects I&apos;m proud of — more on GitHub.
        </p>
      </motion.div>

      {/* Project grid */}
      <motion.div
        className="grid gap-5 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group"
          >
            <Card className="flex h-full flex-col border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  {project.featured && (
                    <Badge className="shrink-0 border-primary/40 bg-primary/10 text-primary text-xs">
                      <Star size={10} className="mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 pb-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="border border-border/40 bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="gap-2 pt-0">
                {project.github && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="gap-1.5 text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="gap-1.5 text-muted-foreground hover:text-primary"
                    asChild
                  >
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* View all on GitHub */}
      <motion.div
        className="mt-10 text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <Button
          variant="outline"
          className="gap-2 border-border/60 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
          asChild
        >
          <a
            href="https://github.com/robytanama"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} />
            View all on GitHub
          </a>
        </Button>
      </motion.div>
    </section>
  );
}
