import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  as: Heading = "h2",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** Use "h1" when the section is the main content of its own page. */
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
      <Reveal className="md:col-span-7">
        <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line-strong" />
          {eyebrow}
        </p>
        <Heading className="text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
          {title}
        </Heading>
      </Reveal>
      {description && (
        <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
          <p className="text-base leading-relaxed text-pretty text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
