# GitHub Copilot Instructions

This document defines the conventions, constraints, and patterns for this Next.js portfolio project. Copilot must follow all of these rules when generating or suggesting code.

---

## Project Overview

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 with `@theme inline` token mapping
- **UI Components**: ShadCN (Radix UI primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 1. Theming — The Most Important Rule

### ❌ Never use raw color values

Raw color literals are forbidden in component files, Tailwind class strings, and CSS unless they are being **defined as a named token** inside `app/globals.css`.

Forbidden patterns:

```tsx
// ❌ Raw oklch
style={{ background: "oklch(0.68 0.24 290 / 18%)" }}

// ❌ Hex codes
style={{ color: "#7c3aed" }}
className="text-[#7c3aed]"

// ❌ Raw rgb / rgba / hsl
style={{ backgroundColor: "rgba(124, 58, 237, 0.1)" }}

// ❌ Tailwind arbitrary color values
className="bg-[oklch(0.68_0.24_290)]"
className="text-[#7c3aed]"
```

### ✅ Always reference design tokens

Every color must reference a CSS custom property defined in `app/globals.css`.

```tsx
// ✅ CSS variable in inline style
style={{ background: "radial-gradient(circle, var(--hero-orb-1) 0%, transparent 70%)" }}

// ✅ Tailwind semantic color class
className="text-primary bg-muted border-border"

// ✅ Tailwind opacity modifier on a theme token
className="bg-primary/10 text-primary/80 border-border/50"

// ✅ CSS variable in @utility (inside globals.css only)
@utility glow-primary {
  box-shadow: 0 0 20px 4px color-mix(in oklch, var(--color-primary) 30%, transparent);
}
```

---

## 2. Design Token Reference

All tokens are defined in `app/globals.css` under `:root` (light mode) and `.dark` (dark mode), and mapped to Tailwind via `@theme inline`.

### Core Tokens (available as Tailwind classes)

| Token                    | Tailwind Class                               | Usage                     |
| ------------------------ | -------------------------------------------- | ------------------------- |
| `--background`           | `bg-background`                              | Page background           |
| `--foreground`           | `text-foreground`                            | Primary text              |
| `--card`                 | `bg-card`                                    | Card surfaces             |
| `--card-foreground`      | `text-card-foreground`                       | Text on cards             |
| `--primary`              | `text-primary`, `bg-primary`                 | Brand color, CTAs         |
| `--primary-foreground`   | `text-primary-foreground`                    | Text on primary bg        |
| `--secondary`            | `bg-secondary`                               | Subtle fills              |
| `--secondary-foreground` | `text-secondary-foreground`                  | Text on secondary         |
| `--muted`                | `bg-muted`                                   | Muted backgrounds         |
| `--muted-foreground`     | `text-muted-foreground`                      | Subdued text              |
| `--accent`               | `bg-accent`                                  | Hover states              |
| `--accent-foreground`    | `text-accent-foreground`                     | Text on accent            |
| `--destructive`          | `text-destructive`, `bg-destructive`         | Errors, danger            |
| `--border`               | `border-border`                              | Borders                   |
| `--input`                | `border-input`                               | Form inputs               |
| `--ring`                 | `ring-ring`                                  | Focus rings               |
| `--gradient-accent`      | `text-gradient-accent`, `bg-gradient-accent` | Branded gradient endpoint |
| `--shadow-color`         | `shadow-shadow`                              | Shadows                   |
| `--hero-orb-1`           | CSS var only — `var(--hero-orb-1)`           | Hero bg orb 1             |
| `--hero-orb-2`           | CSS var only — `var(--hero-orb-2)`           | Hero bg orb 2             |
| `--available`            | `text-available`, `bg-available`             | Open-to-work green accent |

### Chart Tokens (for data visualization only)

- `--chart-1` → `text-chart-1`, `bg-chart-1`
- `--chart-2` → `text-chart-2`, `bg-chart-2`
- `--chart-3` through `--chart-5` follow the same pattern

### Adding New Tokens

When a new color is needed (e.g. for a new section, badge type, or effect):

1. **Define it in `app/globals.css`** inside both `:root` and `.dark` blocks
2. **Expose it in `@theme inline`** to make it usable as a Tailwind class
3. **Use it via semantic class** or `var(--token-name)` in inline styles

```css
/* Step 1 & 2 — in app/globals.css */
@theme inline {
  --color-my-new-token: var(--my-new-token);
}

:root {
  --my-new-token: oklch(0.6 0.15 200); /* light mode value */
}

.dark {
  --my-new-token: oklch(0.7 0.18 200); /* dark mode value */
}
```

```tsx
/* Step 3 — in a component */
className = "text-my-new-token bg-my-new-token/10";
```

---

## 3. Custom CSS Utilities

The following custom utilities are defined in `app/globals.css`. Use them instead of duplicating the styles:

| Class               | Purpose                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `text-gradient`     | Gradient text from `--color-primary` → `--color-gradient-accent` |
| `glow-primary`      | Large primary-colored box-shadow glow                            |
| `glow-primary-sm`   | Small primary-colored box-shadow glow                            |
| `glow-available-sm` | Small green glow for open-to-work / availability indicators      |
| `glass`             | Frosted-glass surface (semi-transparent bg + backdrop blur)      |
| `section-padding`   | Consistent vertical + horizontal padding for page sections       |

**Do not replicate these inline.** If a new reusable visual effect is needed, define it as a `@utility` in `globals.css` using theme tokens — never with raw values.

---

## 4. The One Exception — Browser Meta `themeColor`

The `themeColor` property in `app/layout.tsx` must be a literal string because browser `<meta>` tags do not support CSS variables. This value is extracted into a named constant to document the intent:

```typescript
/**
 * Browser theme-color for the status bar / tab strip.
 * Matches --background in dark mode (oklch(0.145 0 0) ≈ #0a0a0a).
 * Must be a literal string — CSS variables cannot be used in <meta> tags.
 */
const DARK_THEME_COLOR = "#0a0a0f";
```

If the dark background token ever changes, **update this constant** to match.

---

## 5. Component Conventions

### Animations

- Always import motion variants from `@/lib/motion` — never define inline `variants` objects in component files
- Use shared `viewportConfig` for all `whileInView` animations
- Available variants: `fadeInUp`, `fadeIn`, `slideInLeft`, `slideInRight`, `scaleIn`, `staggerContainer`
- For scroll-driven effects (e.g. parallax), use `useScroll` + `useTransform` from Framer Motion — these update only CSS transforms via RAF and avoid layout reflows

If a new animation is needed, **add it to `lib/motion.ts`** rather than defining it inline.

```tsx
// ✅ Correct
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/motion";

<motion.div variants={fadeInUp} initial="hidden" animate="visible">

// ❌ Incorrect — never define variants inline in components
<motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
```

### Section Layout

- Every section must use `section-padding` for consistent vertical spacing
- Max content width is `max-w-6xl` (wide sections) or `max-w-3xl` (narrow/centered)
- Each section needs a `id` attribute for anchor navigation

```tsx
<section id="my-section" className="section-padding mx-auto max-w-6xl">
```

### Data & Constants

- Define static data arrays (links, skills, projects) as named constants in ALL_CAPS at the top of the file
- Keep component files focused on markup — extract complex data to `data/` files when lists grow large

---

## 6. File Structure

```
app/
  globals.css               — Design token source of truth + custom utilities
  layout.tsx                — Root layout, metadata, JSON-LD, fonts
  page.tsx                  — Landing page (section composition only)
  not-found.tsx             — Custom 404 page with animated orbs and branding
  loading.tsx               — Full-screen loading spinner shown during navigation
  robots.ts                 — Generates /robots.txt
  sitemap.ts                — Generates /sitemap.xml
  opengraph-image.tsx       — Edge-rendered OG image (1200×630)
  manifest.json             — PWA web app manifest
  changelog/                — Changelog route
    layout.tsx              — Changelog route metadata
    page.tsx                — Changelog page component

components/
  navbar.tsx                — Site navigation (active section indicator via IntersectionObserver, theme toggle)
  footer.tsx                — Site footer
  providers.tsx             — Client-side ThemeProvider wrapper (next-themes); imported by root layout
  scroll-progress.tsx       — Thin branded bar at the top tracking scroll position
  back-to-top.tsx           — Floating button (bottom-right); appears after 400px scroll
  sections/                 — Full-page sections
    hero.tsx                — Landing hero with animated orbs, social links, CTA
    about.tsx               — Profile photo, stats grid, bio, interest tags
    experience.tsx          — Vertical timeline of work history + education card
    skills.tsx              — Technical toolkit grouped by category
    projects.tsx            — Project cards with images, tech badges, filter pills, award badges
    testimonials.tsx        — Client testimonial cards grid
    contact.tsx             — Email CTA and social link grid
  ui/                       — ShadCN-generated primitives (do not edit manually)

data/
  changelog.ts              — Structured changelog data (source for /changelog page)

lib/
  motion.ts                 — Framer Motion variant definitions
  utils.ts                  — cn() utility from clsx + tailwind-merge

types/                      — TypeScript declarations
public/                     — Static assets (profile photo, project screenshots)
```

---

## 7. ShadCN UI Components

- Components live in `components/ui/` and are **generated by ShadCN** — do not edit them directly
- To add a new component: `npx shadcn@latest add <component-name>`
- To override styles, use the `className` prop with semantic Tailwind tokens

---

## 8. Dark / Light Mode

The site supports dark and light themes via **`next-themes`**.

- `components/providers.tsx` wraps children in `<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>`
- `providers.tsx` is imported in `app/layout.tsx` and wraps all page content inside `<body>`
- The `<html>` element does **not** have a hardcoded `className="dark"` — `next-themes` manages this at runtime
- `suppressHydrationWarning` must remain on `<html>` to suppress the one-time class mismatch
- Any component that renders theme-dependent UI (e.g. the toggle icon) must use a `mounted` state guard:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <div className="h-9 w-9" aria-hidden />; // placeholder maintains layout
```

- `viewport.colorScheme` is `"dark light"` — never lock it back to `"dark"`
- `themeColor` uses two media-query entries (dark → `DARK_THEME_COLOR`, light → `LIGHT_THEME_COLOR`)

---

## 8b. Active Nav Indicator

The navbar uses `IntersectionObserver` — **not** scroll events — to track which section is in view:

- One `IntersectionObserver` is created per section ID; all are disconnected on cleanup
- `rootMargin: "-40% 0% -60% 0%"` fires when a section occupies the central 20% of the viewport
- Active state is stored in `activeSection: string`; the matching link renders a full-width underline
- The same `activeSection` state highlights mobile drawer items with `bg-accent/50`

---

## 8c. Analytics

- Vercel Analytics is enabled via `@vercel/analytics/react`
- `<Analytics />` is rendered inside `<Providers>` in `app/layout.tsx`
- No configuration is needed beyond the Vercel dashboard toggle

---

### Metadata (`app/layout.tsx`)

- All metadata is defined via Next.js `Metadata` export — never via manual `<meta>` tags in JSX
- `TITLE` and `DESCRIPTION` constants are defined once and reused across `openGraph`, `twitter`, etc.
- `metadataBase` must always be set to `BASE_URL` so relative image paths resolve correctly
- `robots` directive must include `googleBot` with `max-image-preview: "large"` and `max-snippet: -1`
- `alternates.canonical` must be set on every page layout
- The Twitter `site` and `creator` are set to `@SCourtest`
- `viewport.themeColor` uses a media-query array (dark + light) — **never** a bare string

### OG Image (`app/opengraph-image.tsx`)

- Generated at edge runtime using `ImageResponse` from `next/og`
- Size is `1200 × 630` — do not change
- Must use only **raw color literals** (not CSS variables) — `ImageResponse` runs outside the browser CSS engine
- Background colours in the OG image must visually match `DARK_THEME_COLOR` and the primary brand colour
- Twitter image reuses the same OG image (no separate `twitter-image.tsx` needed)

### Sitemap (`app/sitemap.ts`)

- Add a new entry for every new publicly accessible route
- Use `"monthly"` `changeFrequency` for the home page, `"weekly"` for content pages
- Priority: `1` for `/`, `0.7` for content pages

### Robots (`app/robots.ts`)

- Always reference the sitemap URL
- Default: allow all, disallow `/api/`

### JSON-LD Structured Data

- The `personJsonLd` constant in `app/layout.tsx` provides the `Person` schema — keep it in sync with real contact and social data
- Inject via `<script type="application/ld+json">` in the `<head>` using `dangerouslySetInnerHTML`
- Do not add a second `<head>` tag — the existing one in `RootLayout` is the correct injection point

### PWA (`app/manifest.json`)

- `id` field must match `start_url` path (`"/"`)
- `start_url` must include `?source=pwa` for install-source analytics
- Shortcuts must have a matching icon entry
- `prefer_related_applications` must remain `false`
- `display_override` order: `window-controls-overlay` → `standalone` → `minimal-ui`
- Adding a new major route → add a corresponding shortcut

---

## 11. Adding a Testimonial

Testimonials live in the `TESTIMONIALS` constant at the top of `components/sections/testimonials.tsx`.

### `Testimonial` interface

```typescript
interface Testimonial {
  quote: string; // Full testimonial text (no surrounding quotes — template adds them)
  title: string; // Job title of the reviewer
  industry: string; // Broad industry descriptor — company name withheld per client request
}
```

- **Never** add a real name or company name — identities are kept confidential; use `title` + `industry` only
- Keep quotes 1–3 sentences; focus on concrete outcomes or work ethic
- Order: most recent / most impactful first
- Always bump the version after adding a testimonial (counts as `added`)

---

## 12. Adding a Project

Projects live in the `PROJECTS` constant at the top of `components/sections/projects.tsx`.

### `Project` interface

```typescript
interface Project {
  title: string; // "Name — Subtitle" format
  description: string; // 2–3 sentences: what it does, key features
  tech: string[]; // Tech stack badges, most prominent first
  image?: string; // Path relative to /public (e.g. "/MyProject.webp") — always convert to WebP first
  github?: string; // Omit if repo is private or NDA
  demo?: string; // Omit if no live URL
  featured?: boolean; // Show "Featured" star badge — use sparingly
  award?: string; // e.g. "1st Place — NUS CS3247 STePS 2020"
}
```

### Conventions

- **Ordering** — newest / most significant projects first in the array
- **Images** — convert screenshots to WebP before adding to `public/`: `cwebp -q 85 -resize 1200 0 input.png -o output.webp`. Use `PascalCase.webp` or `kebab-case.webp` naming and reference as `"/filename.webp"`. Use `next/image` with `fill` + `object-cover` (already wired up in the card)
- **NDA projects** — omit `github` and `demo`; the description can note "details under NDA"
- **Always bump the version** after adding or meaningfully updating a project (counts as `added` / `changed`)

---

## 13. Changelog Maintenance

When releasing a new version:

1. **Add a new entry to `data/changelog.ts`** — it must go at the **top** of the `CHANGELOG` array (newest first)
2. **Update `CHANGELOG.md`** — mirror the same content in Markdown format
3. **Update `"version"` in `package.json`**

Use the `ChangelogVersion` type from `data/changelog.ts` for type safety. Group entries under a `ChangeGroup.title` and tag them with the correct `ChangeType`:

| Type       | Meaning                    |
| ---------- | -------------------------- |
| `added`    | New feature or content     |
| `changed`  | Modified existing behavior |
| `fixed`    | Bug fix                    |
| `removed`  | Removed feature            |
| `security` | Security patch             |

---

## 14. "Bump the Version" Workflow

When the user says **"bump the version"** (or any equivalent like "release", "cut a release", "publish a new version"), Copilot must execute the following steps autonomously — do not ask for confirmation unless a decision is genuinely ambiguous.

### Step 1 — Collate all changes since the last release

1. Run `git log --oneline` to list commits since the previous release.
2. **Also include any changes made in the current turn** (files edited before the bump request was issued) — these may not be committed yet but are still part of the release.
3. Inspect changed files to infer **what** changed (new components, bug fixes, refactors, etc.).
4. Group the changes under the correct `ChangeType` categories: `added`, `changed`, `fixed`, `removed`, `security`.

### Step 2 — Determine the new version number

Apply **semantic versioning** (`MAJOR.MINOR.PATCH`) against the current version in `package.json`:

| Condition                                              | Bump  |
| ------------------------------------------------------ | ----- |
| Breaking change or incompatible API/behavior change    | MAJOR |
| New user-visible feature (`added`)                     | MINOR |
| Bug fixes, refactors, or small `changed`/`fixed` items | PATCH |

When multiple conditions apply, use the highest applicable bump.

### Step 3 — Update all four release artifacts atomically

Make all edits in a single pass:

1. **`data/changelog.ts`** — prepend a new `ChangelogVersion` object at the top of the `CHANGELOG` array. Use today's date (`YYYY-MM-DD`), the new version string, a concise one-sentence `summary`, and the grouped `ChangeEntry` list from Step 1.
2. **`CHANGELOG.md`** — prepend a matching Markdown section at the top of the file (below the `# Changelog` heading if present), mirroring the same content.
3. **`package.json`** — update `"version"` to the new version string.

### Step 4 — Verify

After editing, confirm:

- The new version in `package.json` matches the version in the new `CHANGELOG` entry.
- `CHANGELOG.md` and `data/changelog.ts` are in sync.
- No other `version` references (e.g. `app/layout.tsx` metadata) are stale — update them if found.

### Example

```
User: add the love-letter project, then bump the version

Copilot actions:
1. Adds project object to PROJECTS array in projects.tsx
2. git log --oneline  →  no new commits yet, but project was just added in this turn
3. Determines bump: new project = MINOR  →  0.2.0 → 0.3.0
4. Prepends entry to data/changelog.ts
5. Prepends section to CHANGELOG.md
6. Updates package.json "version": "0.3.0"
```

---

## 15. TypeScript

- All props must be typed with `interface` or `type` — never use `any`
- Prefer `interface` for component props, `type` for unions and utility types
- Use `as const` for static lookup objects (e.g. `CHANGE_TYPE_META`)

---

## 16. Quick Reference Checklist

Before submitting any code change:

- [ ] No raw hex, oklch, rgb, rgba, or hsl literals in component or utility files
- [ ] All new colors are defined as named tokens in `app/globals.css`
- [ ] Tailwind color classes use semantic tokens (`text-primary`, not `text-purple-500`)
- [ ] Reusable visual patterns use `@utility` in `globals.css`, not inline styles
- [ ] Animation variants are imported from `lib/motion.ts`
- [ ] Theme-dependent client UI uses `mounted` state guard to prevent hydration mismatch
- [ ] New changelog entries are added to both `data/changelog.ts` and `CHANGELOG.md`
- [ ] `package.json` version is bumped for any user-visible release
- [ ] New public routes are added to `app/sitemap.ts`
- [ ] `alternates.canonical` is set in every new page/route layout
- [ ] OG image raw colors visually match brand theme (CSS variables are not available in `ImageResponse`)
- [ ] JSON-LD `structuredDataJsonLd` in `layout.tsx` is kept in sync with real contact/social data
- [ ] New project images are converted to WebP (`cwebp -q 85 -resize 1200 0`) before being placed in `public/`
- [ ] New major routes get a corresponding PWA shortcut in `manifest.json`
- [ ] New sections added to both `app/page.tsx` and the `NAV_LINKS` array in `components/navbar.tsx`
