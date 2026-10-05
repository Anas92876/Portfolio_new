"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { projects, type Project } from "@/data/projects";
import { useMediaQuery } from "@/lib/hooks";
import { GitHubIcon } from "./icons";
import { ProjectVisual } from "./project-visual";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export const spotlight =
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 before:bg-[radial-gradient(500px_circle_at_var(--x)_var(--y),var(--glow),transparent_60%)]";

function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
  stack,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  stack: boolean;
}) {
  const href = `/projects/${project.slug}`;
  // As later cards slide over this one, shrink and dim it to create depth.
  const scale = useTransform(progress, range, [1, targetScale]);
  const dim = useTransform(progress, range, [0, targetScale < 1 ? 0.55 : 0]);

  return (
    <div
      className={stack ? "sticky" : undefined}
      style={stack ? { top: `calc(6.5rem + ${index * 16}px)` } : undefined}
    >
      <motion.div style={stack ? { scale, transformOrigin: "top center" } : undefined}>
        <Reveal>
          <article
            onPointerMove={trackPointer}
            className={`group relative overflow-hidden rounded-3xl border border-line bg-elev p-3 shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.5)] transition-colors duration-500 hover:border-line-strong sm:p-4 ${spotlight}`}
          >
            {/* Image — full width on top. Capped by viewport height on desktop so the whole card fits while stacking. */}
            <Link href={href} aria-label={`${project.title} case study`} tabIndex={-1} className="relative block">
              <ProjectVisual
                project={project}
                className="aspect-[16/10] sm:aspect-[2/1] lg:aspect-auto lg:h-[min(52vh,560px)]"
              />
            </Link>

            {/* Text band */}
            <div className="relative grid gap-6 px-2 pt-6 pb-2 sm:px-3 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-7">
              <div className="lg:col-span-5">
                <p className="mb-3 font-mono text-xs text-subtle">
                  <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
                  {" / "}
                  {String(projects.length).padStart(2, "0")} · {project.category}
                  {project.year && <> · {project.year}</>}
                </p>
                <h3 className="mb-2 text-3xl font-medium tracking-tight sm:text-4xl">
                  <Link href={href} className="transition-colors hover:text-accent">
                    {project.title}
                  </Link>
                </h3>
                <p className="leading-relaxed text-pretty text-muted">{project.summary}</p>
              </div>

              <div className="lg:col-span-4">
                {project.metrics.length > 0 && (
                  <dl
                    className={`grid gap-4 border-y border-line py-4 lg:border-y-0 lg:border-l lg:py-0 lg:pl-8 ${project.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
                  >
                    {project.metrics.slice(0, 3).map((m) => (
                      <div key={m.label}>
                        <dt className="sr-only">{m.label}</dt>
                        <dd className="text-xl font-medium tracking-tight sm:text-2xl">{m.value}</dd>
                        <dd className="mt-1 text-[11px] leading-snug text-subtle">{m.label}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              <div className="flex flex-col gap-5 lg:col-span-3 lg:items-end">
                <ul className="flex flex-wrap gap-2 lg:justify-end">
                  {project.stack.map((s) => (
                    <li key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={href}
                    className="group/cta inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-on-accent transition-transform active:scale-95"
                  >
                    Read case study
                    <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                  </Link>
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-line"
                    >
                      Live
                      <ArrowUpRight className="size-4" />
                    </a>
                  )}
                  {project.links.source && (
                    <a
                      href={project.links.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code`}
                      className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:bg-line"
                    >
                      <GitHubIcon className="size-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            {stack && (
              <motion.div
                aria-hidden
                style={{ opacity: dim }}
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-bg"
              />
            )}
          </article>
        </Reveal>
      </motion.div>
    </div>
  );
}

/**
 * The project list. On the homepage pass `limit` to show a featured preview with a link to /projects;
 * on the /projects page render it without a limit and with an h1 heading.
 */
export function Projects({ limit, headingAs }: { limit?: number; headingAs?: "h1" | "h2" }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const stack = useMediaQuery("(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)");
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });
  const list = limit ? projects.slice(0, limit) : projects;
  const n = list.length;
  const preview = list.length < projects.length;

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40">
      <SectionHeading
        as={headingAs}
        index="01"
        eyebrow={preview ? "Featured work" : "All projects"}
        title={
          preview ? (
            <>
              Featured <span className="font-serif font-normal text-muted italic">projects</span>
            </>
          ) : (
            <>
              {projects.length} projects I&apos;m <span className="font-serif font-normal text-muted italic">proud</span> of
            </>
          )
        }
        description="SaaS platforms, catalogs and business websites I've built. Open any project for the full story — the problem, the approach and how it was built."
      />

      <div
        ref={stackRef}
        className={`flex flex-col lg:-mx-4 xl:-mx-12 2xl:-mx-16 ${stack ? "gap-[22vh]" : "gap-6 md:gap-8"}`}
      >
        {list.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i}
            progress={scrollYProgress}
            range={[i / n, 1]}
            targetScale={1 - (n - 1 - i) * 0.025}
            stack={stack}
          />
        ))}
      </div>

      {preview && (
        <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-muted">
            {projects.length - n} more projects, each with a full case study.
          </p>
          <Link
            href="/projects"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-elev px-6 text-sm font-medium transition-colors hover:bg-line"
          >
            View all {projects.length} projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      )}
    </section>
  );
}
