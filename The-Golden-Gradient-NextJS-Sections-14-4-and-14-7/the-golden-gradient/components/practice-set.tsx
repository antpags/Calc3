"use client";

import { Check, ChevronDown, Eye, Lightbulb, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { PracticeProblem } from "@/lib/content";
import { Math } from "@/components/math";
import { useProgress } from "@/components/progress-provider";

export function PracticeSet({ problems }: { problems: PracticeProblem[] }) {
  const { completedProblems, toggleProblem } = useProgress();
  const [openHints, setOpenHints] = useState<string[]>([]);
  const [openSolutions, setOpenSolutions] = useState<string[]>([]);

  const toggleLocal = (id: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  return (
    <div className="space-y-4">
      {problems.map((problem, index) => {
        const complete = completedProblems.includes(problem.id);
        const hintOpen = openHints.includes(problem.id);
        const solutionOpen = openSolutions.includes(problem.id);
        return (
          <article key={problem.id} className={`rounded-2xl border transition ${complete ? "border-gold-400/30 bg-gold-400/[.055]" : "border-white/10 bg-white/[.02]"}`}>
            <div className="flex items-start gap-4 p-5 sm:p-6">
              <button
                type="button"
                onClick={() => toggleProblem(problem.id)}
                className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition ${complete ? "border-gold-400 bg-gold-400 text-black" : "border-white/15 text-stone-600 hover:border-gold-400/50 hover:text-gold-300"}`}
                aria-label={complete ? `Mark problem ${index + 1} incomplete` : `Mark problem ${index + 1} complete`}
              >
                {complete ? <Check className="h-4 w-4" /> : <span className="font-mono text-[.68rem]">{index + 1}</span>}
              </button>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-stone-300">{problem.prompt}</p>
                {problem.display && <div className="mt-3 overflow-hidden rounded-lg bg-black/25 px-3 py-2"><Math block>{problem.display}</Math></div>}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => toggleLocal(problem.id, setOpenHints)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[.7rem] font-semibold text-stone-500 hover:border-gold-400/30 hover:text-gold-300"
              >
                <Lightbulb className="h-3.5 w-3.5" /> {hintOpen ? "Hide hint" : "Show hint"}
              </button>
              <button
                type="button"
                onClick={() => toggleLocal(problem.id, setOpenSolutions)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[.7rem] font-semibold text-stone-500 hover:border-gold-400/30 hover:text-gold-300"
              >
                {solutionOpen ? <RotateCcw className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {solutionOpen ? "Hide solution" : "Reveal solution"}
                <ChevronDown className={`h-3 w-3 transition ${solutionOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {(hintOpen || solutionOpen) && (
              <div className="space-y-3 border-t border-white/10 px-5 py-4 sm:px-6">
                {hintOpen && (
                  <div className="flex gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[.045] p-4 text-sm leading-relaxed text-stone-400 animate-rise">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                    <div><span className="font-semibold text-gold-200">Hint. </span>{problem.hint}</div>
                  </div>
                )}
                {solutionOpen && (
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 animate-rise">
                    <p className="text-sm leading-relaxed text-stone-400">{problem.solution}</p>
                    <div className="mt-3 border-t border-white/10 pt-3">
                      <p className="text-[.62rem] font-bold uppercase tracking-[.16em] text-gold-300">Answer</p>
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
