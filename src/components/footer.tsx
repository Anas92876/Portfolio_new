"use client";

import { ArrowUp, ArrowUpRight, Clock, Download, MapPin } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { nav, profile, socials } from "@/data/portfolio";
import { useLocalTime } from "@/lib/hooks";
import { SocialIcon } from "./icons";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-5 font-mono text-[11px] tracking-widest text-subtle uppercase">{title}</p>
      {children}
    </div>
  );
}

const linkClass = "group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg";

export function Footer() {
  const time = useLocalTime(profile.timezone);

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Identity */}
          <div className="md:col-span-5">
            <Link href="/" className="mb-6 inline-flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-fg text-sm font-semibold text-bg">
                {profile.initials}
              </span>
              <span>
                <span className="block font-medium">{profile.name}</span>
                <span className="block text-sm text-muted">{profile.role}</span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm leading-relaxed text-pretty text-muted">{profile.tagline}</p>
            {profile.available && (
              <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-elev/60 py-1.5 pr-4 pl-3 text-xs text-muted">
                <span className="size-2 rounded-full bg-emerald-400" />
                {profile.availability}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <Column title="Navigate">
              <ul className="space-y-3 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>

            <Column title="Connect">
              <ul className="space-y-3 text-sm">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      {...(s.label === "Email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                      className={linkClass}
                    >
                      <SocialIcon label={s.label} className="size-3.5" />
                      {s.label}
                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
                {profile.resume && (
                  <li>
                    <a href={profile.resume} target="_blank" rel="noopener" className={linkClass}>
                      <Download className="size-3.5" />
                      Résumé
                    </a>
                  </li>
                )}
              </ul>
            </Column>

            <Column title="Based in">
              <p className="mb-2 flex items-center gap-2 text-sm text-fg">
                <MapPin className="size-3.5 text-accent" />
                {profile.location}
              </p>
              <p className="flex items-center gap-2 font-mono text-sm text-muted" suppressHydrationWarning>
                <Clock className="size-3.5" />
                {time ?? "--:--"} local
              </p>
              <p className="mt-4 text-sm text-muted">Open to remote work.</p>
            </Column>
          </div>
        </div>

        {/* Wordmark — sized to the container width so the full name always fits one line */}
        <div className="@container mt-16 md:mt-24">
          <p
            aria-hidden
            className="pointer-events-none bg-gradient-to-b from-fg/15 to-fg/0 bg-clip-text text-[10.5cqw] leading-[1.05] font-medium tracking-[-0.05em] whitespace-nowrap text-transparent select-none"
          >
            {profile.name}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-subtle sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="hidden font-mono md:block">
            Press <kbd className="rounded border border-line px-1.5 py-0.5">Ctrl</kbd>{" "}
            <kbd className="rounded border border-line px-1.5 py-0.5">K</kbd> to navigate
          </p>
          <a href="#top" className="group inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
