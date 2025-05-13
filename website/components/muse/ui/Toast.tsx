// File: src/components/muse/ui/Toast.tsx
"use client";
import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  duration?: number; // in ms
  onClose?: () => void;
}

export default function Toast({
  message,
  duration = 3000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-8 right-8 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg opacity-90 transition-opacity duration-300">
      {message}
    </div>
  );
}
