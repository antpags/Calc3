"use client";

import { ExternalLink, Maximize2, MonitorPlay, X } from "lucide-react";
import { useState } from "react";
import type { Module } from "@/lib/content";

export function DesmosEmbed({ config }: { config: NonNullable<Module["desmos"]> }) {
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-white/[.02] ${expanded ? "fixed inset-3 z-[80] bg-coal shadow-2xl sm:inset-8" : ""}`}>
      <div className="flex flex-wrap items-center gap-4 border-b border-white/10 p-5 sm:px-6">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-300">
          <MonitorPlay className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="serif text-lg font-semibold">{config.title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-stone-500">{config.description}</p>
        </div>
        <div className="flex gap-2">
          {loaded && (
            <button type="button" onClick={() => setExpanded((current) => !current)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-stone-500 hover:border-gold-400/30 hover:text-gold-300" aria-label={expanded ? "Exit full screen view" : "Expand graph"}>
              {expanded ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          )}
          <a href={config.url.replace("?embed", "")} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-stone-500 hover:border-gold-400/30 hover:text-gold-300" aria-label="Open Desmos in a new tab">
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {!loaded ? (
        <div className="grid min-h-72 place-items-center p-7 text-center">
          <div>
            <p className="eyebrow">Suggested entries</p>
            <div className="mx-auto mt-4 flex max-w-xl flex-wrap justify-center gap-2">
              {config.entries.map((entry) => <code key={entry} className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 text-xs text-stone-400">{entry}</code>)}
            </div>
            <button type="button" onClick={() => setLoaded(true)} className="mt-7 rounded-full bg-gold-400 px-5 py-2.5 text-xs font-bold text-black hover:bg-gold-300">
              Load interactive Desmos graph
            </button>
            <p className="mt-3 text-[.65rem] text-stone-600">Loads content from desmos.com only after you choose.</p>
          </div>
        </div>
      ) : (
        <div className={expanded ? "h-[calc(100%_-_81px)]" : "h-[34rem]"}>
          <iframe
            title={`Desmos exploration: ${config.title}`}
            src={config.url}
            className="h-full w-full bg-white"
            loading="lazy"
            allow="fullscreen"
          />
        </div>
      )}
    </div>
  );
}
