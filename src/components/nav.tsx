"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, profile } from "@/data/portfolio";
import { ThemeToggle } from "./theme-toggle";
import { ease } from "./reveal";
import { setScrollLocked } from "./smooth-scroll";

export const OPEN_COMMAND_MENU = "open-command-menu";

/** True when `pathname` is `href` or one of its sub-pages (e.g. /projects/atlas → /projects). */
export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export function Nav() {
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    return () => setScrollLocked(false);
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border py-1.5 pr-1.5 pl-4 transition-all duration-500 ${
            scrolled || open
              ? "border-line-strong bg-bg/70 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.35)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
          aria-label="Primary"
        >
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
            <span className="grid size-7 place-items-center rounded-full bg-fg font-mono text-[11px] font-semibold text-bg transition-transform duration-500 group-hover:rotate-[360deg]">
              {profile.initials}
            </span>
            <span className="hidden text-sm font-medium whitespace-nowrap lg:block">{profile.name}</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-full px-3 py-2 text-sm transition-colors lg:px-4 ${
                      active ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-line"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/contact"
              className="ml-1 hidden h-9 items-center rounded-full bg-fg px-4 text-sm font-medium whitespace-nowrap text-bg transition-opacity hover:opacity-85 md:flex"
            >
              Let&apos;s talk
            </Link>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full text-fg md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-bg/95 px-6 pt-28 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, ease, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={`flex items-baseline gap-4 border-b border-line py-4 text-4xl font-medium tracking-tight ${
                      isActive(pathname, item.href) ? "text-fg" : "text-muted"
                    }`}
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
