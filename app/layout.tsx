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

/**
 * Browser theme-color for the status bar / tab strip.
 * Matches --background in dark mode (oklch(0.145 0 0) ≈ #0a0a0a).
 * Must be a literal string — CSS variables cannot be used in <meta> tags.
 */
const DARK_THEME_COLOR = "#0a0a0f";

const TITLE = "Roby Tanama — Co-Founder & CTO · Full-Stack Engineer";
const DESCRIPTION =
  "Portfolio of Roby Tanama — Co-Founder & CTO at TrieTech, Full-Stack Software Engineer based in Singapore. Specialist in Next.js, TypeScript, React, Supabase, and bespoke web application development.";

/** JSON-LD Person schema for Google rich results */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Roby Tanama",
  url: BASE_URL,
  image: `${BASE_URL}/Roby.jpg`,
  jobTitle: "Co-Founder & CTO",
  worksFor: {
    "@type": "Organization",
    name: "TrieTech Private Limited",
    url: "https://www.trietech.com/",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "National University of Singapore",
    url: "https://www.nus.edu.sg/",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Singapore",
    addressCountry: "SG",
  },
  email: "tanamaroby@gmail.com",
  sameAs: [
    "https://github.com/tanamaroby",
    "https://www.linkedin.com/in/tanamaroby/",
    "https://x.com/SCourtest",
  ],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Supabase",
    "Tailwind CSS",
    "Full-Stack Development",
    "Software Consulting",
    "Web Application Development",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: "%s | Roby Tanama",
  },
  description: DESCRIPTION,
  applicationName: "Roby Tanama Portfolio",
  authors: [{ name: "Roby Tanama", url: BASE_URL }],
  creator: "Roby Tanama",
  publisher: "Roby Tanama",
  generator: "Next.js",
  keywords: [
    "Roby Tanama",
    "tanamaroby",
    "Software Engineer",
    "Full-Stack Engineer",
    "Co-Founder",
    "CTO",
    "TrieTech",
    "Singapore Developer",
    "Portfolio",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Supabase",
    "Tailwind CSS",
    "Web Development",
    "Bespoke Web Applications",
    "Software Consulting",
    "NUS Computer Science",
  ],
  category: "technology",
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Roby Tanama Portfolio",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: TITLE,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SCourtest",
    creator: "@SCourtest",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Roby Tanama",
    startupImage: "/web-app-manifest-512x512.png",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  verification: {
    // Add Google Search Console / Bing verification tokens here when available
    // google: "your-google-site-verification-token",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: DARK_THEME_COLOR },
    { media: "(prefers-color-scheme: light)", color: DARK_THEME_COLOR },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
