// File: src/components/muse/ui/MuseMenu.tsx
"use client";

export type Category = "reflect" | "center" | "create";

interface Props {
  /** Called when the user selects a category */
  onSelectCategory: (category: Category) => void;
}

export default function MuseMenu({ onSelectCategory }: Props) {
  const base =
    "w-full sm:text-lg text-base min-h-[3rem] rounded-lg py-4 sm:py-3 font-semibold tracking-wide shadow hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  return (
    <div className="space-y-4">
      <button
        className={`${base} bg-indigo-500 text-white`}
        onClick={() => onSelectCategory("reflect")}
      >
        Reflect
      </button>
      <button
        className={`${base} bg-teal-500 text-white`}
        onClick={() => onSelectCategory("center")}
      >
        Center
      </button>
      <button
        className={`${base} bg-amber-500 text-white`}
        onClick={() => onSelectCategory("create")}
      >
        Create
      </button>
    </div>
  );
}
