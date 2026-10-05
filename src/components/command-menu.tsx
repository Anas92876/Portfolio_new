"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Copy,
  CornerDownLeft,
  Download,
  FolderOpen,
  Hash,
  Moon,
  Search,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { nav, profile, socials } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { useTheme } from "@/lib/hooks";
import { SocialIcon } from "./icons";
import { OPEN_COMMAND_MENU } from "./nav";
import { setScrollLocked } from "./smooth-scroll";

type Item = {
  id: string;
  group: string;
  label: string;
  icon: LucideIcon | ((p: { className?: string }) => React.ReactNode);
  run: () => void;
};

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggle } = useTheme();
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const items = useMemo<Item[]>(
    () => [
      ...nav.map((n) => ({
        id: `nav-${n.href}`,
        group: "Navigate",
        label: n.label,
        icon: Hash,
        run: () => router.push(n.href),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Projects",
        label: p.title,
        icon: FolderOpen,
        run: () => router.push(`/projects/${p.slug}`),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(profile.email);
          setToast("Email copied to clipboard");
        },
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle theme",
        icon: Moon,
        run: toggle,
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download résumé",
        icon: Download,
        run: () => window.open(profile.resume, "_blank"),
      },
      ...socials
        .filter((s) => s.label !== "Email")
        .map((s) => ({
          id: `social-${s.label}`,
          group: "Connect",
          label: s.label,
          icon: (p: { className?: string }) => <SocialIcon label={s.label} {...p} />,
          run: () => window.open(s.href, "_blank", "noopener"),
        })),
    ],
    [toggle, router],
  );

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));
  const groups = [...new Set(filtered.map((i) => i.group))];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setScrollLocked(true);
    return () => setScrollLocked(false);
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  const select = (item: Item | undefined) => {
    if (!item) return;
    close();
    setScrollLocked(false);
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(filtered[index]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onAnimationComplete={() => inputRef.current?.focus()}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={onKeyDown}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-elev shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="size-4 text-subtle" />
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  placeholder="Type a command or search…"
                  className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
                  aria-label="Search commands"
                />
                <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle">
                  ESC
                </kbd>
              </div>
              <div className="max-h-80 overflow-y-auto p-2" data-lenis-prevent>
                {filtered.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-subtle">No results found.</p>
                )}
                {groups.map((group) => (
                  <div key={group} className="mb-1">
                    <p className="px-3 pt-2 pb-1.5 font-mono text-[10px] tracking-widest text-subtle uppercase">
                      {group}
                    </p>
                    {filtered
                      .filter((i) => i.group === group)
                      .map((item) => {
                        const i = filtered.indexOf(item);
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onMouseMove={() => setIndex(i)}
                            onClick={() => select(item)}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                              i === index ? "bg-line text-fg" : "text-muted"
                            }`}
                          >
                            <Icon className="size-4" />
                            <span className="flex-1">{item.label}</span>
                            {i === index &&
                              (item.group === "Navigate" ? (
                                <ArrowRight className="size-3.5 text-subtle" />
                              ) : (
                                <CornerDownLeft className="size-3.5 text-subtle" />
                              ))}
                          </button>
                        );
                      })}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-line-strong bg-elev px-4 py-2 text-sm shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
