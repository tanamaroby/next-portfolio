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
