"use client";

import { Check, ChevronDown, Eye, Lightbulb, RefreshCw, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import type { PracticeProblem } from "@/lib/content-types";
import { Math } from "@/components/math";
import { useProgress } from "@/components/progress-provider";
import {
  generatePracticeProblem,
  initialPracticeSeed,
  nextPracticeSeed,
} from "@/lib/practice-generators";

export function PracticeSet({ problems }: { problems: PracticeProblem[] }) {
  const { completedProblems, toggleProblem } = useProgress();
  const [openHints, setOpenHints] = useState<string[]>([]);
  const [openSteps, setOpenSteps] = useState<string[]>([]);
  const [seeds, setSeeds] = useState<Record<string, number>>(() =>
    Object.fromEntries(problems.map((problem) => [problem.id, initialPracticeSeed(problem.id)])),
  );

  const toggleLocal = (id: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const newProblem = (id: string) => {
    setSeeds((current) => ({
      ...current,
      [id]: nextPracticeSeed(current[id] ?? initialPracticeSeed(id)),
    }));
    setOpenHints((current) => current.filter((item) => item !== id));
    setOpenSteps((current) => current.filter((item) => item !== id));
    if (completedProblems.includes(id)) toggleProblem(id);
  };

  return (
    <div className="space-y-4">
      {problems.map((sourceProblem, index) => {
        const seed = seeds[sourceProblem.id] ?? initialPracticeSeed(sourceProblem.id);
        const problem = generatePracticeProblem(sourceProblem.id, seed, sourceProblem);
        const complete = completedProblems.includes(sourceProblem.id);
        const hintOpen = openHints.includes(sourceProblem.id);
        const stepsOpen = openSteps.includes(sourceProblem.id);

        return (
          <article
            key={sourceProblem.id}
            className={`rounded-2xl border transition ${complete ? "border-gold-400/30 bg-gold-400/[.055]" : "border-white/10 bg-white/[.02]"}`}
          >
            <div className="flex items-start gap-4 p-5 sm:p-6">
              <button
                type="button"
                onClick={() => toggleProblem(sourceProblem.id)}
                className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${complete ? "border-gold-400 bg-gold-400 text-black" : "border-white/15 text-stone-600 hover:border-gold-400/50 hover:text-gold-300"}`}
                aria-label={complete ? `Mark problem ${index + 1} incomplete` : `Mark problem ${index + 1} complete`}
              >
                {complete ? <Check className="h-4 w-4" /> : <span className="font-mono text-[.68rem]">{index + 1}</span>}
              </button>
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/20 bg-gold-400/[.06] px-2.5 py-1 text-[.6rem] font-bold uppercase tracking-[.12em] text-gold-300">
                    <Sparkles className="h-3 w-3" /> Generated problem
                  </span>
                  <span className="font-mono text-[.58rem] text-stone-700" aria-label={`Problem seed ${seed}`}>
                    seed {seed.toString(16).padStart(8, "0")}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-stone-300">{problem.prompt}</p>
                {problem.display && (
                  <div className="mt-3 overflow-hidden rounded-lg bg-black/25 px-3 py-2">
                    <Math block>{problem.display}</Math>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => newProblem(sourceProblem.id)}
                className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/[.04] px-3 py-1.5 text-[.7rem] font-semibold text-gold-300 transition hover:border-gold-400/70 hover:bg-gold-400/[.09]"
                aria-label={`Generate a new version of problem ${index + 1}`}
              >
                <RefreshCw className="h-3.5 w-3.5" /> New problem
              </button>
              <button
                type="button"
                onClick={() => toggleLocal(sourceProblem.id, setOpenHints)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[.7rem] font-semibold text-stone-500 hover:border-gold-400/30 hover:text-gold-300"
                aria-expanded={hintOpen}
              >
                <Lightbulb className="h-3.5 w-3.5" /> {hintOpen ? "Hide hint" : "Show hint"}
              </button>
              <button
                type="button"
                onClick={() => toggleLocal(sourceProblem.id, setOpenSteps)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[.7rem] font-semibold text-stone-500 hover:border-gold-400/30 hover:text-gold-300"
                aria-expanded={stepsOpen}
                aria-controls={`${sourceProblem.id}-steps`}
              >
                {stepsOpen ? <RotateCcw className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {stepsOpen ? "Hide steps" : "Show steps"}
                <ChevronDown className={`h-3 w-3 transition ${stepsOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {(hintOpen || stepsOpen) && (
              <div className="space-y-3 border-t border-white/10 px-5 py-4 sm:px-6">
                {hintOpen && (
                  <div className="flex gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[.045] p-4 text-sm leading-relaxed text-stone-400 animate-rise">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <div><span className="font-semibold text-gold-200">Hint. </span>{problem.hint}</div>
                  </div>
                )}
                {stepsOpen && (
                  <div id={`${sourceProblem.id}-steps`} className="rounded-xl border border-white/10 bg-black/20 p-4 animate-rise">
                    <ol className="space-y-4">
                      {problem.steps.map((step, stepIndex) => (
                        <li key={`${step.label}-${stepIndex}`} className="grid gap-3 sm:grid-cols-[2rem_1fr]">
                          <span className="grid h-7 w-7 place-items-center rounded-full border border-gold-400/25 font-mono text-[.62rem] text-gold-300">
                            {stepIndex + 1}
                          </span>
                          <div>
                            <p className="text-[.64rem] font-bold uppercase tracking-[.12em] text-gold-300">{step.label}</p>
                            <p className="mt-1 text-sm leading-relaxed text-stone-400">{step.explanation}</p>
                            {step.math && <div className="mt-2 overflow-hidden rounded-lg bg-black/25 px-3 py-2"><Math block>{step.math}</Math></div>}
                          </div>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-gold-300">Computed answer</p>
                      <div className="mt-2"><Math block>{problem.answer}</Math></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
