"use client";

import { CheckCircle2, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import type { WorkedExample as WorkedExampleType } from "@/lib/content";
import { Math as Formula } from "@/components/math";

export function WorkedExample({ example, index }: { example: WorkedExampleType; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const [visibleSteps, setVisibleSteps] = useState(index === 0 ? 1 : 0);

  const revealNext = () => setVisibleSteps((current) => Math.min(example.steps.length, current + 1));
  const showAll = () => setVisibleSteps(example.steps.length);
  const reset = () => setVisibleSteps(0);

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.025]">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-white/[.025] sm:px-7"
        aria-expanded={open}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-400/30 bg-gold-400/10 font-mono text-xs text-gold-300">{String(index + 1).padStart(2, "0")}</span>
        <span className="min-w-0 flex-1">
          <span className="eyebrow">Worked example</span>
          <span className="serif mt-1 block text-xl font-semibold text-stone-100">{example.title}</span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-stone-500 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-white/10 px-5 pb-6 pt-5 sm:px-7">
          <p className="text-sm leading-relaxed text-stone-400">{example.prompt}</p>
          {example.display && (
            <div className="mt-4 rounded-xl border border-gold-400/15 bg-black/25 px-4 py-4">
              <Formula block>{example.display}</Formula>
            </div>
          )}

          <div className="relative mt-7 space-y-3 before:absolute before:bottom-6 before:left-[1.05rem] before:top-6 before:w-px before:bg-white/10">
            {example.steps.slice(0, visibleSteps).map((step, stepIndex) => (
              <div key={step.label} className="relative flex gap-4 animate-rise">
                <span className="relative z-10 mt-4 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-400/30 bg-coal font-mono text-[.65rem] text-gold-300">{stepIndex + 1}</span>
                <div className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5">
                  <h4 className="serif font-semibold text-stone-100">{step.label}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-500">{step.explanation}</p>
                  {step.math && <div className="mt-3 rounded-lg bg-white/[.025] px-3 py-2"><Formula block>{step.math}</Formula></div>}
                </div>
              </div>
            ))}
          </div>

          {visibleSteps === example.steps.length && (
            <div className="mt-5 flex gap-3 rounded-xl border border-gold-400/25 bg-gold-400/[.07] p-4 animate-rise">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
              <div className="min-w-0">
                <p className="text-[.65rem] font-bold uppercase tracking-[.16em] text-gold-300">Final answer</p>
                <div className="mt-2"><Formula block>{example.answer}</Formula></div>
              </div>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {visibleSteps < example.steps.length && (
              <button type="button" onClick={revealNext} className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-4 py-2 text-xs font-bold text-black transition hover:bg-gold-300">
                <ChevronRight className="h-3.5 w-3.5" /> Reveal next step
              </button>
            )}
            {visibleSteps < example.steps.length && (
              <button type="button" onClick={showAll} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-stone-400 hover:border-gold-400/30 hover:text-stone-100">
                <Sparkles className="h-3.5 w-3.5" /> Show complete solution
              </button>
            )}
            {visibleSteps > 0 && (
              <button type="button" onClick={reset} className="rounded-full px-4 py-2 text-xs text-stone-600 hover:text-stone-300">Reset steps</button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
