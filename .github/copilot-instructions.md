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

| Class             | Purpose                                                          |
| ----------------- | ---------------------------------------------------------------- |
| `text-gradient`   | Gradient text from `--color-primary` → `--color-gradient-accent` |
| `glow-primary`    | Large primary-colored box-shadow glow                            |
| `glow-primary-sm` | Small primary-colored box-shadow glow                            |
| `glass`           | Frosted-glass surface (semi-transparent bg + backdrop blur)      |
| `section-padding` | Consistent vertical + horizontal padding for page sections       |

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
  globals.css          — Design token source of truth + custom utilities
  layout.tsx           — Root layout, metadata, fonts
  page.tsx             — Landing page (section composition only)
  changelog/           — Changelog route
    layout.tsx         — Changelog route metadata
    page.tsx           — Changelog page component

components/
  navbar.tsx           — Site navigation
  footer.tsx           — Site footer
  sections/            — Full-page sections (hero, about, skills, projects, contact)
  ui/                  — ShadCN-generated primitives (do not edit manually)

data/
  changelog.ts         — Structured changelog data (source for /changelog page)

lib/
  motion.ts            — Framer Motion variant definitions
  utils.ts             — cn() utility from clsx + tailwind-merge

types/                 — TypeScript declarations
public/                — Static assets
```

---

## 7. ShadCN UI Components

- Components live in `components/ui/` and are **generated by ShadCN** — do not edit them directly
- To add a new component: `npx shadcn@latest add <component-name>`
- To override styles, use the `className` prop with semantic Tailwind tokens

---

## 8. Changelog Maintenance

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

## 9. TypeScript

- All props must be typed with `interface` or `type` — never use `any`
- Prefer `interface` for component props, `type` for unions and utility types
- Use `as const` for static lookup objects (e.g. `CHANGE_TYPE_META`)

---

## 10. Quick Reference Checklist

Before submitting any code change:

- [ ] No raw hex, oklch, rgb, rgba, or hsl literals in component or utility files
- [ ] All new colors are defined as named tokens in `app/globals.css`
- [ ] Tailwind color classes use semantic tokens (`text-primary`, not `text-purple-500`)
- [ ] Reusable visual patterns use `@utility` in `globals.css`, not inline styles
- [ ] Animation variants are imported from `lib/motion.ts`
- [ ] New changelog entries are added to both `data/changelog.ts` and `CHANGELOG.md`
- [ ] `package.json` version is bumped for any user-visible release
