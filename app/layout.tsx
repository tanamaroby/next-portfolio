import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://robytanama.dev";

export const metadata: Metadata = {
  title: {
    default: "Roby Tanama — Software Engineer",
    template: "%s | Roby Tanama",
  },
  description:
    "Portfolio of Roby Tanama, a software engineer who builds performant, scalable, and delightful digital experiences.",
  metadataBase: new URL(BASE_URL),
  applicationName: "Roby Tanama's Portfolio",
  authors: [{ name: "Roby Tanama", url: BASE_URL }],
  keywords: [
    "Roby Tanama",
    "Software Engineer",
    "Portfolio",
    "Full Stack",
    "React",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Roby Tanama's Portfolio",
    title: "Roby Tanama — Software Engineer",
    description:
      "Portfolio of Roby Tanama, a software engineer who builds performant, scalable, and delightful digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roby Tanama — Software Engineer",
    description:
      "Portfolio of Roby Tanama, a software engineer who builds performant, scalable, and delightful digital experiences.",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Roby Tanama",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
