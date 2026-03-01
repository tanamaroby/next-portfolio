export type ChangeType = "added" | "changed" | "fixed" | "removed" | "security";

export interface ChangeEntry {
  type: ChangeType;
  text: string;
}

export interface ChangeGroup {
  title: string;
  entries: ChangeEntry[];
}

export interface ChangelogVersion {
  version: string;
  date: string;
  summary: string;
  groups: ChangeGroup[];
}

export const CHANGELOG: ChangelogVersion[] = [
  {
    version: "0.5.0",
    date: "2026-03-02",
    summary:
      "New UI polish: custom 404 page, full-screen loading spinner, scroll-progress bar, and back-to-top button.",
    groups: [
      {
        title: "UI & UX",
        entries: [
          {
            type: "added",
            text: "Custom 404 page (app/not-found.tsx) — branded with the RT monogram, animated background orbs, gradient 404 heading, and Home / Go Back action buttons",
          },
          {
            type: "added",
            text: "Full-screen loading spinner (app/loading.tsx) — spinning ring around the RT monogram badge with a pulsing tracking label, shown automatically by Next.js during navigation",
          },
          {
            type: "added",
            text: "Scroll-progress indicator (components/scroll-progress.tsx) — spring-animated 3px bar fixed at the very top of the viewport, driven by Framer Motion useScroll + useSpring",
          },
          {
            type: "added",
            text: "Back-to-top button (components/back-to-top.tsx) — floating circular button in the bottom-right corner; appears after 400px of scroll with an animated entrance/exit via Framer Motion AnimatePresence",
          },
        ],
      },
    ],
  },
  {
    version: "0.4.0",
    date: "2026-03-02",
    summary:
      "Maximum SEO and enhanced PWA: dynamic OG image, JSON-LD Person schema, sitemap, robots.txt, rich metadata, and expanded web app manifest with shortcuts.",
    groups: [
      {
        title: "SEO",
        entries: [
          {
            type: "added",
            text: "Dynamic OG image (1200×630) generated at the edge via Next.js ImageResponse — branded with name, role, and colour scheme",
          },
          {
            type: "added",
            text: "JSON-LD Person schema injected in the root layout — includes name, job title, employer (TrieTech), NUS alumni, address, email, and sameAs social links for Google rich results",
          },
          {
            type: "added",
            text: "app/sitemap.ts — dynamic sitemap.xml covering / and /changelog with lastModified, changeFrequency, and priority",
          },
          {
            type: "added",
            text: "app/robots.ts — robots.txt with sitemap reference, allow all, and disallow /api/",
          },
          {
            type: "changed",
            text: "Root layout metadata: richer title (includes CTO / Full-Stack Engineer), expanded keywords (18 terms), creator/publisher fields, canonical URL, granular googleBot directives (max-image-preview large, max-snippet -1), Twitter site/creator handles (@SCourtest), OG image reference, and formatDetection for address and email",
          },
          {
            type: "changed",
            text: "Changelog route metadata: added canonical URL, OG tags, and robots directive",
          },
          {
            type: "changed",
            text: "viewport: themeColor now uses media query array (dark + light) instead of a bare string",
          },
        ],
      },
      {
        title: "PWA",
        entries: [
          {
            type: "changed",
            text: "manifest.json: added id, lang, dir, prefer_related_applications, display_override (window-controls-overlay), start_url with ?source=pwa tracking, and expanded categories",
          },
          {
            type: "added",
            text: "manifest.json: shortcuts for Projects, Contact, and Changelog — appear in the OS home-screen long-press menu",
          },
        ],
      },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-03-02",
    summary:
      "Added love-letter — a full-stack social media platform — to the Projects section.",
    groups: [
      {
        title: "Projects",
        entries: [
          {
            type: "added",
            text: "love-letter — full-stack social media web app with real-time notifications, Supabase Realtime presence & broadcast, global chat, personal and admin analytics dashboards, versioned public REST API, and PWA support",
          },
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-03-02",
    summary:
      "Content update: populated all sections with real personal information, added profile photo, project screenshots, and a new Experience timeline section.",
    groups: [
      {
        title: "New Sections",
        entries: [
          {
            type: "added",
            text: "Experience section — vertical timeline with 4 roles (TrieTech, One X Tech, GIC, oCap Management) plus NUS education card",
          },
        ],
      },
      {
        title: "Real Content",
        entries: [
          {
            type: "changed",
            text: 'Hero — updated subtitle to "Co-Founder & CTO @ TrieTech · Full-Stack Engineer", real social links (GitHub, LinkedIn, Twitter/X, Email), and real description',
          },
          {
            type: "changed",
            text: "About — added real profile photo (Roby.jpg), Singapore location, real bio paragraphs, and updated interest tags",
          },
          {
            type: "changed",
            text: "Skills — replaced all placeholders with full real tech stack across 6 categories (Languages, Frontend, Backend, Database, DevOps & Cloud, Tools & Practices)",
          },
          {
            type: "changed",
            text: "Projects — replaced placeholder cards with 5 real projects (Trivial, YogaPets, Aether, SaveNUS, Radomir) each with project images, real descriptions, and an award badge for Aether",
          },
          {
            type: "changed",
            text: "Contact — updated all links to real email (tanamaroby@gmail.com), LinkedIn, GitHub (tanamaroby), and Twitter/X (SCourtest)",
          },
        ],
      },
      {
        title: "Navigation",
        entries: [
          {
            type: "added",
            text: "Experience link added to Navbar between About and Skills",
          },
        ],
      },
    ],
  },
  {
    version: "0.1.1",
    date: "2026-03-01",
    summary:
      'Developer tooling update: added automated "bump the version" workflow to GitHub Copilot instructions.',
    groups: [
      {
        title: "Developer Tooling",
        entries: [
          {
            type: "added",
            text: '"Bump the Version" workflow in Copilot instructions — collates git commits since last release, determines semver bump, and atomically updates data/changelog.ts, CHANGELOG.md, and package.json',
          },
        ],
      },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-03-01",
    summary:
      "Initial public release. Built from the ground up with Next.js 16, Tailwind CSS v4, ShadCN UI, and Framer Motion.",
    groups: [
      {
        title: "Layout & Navigation",
        entries: [
          {
            type: "added",
            text: "Sticky glass Navbar with scroll-aware styling, smooth entrance animation, and mobile drawer",
          },
          {
            type: "added",
            text: "Footer with copyright, attribution, and changelog link",
          },
        ],
      },
      {
        title: "Sections",
        entries: [
          {
            type: "added",
            text: "Hero section — animated background orbs, headline, social links, and CTA buttons",
          },
          {
            type: "added",
            text: "About section — avatar, stats grid, bio, and interest badges",
          },
          {
            type: "added",
            text: "Skills section — grouped technical toolkit organized by category",
          },
          {
            type: "added",
            text: "Projects section — cards with tech badges, featured label, GitHub and demo links",
          },
          {
            type: "added",
            text: "Contact section — email CTA and social link grid",
          },
        ],
      },
      {
        title: "Design System",
        entries: [
          {
            type: "added",
            text: "Full light / dark color token system via CSS custom properties",
          },
          {
            type: "added",
            text: "Named theme variables for accent gradients and hero background orbs",
          },
          {
            type: "added",
            text: "Custom CSS utilities: glass, text-gradient, glow-primary, glow-primary-sm, section-padding",
          },
        ],
      },
      {
        title: "Animations",
        entries: [
          {
            type: "added",
            text: "Framer Motion variants: fadeInUp, fadeIn, slideInLeft, slideInRight, scaleIn, staggerContainer",
          },
          {
            type: "added",
            text: "Scroll-triggered entrance animations with shared viewportConfig",
          },
        ],
      },
      {
        title: "ShadCN UI Components",
        entries: [
          { type: "added", text: "Avatar with AvatarFallback" },
          { type: "added", text: "Badge (secondary variant)" },
          {
            type: "added",
            text: "Button (default, ghost, outline variants)",
          },
          {
            type: "added",
            text: "Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription",
          },
          { type: "added", text: "Separator" },
        ],
      },
      {
        title: "Infrastructure",
        entries: [
          {
            type: "added",
            text: "Next.js 16 with TypeScript, Tailwind CSS v4, and ShadCN",
          },
          {
            type: "added",
            text: "PWA support — manifest.json, Apple touch icon, web-app-manifest images",
          },
          {
            type: "added",
            text: "Full SEO metadata — Open Graph, Twitter cards, and structured site data",
          },
          {
            type: "added",
            text: "ESLint, TypeScript strict config, postcss, and VSCode workspace settings",
          },
          {
            type: "changed",
            text: "Replaced Next.js boilerplate page.tsx with full portfolio composition",
          },
          {
            type: "changed",
            text: "Rewrote globals.css with complete ShadCN token system and Tailwind v4 @theme inline config",
          },
        ],
      },
    ],
  },
];

export const CHANGE_TYPE_META: Record<
  ChangeType,
  { label: string; className: string }
> = {
  added: {
    label: "Added",
    className: "border-primary/30 bg-primary/10 text-primary",
  },
  changed: {
    label: "Changed",
    className: "border-accent-foreground/20 bg-accent text-accent-foreground",
  },
  fixed: {
    label: "Fixed",
    className: "border-chart-2/30 bg-chart-2/10 text-chart-2",
  },
  removed: {
    label: "Removed",
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
  security: {
    label: "Security",
    className: "border-chart-5/30 bg-chart-5/10 text-chart-5",
  },
};
