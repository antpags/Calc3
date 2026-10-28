"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  GraduationCap,
  Home,
  Menu,
  Search,
  X,
} from "lucide-react";
import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { modules, searchRecords } from "@/lib/content";
import { useProgress } from "@/components/progress-provider";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { completedModules } = useProgress();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((current) => !current);
      }
      if (event.key === "/" && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    setQuery("");
    window.setTimeout(() => inputRef.current?.focus(), 20);
  }, [searchOpen]);

  useEffect(() => setMobileOpen(false), [pathname]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchRecords.slice(0, 8);
    return searchRecords
      .map((record) => {
        const haystack = `${record.title} ${record.description} ${record.keywords}`.toLowerCase();
        const score = record.title.toLowerCase().includes(normalized) ? 3 : haystack.includes(normalized) ? 1 : 0;
        return { ...record, score };
      })
      .filter((record) => record.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [query]);

  const progress = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center border-b border-white/10 bg-ink/90 px-4 backdrop-blur-xl lg:pl-0">
        <div className="flex w-full items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-stone-300 hover:border-gold-400/50 hover:text-gold-300 lg:hidden"
            aria-label="Open course navigation"
          >
            <Menu className="h-4 w-4" />
          </button>
          <Link href="/" className="flex min-w-0 items-center gap-3 lg:w-[18rem] lg:px-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-400/50 bg-gold-400/10 text-gold-300">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="serif block truncate text-[1.05rem] font-semibold leading-none">The Golden Gradient</span>
              <span className="mt-1 hidden text-[.62rem] uppercase tracking-[.18em] text-stone-500 sm:block">Multivariable calculus studio</span>
            </span>
          </Link>

          <div className="mx-auto hidden items-center gap-2 rounded-full border border-white/10 bg-white/[.035] p-1 md:flex">
            <Link href="/" className={`rounded-full px-4 py-2 text-xs font-semibold transition ${pathname === "/" ? "bg-gold-400 text-black" : "text-stone-400 hover:text-white"}`}>
              Course map
            </Link>
            <Link href="/learn/vector-valued-functions" className={`rounded-full px-4 py-2 text-xs font-semibold transition ${pathname.startsWith("/learn") ? "bg-gold-400 text-black" : "text-stone-400 hover:text-white"}`}>
              Lessons
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-auto flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-3 text-xs text-stone-400 transition hover:border-gold-400/40 hover:text-stone-100 sm:px-4"
            aria-label="Search topics"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search topics</span>
            <span className="ml-1 hidden items-center gap-1 rounded border border-white/10 px-1.5 py-0.5 font-mono text-[.62rem] text-stone-500 lg:flex">
              <Command className="h-2.5 w-2.5" /> K
            </span>
          </button>
        </div>
      </header>

      <aside
        className={`fixed bottom-0 left-0 top-16 z-30 hidden border-r border-white/10 bg-coal/95 transition-[width] duration-300 lg:block ${expanded ? "w-72" : "w-20"}`}
      >
        <SidebarContent
          expanded={expanded}
          pathname={pathname}
          completedModules={completedModules}
          progress={progress}
          close={() => undefined}
        />
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="absolute -right-3 top-7 grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-coal text-stone-400 hover:border-gold-400/50 hover:text-gold-300"
          aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
        >
          {expanded ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />
          <aside className="absolute bottom-0 left-0 top-0 w-[min(88vw,22rem)] border-r border-white/10 bg-coal shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
              <span className="serif font-semibold">Course navigation</span>
              <button onClick={() => setMobileOpen(false)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10" aria-label="Close navigation">
                <X className="h-4 w-4" />
              </button>
            </div>
            <SidebarContent expanded pathname={pathname} completedModules={completedModules} progress={progress} close={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className={`pt-16 transition-[padding] duration-300 ${expanded ? "lg:pl-72" : "lg:pl-20"}`}>{children}</div>

      {searchOpen && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/75 px-4 pt-[10vh] backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Search calculus topics">
          <button className="absolute inset-0" onClick={() => setSearchOpen(false)} aria-label="Close search" />
          <div className="panel relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl shadow-gold">
            <div className="flex items-center gap-3 border-b border-white/10 px-5">
              <Search className="h-5 w-5 text-gold-300" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                placeholder="Search tangent plane, extrema, gradient…"
                className="h-16 min-w-0 flex-1 bg-transparent text-base text-white placeholder:text-stone-600 focus:outline-none"
              />
              <button onClick={() => setSearchOpen(false)} className="rounded border border-white/10 px-2 py-1 font-mono text-[.65rem] text-stone-500">ESC</button>
            </div>
            <div className="custom-scrollbar max-h-[58vh] overflow-y-auto p-2">
              {results.length ? (
                results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.href}
                    onClick={() => setSearchOpen(false)}
                    className="group flex items-start gap-4 rounded-xl px-4 py-3 transition hover:bg-white/[.06]"
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 text-stone-500 group-hover:border-gold-400/40 group-hover:text-gold-300">
                      {result.type === "module" ? <BookOpen className="h-3.5 w-3.5" /> : <Search className="h-3.5 w-3.5" />}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="serif font-semibold text-stone-100">{result.title}</span>
                        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[.58rem] uppercase tracking-wider text-stone-500">{result.type}</span>
                      </span>
                      <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-stone-500">{result.description}</span>
                    </span>
                  </Link>
                ))
              ) : (
                <div className="px-6 py-14 text-center">
                  <p className="serif text-xl text-stone-300">No matching coordinate found.</p>
                  <p className="mt-2 text-sm text-stone-600">Try a broader topic or formula name.</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[.65rem] text-stone-600">
              <span>{results.length} result{results.length === 1 ? "" : "s"}</span>
              <span>Press / to search anywhere</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarContent({
  expanded,
  pathname,
  completedModules,
  progress,
  close,
}: {
  expanded: boolean;
  pathname: string;
  completedModules: string[];
  progress: number;
  close: () => void;
}) {
  return (
    <div className="custom-scrollbar flex h-full flex-col overflow-y-auto px-3 py-5">
      <Link href="/" onClick={close} className={`mb-4 flex h-11 items-center rounded-xl border px-3 transition ${pathname === "/" ? "border-gold-400/35 bg-gold-400/10 text-gold-300" : "border-transparent text-stone-500 hover:bg-white/[.04] hover:text-white"}`}>
        <Home className="h-4 w-4 shrink-0" />
        {expanded && <span className="ml-3 text-xs font-semibold">Course map</span>}
      </Link>

      {expanded && <p className="px-3 pb-2 pt-3 text-[.62rem] font-bold uppercase tracking-[.18em] text-stone-600">Learning path</p>}
      <nav className="space-y-1" aria-label="Course modules">
        {modules.map((module) => {
          const active = pathname === `/learn/${module.slug}`;
          const complete = completedModules.includes(module.slug);
          return (
            <Link
              key={module.slug}
              href={`/learn/${module.slug}`}
              onClick={close}
              title={!expanded ? module.title : undefined}
              className={`group flex min-h-11 items-center rounded-xl border px-3 transition ${
                active
                  ? "border-gold-400/35 bg-gold-400/10 text-gold-200"
                  : "border-transparent text-stone-500 hover:bg-white/[.04] hover:text-stone-200"
              }`}
            >
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border font-mono text-[.65rem] ${active ? "border-gold-400/40 bg-gold-400 text-black" : complete ? "border-gold-400/30 text-gold-300" : "border-white/10"}`}>
                {complete ? <Check className="h-3.5 w-3.5" /> : String(module.number).padStart(2, "0")}
              </span>
              {expanded && (
                <span className="ml-3 min-w-0">
                  <span className="block truncate text-xs font-medium">{module.title}</span>
                  <span className="mt-0.5 block truncate text-[.62rem] text-stone-600 group-hover:text-stone-500">{module.unit}</span>
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        {expanded ? (
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between text-[.68rem]">
              <span className="font-semibold text-stone-300">Course progress</span>
              <span className="font-mono text-gold-300">{progress}%</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gold-400 transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-3 text-[.62rem] leading-relaxed text-stone-600">Saved locally in this browser. No account required.</p>
          </div>
        ) : (
          <div className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-gold-400/20 text-[.62rem] font-bold text-gold-300">{progress}%</div>
        )}
      </div>
    </div>
  );
}
