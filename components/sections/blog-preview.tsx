"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSortedBlogPosts } from "@/data/blog";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

// Show the 3 most recent posts (sorted newest-first)
const PREVIEW_POSTS = getSortedBlogPosts().slice(0, 3);

export default function BlogPreview() {
  return (
    <section id="blog" className="section-padding mx-auto max-w-6xl">
      {/* Section title */}
      <motion.div
        className="mb-16 flex flex-col items-center gap-3 text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Writing
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          From the blog
        </h2>
        <p className="max-w-md text-muted-foreground">
          Practical writing on Next.js, React, AG Grid, and building bespoke
          software for real businesses.
        </p>
      </motion.div>

      {/* Post cards */}
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        {PREVIEW_POSTS.map((post) => (
          <motion.div key={post.slug} variants={fadeInUp}>
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
                <CardHeader className="pb-3">
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-primary" />
                      {new Date(post.date).toLocaleDateString("en-SG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} className="text-primary" />
                      {post.readTime} min
                    </span>
                  </div>
                  <h3 className="text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="mt-10 flex justify-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <Button variant="outline" asChild>
          <Link href="/blog">
            View all posts
            <ArrowRight size={14} className="ml-2" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
