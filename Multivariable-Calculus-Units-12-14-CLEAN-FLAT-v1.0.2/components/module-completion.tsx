"use client";

import { Check, Circle, RotateCcw } from "lucide-react";
import { useProgress } from "@/components/progress-provider";

export function ModuleCompletion({ slug, problemIds }: { slug: string; problemIds: string[] }) {
  const { completedModules, completedProblems, toggleModule } = useProgress();
  const complete = completedModules.includes(slug);
  const solved = problemIds.filter((id) => completedProblems.includes(id)).length;

  return (
    <div className="panel flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>
        <p className="eyebrow">Lesson checkpoint</p>
        <h3 className="serif mt-2 text-xl font-semibold">{complete ? "Module complete" : "Ready to close the loop?"}</h3>
        <p className="mt-1 text-sm text-stone-500">{solved} of {problemIds.length} practice problems marked complete.</p>
      </div>
      <button
        type="button"
        onClick={() => toggleModule(slug)}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold transition ${complete ? "border border-gold-400/35 bg-gold-400/10 text-gold-300" : "bg-gold-400 text-black hover:bg-gold-300"}`}
      >
        {complete ? <><RotateCcw className="h-4 w-4" /> Mark as incomplete</> : <><Circle className="h-4 w-4" /> Mark module complete</>}
      </button>
      {complete && <span className="absolute sr-only"><Check /> Complete</span>}
    </div>
  );
}
