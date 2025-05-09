// File: /app/blog/layout.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';

export default function BlogLayout({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-orange-200 bg-opacity-20 z-50">
        <div
          className="h-full bg-orange-500 transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Force a consistent light background on blog pages */}
      <main className="bg-gray-50 min-h-screen">
        {children}
      </main>
    </>
  );
}
