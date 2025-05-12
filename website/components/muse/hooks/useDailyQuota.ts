// file: src/components/muse/hooks/useDailyQuota.ts
import { useState, useEffect } from "react";

interface Quota {
  remaining: number;
  isQuotaExceeded: boolean;
  increment: () => void;
}

export default function useDailyQuota(limit: number): Quota {
  const keyDate = "muse-quota-date";
  const keyCount = "muse-quota-count";
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState<string>(today);
  const [count, setCount] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const savedDate = localStorage.getItem(keyDate);
    const savedCount = localStorage.getItem(keyCount);
    if (savedDate === today && savedCount) {
      return parseInt(savedCount, 10);
    }
    return 0;
  });

  useEffect(() => {
    if (date !== today) {
      setDate(today);
      setCount(0);
      localStorage.setItem(keyDate, today);
      localStorage.setItem(keyCount, "0");
    }
  }, [date, today]);

  const increment = () => {
    if (count < limit) {
      const newCount = count + 1;
      setCount(newCount);
      localStorage.setItem(keyDate, today);
      localStorage.setItem(keyCount, newCount.toString());
    }
  };

  const isQuotaExceeded = count >= limit;
  return { remaining: limit - count, isQuotaExceeded, increment };
}
