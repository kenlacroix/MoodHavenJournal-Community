// File: src/components/muse/ui/MusePromptView.tsx
import React from "react";
import ThinkingDots from "./ThinkingDots";
import usePromptRefresh from "../hooks/usePromptRefresh";

interface MusePromptViewProps {
  prompt: string;
  isLoading: boolean;
  remaining: number;
  isQuotaExceeded: boolean;
  onClose: () => void;
  onNewPrompt: () => void; // function to fetch a fresh prompt
}

export default function MusePromptView({
  prompt,
  isLoading,
  remaining,
  isQuotaExceeded,
  onClose,
  onNewPrompt,
}: MusePromptViewProps) {
  // Limit to 3 additional prompts per category
  const { count, canRefresh, refresh } = usePromptRefresh(3);

  if (isQuotaExceeded) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto text-center">
        <p className="text-base mb-4">
          You’ve reached your daily quota of prompts. Come back tomorrow!
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Prompt</h2>
        <button
          onClick={onClose}
          aria-label="Close Prompt View"
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
      </div>

      <div className="flex justify-center py-6">
        {isLoading ? (
          <ThinkingDots />
        ) : (
          <p className="text-base leading-relaxed">{prompt}</p>
        )}
      </div>

      {/* Refresh button */}
      {!isLoading && canRefresh && (
        <div className="text-center mb-3">
          <button
            onClick={() => {
              const ok = refresh();
              if (ok) onNewPrompt();
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none disabled:opacity-50"
          >
            Give me another
          </button>
        </div>
      )}

      {!isLoading && !canRefresh && (
        <p className="text-sm text-gray-500 text-center mb-3">
          You’ve hit the refresh limit for this session.
        </p>
      )}

      <p className="text-sm text-gray-500 text-center">
        {remaining} prompt{remaining !== 1 ? "s" : ""} remaining today
      </p>
    </div>
  );
}
