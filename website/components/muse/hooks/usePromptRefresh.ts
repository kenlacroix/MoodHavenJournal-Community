// File: src/components/muse/hooks/usePromptRefresh.ts
import { useState, useCallback } from "react";

/**
 * Hook to limit "Give me another" prompt refreshes per category
 * @param maxRefreshes maximum number of times user can refresh per session
 */
export default function usePromptRefresh(maxRefreshes: number = 3) {
  const [count, setCount] = useState(0);

  const canRefresh = count < maxRefreshes;

  const refresh = useCallback(() => {
    if (!canRefresh) return false;
    setCount((prev) => prev + 1);
    return true;
  }, [canRefresh]);

  return { count, canRefresh, refresh };
}
