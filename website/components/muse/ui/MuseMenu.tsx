// File: src/components/muse/ui/MuseMenu.tsx
"use client";

import React from "react";

export type Category =
  | "reflect"
  | "center"
  | "create"
  | "spring"
  | "summer"
  | "autumn"
  | "winter"
  | "favorites"
  | "history";

interface Props {
  onSelectCategory: (category: Category) => void;
}

export default function MuseMenu({ onSelectCategory }: Props) {
  const base =
    "w-full sm:text-lg text-base min-h-[3rem] rounded-lg py-4 sm:py-3 font-semibold tracking-wide shadow hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <div className="space-y-3">
      {/* Core categories */}
      <button
        className={`${base} bg-indigo-500 text-white`}
        onClick={() => onSelectCategory("reflect")}
      >
        Reflect
      </button>
      <button
        className={`${base} bg-teal-500 text-white`}
        onClick={() => onSelectCategory("center")}
      >
        Center
      </button>
      <button
        className={`${base} bg-amber-500 text-white`}
        onClick={() => onSelectCategory("create")}
      >
        Create
      </button>

      {/* Seasonal decks */}
      <h3 className="mt-4 text-sm font-medium text-gray-600">Seasonal Decks</h3>
      <button
        className={`${base} bg-green-200 text-green-800`}
        onClick={() => onSelectCategory("spring")}
      >
        Spring
      </button>
      <button
        className={`${base} bg-yellow-300 text-yellow-800`}
        onClick={() => onSelectCategory("summer")}
      >
        Summer
      </button>
      <button
        className={`${base} bg-orange-300 text-orange-800`}
        onClick={() => onSelectCategory("autumn")}
      >
        Autumn
      </button>
      <button
        className={`${base} bg-blue-200 text-blue-800`}
        onClick={() => onSelectCategory("winter")}
      >
        Winter
      </button>

      {/* Utility tabs */}
      <button
        className={`${base} bg-gray-200 text-gray-800`}
        onClick={() => onSelectCategory("history")}
      >
        History
      </button>
      <button
        className={`${base} bg-yellow-400 text-white`}
        onClick={() => onSelectCategory("favorites")}
      >
        Favorites
      </button>
    </div>
  );
}
