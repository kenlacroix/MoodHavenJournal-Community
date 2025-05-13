// File: src/components/muse/HistoryTab.tsx
"use client";

import React from "react";
import { useHistory } from "@/components/muse/hooks/useHistory";

export default function HistoryTab() {
  const { history } = useHistory();
  if (history.length === 0) {
    return <p className="p-4 text-center text-gray-500">No history yet.</p>;
  }
  return (
    <div className="space-y-4 p-4 overflow-auto">
      {history.map((prompt, idx) => (
        <div key={idx} className="rounded-2xl bg-white p-4 shadow">
          {prompt}
        </div>
      ))}
    </div>
  );
}
