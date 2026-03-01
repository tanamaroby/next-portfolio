# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
