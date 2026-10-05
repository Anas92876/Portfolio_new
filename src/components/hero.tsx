"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "motion/react";
import { profile, socials } from "@/data/portfolio";
import { useLocalTime } from "@/lib/hooks";
import { SocialIcon } from "./icons";
import { Magnetic } from "./magnetic";
import { ease } from "./reveal";

// WebGL scene is client-only and code-split so it never blocks first paint.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

const headline = [
  { text: "Engineering", serif: false },
  { text: "digital", serif: false },
  { text: "products", serif: false },
  { text: "with", serif: true },
  { text: "craft", serif: true },
  { text: "&", serif: true },
  { text: "intent.", serif: true },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const time = useLocalTime(profile.timezone);

  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${smx}% ${smy}%, var(--glow), transparent 70%)`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="relative flex min-h-dvh flex-col overflow-hidden"
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      {/* 3D object */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 lg:left-[38%] lg:opacity-100">
        <motion.div
          className="size-full"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.8, ease, delay: 0.6 }}
        >
          <HeroScene frameloop={!inView ? "never" : reduce ? "demand" : "always"} />
        </motion.div>
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-32 pb-16 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-line-strong bg-elev/60 py-1.5 pr-4 pl-3 text-xs text-muted backdrop-blur"
        >
          <span className="relative flex size-2">
            {profile.available && (
              <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
            )}
            <span
              className={`relative inline-flex size-2 rounded-full ${profile.available ? "bg-emerald-400" : "bg-subtle"}`}
            />
          </span>
          {profile.availability}
        </motion.div>

        <h1 className="max-w-5xl text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[0.95] font-medium tracking-[-0.045em]">
          <span className="sr-only">
            {profile.name}, {profile.role}.{" "}
          </span>
          {headline.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className={`inline-block ${
                  word.serif ? "font-serif font-normal tracking-[-0.02em] text-muted italic" : "text-gradient"
                }`}
                initial={reduce ? false : { y: "110%", rotate: 4 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 1, ease, delay: 0.4 + i * 0.06 }}
              >
                {word.text}
              </motion.span>
              {i < headline.length - 1 && " "}
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1 }}
          className="mt-10 grid gap-10 md:grid-cols-12 md:items-end"
        >
          <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted md:col-span-6">
            I&apos;m <span className="text-fg">{profile.name}</span>, a{" "}
            {profile.role.toLowerCase()}. {profile.intro}
          </p>

          <div className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end">
            <Magnetic>
              <Link
                href="/projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-on-accent shadow-[0_10px_40px_-10px_var(--accent)] transition-transform active:scale-95"
              >
                View all projects
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
            {profile.resume && (
              <Magnetic>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-elev/50 px-6 text-sm font-medium backdrop-blur transition-colors hover:bg-line active:scale-95"
                >
                  <Download className="size-4" />
                  Résumé
                </a>
              </Magnetic>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-t border-line px-5 py-6 text-xs text-muted sm:px-8"
      >
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {profile.location}
          </span>
          <span className="hidden items-center gap-1.5 font-mono sm:flex" suppressHydrationWarning>
            <span className="size-1 rounded-full bg-accent" />
            {time ?? "--:--"} local
          </span>
        </div>

        <a href="#work" className="hidden items-center gap-2 transition-colors hover:text-fg md:flex">
          Scroll to explore
          <motion.span
            animate={reduce ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-3.5" />
          </motion.span>
        </a>

        <ul className="flex items-center gap-1">
          {socials
            .filter((s) => s.label !== "Email")
            .map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-8 place-items-center rounded-full transition-colors hover:bg-line hover:text-fg"
                >
                  <SocialIcon label={s.label} className="size-3.5" />
                </a>
              </li>
            ))}
        </ul>
      </motion.div>
    </section>
  );
}
