"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let instance: Lenis | null = null;

export function setScrollLocked(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  } else {
    document.body.style.overflow = locked ? "hidden" : "";
  }
}

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    instance = new Lenis({
      lerp: 0.1,
      anchors: { offset: -80 },
      autoRaf: true,
      respectReducedMotion: true,
    });
    return () => {
      instance?.destroy();
      instance = null;
    };
  }, []);

  // New page: drop any in-flight smooth scroll so it can't drag the new page off the top.
  useEffect(() => {
    if (!window.location.hash) instance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
