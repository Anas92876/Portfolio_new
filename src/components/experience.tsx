"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, GraduationCap, Trophy } from "lucide-react";
import { useRef } from "react";
import { education, experience } from "@/data/portfolio";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

/** Timeline dot that lights up once the progress line reaches it. */
function Dot({ progress, at }: { progress: MotionValue<number>; at: number }) {
  const lit = useTransform(progress, [at - 0.02, at + 0.02], [0, 1]);
  return (
    <span className="absolute top-11 -left-[5px] hidden size-[11px] rounded-full border border-line-strong bg-bg md:block">
      <motion.span
        style={{ opacity: lit, scale: lit }}
        className="absolute inset-0.5 rounded-full bg-accent shadow-[0_0_14px_2px_var(--glow)]"
      />
    </span>
  );
}

export function Experience({ headingAs }: { headingAs?: "h1" | "h2" }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.7", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40">
      <SectionHeading
        as={headingAs}
        index="03"
        eyebrow="Experience"
        title={
          <>
            Where I&apos;ve <span className="font-serif font-normal text-muted italic">worked</span>
          </>
        }
        description="From freelance work and robotics training to professional engineering — where I've been building software since 2020."
      />

      <ol ref={listRef} className="relative border-t border-line md:ml-1 md:border-t-0">
        {/* Timeline rail that draws itself as you scroll */}
        <span aria-hidden className="absolute inset-y-0 left-0 hidden w-px bg-line md:block" />
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute inset-y-0 left-0 hidden w-px origin-top bg-gradient-to-b from-accent via-accent to-accent/0 md:block"
        />

        {experience.map((job, i) => (
          <li key={`${job.company}-${job.role}`} className="relative md:pl-12">
            <Dot progress={progress} at={(i + 0.15) / experience.length} />
            <Reveal delay={i * 0.05} y={40}>
              <div className="group relative grid gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-8">
                <div
                  aria-hidden
                  className="absolute inset-y-0 -inset-x-4 -z-10 rounded-2xl bg-elev opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:-inset-x-6"
                />
                <p
                  className={`font-mono text-xs text-subtle md:col-span-3 md:block md:pt-1.5 ${job.period ? "" : "hidden"}`}
                >
                  {job.period}
                </p>
                <div className="md:col-span-6">
                  <h3 className="mb-1 text-xl font-medium tracking-tight sm:text-2xl">{job.role}</h3>
                  <p className="mb-4 text-muted">
                    {job.href ? (
                      <a
                        href={job.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        {job.company}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ) : (
                      <span className="text-fg">{job.company}</span>
                    )}
                    <span className="text-subtle"> · {job.location}</span>
                  </p>
                  <p className="leading-relaxed text-pretty text-muted">{job.summary}</p>
                  {job.highlight && (
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1.5 text-sm text-fg">
                      <Trophy className="size-3.5 text-accent" />
                      {job.highlight}
                    </p>
                  )}
                </div>
                <ul className="flex flex-wrap content-start gap-2 md:col-span-3 md:justify-end">
                  {job.stack.map((s) => (
                    <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {education.length > 0 && (
        <Reveal className="mt-16">
          <p className="mb-6 flex items-center gap-2 font-mono text-[11px] tracking-widest text-subtle uppercase">
            <GraduationCap className="size-3.5" /> Education
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {education.map((e) => (
              <li key={e.title} className="rounded-2xl border border-line bg-elev p-6">
                <p className="mb-1 font-mono text-xs text-subtle">{e.period}</p>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-muted">{e.place}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}
