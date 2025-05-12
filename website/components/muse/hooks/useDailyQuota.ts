// file: src/components/muse/hooks/useDailyQuota.ts
import { useState } from "react";

interface Quota {
  remaining: number;
  isQuotaExceeded: boolean;
  increment: () => void;
}

export default function useDailyQuota(limit: number): Quota {
  const keyDate = "muse-quota-date";
  const keyCount = "muse-quota-count";
  const today = new Date().toISOString().split("T")[0];

  // Atomically read and reset storage
  const getInitialCount = (): number => {
    if (typeof window === "undefined") return 0;
    const savedDate = localStorage.getItem(keyDate);
    const savedCount = localStorage.getItem(keyCount);

    if (savedDate === today && savedCount != null) {
      return parseInt(savedCount, 10);
    }

    // initialize for today
    localStorage.setItem(keyDate, today);
    localStorage.setItem(keyCount, "0");
    return 0;
  };

  const [count, setCount] = useState<number>(getInitialCount);

  const increment = () => {
    if (count < limit) {
      const next = count + 1;
      setCount(next);
      localStorage.setItem(keyDate, today);
      localStorage.setItem(keyCount, next.toString());
    }
  };

  const isQuotaExceeded = count >= limit;
  return {
    remaining: limit - count,
    isQuotaExceeded,
    increment,
  };
}
