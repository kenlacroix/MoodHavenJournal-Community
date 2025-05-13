// File: src/components/muse/FavoritesTab.tsx
"use client";

import React from "react";
import { useFavorites } from "./hooks/useFavorites";

export default function FavoritesTab() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p className="p-4 text-center text-gray-500">No favorites yet.</p>;
  }

  return (
    <div className="space-y-4 p-4 overflow-auto">
      {favorites.map((prompt, idx) => (
        <div key={idx} className="rounded-2xl bg-white p-4 shadow">
          {prompt}
        </div>
      ))}
    </div>
  );
}
