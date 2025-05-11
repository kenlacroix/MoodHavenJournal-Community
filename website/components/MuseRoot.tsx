"use client";

import { useState } from "react";
import MuseIcon from "@/components/muse/ui/MuseIcon";
import MuseModal from "@/components/muse/ui/MuseModal";

export default function MuseRoot({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {children}

      {/* Global Muse UI */}
      <MuseIcon onOpen={() => setOpen(true)} />
      <MuseModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
