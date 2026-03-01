import type { Metadata } from "next";

const BASE_URL = "https://tanamaroby.com";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing by Roby Tanama on Next.js, React, AG Grid, and building bespoke software for real businesses.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Blog | Roby Tanama",
    description:
      "Writing by Roby Tanama on Next.js, React, AG Grid, and building bespoke software for real businesses.",
    url: `${BASE_URL}/blog`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
