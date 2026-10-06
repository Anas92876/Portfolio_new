import Image from "next/image";
import type { Project } from "@/data/projects";

/**
 * A stylised product preview. Uses the project's screenshot when provided,
 * otherwise renders an abstract browser mock tinted with the project hue.
 */
export function ProjectVisual({
  project,
  compact = false,
  className = "aspect-[4/3]",
  priority = false,
}: {
  project: Project;
  compact?: boolean;
  className?: string;
  /** Load immediately with high priority — for the image at the top of the page. */
  priority?: boolean;
}) {
  const c = (l: number, ch: number, a = 1) => `oklch(${l} ${ch} ${project.hue} / ${a})`;

  // Real screenshots fill the slot directly — no frame. The slot's shape (set by the caller)
  // decides the height; the screenshot is anchored to its top so the site header stays visible.
  if (project.cover) {
    return (
      <div className={`relative w-full overflow-hidden rounded-2xl bg-elev-2 ${className}`}>
        <Image
          src={project.cover}
          alt={`${project.title} website screenshot`}
          fill
          sizes={compact ? "(min-width: 1024px) 30vw, 90vw" : "(min-width: 1280px) 1280px, 100vw"}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          quality={90}
          style={{ objectPosition: `${project.coverFocus ?? 50}% top` }}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${className}`}
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, ${c(0.72, 0.16, 0.55)}, transparent 55%), radial-gradient(90% 90% at 100% 100%, ${c(0.55, 0.18, 0.5)}, transparent 60%), ${c(0.22, 0.04)}`,
      }}
    >
      <div
        className={`absolute overflow-hidden rounded-t-xl border border-white/15 bg-[#0d0d10]/90 shadow-2xl backdrop-blur ${
          compact ? "inset-x-5 top-6 bottom-0" : "inset-x-8 top-10 bottom-0 sm:inset-x-12 sm:top-14"
        }`}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="size-2 rounded-full bg-white/20" />
          <span className="ml-3 h-4 w-1/3 rounded bg-white/5" />
        </div>

        <div className="flex h-full gap-3 p-3">
          {!compact && (
            <div className="hidden w-1/5 flex-col gap-2 sm:flex">
              <div className="h-3 w-3/4 rounded" style={{ background: c(0.75, 0.15, 0.8) }} />
              {[0.5, 0.7, 0.6, 0.45, 0.65].map((w, i) => (
                <div key={i} className="h-2 rounded bg-white/10" style={{ width: `${w * 100}%` }} />
              ))}
            </div>
          )}
          <div className="flex flex-1 flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              {[0.9, 0.65, 0.8].map((h, i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
                  <div className="mb-2 h-1.5 w-1/2 rounded bg-white/15" />
                  <div className="h-3 rounded" style={{ width: `${h * 100}%`, background: i === 0 ? c(0.75, 0.15) : "rgb(255 255 255 / 0.2)" }} />
                </div>
              ))}
            </div>
            <div className="relative flex-1 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-3">
              <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-3/4 w-full">
                <defs>
                  <linearGradient id={`g-${project.slug}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={c(0.75, 0.16, 0.45)} />
                    <stop offset="100%" stopColor={c(0.75, 0.16, 0)} />
                  </linearGradient>
                </defs>
                <path
                  d="M0 80 C 30 70, 50 40, 80 50 S 130 75, 160 45 S 210 10, 240 30 S 280 20, 300 8 L 300 100 L 0 100 Z"
                  fill={`url(#g-${project.slug})`}
                />
                <path
                  d="M0 80 C 30 70, 50 40, 80 50 S 130 75, 160 45 S 210 10, 240 30 S 280 20, 300 8"
                  fill="none"
                  stroke={c(0.8, 0.16)}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="h-1.5 w-1/4 rounded bg-white/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
