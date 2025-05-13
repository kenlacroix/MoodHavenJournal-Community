// File: src/components/muse/ui/MuseMenu.tsx
"use client";

import React from "react";

export type Category = "reflect" | "center" | "create" | "favorites";

interface Props {
  onSelectCategory: (category: Category) => void;
}

export default function MuseMenu({ onSelectCategory }: Props) {
  const base =
    "w-full sm:text-lg text-base min-h-[3rem] rounded-lg py-4 sm:py-3 font-semibold tracking-wide shadow hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <div className="space-y-4">
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
      <button
        className={`${base} bg-gray-200 text-gray-800`}
        onClick={() => onSelectCategory("favorites")}
      >
        Favorites
      </button>
    </div>
  );
}
