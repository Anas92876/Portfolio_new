import { testimonials } from "@/data/portfolio";
import { Reveal } from "./reveal";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-label="Testimonials" className="mx-auto max-w-6xl px-5 pb-28 sm:px-8 md:pb-40">
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col justify-between gap-10 rounded-3xl border border-line bg-elev p-8 sm:p-10">
              <blockquote className="font-serif text-2xl leading-snug text-pretty sm:text-3xl">
                <span className="text-accent">&ldquo;</span>
                {t.quote}
                <span className="text-accent">&rdquo;</span>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-elev-2 text-sm font-medium text-muted">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-sm font-medium">{t.name}</span>
                  <span className="block text-xs text-muted">{t.title}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
