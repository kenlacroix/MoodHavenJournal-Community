// File: src/components/muse/hooks/useHistory.ts
"use client";

import { useState, useEffect } from "react";

const HISTORY_KEY = "muse_history";
const MAX_HISTORY = 10;

export function useHistory() {
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) setHistory(JSON.parse(stored));
  }, []);
  function addToHistory(prompt: string) {
    setHistory((prev) => {
      const next = [prompt, ...prev.filter((p) => p !== prompt)];
      return next.slice(0, MAX_HISTORY);
    });
  }
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);
  return { history, addToHistory };
}
