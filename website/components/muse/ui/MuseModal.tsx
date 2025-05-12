// File: src/components/muse/ui/MuseModal.tsx
import React, { useEffect } from "react";
import FocusTrap from "focus-trap-react";

interface MuseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MuseModal({
  isOpen,
  onClose,
  children,
}: MuseModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // click outside to close
    >
      <FocusTrap>
        <div
          role="dialog"
          aria-modal="true"
          className="relative bg-white rounded-lg shadow-xl p-6 max-w-lg w-full"
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
          {children}
        </div>
      </FocusTrap>
    </div>
  );
}
