// file: src/components/muse/hooks/useHotkey.ts
import { useEffect } from "react";

interface HotkeyOptions {
  toggleMuse: () => void;
}

export default function useHotkey({ toggleMuse }: HotkeyOptions) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl/⌘ + Shift + M
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "m"
      ) {
        e.preventDefault();
        toggleMuse();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleMuse]);
}
