"use client";

import BackToTop from "@/components/back-to-top";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ScrollProgress from "@/components/scroll-progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BLOG_POSTS, type ContentBlock } from "@/data/blog";
import { fadeInUp, viewportConfig } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

// ─── Content block renderer ──────────────────────────────────────────────────

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 mb-3 text-lg font-semibold tracking-tight text-foreground">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="mb-5 leading-relaxed text-muted-foreground">
          {block.text}
        </p>
      );
    case "code":
      return (
        <div className="mb-5 overflow-x-auto rounded-lg border border-border bg-muted/50">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="font-mono text-xs text-muted-foreground">
              {block.lang}
            </span>
          </div>
          <pre className="p-4 text-sm leading-relaxed">
            <code className="font-mono text-foreground">{block.text}</code>
          </pre>
        </div>
      );
    case "ul":
      return (
        <ul className="mb-5 ml-6 flex flex-col gap-2 list-disc marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-5 ml-6 flex flex-col gap-2 list-decimal marker:text-primary marker:font-semibold">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed text-muted-foreground">
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout": {
      const styles = {
        tip: "border-available/40 bg-available/5 text-available",
        note: "border-primary/40 bg-primary/5 text-primary",
        warning: "border-amber-500/40 bg-amber-500/5 text-amber-400",
      };
      const labels = { tip: "Tip", note: "Note", warning: "Warning" };
      return (
        <div
          className={`mb-5 rounded-lg border-l-4 px-4 py-3 ${styles[block.variant]}`}
        >
          <p className="mb-1 text-xs font-bold uppercase tracking-widest">
            {labels[block.variant]}
          </p>
          <p className="text-sm leading-relaxed text-foreground/80">
            {block.text}
          </p>
        </div>
      );
    }
    case "hr":
      return <Separator className="my-8" />;
    default:
      return null;
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) notFound();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
        {/* Back link */}
        <motion.div
          className="mb-10"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} />
            All posts
          </Link>
        </motion.div>

        {/* Post header */}
        <motion.header
          className="mb-10"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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

          <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>

          <p className="mb-6 text-base text-muted-foreground leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.header>

        <Separator className="mb-10" />

        {/* Post content */}
        <motion.article
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          viewport={viewportConfig}
        >
          {post.content.map((block, i) => (
            <RenderBlock key={i} block={block} />
          ))}
        </motion.article>

        <Separator className="mt-12 mb-10" />

        {/* Footer nav */}
        <div className="flex justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
