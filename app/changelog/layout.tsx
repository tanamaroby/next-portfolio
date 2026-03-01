import type { Metadata } from "next";

const BASE_URL = "https://tanamaroby.com";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "All notable changes to Roby Tanama's portfolio, documented newest first.",
  alternates: {
    canonical: `${BASE_URL}/changelog`,
  },
  openGraph: {
    title: "Changelog | Roby Tanama",
    description:
      "All notable changes to Roby Tanama's portfolio, documented newest first.",
    url: `${BASE_URL}/changelog`,
    siteName: "Roby Tanama",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SCourtest",
    creator: "@SCourtest",
    title: "Changelog | Roby Tanama",
    description:
      "All notable changes to Roby Tanama's portfolio, documented newest first.",
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

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
