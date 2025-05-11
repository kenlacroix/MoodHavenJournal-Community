// File: /components/Heading.tsx
"use client";

import React from "react";

interface HeadingProps {
  as: "h2" | "h3";
  id: string;
  children: React.ReactNode;
}

export function Heading({ as: Tag, id, children }: HeadingProps) {
  const copyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <Tag id={id} className="group relative scroll-mt-20">
      {children}
      <button
        onClick={copyLink}
        className="opacity-0 group-hover:opacity-100 absolute right-2 top-1/2 -translate-y-1/2 p-1"
        aria-label="Copy link to clipboard"
      >
        🔗
      </button>
    </Tag>
  );
}
