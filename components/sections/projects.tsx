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
import { ExternalLink, Github, Star, Trophy } from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  award?: string;
  image?: string;
}

const PROJECTS: Project[] = [
  {
    title: "love-letter — Social Media Platform",
    description:
      "Full-stack social media web app where users share posts (text, images, audio), build a friends network, and interact in real time. Features live online presence, instant notifications via Supabase Realtime, a global chat room, personal and admin analytics dashboards, a versioned public REST API, and PWA support.",
    tech: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Prisma",
      "Tailwind CSS",
      "ShadCN UI",
      "Docker",
    ],
    image: "/love-letter.png",
    featured: true,
  },
  {
    title: "Trivial — ERP / Workflow Platform",
    description:
      "A comprehensive ERP and workflow management platform built from the ground up. Features a visual node-based flow editor, modular field system, inventory management with Excel import, real-time push notifications, WhatsApp integration, and role-based authorization.",
    tech: ["Next.js", "TypeScript", "ShadCN UI", "Tailwind CSS", "Supabase"],
    image: "/Trivial.png",
    featured: true,
  },
  {
    title: "YogaPets — Pet-Caring Platform",
    description:
      "Online pet caring platform for both pet owners and caretakers. Pet owners can register pets and bid for caretakers; caretakers can find full-time or part-time employment with automated salary calculation.",
    tech: ["PostgreSQL", "Full-Stack", "Database Design"],
    image: "/Yogapets.jpg",
  },
  {
    title: "Aether — Multiplayer Platformer",
    description:
      "A Unity multiplayer platformer with a unique fog-of-war mechanic — players can only see areas they have previously explored. Teams of 4 traverse levels filled with monsters, powerups, and spells.",
    tech: ["Unity", "C#", "Multiplayer", "Game Dev"],
    image: "/Aether.png",
    award: "1st Place — NUS CS3247 STePS 2020",
  },
  {
    title: "SaveNUS — Budget Management App",
    description:
      "An app that helps users manage meal budgets. Takes in a budget and plans meals according to desired timing, with an algorithm to avoid repetition. Built in Java with JavaFX for the GUI.",
    tech: ["Java", "JavaFX", "CI/CD"],
    image: "/Savenus.jpg",
  },
  {
    title: "Radomir — Task Manager Bot",
    description:
      "A Java CLI-based chatbot for managing tasks and deadlines, featuring a JavaFX GUI. First software engineering project — end-to-end development, testing, and deployment.",
    tech: ["Java", "JavaFX", "CLI"],
    image: "/Radomir.png",
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
            <Card className="flex h-full flex-col border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
              {/* Project image */}
              {project.image && (
                <div className="relative h-44 w-full overflow-hidden border-b border-border/40">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card/60 to-transparent" />
                </div>
              )}

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
                {project.award && (
                  <p className="flex items-center gap-1.5 text-xs font-medium text-primary/80">
                    <Trophy size={11} />
                    {project.award}
                  </p>
                )}
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
            href="https://github.com/tanamaroby"
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
