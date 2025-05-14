// File: src/components/muse/hooks/useHistory.ts
"use client";

import { useState, useEffect, useRef } from "react";

const HISTORY_KEY = "muse_history";
const MAX_HISTORY = 10;

export function useHistory() {
  // Lazy-init from storage
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const stored =
        typeof window !== "undefined"
          ? localStorage.getItem(HISTORY_KEY)
          : null;
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("[useHistory] failed to parse:", e);
      return [];
    }
  });

  // Skip the first effect so we don't clobber existing data
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    try {
      console.log("[useHistory] persisting:", history);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error("[useHistory] write failed:", e);
    }
  }, [history]);

  function addToHistory(prompt: string) {
    setHistory((prev) => {
      const next = [prompt, ...prev.filter((p) => p !== prompt)].slice(
        0,
        MAX_HISTORY
      );
      console.log("[useHistory] addToHistory:", next);
      return next;
    });
  }

  return { history, addToHistory };
}
