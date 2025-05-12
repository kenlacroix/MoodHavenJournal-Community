// file: src/components/muse/MuseRoot.tsx
"use client";

import { useState } from "react";
import MuseIcon from "@/components/muse/ui/MuseIcon";
import MuseModal from "@/components/muse/ui/MuseModal";
import MusePromptView from "@/components/muse/ui/MusePromptView";
import useHotkey from "@/components/muse/hooks/useHotkey";
import useDailyQuota from "@/components/muse/hooks/useDailyQuota";
import useLastPrompt from "@/components/muse/hooks/useLastPrompt";

async function fetchPrompt(): Promise<string> {
  // TODO: implement real prompt logic
  return "This is a placeholder prompt.";
}

export default function MuseRoot({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const toggleMuse = () => setOpen((o) => !o);

  const { remaining, isQuotaExceeded, increment } = useDailyQuota(5);
  const { lastPrompt, savePrompt } = useLastPrompt();
  useHotkey({ toggleMuse });

  const openMuse = async () => {
    setOpen(true);
    if (isQuotaExceeded) return;

    // Show persisted prompt if available
    if (lastPrompt) {
      setPrompt(lastPrompt);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const p = await fetchPrompt();
      setPrompt(p);
      savePrompt(p);
      increment();
    } catch (err) {
      console.error(err);
      setPrompt("Unable to load prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {children}
      <MuseIcon onOpen={openMuse} />
      <MuseModal isOpen={open} onClose={toggleMuse}>
        <MusePromptView
          prompt={prompt}
          isLoading={isLoading}
          remaining={remaining}
          isQuotaExceeded={isQuotaExceeded}
          onClose={toggleMuse}
        />
      </MuseModal>
    </>
  );
}
