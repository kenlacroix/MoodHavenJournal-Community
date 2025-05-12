// file: src/components/muse/MuseRoot.tsx
"use client";

import { useState } from "react";
import MuseIcon from "@/components/muse/ui/MuseIcon";
import MuseModal from "@/components/muse/ui/MuseModal";
import useHotkey from "@/components/muse/hooks/useHotkey";

export default function MuseRoot({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggleMuse = () => setOpen((o) => !o);

  useHotkey({ toggleMuse });

  return (
    <>
      {children}

      {/* Global Muse UI */}
      <MuseIcon onOpen={toggleMuse} />
      <MuseModal isOpen={open} onClose={toggleMuse} />
    </>
  );
}
