import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-6xl flex-col items-start justify-center px-5 sm:px-8">
      <p className="mb-6 font-mono text-xs tracking-widest text-accent uppercase">Error 404</p>
      <h1 className="mb-6 text-[clamp(3rem,9vw,7rem)] leading-[0.95] font-medium tracking-[-0.045em]">
        Page <span className="font-serif font-normal text-muted italic">not found.</span>
      </h1>
      <p className="mb-10 max-w-md text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition-opacity hover:opacity-85"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back home
      </Link>
    </main>
  );
}
