// file: src/components/muse/ui/MusePromptView.tsx
import React from "react";
import ThinkingDots from "./ThinkingDots";

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
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Prompt</h2>
        <button
          onClick={onClose}
          aria-label="Close Prompt View"
          className="text-gray-500 hover:text-gray-700"
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
    </div>
  );
}
