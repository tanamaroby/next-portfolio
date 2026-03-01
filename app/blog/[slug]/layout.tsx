import { getBlogPost } from "@/data/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const BASE_URL = "https://tanamaroby.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Roby Tanama`,
      description: post.description,
      url: `${BASE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Roby Tanama"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      site: "@SCourtest",
      creator: "@SCourtest",
      title: post.title,
      description: post.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return <>{children}</>;
}
