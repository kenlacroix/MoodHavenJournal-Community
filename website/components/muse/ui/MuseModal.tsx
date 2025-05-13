// File: src/components/muse/ui/MuseModal.tsx
"use client";

import React, { useEffect } from "react";
import FocusTrap from "focus-trap-react";
import { motion, AnimatePresence } from "framer-motion";

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
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <FocusTrap>
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative bg-white w-full max-w-md h-full max-h-full
                          sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-lg
                          p-4 sm:p-6 overflow-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-300"
              >
                ✕
              </button>
              {children}
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
