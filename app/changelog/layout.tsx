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
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
