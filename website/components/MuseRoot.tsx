// file: src/components/muse/MuseRoot.tsx
"use client";

import { useState } from "react";
import MuseIcon from "@/components/muse/ui/MuseIcon";
import MuseModal from "@/components/muse/ui/MuseModal";
import MusePromptView from "@/components/muse/ui/MusePromptView";
import useHotkey from "@/components/muse/hooks/useHotkey";

async function fetchPrompt(): Promise<string> {
  // TODO: implement actual prompt generation logic (e.g., API call or local algorithm)
  return "This is a placeholder prompt.";
}

export default function MuseRoot({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const toggleMuse = () => setOpen((o) => !o);

  useHotkey({ toggleMuse });

  const openMuse = async () => {
    setIsLoading(true);
    setOpen(true);
    try {
      const p = await fetchPrompt();
      setPrompt(p);
    } catch (err) {
      console.error("Error fetching prompt:", err);
      setPrompt("Unable to load prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {children}

      {/* Global Muse UI */}
      <MuseIcon onOpen={openMuse} />
      <MuseModal isOpen={open} onClose={toggleMuse}>
        <MusePromptView
          prompt={prompt}
          isLoading={isLoading}
          onClose={toggleMuse}
        />
      </MuseModal>
    </>
  );
}
