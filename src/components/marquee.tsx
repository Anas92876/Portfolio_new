"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";
import { marquee } from "@/data/portfolio";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** A marquee row that speeds up and flips direction with scroll velocity. */
function VelocityRow({ items, baseVelocity }: { items: string[]; baseVelocity: number }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  // Four copies keep the track wider than the viewport; shifting by 50% loops seamlessly.
  const row = [...items, ...items, ...items, ...items];
  return (
    <motion.ul className="flex w-max gap-12" style={{ x }}>
      {row.map((item, i) => (
        <li
          key={i}
          aria-hidden={i >= items.length}
          className="flex items-center gap-12 text-2xl font-medium tracking-tight whitespace-nowrap text-subtle transition-colors hover:text-fg sm:text-4xl"
        >
          {item}
          <span className="font-serif text-accent italic">✦</span>
        </li>
      ))}
    </motion.ul>
  );
}

export function Marquee() {
  const half = Math.ceil(marquee.length / 2);
  return (
    <div className="mask-fade-x relative flex flex-col gap-5 overflow-hidden border-y border-line py-8" aria-label="Technologies">
      <VelocityRow items={marquee.slice(0, half)} baseVelocity={-2} />
      <VelocityRow items={marquee.slice(half)} baseVelocity={2} />
    </div>
  );
}
