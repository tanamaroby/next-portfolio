# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.9.0] — 2026-03-02

Added /blog section with 4 posts, blog preview on landing page, restructured navbar into section/page groups, updated domain to tanamaroby.com, and improved LCP with next/image priority on profile photo.

### Added

#### New Features
- **/blog route** — list page at `/blog` showing all posts in reverse-chronological order
- **/blog/[slug]** — individual post pages rendering structured content blocks (headings, paragraphs, code, lists, callouts)
- **4 blog posts**: Next.js App Router deep-dive, React performance patterns, AG Grid in production lessons, and modern ERP vs SaaS bespoke analysis
- **Blog preview section** on the landing page — 3 most recent posts in a card grid with a "View all posts" CTA

#### Navigation
- **Page links (Blog, Changelog)** now show active underline indicator based on current pathname
- **Blog shortcut** added to PWA manifest between Projects and Get in Touch

#### SEO & Infrastructure
- Sitemap expanded with `/blog` index (priority 0.8) and individual post entries (priority 0.6)
- Blog route layout with canonical URL, OpenGraph article metadata, and per-post metadata via `generateMetadata`

### Changed

#### Navigation
- **Navbar redesigned** with two groups: section links (scroll anchors) and page links (Blog, Changelog) separated by a visual divider
- **Mobile drawer** now shows "Sections" and "Pages" labels to reduce crowding
- **Logo and Hire Me CTA** now navigate to `/#contact` when viewed from non-home pages

#### SEO & Infrastructure
- **Domain updated** sitewide from `robytanama.dev` to `tanamaroby.com` (`layout.tsx`, `sitemap.ts`, `robots.ts`, changelog layout, OG image)
- **OG image** bottom row now displays `tanamaroby.com`

#### Performance
- **Profile photo** in About section replaced with `next/image` (`fill` + `priority` + `sizes="160px"`) for improved LCP

### Fixed
- `z-[999]` arbitrary class in `loading.tsx` simplified to `z-999` (Tailwind CSS v4 syntax)
- Lighthouse audit: Performance 74 (dev mode), Accessibility 100, Best Practices 100, SEO 100

### Removed
- **7 stale image originals** deleted from `public/`: `Aether.png`, `love-letter.png`, `Radomir.png`, `Trivial.png`, `Savenus.jpg`, `Yogapets.jpg`, `Roby.jpg` (WebP versions retained)

---

## [0.8.0] — 2026-03-02

Added dark/light mode toggle, active nav indicator, project tech filtering, Testimonials section, and Vercel Analytics.

### Added

#### UI & UX
- **Dark/light mode toggle** — powered by `next-themes`; mounted-state guard prevents hydration mismatches; defaults to dark
- **Active nav indicator** — `IntersectionObserver` watches each section and highlights the corresponding link as you scroll; underline transitions in/out
- **Project tech filtering** — filter pill buttons above the projects grid; `AnimatePresence` handles card enter/exit transitions

#### Content
- **Testimonials section** — four client testimonials from founders, operators, and product leaders; placed between Projects and Contact

#### Analytics
- **Vercel Analytics** — `@vercel/analytics/react` integrated; `<Analytics />` injected inside `Providers` in root layout

### Changed

#### Infrastructure
- **`components/providers.tsx`** — new `ThemeProvider` wrapper; `html` element no longer hardcodes `className="dark"`
- **`viewport.colorScheme`** — updated from `"dark"` to `"dark light"`; `themeColor` light-mode media query now returns `#ffffff`

---

## [0.7.0] — 2026-03-02

SEO & performance: WebP image conversion, WebSite/WebPage JSON-LD @graph, apple-touch-icon meta links, and Twitter card alt text.

### Changed

#### Performance
- **Project images** — converted to WebP (`cwebp -q 85 -resize 1200 0`); originals were up to 5 MB, WebP counterparts are 48–64 KB (97–99% reduction)
- **Profile photo** — `Roby.jpg` converted to WebP, 77 KB → 24 KB
- **Image paths** in `projects.tsx` and `about.tsx` updated to reference `.webp` files

#### Docs
- **Copilot instructions** — WebP conversion workflow added to "Adding a Project" section; checklist updated to reference `structuredDataJsonLd` and new image optimisation item

### Added

#### SEO
- **JSON-LD @graph** — `WebSite` and `WebPage` schemas added alongside the existing `Person` schema, all cross-referenced via `@id` anchors
- **`apple-touch-icon`** — added via Next.js `metadata.icons.apple` (192×192 and 512×512)

### Fixed

#### SEO
- **Twitter card `images`** — now uses object form `{ url, alt }` so the OG image carries correct alt text for accessibility audits

---

## [0.6.0] — 2026-03-02

UI polish: semi-transparent back-to-top button, scroll-driven hero orb parallax, green glow consulting badge, Next.js added to backend skills, and production web apps tagline.

### Changed

#### UI & UX
- **Back-to-top button** — now semi-transparent (`opacity-40`) at rest and fades to full opacity on hover, preventing it from obscuring page text
- **"Open to consulting" badge** — uses the new `--available` green token with a soft green glow (`glow-available-sm`), making availability clearly visible at a glance
- **Hero description** — updated to highlight specialization in production-ready, industry-grade web applications

### Added

#### UI & UX
- **Hero orb parallax** — background orbs now move with scroll via Framer Motion `useScroll` + `useTransform`; performant transform-only animation with no layout reflows

#### Content
- **Next.js** added to the Backend skills category in the Skills section

---

## [0.5.0] — 2026-03-02

New UI polish: custom 404 page, full-screen loading spinner, scroll-progress bar, and back-to-top button.

### Added

#### UI & UX
- **Custom 404 page** (`app/not-found.tsx`) — branded with the RT monogram badge, animated background orbs, gradient `404` heading, and Home / Go Back action buttons
- **Full-screen loading spinner** (`app/loading.tsx`) — spinning ring around the RT monogram badge with a pulsing "Loading…" label; shown automatically by Next.js during page navigation
- **Scroll-progress indicator** (`components/scroll-progress.tsx`) — spring-animated 3 px bar fixed at the very top of the viewport, driven by Framer Motion `useScroll` + `useSpring`
- **Back-to-top button** (`components/back-to-top.tsx`) — floating circular button pinned to the bottom-right corner; appears after 400 px of scroll with a smooth animated entrance/exit via Framer Motion `AnimatePresence`

---

## [0.4.0] — 2026-03-02

Maximum SEO and enhanced PWA: dynamic OG image, JSON-LD Person schema, sitemap, robots.txt, rich metadata, and expanded web app manifest with shortcuts.

### Added

#### SEO
- **Dynamic OG image** (1200×630) — generated at the edge via `next/og` / `ImageResponse`; branded with name, role, monogram badge, and colour-matched orbs
- **JSON-LD `Person` schema** injected in the root `<head>` — includes `name`, `jobTitle`, `worksFor` (TrieTech), `alumniOf` (NUS), `address` (Singapore), `email`, and `sameAs` social links (GitHub, LinkedIn, X)
- **`app/sitemap.ts`** — dynamic `sitemap.xml` covering `/` and `/changelog` with `lastModified`, `changeFrequency`, and `priority`
- **`app/robots.ts`** — generates `robots.txt` with sitemap reference, `Allow: /`, and `Disallow: /api/`

#### PWA
- **Manifest shortcuts** — "View Projects", "Get in Touch", and "Changelog" appear in the OS home-screen long-press menu

### Changed

#### SEO
- **Root layout `metadata`** — title updated to include "Co-Founder & CTO · Full-Stack Engineer"; description now mentions Singapore, TrieTech, and key stack; 18-term keywords array; `creator`, `publisher`, `category` fields added; `canonical` URL set; granular `googleBot` directives (`max-image-preview: large`, `max-snippet: -1`); Twitter `site` and `creator` set to `@SCourtest`; `formatDetection` extended with `address` and `email`
- **Changelog route metadata** — added `canonical`, `openGraph`, and `robots` fields
- **`viewport`** — `themeColor` now uses a media-query array instead of a bare string, covering both dark and light preferences

#### PWA
- **`manifest.json`** — added `id`, `lang`, `dir`, `prefer_related_applications: false`, `display_override` (`window-controls-overlay`), `start_url` with `?source=pwa` tracking parameter, and expanded `categories`

---

## [0.3.0] — 2026-03-02

Added love-letter — a full-stack social media platform — to the Projects section.

### Added

#### Projects
- **love-letter** — full-stack social media web app featuring post creation (text, image, audio), friends network, real-time online presence, instant in-app notifications via Supabase Realtime, global live chat room (Supabase Broadcast), personal engagement analytics, admin platform-wide dashboard with CSV/PDF export, versioned public REST API (key-authenticated, rate-limited), PWA with service worker, and containerised deployment via Docker + Vercel
  - Stack: Next.js 16, TypeScript, Tailwind CSS, ShadCN UI, Supabase (Auth, Realtime, Storage, Postgres + RLS), Prisma, Docker

---

## [0.2.0] — 2026-03-02

Content update: populated all sections with real personal information, added profile photo, project screenshots, and a new Experience timeline section.

### Added

#### New Sections
- **Experience section** — vertical timeline with 4 roles (TrieTech, One X Tech, GIC, oCap Management) plus NUS education card at the bottom
- **Experience link** added to Navbar between About and Skills

### Changed

#### Real Content
- **Hero** — updated subtitle to "Co-Founder & CTO @ TrieTech · Full-Stack Engineer", real social links (GitHub: `tanamaroby`, LinkedIn: `tanamaroby`, Twitter/X: `SCourtest`, Email: `tanamaroby@gmail.com`), and real description replacing placeholder text
- **About** — added real profile photo (`Roby.jpg`) via `AvatarImage`, Singapore location pin, real bio paragraphs about TrieTech and NUS, updated interest tags (`Full-Stack Dev`, `SaaS Builder`, `UI/UX Enthusiast`, `Open Source`, `Entrepreneur`, `Team Lead`)
- **Skills** — replaced all placeholder entries with full real tech stack across 6 categories: Languages, Frontend, Backend, Database, DevOps & Cloud, Tools & Practices
- **Projects** — replaced all placeholder cards with 5 real projects (`Trivial`, `YogaPets`, `Aether`, `SaveNUS`, `Radomir`), each with project screenshots from `public/`, real descriptions, and an award badge on Aether (1st Place — NUS CS3247 STePS 2020)
- **Contact** — updated all links to real addresses

---

## [0.1.1] — 2026-03-01

Developer tooling update: added automated "bump the version" workflow to GitHub Copilot instructions.

### Added

#### Developer Tooling
- **"Bump the Version" workflow** in `.github/copilot-instructions.md` — when triggered, Copilot collates git commits since the last release, determines the correct semver bump, and atomically updates `data/changelog.ts`, `CHANGELOG.md`, and `package.json`

---

## [0.1.0] — 2026-03-01

Initial public release of the portfolio. Built from the ground up with Next.js 16, Tailwind CSS v4, ShadCN UI, and Framer Motion.

### Added

#### Layout & Navigation
- **Navbar** — sticky glass header with smooth entrance animation, active-scroll detection, and a collapsible mobile drawer
- **Footer** — copyright notice, attribution, and changelog link
- **Scroll-lock** on mobile menu open

#### Sections
- **Hero** — animated background orbs, headline, sub-headline, description, CTA buttons, social icon links, and a bouncing scroll indicator
- **About** — avatar card with glow ring, stats grid (years experience, projects shipped, etc.), bio paragraphs, and interest/tag badges
- **Skills** — grouped technical toolkit cards organized by category (Languages, Frontend, Backend, Database, DevOps & Cloud, Tools)
- **Projects** — project cards with tech-stack badges, featured star badge, GitHub and live demo links
- **Contact** — email CTA button and social link grid (Email, LinkedIn, GitHub, Twitter)

#### Design System
- Full **light/dark color token** system via CSS custom properties (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--card`, etc.)
- Named theme variables for **accent gradients** (`--gradient-accent`) and **hero orbs** (`--hero-orb-1`, `--hero-orb-2`)
- Custom CSS utilities: `glass`, `text-gradient`, `glow-primary`, `glow-primary-sm`, `section-padding`

#### Animations
- Framer Motion animation variants: `fadeInUp`, `fadeIn`, `slideInLeft`, `slideInRight`, `scaleIn`, `staggerContainer`
- Scroll-triggered entrance animations via `whileInView` with shared `viewportConfig`

#### Components (ShadCN UI)
- `Avatar` with `AvatarFallback`
- `Badge` with `secondary` variant and hover interactions
- `Button` with `default`, `ghost`, and `outline` variants
- `Card`, `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription`
- `Separator`

#### Infrastructure & Configuration
- **Next.js 16** project bootstrapped with TypeScript
- **Tailwind CSS v4** with `@theme inline` token mapping
- **ShadCN** component library integrated via `components.json`
- **ESLint** with `eslint-config-next`
- **PWA support** — `manifest.json`, Apple touch icon, and web-app-manifest images (192×192, 512×512)
- **SEO metadata** — page title template, description, Open Graph, Twitter cards
- **Viewport & theme-color** meta tag for native app-like status bar on iOS/Android
- TypeScript declaration file (`types/css.d.ts`) to suppress CSS import errors
- VSCode workspace settings for JSON schema validation

#### Dependencies Added
- `framer-motion` ^12 — animation library
- `lucide-react` — icon library
- `radix-ui` — headless UI primitives
- `shadcn` — component CLI and base styles
- `class-variance-authority` — component variant management
- `clsx` + `tailwind-merge` — conditional class merging
- `tw-animate-css` — additional Tailwind CSS animation utilities

### Changed
- Replaced the default Next.js boilerplate `app/page.tsx` with full portfolio page composition
- Extended `app/layout.tsx` with complete metadata, viewport, PWA config, and Geist font setup
- Rewrote `app/globals.css` from the minimal Next.js default to a full ShadCN token system with Tailwind v4 `@theme inline` configuration
