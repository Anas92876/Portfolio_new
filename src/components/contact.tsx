"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile, socials } from "@/data/portfolio";
import { SocialIcon } from "./icons";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";

export function Contact({ headingAs: Heading = "h2" }: { headingAs?: "h1" | "h2" }) {
  const [copied, setCopied] = useState(false);
  const MotionHeading = Heading === "h1" ? motion.h1 : motion.h2;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.2"] });
  const headingScale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.4, 1.15]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity, x: "-50%" }}
          className="absolute -bottom-60 left-1/2 h-[500px] w-[900px] rounded-full bg-accent/20 blur-[140px]"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-28 text-center sm:px-8 md:py-44">
        <Reveal>
          <p className="mb-8 flex items-center justify-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
            <span className="text-accent">04</span>
            <span className="h-px w-8 bg-line-strong" />
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <MotionHeading
            style={{ scale: headingScale }}
            className="mx-auto max-w-4xl text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] font-medium tracking-[-0.04em] text-balance"
          >
            Let&apos;s build something{" "}
            <span className="font-serif font-normal text-accent italic">remarkable</span> together.
          </MotionHeading>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-lg text-lg text-pretty text-muted">
            Have a project in mind, a role to fill, or just want to say hi? My inbox is always open.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-fg pr-2 pl-7 text-base font-medium text-bg transition-transform active:scale-95"
              >
                {profile.email}
                <span className="grid size-10 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(profile.email);
                setCopied(true);
              }}
              aria-label="Copy email address"
              className="relative grid size-14 place-items-center rounded-full border border-line-strong bg-elev/60 backdrop-blur transition-colors hover:bg-line"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "ok" : "copy"}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
          <p aria-live="polite" className="h-4 font-mono text-xs text-subtle">
            {copied ? "Copied to clipboard" : ""}
          </p>

          <ul className="flex flex-wrap justify-center gap-3">
            {socials
              .filter((s) => s.label !== "Email")
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <SocialIcon label={s.label} className="size-4" />
                    {s.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:opacity-100" />
                  </a>
                </li>
              ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
