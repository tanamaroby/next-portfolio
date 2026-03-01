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
    version: "1.1.0",
    date: "2026-03-02",
    summary:
      "Comprehensive SEO pass: BlogPosting structured data on every post, per-post dynamic Open Graph images, correct sitemap dates, Twitter cards and googleBot directives on all routes, and siteName on all OG objects.",
    groups: [
      {
        title: "SEO & Metadata",
        entries: [
          {
            type: "added",
            text: "BlogPosting JSON-LD structured data injected in blog/[slug]/layout.tsx — includes headline, datePublished, keywords, author, publisher, and isPartOf WebSite references",
          },
          {
            type: "added",
            text: "Per-post dynamic Open Graph image at app/blog/[slug]/opengraph-image.tsx — renders post title, author badge, and tag pills at 1200×630 on the edge runtime",
          },
          {
            type: "fixed",
            text: "Sitemap blog entries now use actual post.date for lastModified instead of new Date() — ensures Google sees accurate freshness signals",
          },
          {
            type: "added",
            text: "Twitter card metadata (summary_large_image, site, creator) added to /blog and /changelog route layouts",
          },
          {
            type: "added",
            text: "googleBot directive (max-image-preview: large, max-snippet: -1) added to /blog, /changelog, and blog/[slug] layouts — matches root layout",
          },
          {
            type: "added",
            text: "openGraph.siteName added to /blog, /changelog, and blog/[slug] metadata for consistent social card rendering",
          },
          {
            type: "removed",
            text: "Non-standard host field removed from robots.ts",
          },
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-03-02",
    summary:
      "Navbar More dropdown, opaque mobile drawer, smarter blog sorting, two new posts on database pooling and Supabase production patterns, and avatar load improvement.",
    groups: [
      {
        title: "Navigation",
        entries: [
          {
            type: "changed",
            text: "Blog and Changelog links compressed into a 'More' dropdown on the desktop navbar — reduces crowding on smaller desktop widths",
          },
          {
            type: "fixed",
            text: "Mobile drawer background changed from semi-transparent glass to solid bg-background — text is now legible against any page content beneath the menu",
          },
        ],
      },
      {
        title: "Blog",
        entries: [
          {
            type: "added",
            text: "getSortedBlogPosts() utility exported from data/blog.ts — blog list page and homepage preview now always display posts newest-first",
          },
          {
            type: "added",
            text: "New post: 'Database Connection Pooling in Serverless' — covers Postgres connection exhaustion in serverless, Supabase Supavisor (port 6543 vs 5432), Prisma dual-URL config, and connection monitoring",
          },
          {
            type: "added",
            text: "New post: 'Supabase in Production' — covers Row-Level Security patterns, multi-tenant RLS with org membership helpers, Realtime Broadcast vs Postgres Changes, Edge Functions, Storage RLS policies, and performance tips",
          },
        ],
      },
      {
        title: "Performance",
        entries: [
          {
            type: "changed",
            text: "Profile photo container in About section now has bg-primary/10 as a branded placeholder shown while the WebP loads; fetchPriority='high' added alongside the existing priority prop",
          },
        ],
      },
    ],
  },
  {
    version: "0.9.0",
    date: "2026-03-02",
    summary:
      "Added /blog section with 4 posts, blog preview on landing page, restructured navbar into section/page groups, updated domain to tanamaroby.com, and improved LCP with next/image priority on profile photo.",
    groups: [
      {
        title: "New Features",
        entries: [
          {
            type: "added",
            text: "/blog route — list page at /blog with all posts in reverse-chronological order",
          },
          {
            type: "added",
            text: "/blog/[slug] — individual post pages rendering structured content blocks (headings, paragraphs, code, lists, callouts)",
          },
          {
            type: "added",
            text: "4 blog posts: Next.js App Router deep-dive, React performance patterns, AG Grid in production lessons, and modern ERP vs SaaS bespoke analysis",
          },
          {
            type: "added",
            text: 'Blog preview section on landing page — 3 most recent posts in a card grid with a "View all posts" CTA',
          },
        ],
      },
      {
        title: "Navigation",
        entries: [
          {
            type: "changed",
            text: "Navbar redesigned with two groups: section links (scroll anchors) and page links (Blog, Changelog) separated by a visual divider",
          },
          {
            type: "changed",
            text: 'Mobile drawer now shows "Sections" and "Pages" labels to reduce crowding',
          },
          {
            type: "changed",
            text: "Logo and Hire Me CTA now navigate to /#contact when viewed from non-home pages",
          },
          {
            type: "added",
            text: "Page links (Blog, Changelog) show active underline indicator based on current pathname",
          },
        ],
      },
      {
        title: "SEO & Infrastructure",
        entries: [
          {
            type: "changed",
            text: "Domain updated sitewide from robytanama.dev to tanamaroby.com (layout.tsx, sitemap.ts, robots.ts, changelog layout, OG image)",
          },
          {
            type: "changed",
            text: "OG image bottom row now displays tanamaroby.com",
          },
          {
            type: "added",
            text: "Sitemap expanded with /blog index (priority 0.8) and individual post entries (priority 0.6)",
          },
          {
            type: "added",
            text: "Blog shortcut added to PWA manifest between Projects and Get in Touch",
          },
          {
            type: "added",
            text: "Blog route layout with canonical URL, OpenGraph article metadata, and per-post metadata via generateMetadata",
          },
        ],
      },
      {
        title: "Performance",
        entries: [
          {
            type: "changed",
            text: "Profile photo in About section replaced with next/image (fill + priority + sizes=160px) for improved LCP",
          },
          {
            type: "fixed",
            text: "Lighthouse audit run: Performance 74 (dev mode), Accessibility 100, Best Practices 100, SEO 100",
          },
        ],
      },
      {
        title: "Housekeeping",
        entries: [
          {
            type: "removed",
            text: "Deleted 7 stale image originals from public/: Aether.png, love-letter.png, Radomir.png, Trivial.png, Savenus.jpg, Yogapets.jpg, Roby.jpg (WebP versions retained)",
          },
          {
            type: "fixed",
            text: "z-[999] arbitrary class in loading.tsx simplified to z-999 (Tailwind CSS v4)",
          },
        ],
      },
    ],
  },
  {
    version: "0.8.0",
    date: "2026-03-02",
    summary:
      "Added dark/light mode toggle, active nav indicator, project tech filtering, Testimonials section, and Vercel Analytics.",
    groups: [
      {
        title: "UI & UX",
        entries: [
          {
            type: "added",
            text: "Dark/light mode toggle in navbar — powered by next-themes with mounted-state guard to prevent hydration mismatches; defaults to dark",
          },
          {
            type: "added",
            text: "Active nav indicator — IntersectionObserver watches each section and highlights the corresponding nav link as you scroll (underline transitions in/out)",
          },
          {
            type: "added",
            text: "Project tech filtering — filter pill buttons above the projects grid let visitors filter by technology; AnimatePresence handles card enter/exit transitions",
          },
        ],
      },
      {
        title: "Content",
        entries: [
          {
            type: "added",
            text: "Testimonials section — four client testimonials from founders, operators, and product leaders; placed between Projects and Contact",
          },
        ],
      },
      {
        title: "Analytics",
        entries: [
          {
            type: "added",
            text: "Vercel Analytics integrated via @vercel/analytics/react — <Analytics /> injected inside Providers in the root layout",
          },
        ],
      },
      {
        title: "Infrastructure",
        entries: [
          {
            type: "added",
            text: 'components/providers.tsx — ThemeProvider wrapper; root layout html element no longer hardcodes className="dark"',
          },
          {
            type: "changed",
            text: 'viewport colorScheme updated from "dark" to "dark light"; themeColor media query now returns #ffffff for light mode',
          },
        ],
      },
    ],
  },
  {
    version: "0.7.0",
    date: "2026-03-02",
    summary:
      "SEO & performance: WebP image conversion, WebSite/WebPage JSON-LD @graph, apple-touch-icon meta links, and Twitter card alt text.",
    groups: [
      {
        title: "Performance",
        entries: [
          {
            type: "changed",
            text: "All project screenshot images converted to WebP (cwebp -q 85 -resize 1200 0) — original PNGs were up to 5 MB; WebP counterparts are 48–64 KB (97–99% reduction)",
          },
          {
            type: "changed",
            text: "Profile photo (Roby.jpg) converted to WebP — 77 KB → 24 KB",
          },
          {
            type: "changed",
            text: "All image paths in projects.tsx and about.tsx updated to reference the new .webp files",
          },
        ],
      },
      {
        title: "SEO",
        entries: [
          {
            type: "added",
            text: "JSON-LD restructured as @graph with WebSite and WebPage schemas alongside the existing Person schema, with @id anchors for cross-referencing",
          },
          {
            type: "added",
            text: "apple-touch-icon meta links added via Next.js metadata icons.apple (192×192 and 512×512)",
          },
          {
            type: "fixed",
            text: "Twitter card images array now uses object form { url, alt } so the OG image has correct alt text for accessibility audits",
          },
        ],
      },
      {
        title: "Docs",
        entries: [
          {
            type: "changed",
            text: "Copilot instructions updated: WebP conversion workflow added to 'Adding a Project' section, checklist updated to reference structuredDataJsonLd and new image optimisation item",
          },
        ],
      },
    ],
  },
  {
    version: "0.6.0",
    date: "2026-03-02",
    summary:
      "UI polish: semi-transparent back-to-top button, scroll-driven hero orb parallax, green glow consulting badge, Next.js added to backend skills, and production web apps tagline.",
    groups: [
      {
        title: "UI & UX",
        entries: [
          {
            type: "changed",
            text: "Back-to-top button is now semi-transparent (opacity-40) at rest and fades to full opacity on hover, so it no longer obscures page text",
          },
          {
            type: "added",
            text: "Hero background orbs now move with scroll via Framer Motion useScroll + useTransform — performant transform-only parallax with no layout reflows",
          },
          {
            type: "changed",
            text: '"Open to consulting" badge now uses the new --available green token with a soft glow (glow-available-sm), making availability clearly visible at a glance',
          },
          {
            type: "changed",
            text: "Hero description updated to highlight specialization in production-ready, industry-grade web applications",
          },
        ],
      },
      {
        title: "Content",
        entries: [
          {
            type: "added",
            text: "Next.js added to the Backend skills category in the Skills section",
          },
        ],
      },
    ],
  },
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
