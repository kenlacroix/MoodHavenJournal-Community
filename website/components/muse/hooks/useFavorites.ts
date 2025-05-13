// File: src/components/muse/hooks/useFavorites.ts
"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "muse_favorites";

/**
 * Hook to manage favorite prompts in localStorage
 */
export function useFavorites(): {
  favorites: string[];
  toggleFavorite: (prompt: string) => void;
  isFavorite: (prompt: string) => boolean;
} {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(prompt: string) {
    setFavorites((prev) =>
      prev.includes(prompt)
        ? prev.filter((p) => p !== prompt)
        : [...prev, prompt]
    );
  }

  function isFavorite(prompt: string) {
    return favorites.includes(prompt);
  }

  return { favorites, toggleFavorite, isFavorite };
}
