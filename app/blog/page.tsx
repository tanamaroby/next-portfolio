"use client";

import BackToTop from "@/components/back-to-top";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ScrollProgress from "@/components/scroll-progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSortedBlogPosts } from "@/data/blog";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

const SORTED_POSTS = getSortedBlogPosts();

export default function BlogPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        {/* Header */}
        <motion.div
          className="mb-16 flex flex-col items-center gap-3 text-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Writing
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Blog
          </h1>
          <p className="max-w-md text-muted-foreground">
            Thoughts on Next.js, React, AG Grid, and building real software for
            real businesses.
          </p>
        </motion.div>

        {/* Post list */}
        <motion.div
          className="flex flex-col gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {SORTED_POSTS.map((post) => (
            <motion.div key={post.slug} variants={fadeInUp}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <Card className="transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/5">
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-primary" />
                        {new Date(post.date).toLocaleDateString("en-SG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} className="text-primary" />
                        {post.readTime} min read
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
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
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
