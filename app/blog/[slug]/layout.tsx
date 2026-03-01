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
      siteName: "Roby Tanama",
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
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/blog/${post.slug}`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${BASE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Roby Tanama",
    },
    publisher: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Roby Tanama",
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
