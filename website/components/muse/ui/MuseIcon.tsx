import { useState } from "react";
import MuseModal from "./MuseModal";

export default function MuseIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-white shadow-lg p-3 hover:scale-105 hover:bg-gray-100 transition"
        aria-label="Open Muse Companion"
      >
        🪶 {/* Feather emoji as placeholder; replace with an SVG icon later */}
      </button>

      <MuseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
