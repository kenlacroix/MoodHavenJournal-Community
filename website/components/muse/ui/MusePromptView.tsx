// file: src/components/muse/ui/MusePromptView.tsx
import React, { useEffect } from "react";
import ThinkingDots from "./ThinkingDots";
import useDailyQuota from "../hooks/useDailyQuota";
import useLastPrompt from "../hooks/useLastPrompt";

interface MusePromptViewProps {
  prompt: string;
  isLoading: boolean;
  onClose: () => void;
}

export default function MusePromptView({
  prompt,
  isLoading,
  onClose,
}: MusePromptViewProps) {
  const { remaining, isQuotaExceeded, increment } = useDailyQuota(5);
  const { lastPrompt, savePrompt } = useLastPrompt();

  // Persist prompt when loaded
  useEffect(() => {
    if (!isLoading && prompt) {
      savePrompt(prompt);
    }
  }, [isLoading, prompt, savePrompt]);

  // Increment quota once per prompt display
  useEffect(() => {
    if (!isLoading && !isQuotaExceeded) {
      increment();
    }
  }, [isLoading, isQuotaExceeded, increment]);

  const display = isLoading ? null : lastPrompt || prompt;

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
          <p className="text-base leading-relaxed">{display}</p>
        )}
      </div>
      <p className="text-sm text-gray-500 text-center">
        {remaining} prompt{remaining !== 1 ? "s" : ""} remaining today
      </p>
    </div>
  );
}
