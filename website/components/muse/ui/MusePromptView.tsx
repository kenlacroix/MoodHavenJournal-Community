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
  onNewPrompt: () => void;
}

export default function MusePromptView({
  prompt,
  isLoading,
  remaining,
  isQuotaExceeded,
  onClose,
  onNewPrompt,
}: MusePromptViewProps) {
  const { count, canRefresh, refresh } = usePromptRefresh(3);

  if (isQuotaExceeded) {
    return (
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full">
        <p className="text-base sm:text-lg mb-4 text-center">
          You’ve reached your daily quota of prompts. Come back tomorrow!
        </p>
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none transition duration-300"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md w-full overflow-auto max-h-full sm:max-h-[80vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Your Prompt</h2>
        <button
          onClick={onClose}
          aria-label="Close Prompt View"
          className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-300"
        >
          ✕
        </button>
      </div>

      <div className="flex justify-center py-6">
        {isLoading ? (
          <ThinkingDots />
        ) : (
          <p className="text-base sm:text-lg leading-relaxed text-center px-2">
            {prompt}
          </p>
        )}
      </div>

      {!isLoading && canRefresh && (
        <div className="text-center mb-3">
          <button
            onClick={() => {
              if (refresh()) onNewPrompt();
            }}
            className="w-full sm:w-auto px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none transition duration-300"
          >
            Give me another
          </button>
          {count === 2 && (
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Ready to capture your thoughts?
            </p>
          )}
        </div>
      )}

      {!isLoading && !canRefresh && (
        <p className="text-sm sm:text-base text-gray-500 text-center mb-3">
          You’ve hit the refresh limit for this session.
        </p>
      )}

      <p className="text-sm sm:text-base text-gray-500 text-center">
        {remaining} prompt{remaining !== 1 ? "s" : ""} remaining today
      </p>
    </div>
  );
}
