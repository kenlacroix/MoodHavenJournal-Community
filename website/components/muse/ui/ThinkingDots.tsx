// file: src/components/muse/ui/ThinkingDots.tsx
import React from "react";

export default function ThinkingDots() {
  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 bg-gray-400 rounded-full"
          style={{
            animation: `thinking 0.8s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes thinking {
          0%,
          80%,
          100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          40% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
