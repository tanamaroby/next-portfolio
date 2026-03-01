"use client";

// Navbar: sticky glass header with mobile drawer, active section indicator, theme toggle
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — render nothing on the server
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex h-9 w-9 items-center justify-center" aria-hidden />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

/** Anchor links that scroll within the home page */
const SECTION_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

/** Full-page route links */
const PAGE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/changelog", label: "Changelog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Scroll detection for glass header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Performant active section tracking via IntersectionObserver (home only)
  useEffect(() => {
    if (!isHome) return;
    const sectionIds = SECTION_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        // Trigger when section occupies centre 20% of viewport
        { rootMargin: "-40% 0% -60% 0%", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-lg shadow-shadow/20" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a
            href={isHome ? "#" : "/"}
            className="group flex items-center gap-2.5"
            onClick={closeMenu}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary glow-primary-sm transition-all duration-300 group-hover:scale-110">
              <span className="font-mono text-xs font-bold text-primary-foreground">
                RT
              </span>
            </div>
            <span className="hidden font-semibold tracking-tight text-foreground sm:block">
              Roby Tanama
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {/* Section links — only highlighted on the home page */}
            <ul className="flex items-center gap-1">
              {SECTION_LINKS.map((link) => {
                const isActive = isHome && activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={isHome ? link.href : `/${link.href}`}
                      className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute inset-x-3 bottom-0 h-px rounded-full bg-primary transition-transform duration-200 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Divider between sections and pages */}
            <span
              className="mx-1 h-4 w-px rounded-full bg-border"
              aria-hidden="true"
            />

            {/* Page links */}
            <ul className="flex items-center gap-1">
              {PAGE_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute inset-x-3 bottom-0 h-px rounded-full bg-primary transition-transform duration-200 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA + theme toggle + mobile toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              size="sm"
              className="hidden glow-primary-sm md:inline-flex"
              asChild
            >
              <a href={isHome ? "#contact" : "/#contact"}>Hire Me</a>
            </Button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-border px-6 py-4 md:hidden"
          >
            {/* Section links */}
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Sections
            </p>
            <ul className="flex flex-col gap-1">
              {SECTION_LINKS.map((link) => {
                const isActive = isHome && activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={isHome ? link.href : `/${link.href}`}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground ${
                        isActive
                          ? "bg-accent/50 text-foreground"
                          : "text-muted-foreground"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Page links */}
            <p className="mt-3 mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Pages
            </p>
            <ul className="flex flex-col gap-1">
              {PAGE_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground ${
                        isActive
                          ? "bg-accent/50 text-foreground"
                          : "text-muted-foreground"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3">
              <Button className="w-full glow-primary-sm" asChild>
                <a href={isHome ? "#contact" : "/#contact"} onClick={closeMenu}>
                  Hire Me
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
