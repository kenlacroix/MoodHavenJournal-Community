// file: src/components/muse/hooks/useLastPrompt.ts
import { useState, useEffect, useCallback } from "react";

export default function useLastPrompt() {
  const key = "muse-last-prompt";
  const [lastPrompt, setLastPromptState] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(key);
    if (saved) {
      setLastPromptState(saved);
    }
  }, []);

  const savePrompt = useCallback((prompt: string) => {
    setLastPromptState(prompt);
    localStorage.setItem(key, prompt);
  }, []);

  return { lastPrompt, savePrompt };
}
