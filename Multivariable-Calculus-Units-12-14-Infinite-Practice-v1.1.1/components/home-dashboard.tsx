"use client";

import Link from "next/link";
import { ArrowRight, BookOpenCheck, Check, Compass, Sigma, Sparkles, Target } from "lucide-react";
import { Math as Formula } from "@/components/math";
import { useProgress } from "@/components/progress-provider";
import { modules } from "@/lib/content";

export function HomeDashboard() {
  const { completedModules, completedProblems } = useProgress();
  const nextModule = modules.find((module) => !completedModules.includes(module.slug)) ?? modules[0];
  const progress = Math.round((completedModules.length / modules.length) * 100);
  const chapters = (["Unit 12", "Unit 13", "Unit 14"] as const).map((chapter) => ({
    chapter,
    modules: modules.filter((module) => module.chapter === chapter),
  }));

  return (
    <main>
      <section className="grid-field noise relative overflow-hidden border-b border-white/10 px-5 py-16 sm:px-8 sm:py-24 xl:px-12 xl:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/25 bg-gold-400/[.07] px-3 py-1.5 text-[.68rem] font-semibold uppercase tracking-[.14em] text-gold-300">
              <Sparkles className="h-3.5 w-3.5" /> {modules.length} study modules
            </div>
            <h1 className="serif mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[.94] tracking-[-.04em] sm:text-7xl xl:text-[6.1rem]">
              Interactive<br />
              <span className="text-gold-300">Multivariable Calculus.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-balance text-base leading-8 text-stone-400 sm:text-lg">
              Review key ideas, follow worked examples, and practice Units 12–14—from vectors and geometry in space through multivariable optimization.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/learn/${nextModule.slug}`} className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-gold-300">
                {completedModules.length ? "Continue studying" : "Start studying"} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#course-map" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-stone-300 transition hover:border-gold-400/40 hover:text-gold-300">
                <Compass className="h-4 w-4" /> Browse modules
              </a>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[32rem] animate-rise [animation-delay:120ms]">
            <div className="absolute inset-[8%] rounded-full border border-gold-400/15" />
            <div className="absolute inset-[22%] rounded-full border border-white/10" />
            <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" aria-label="Abstract vector calculus field visualization" role="img">
              <defs>
                <linearGradient id="curve" x1="0" x2="1">
                  <stop offset="0" stopColor="#8f670a" stopOpacity=".2" />
                  <stop offset=".48" stopColor="#e8c766" />
                  <stop offset="1" stopColor="#8f670a" stopOpacity=".2" />
                </linearGradient>
                <radialGradient id="glow"><stop stopColor="#d8aa2d" stopOpacity=".32" /><stop offset="1" stopColor="#d8aa2d" stopOpacity="0" /></radialGradient>
              </defs>
              <circle cx="250" cy="250" r="170" fill="url(#glow)" opacity=".35" />
              <path d="M54 330 C120 70 185 440 250 215 S385 70 447 255" fill="none" stroke="url(#curve)" strokeWidth="3" />
              <path d="M65 365 C145 145 195 390 276 185 S397 115 442 198" fill="none" stroke="#fff" strokeOpacity=".08" />
              <g stroke="#d8aa2d" strokeOpacity=".58" fill="none">
                <path d="M250 215 L322 142" /><path d="M322 142 l-18 5 m18-5 l-6 18" />
                <path d="M250 215 L192 155" /><path d="M192 155 l18 5 m-18-5 l5 18" />
                <path d="M250 215 L250 316" /><path d="M250 316 l-9-17 m9 17 l9-17" />
              </g>
              <g fill="#e8c766">
                <circle cx="250" cy="215" r="6" /><circle cx="322" cy="142" r="3" /><circle cx="192" cy="155" r="3" />
              </g>
            </svg>
            <div className="panel absolute left-0 top-[14%] rounded-xl px-4 py-3 shadow-xl">
              <p className="eyebrow">Gradient</p>
              <Formula>{String.raw`\nabla f`}</Formula>
            </div>
            <div className="panel absolute bottom-[8%] right-0 rounded-xl px-4 py-3 shadow-xl">
              <p className="eyebrow">Frenet frame</p>
              <Formula>{String.raw`\mathbf T,\mathbf N,\mathbf B`}</Formula>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 px-5 py-6 sm:px-8 xl:px-12">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-3">
          <Metric icon={<BookOpenCheck className="h-4 w-4" />} value={`${completedModules.length}/${modules.length}`} label="modules completed" />
          <Metric icon={<Target className="h-4 w-4" />} value={String(completedProblems.length)} label="practice problems solved" />
          <Metric icon={<Sigma className="h-4 w-4" />} value={`${progress}%`} label="course progress" />
        </div>
      </section>

      <section id="course-map" className="px-5 py-16 sm:px-8 sm:py-24 xl:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Course map</p>
              <h2 className="serif mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Topics and lessons</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-stone-500">Study the modules in order or choose the topic you need to review.</p>
          </div>

          <div className="mt-12 space-y-14">
            {chapters.map(({ chapter, modules: chapterModules }) => (
              <section key={chapter} aria-labelledby={`${chapter.replace(" ", "-").toLowerCase()}-heading`}>
                <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="eyebrow">{chapter}</p>
                    <h3 id={`${chapter.replace(" ", "-").toLowerCase()}-heading`} className="serif mt-2 text-3xl font-semibold">
                      {chapter === "Unit 12" ? "Vectors and the Geometry of Space" : chapter === "Unit 13" ? "Vector Functions" : "Functions of Several Variables"}
                    </h3>
                  </div>
                  <p className="text-xs uppercase tracking-[.14em] text-stone-600">{chapterModules.length} modules</p>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {chapterModules.map((module) => {
                    const complete = completedModules.includes(module.slug);
                    return (
                      <Link key={module.slug} href={`/learn/${module.slug}`} className="panel panel-hover group relative flex min-h-[18rem] flex-col overflow-hidden rounded-2xl p-6">
                        <div className="absolute right-4 top-3 font-mono text-6xl font-bold tracking-tighter text-white/[.025]">{module.section.split("–")[0]}</div>
                        <div className="flex items-center justify-between">
                          <span className="rounded-full border border-white/10 px-3 py-1 text-[.62rem] font-bold uppercase tracking-[.13em] text-stone-500">Section {module.section}</span>
                          <span className={`grid h-8 w-8 place-items-center rounded-full border ${complete ? "border-gold-400 bg-gold-400 text-black" : "border-white/10 text-stone-600 group-hover:border-gold-400/40 group-hover:text-gold-300"}`}>
                            {complete ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />}
                          </span>
                        </div>
                        <p className="eyebrow mt-9">Module {String(module.number).padStart(2, "0")}</p>
                        <h4 className="serif mt-2 text-2xl font-semibold">{module.title}</h4>
                        <p className="mt-3 text-sm leading-6 text-stone-500">{module.summary}</p>
                        <div className="mt-auto border-t border-white/10 pt-5">
                          <Formula>{module.signatureFormula}</Formula>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-16 sm:px-8 sm:py-24 xl:px-12">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
          <Feature number="01" title="Study worked examples" copy="Open examples one step at a time to review the method before seeing the complete solution." />
          <Feature number="02" title="Practice and check" copy="Try each problem, request a new version, and open a hint or solution when you need it." />
          <Feature number="03" title="Connect formulas and graphs" copy="Use notation, explanations, and optional Desmos graphs to connect calculations with geometric meaning." />
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10 text-center text-xs text-stone-600">
        <p className="serif text-base text-stone-400">Multivariable Calculus</p>
        <p className="mt-2">Lessons, examples, and practice for studying multivariable calculus.</p>
      </footer>
    </main>
  );
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/[.07] bg-white/[.02] px-5 py-4">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-400/25 text-gold-300">{icon}</span>
      <div><p className="font-mono text-lg font-bold text-stone-100">{value}</p><p className="text-[.67rem] uppercase tracking-wider text-stone-600">{label}</p></div>
    </div>
  );
}

function Feature({ number, title, copy }: { number: string; title: string; copy: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.02] p-7">
      <span className="font-mono text-xs text-gold-300">{number}</span>
      <h3 className="serif mt-8 text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-stone-500">{copy}</p>
    </div>
  );
}
