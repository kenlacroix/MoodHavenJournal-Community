// file: src/components/muse/ui/MuseModal.tsx
import React from "react";
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <FocusTrap>
        <div
          role="dialog"
          aria-modal="true"
          className="relative bg-white rounded-lg shadow-lg p-6 outline-none max-w-lg w-full"
          tabIndex={-1}
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
