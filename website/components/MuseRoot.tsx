// File: src/components/muse/MuseRoot.tsx
"use client";

import React, { useState } from "react";
import MuseIcon from "@/components/muse/ui/MuseIcon";
import MuseModal from "@/components/muse/ui/MuseModal";
import MuseMenu, { Category } from "@/components/muse/ui/MuseMenu";
import MusePromptView from "@/components/muse/ui/MusePromptView";
import FavoritesTab from "@/components/muse/FavoritesTab";
import HistoryTab from "@/components/muse/HistoryTab";
import Toast from "@/components/muse/ui/Toast";
import useHotkey from "@/components/muse/hooks/useHotkey";
import useDailyQuota from "@/components/muse/hooks/useDailyQuota";
import useLastPrompt from "@/components/muse/hooks/useLastPrompt";
import musePrompts from "@/components/muse/data/musePrompts";
import { useHistory } from "@/components/muse/hooks/useHistory";

type PromptCategory = Exclude<Category, "favorites" | "history">;

export default function MuseRoot({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"menu" | "prompt" | "favorites" | "history">(
    "menu"
  );
  const [selectedCategory, setSelectedCategory] =
    useState<PromptCategory | null>(null);
  const { history, addToHistory } = useHistory();
  const { lastPrompt, savePrompt } = useLastPrompt();
  const { remaining, isQuotaExceeded, increment } = useDailyQuota(5);
  const [isLoading, setIsLoading] = useState(false);
  const [firstPromptShown, setFirstPromptShown] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useHotkey({ toggleMuse: () => setIsOpen((o) => !o) });

  const openMuse = () => {
    setView("menu");
    setSelectedCategory(null);
    setIsOpen(true);
  };
  const closeMuse = () => {
    setIsOpen(false);
    setView("menu");
    setSelectedCategory(null);
  };

  const loadPrompt = async (category: PromptCategory) => {
    setIsLoading(true);
    const list = musePrompts[category];
    const next = list[Math.floor(Math.random() * list.length)];
    savePrompt(next);
    increment();
    addToHistory(next);
    setIsLoading(false);
    if (!firstPromptShown) {
      setFirstPromptShown(true);
      setShowToast(true);
    }
  };

  const handleSelectCategory = (category: Category) => {
    if (category === "favorites") setView("favorites");
    else if (category === "history") setView("history");
    else {
      setSelectedCategory(category);
      loadPrompt(category).then(() => setView("prompt"));
    }
  };

  const handleNewPrompt = () => {
    if (selectedCategory) loadPrompt(selectedCategory);
  };

  return (
    <>
      {children}
      <MuseIcon onOpen={openMuse} />
      <MuseModal isOpen={isOpen} onClose={closeMuse}>
        {view === "menu" && (
          <MuseMenu onSelectCategory={handleSelectCategory} />
        )}
        {view === "prompt" && (
          <MusePromptView
            prompt={lastPrompt!}
            isLoading={isLoading}
            remaining={remaining}
            isQuotaExceeded={isQuotaExceeded}
            onClose={closeMuse}
            onNewPrompt={handleNewPrompt}
          />
        )}
        {view === "favorites" && <FavoritesTab />}
        {view === "history" && <HistoryTab />}
      </MuseModal>
      {showToast && (
        <Toast
          message="Ready to capture your thoughts?"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
