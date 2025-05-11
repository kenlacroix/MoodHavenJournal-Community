"use client";

import { musePrompts } from "../data/musePrompts";

interface Props {
  onClose: () => void;
}
export default function MuseMenu({ onClose }: Props) {
  const handleClick = (category: keyof typeof musePrompts) => {
    const list = musePrompts[category];
    const random = list[Math.floor(Math.random() * list.length)];
    console.log(`[Muse:${category}]`, random); // placeholder telemetry
    onClose();
  };

  const base =
    "w-full rounded-lg py-3 font-semibold tracking-wide shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <div className="space-y-4">
      <button
        className={`${base} bg-indigo-500 text-white`}
        onClick={() => handleClick("reflect")}
      >
        Reflect
      </button>
      <button
        className={`${base} bg-teal-500 text-white`}
        onClick={() => handleClick("center")}
      >
        Center
      </button>
      <button
        className={`${base} bg-amber-500 text-white`}
        onClick={() => handleClick("create")}
      >
        Create
      </button>
    </div>
  );
}
