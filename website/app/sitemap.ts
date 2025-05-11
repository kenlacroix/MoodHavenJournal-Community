// app/sitemap.ts
import { MetadataRoute } from 'next';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.moodhaven.app';

  // ---- static marketing pages --------------------------------------------
  const staticUrls = ['', '/founders', '/privacy', '/community'].map((p) => ({
    url: `${base}${p}`,
    lastModified: '2025-05-11',
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ---- blog posts ---------------------------------------------------------
  const posts = getAllPosts();
  const postUrls = await Promise.all(
    posts.map(async (p) => {
      // fallback to file mtime if publishDate missing
      const full = path.join(process.cwd(), 'content/posts', `${p.slug}.mdx`);
      const stat = await fs.stat(full);
      const updated = p.publishDate ? new Date(p.publishDate) : stat.mtime;

      return {
        url: `${base}/blog/${p.slug}`,
        lastModified: updated.toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      };
    }),
  );

  return [...staticUrls, ...postUrls];
}
