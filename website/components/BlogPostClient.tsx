// File: /components/BlogPostClient.tsx
'use client';

import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import TableOfContents from './TableOfContents';
import { TocItem } from '@/lib/build-toc';

interface BlogPostClientProps {
  title: string;
  publishDate: string;
  mdx: ReactNode;
  heroImage: string;
  headings: TocItem[];
  accentColor: string;
}

export default function BlogPostClient({
  title,
  publishDate,
  mdx,
  heroImage,
  headings,
  accentColor,
}: BlogPostClientProps) {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <>
      {/* Mobile “Contents” toggle */}
      <button
        onClick={() => setTocOpen(true)}
        className="fixed bottom-4 right-4 z-50 sm:hidden bg-white dark:bg-gray-900 p-3 rounded-full shadow-md"
        aria-label="Show contents"
      >
        📑
      </button>

      <div className="flex flex-col sm:flex-row sm:items-start gap-8">
        <TableOfContents
          headings={headings}
          isOpen={tocOpen}
          onClose={() => setTocOpen(false)}
          accentColor={accentColor}
        />

        <div className="flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm py-8 px-4 sm:py-12 sm:px-6">
          {heroImage && (
            <motion.img
              src={heroImage}
              alt={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="rounded-xl shadow-sm my-6 mx-auto w-full max-w-2xl"
            />
          )}

          {/* jump target for “Introduction” */}
          <h1 id="top" className="scroll-mt-20 text-3xl font-bold mb-2">
            {title}
          </h1>

          <p className="text-gray-500 text-sm mb-8">
            {new Date(publishDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <article
            id="content"
            className="
              prose prose-lg prose-neutral max-w-none dark:prose-invert
              prose-p:leading-relaxed
              print:mx-8 print:my-8 print:text-lg print:leading-relaxed
            "
          >
            {mdx}
          </article>
        </div>
      </div>
    </>
  );
}
