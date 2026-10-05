"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { about } from "@/data/portfolio";

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`mr-[0.25em] inline-block ${accent ? "font-serif font-normal text-accent italic" : ""}`}
    >
      {children}
    </motion.span>
  );
}

/** A large statement whose words light up as it scrolls through the viewport. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = about.statement.split(" ");

  return (
    <section aria-label="Philosophy" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40">
      <p className="mb-10 flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
        <span className="size-1.5 rounded-full bg-accent" />
        Philosophy
      </p>
      <p
        ref={ref}
        className="text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.12] font-medium tracking-[-0.03em] text-balance"
      >
        {words.map((w, i) => {
          const accent = w.startsWith("*");
          return (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              accent={accent}
            >
              {w.replace(/\*/g, "")}
            </Word>
          );
        })}
      </p>
    </section>
  );
}
