import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "All notable changes to Roby Tanama's portfolio, newest first.",
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
