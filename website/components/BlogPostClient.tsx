'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function BlogPostClient({
  title,
  publishDate,
  mdx,
  heroImage,
}: {
  title: string;
  publishDate: string;
  mdx: ReactNode;
  heroImage: string;
}) {
  return (
    <div
      className="
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        rounded-lg shadow-sm
        max-w-2xl mx-auto
        py-8 px-4 sm:py-12 sm:px-6
      "
    >
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

      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 text-sm mb-8">
        {new Date(publishDate).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <article className="prose prose-lg prose-neutral max-w-none dark:prose-invert prose-p:leading-relaxed">
        {mdx}
      </article>
    </div>
  );
}
