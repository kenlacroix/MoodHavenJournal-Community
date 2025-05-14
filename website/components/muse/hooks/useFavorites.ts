// File: src/components/muse/hooks/useFavorites.ts
"use client";

import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "muse_favorites";

export function useFavorites(): {
  favorites: string[];
  toggleFavorite: (prompt: string) => void;
  isFavorite: (prompt: string) => boolean;
} {
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Initialize from localStorage on mount
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Skip first render write
  const isFirstUpdate = useRef(true);
  useEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("[useFavorites] error writing favorites:", e);
    }
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
