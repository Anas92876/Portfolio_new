"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Clock, Hammer, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { about, profile, skills } from "@/data/portfolio";
import { useLocalTime } from "@/lib/hooks";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    if (reduce) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, suffix, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

/** Bento card with a subtle 3D tilt that follows the cursor. */
function Card({
  children,
  className = "",
  delay = 0,
  flush = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Removes inner padding, for edge-to-edge media. */
  flush?: boolean;
}) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18 });

  return (
    <Reveal delay={delay} className={`[perspective:1200px] ${className}`}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          // Larger cards tilt less so the effect feels consistent.
          const max = 6 * Math.min(1, 320 / Math.max(r.width, r.height));
          ry.set(px * max * 2);
          rx.set(-py * max * 2);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        className={`relative h-full overflow-hidden rounded-3xl border border-line bg-elev transition-colors duration-500 hover:border-line-strong ${
          flush ? "" : "p-6 sm:p-8"
        }`}
      >
        {children}
      </motion.div>
    </Reveal>
  );
}

function Label({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-2 font-mono text-[11px] tracking-widest text-subtle uppercase">
      {icon}
      {children}
    </p>
  );
}

export function About({ headingAs }: { headingAs?: "h1" | "h2" }) {
  const time = useLocalTime(profile.timezone);

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-28 sm:px-8 md:py-40">
      <SectionHeading
        as={headingAs}
        index="02"
        eyebrow="About"
        title={
          <>
            Software engineer,{" "}
            <span className="font-serif font-normal text-muted italic">product-minded</span> builder.
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-6 md:gap-5">
        {/* Portrait */}
        <Card className="md:col-span-2 md:row-span-2" flush>
          <div className="group/photo relative aspect-[3/4] h-full w-full md:aspect-auto md:min-h-[540px]">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              quality={90}
              loading="eager"
              fetchPriority="high"
              className="object-cover object-[50%_30%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/photo:scale-[1.04]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            {profile.available && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Open to work
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-xl font-medium tracking-tight">{profile.name}</p>
              <p className="text-sm text-white/70">{profile.role}</p>
            </div>
          </div>
        </Card>

        {/* Bio */}
        <Card className="md:col-span-4">
          <div className="flex h-full flex-col justify-between gap-10">
            <div className="flex items-center gap-4">
              <div className="relative size-14 overflow-hidden rounded-full ring-2 ring-accent/40 ring-offset-2 ring-offset-elev">
                <Image
                  src={profile.photo}
                  alt=""
                  fill
                  sizes="168px"
                  quality={90}
                  className="origin-[52%_43%] scale-[3] object-cover object-[50%_25%]"
                />
              </div>
              <div>
                <p className="font-medium">{profile.name}</p>
                <p className="text-sm text-muted">{profile.role}</p>
              </div>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-pretty text-muted sm:text-xl">
              {about.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-fg" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Card>

        {/* Location */}
        <Card className="md:col-span-2" delay={0.08}>
          <Label icon={<MapPin className="size-3.5" />}>Based in</Label>
          <p className="mb-1 text-2xl font-medium tracking-tight">{profile.location}</p>
          <p className="flex items-center gap-1.5 font-mono text-sm text-muted" suppressHydrationWarning>
            <Clock className="size-3.5" />
            {time ?? "--:--"} · {profile.timezone.split("/")[1]?.replace("_", " ")}
          </p>
          <div aria-hidden className="absolute -right-10 -bottom-12 size-40 rounded-full border border-line">
            <div className="absolute inset-4 rounded-full border border-line" />
            <div className="absolute inset-10 rounded-full border border-line" />
            <span className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-accent shadow-[0_0_20px_4px_var(--glow)]" />
          </div>
        </Card>

        {/* Now */}
        <Card className="md:col-span-2" delay={0.16}>
          <Label icon={<Sparkles className="size-3.5" />}>Right now</Label>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="mb-1 flex items-center gap-1.5 text-subtle">
                <Hammer className="size-3.5" /> Building
              </dt>
              <dd className="text-fg">{about.now.building}</dd>
            </div>
            <div>
              <dt className="mb-1 text-subtle">Direction</dt>
              <dd className="text-fg">{about.now.direction}</dd>
            </div>
          </dl>
        </Card>

        {/* Stats */}
        {about.stats.map((s, i) => (
          <Card key={s.label} className="md:col-span-2" delay={0.08 * i}>
            <p className="mb-2 text-5xl font-medium tracking-tighter sm:text-6xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="text-sm text-muted">{s.label}</p>
          </Card>
        ))}

        {/* What I bring */}
        {about.bring.map((b, i) => (
          <Card key={b.title} className="md:col-span-3" delay={0.06 * i}>
            <p className="mb-4 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
            <p className="mb-2 text-xl font-medium tracking-tight">{b.title}</p>
            <p className="leading-relaxed text-pretty text-muted">{b.description}</p>
          </Card>
        ))}

        {/* Toolbox */}
        <Card className="md:col-span-6">
          <div className="mb-8">
            <Label icon={<span className="size-1.5 rounded-full bg-accent" />}>Toolbox</Label>
            <p className="text-2xl font-medium tracking-tight">
              Tools I reach for <span className="font-serif font-normal text-muted italic">every day</span>
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <div key={group.group}>
                <p className="mb-4 text-sm font-medium">{group.group}</p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-elev-2 px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent/40 hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
