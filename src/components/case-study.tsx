"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { projects, type Project } from "@/data/projects";
import { GitHubIcon } from "./icons";
import { ProjectVisual } from "./project-visual";
import { spotlight, trackPointer } from "./projects";
import { ease, Reveal } from "./reveal";

const pad = (n: number) => String(n).padStart(2, "0");

/** Builds the table of contents from whichever sections this project has content for. */
function sectionsFor(p: Project) {
  return [
    { id: "overview", label: "Overview", show: p.overview.length > 0 },
    { id: "challenge", label: "The challenge", show: p.challenge.length > 0 },
    { id: "solution", label: "The solution", show: p.solution.length > 0 },
    { id: "features", label: "Key features", show: p.features.length > 0 },
    { id: "architecture", label: "Architecture", show: p.architecture.length > 0 },
    { id: "gallery", label: "Gallery", show: (p.gallery?.length ?? 0) > 0 },
    { id: "results", label: "Results", show: p.results.length > 0 },
    { id: "learnings", label: "Learnings", show: p.learnings.length > 0 },
  ].filter((s) => s.show);
}

function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-10 pb-20 first:border-t-0 first:pt-0">
      <Reveal>
        <h2 className="mb-8 flex items-baseline gap-4 text-3xl font-medium tracking-tight sm:text-4xl">
          <span className="font-mono text-sm text-accent">{pad(n)}</span>
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}

function Prose({ paragraphs, lead = false }: { paragraphs: string[]; lead?: boolean }) {
  return (
    <div className="space-y-5">
      {paragraphs.map((p, i) => (
        <Reveal key={i} delay={i * 0.05}>
          <p
            className={
              lead && i === 0
                ? "text-xl leading-relaxed text-pretty text-fg sm:text-2xl"
                : "text-lg leading-relaxed text-pretty text-muted"
            }
          >
            {p}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

export function CaseStudy({ index }: { index: number }) {
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const reduce = useReducedMotion();
  const sections = sectionsFor(project);
  const [ids] = useState(() => sections.map((s) => s.id));
  const active = useActive(ids);
  const num = (id: string) => ids.indexOf(id) + 1;

  // Cover grows to full width as it scrolls into view.
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: coverProgress } = useScroll({ target: coverRef, offset: ["start end", "start 0.25"] });
  const coverScale = useTransform(coverProgress, [0, 1], [reduce ? 1 : 0.88, 1]);
  const coverRadius = useTransform(coverProgress, [0, 1], [48, 24]);

  // Reading progress through the article body, shown in the table of contents.
  const bodyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bodyProgress } = useScroll({ target: bodyRef, offset: ["start 0.3", "end 0.7"] });
  const readProgress = useSpring(bodyProgress, { stiffness: 120, damping: 30 });

  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: [project.year, project.duration].filter(Boolean).join(" · ") },
    { label: "Team", value: project.team },
    { label: "Category", value: project.category },
  ].filter((m) => m.value);

  return (
    <main id="main">
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[1000px] -translate-x-1/2 rounded-full opacity-30 blur-[140px]"
          style={{ background: `oklch(0.65 0.18 ${project.hue})` }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-36 pb-16 sm:px-8 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="mb-12 flex items-center justify-between gap-4"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-line py-2 pr-4 pl-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              All projects
            </Link>
            <span className="font-mono text-xs text-subtle">
              Case study <span className="text-accent">{pad(index + 1)}</span> / {pad(projects.length)}
            </span>
          </motion.div>

          <h1 className="text-[clamp(3rem,9vw,8rem)] leading-[0.92] font-medium tracking-[-0.045em]">
            {project.title.split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="text-gradient inline-block"
                  initial={reduce ? false : { y: "110%", rotate: 3 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 1, ease, delay: 0.2 + i * 0.08 }}
                >
                  {w}
                </motion.span>
                {" "}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
            className="mt-6 max-w-3xl font-serif text-2xl text-pretty text-muted italic sm:text-3xl"
          >
            {project.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.65 }}
            className="mt-14 grid gap-8 border-t border-line pt-8 md:grid-cols-12"
          >
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-9">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="mb-1.5 font-mono text-[11px] tracking-widest text-subtle uppercase">{m.label}</dt>
                  <dd className="text-sm">{m.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-start gap-2 md:col-span-3 md:justify-end">
              {project.status && (
                <span className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-3.5 text-xs text-muted">
                  <span
                    className={`size-1.5 rounded-full ${project.status === "Live" ? "bg-emerald-400" : project.status === "In development" ? "bg-amber-400" : "bg-subtle"}`}
                  />
                  {project.status}
                </span>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                >
                  Visit site
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              {project.links.source && (
                <a
                  href={project.links.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-line"
                >
                  <GitHubIcon className="size-4" />
                  Code
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── Cover ────────────────────────────────────────── */}
      <div ref={coverRef} className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          style={{ scale: coverScale, borderRadius: coverRadius }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.75 }}
          className="group overflow-hidden"
        >
          <ProjectVisual project={project} className="aspect-[4/3] sm:aspect-[16/10]" />
        </motion.div>
      </div>

      {/* ── Metrics ──────────────────────────────────────── */}
      {project.metrics.length > 0 ? (
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <dl
            className={`grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line ${
              { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3" }[project.metrics.length] ??
              "md:grid-cols-4"
            }`}
          >
            {project.metrics.map((m, i) => (
              <Reveal
                key={m.label}
                delay={i * 0.08}
                className="flex flex-col justify-between gap-6 bg-bg p-6 sm:p-8"
              >
                <dt className="font-mono text-[11px] tracking-widest text-subtle uppercase">{m.label}</dt>
                <dd className="text-4xl font-medium tracking-tighter sm:text-5xl">{m.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      ) : (
        <div aria-hidden className="h-16 md:h-24" />
      )}

      {/* ── Body ─────────────────────────────────────────── */}
      <div ref={bodyRef} className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="Case study sections" className="sticky top-28">
            <p className="mb-5 font-mono text-[11px] tracking-widest text-subtle uppercase">On this page</p>
            <div className="relative pl-5">
              <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-line" />
              <motion.span
                aria-hidden
                style={{ scaleY: readProgress }}
                className="absolute inset-y-0 left-0 w-px origin-top bg-accent"
              />
              <ul className="space-y-3">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`flex items-center gap-3 text-sm transition-colors ${
                        active === s.id ? "text-fg" : "text-subtle hover:text-muted"
                      }`}
                    >
                      <span className={`font-mono text-[10px] ${active === s.id ? "text-accent" : ""}`}>
                        {pad(num(s.id))}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        <article className="lg:col-span-9 lg:pl-8">
          {ids.includes("overview") && (
            <Section id="overview" n={num("overview")} title="Overview">
              <Prose paragraphs={project.overview} lead />
            </Section>
          )}

          {ids.includes("challenge") && (
            <Section id="challenge" n={num("challenge")} title="The challenge">
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-line bg-elev p-6 sm:p-10">
                  <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-accent" />
                  <div className="space-y-5">
                    {project.challenge.map((p, i) => (
                      <p
                        key={i}
                        className={
                          i === 0
                            ? "font-serif text-2xl leading-snug text-pretty sm:text-3xl"
                            : "text-lg leading-relaxed text-pretty text-muted"
                        }
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            </Section>
          )}

          {ids.includes("solution") && (
            <Section id="solution" n={num("solution")} title="The solution">
              <Prose paragraphs={project.solution} lead />
            </Section>
          )}

          {ids.includes("features") && (
            <Section id="features" n={num("features")} title="Key features">
              <ul className="grid gap-4 sm:grid-cols-2">
                {project.features.map((f, i) => (
                  <li key={f.title}>
                    <Reveal delay={(i % 2) * 0.08} className="h-full">
                      <div
                        onPointerMove={trackPointer}
                        className={`relative h-full overflow-hidden rounded-2xl border border-line bg-elev p-6 transition-colors duration-500 hover:border-line-strong ${spotlight}`}
                      >
                        <span className="mb-6 grid size-9 place-items-center rounded-xl bg-accent-soft font-mono text-xs text-accent">
                          {pad(i + 1)}
                        </span>
                        <h3 className="mb-2 text-lg font-medium tracking-tight">{f.title}</h3>
                        <p className="text-sm leading-relaxed text-muted">{f.description}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {ids.includes("architecture") && (
            <Section id="architecture" n={num("architecture")} title="Architecture & stack">
              <Reveal>
                <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
                  {project.architecture.map((g) => (
                    <div key={g.group} className="bg-elev p-6">
                      <p className="mb-4 font-mono text-[11px] tracking-widest text-subtle uppercase">{g.group}</p>
                      <ul className="flex flex-wrap gap-2">
                        {g.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-lg border border-line bg-elev-2 px-2.5 py-1 text-xs text-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
              {project.architectureNotes.length > 0 && (
                <ul className="mt-8 space-y-4">
                  {project.architectureNotes.map((note, i) => (
                    <li key={i}>
                      <Reveal delay={i * 0.05} className="flex gap-4 text-muted">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="leading-relaxed">{note}</span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          )}

          {ids.includes("gallery") && (
            <Section id="gallery" n={num("gallery")} title="Gallery">
              <div className="grid gap-6">
                {project.gallery?.map((g) => (
                  <Reveal key={g.src}>
                    <figure>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-elev">
                        <Image src={g.src} alt={g.caption} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
                      </div>
                      <figcaption className="mt-3 text-sm text-subtle">{g.caption}</figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </Section>
          )}

          {ids.includes("results") && (
            <Section id="results" n={num("results")} title="Results">
              <ul className="divide-y divide-line border-y border-line">
                {project.results.map((r, i) => (
                  <li key={i}>
                    <Reveal delay={i * 0.06} className="flex items-start gap-5 py-6">
                      <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-lg leading-relaxed text-pretty sm:text-xl">{r}</span>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {ids.includes("learnings") && (
            <Section id="learnings" n={num("learnings")} title="What I learned">
              <div className="space-y-6">
                {project.learnings.map((l, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <blockquote className="font-serif text-2xl leading-snug text-pretty text-muted italic sm:text-3xl">
                      <span className="text-accent">&ldquo;</span>
                      {l}
                      <span className="text-accent">&rdquo;</span>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </Section>
          )}
        </article>
      </div>

      {/* ── Next project ─────────────────────────────────── */}
      <nav aria-label="More projects" className="mx-auto max-w-6xl px-5 pt-12 pb-28 sm:px-8 md:pb-40">
        <Reveal>
          <Link
            href={`/projects/${next.slug}`}
            onPointerMove={trackPointer}
            className={`group relative grid items-center gap-8 overflow-hidden rounded-3xl border border-line bg-elev p-6 transition-colors duration-500 hover:border-line-strong sm:p-10 md:grid-cols-2 ${spotlight}`}
          >
            <div className="relative">
              <p className="mb-4 font-mono text-[11px] tracking-widest text-subtle uppercase">
                Next project · {pad(((index + 1) % projects.length) + 1)}
              </p>
              <p className="mb-3 text-4xl font-medium tracking-tight sm:text-6xl">{next.title}</p>
              <p className="mb-8 max-w-md text-muted">{next.tagline}</p>
              <span className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-on-accent">
                Read case study
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
            <div className="relative transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-1 group-hover:scale-[1.02]">
              <ProjectVisual project={next} compact />
            </div>
          </Link>
        </Reveal>
        <div className="mt-6 flex items-center justify-between text-sm">
          <Link
            href={`/projects/${prev.slug}`}
            className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            {prev.title}
          </Link>
          <Link href="/projects" className="text-muted transition-colors hover:text-fg">
            All projects
          </Link>
        </div>
      </nav>
    </main>
  );
}
