"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function MuseIcon({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label="Open Muse"
      onClick={onOpen}
      initial={{ scale: 1, opacity: 0.8 }}
      whileHover={{ scale: 1.15, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-3 shadow-lg shadow-indigo-700/30
                 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
    >
      <Sparkles className="h-6 w-6 text-white drop-shadow" />
    </motion.button>
  );
}
