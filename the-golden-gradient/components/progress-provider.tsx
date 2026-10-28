"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "golden-gradient-progress-v1";

type ProgressState = {
  completedModules: string[];
  completedProblems: string[];
};

type ProgressContextValue = ProgressState & {
  ready: boolean;
  toggleModule: (slug: string) => void;
  toggleProblem: (id: string) => void;
  resetProgress: () => void;
};

const initialState: ProgressState = { completedModules: [], completedProblems: [] };
const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(initialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setState(JSON.parse(saved) as ProgressState);
    } catch {
      // A blocked localStorage should not prevent the lessons from working.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Keep progress in memory when persistence is unavailable.
    }
  }, [ready, state]);

  const toggleInList = useCallback((key: keyof ProgressState, value: string) => {
    setState((current) => {
      const list = current[key];
      return {
        ...current,
        [key]: list.includes(value) ? list.filter((item) => item !== value) : [...list, value],
      };
    });
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      ...state,
      ready,
      toggleModule: (slug) => toggleInList("completedModules", slug),
      toggleProblem: (id) => toggleInList("completedProblems", id),
      resetProgress: () => setState(initialState),
    }),
    [ready, state, toggleInList],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}
