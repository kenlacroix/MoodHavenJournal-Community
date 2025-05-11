// app/sitemap.ts
import { MetadataRoute } from 'next';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getAllPosts } from '@/lib/posts';   // ← your helper

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.moodhaven.app';

  // --- static pages you want indexed ---
  const staticUrls: MetadataRoute.SitemapUrl[] = [
    '', '/founders', '/privacy', '/community',
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: '2025-05-11',
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // --- blog posts ---
  const posts = getAllPosts();               // sync fn is fine here
  const postUrls: MetadataRoute.SitemapUrl[] = await Promise.all(
    posts.map(async (p) => {
      // if publishDate missing, fall back to file mtime
      const full = path.join(process.cwd(), 'content/posts', `${p.slug}.mdx`);
      const stat = await fs.stat(full);
      const updated = p.publishDate
        ? new Date(p.publishDate)
        : stat.mtime;

      return {
        url: `${base}/blog/${p.slug}`,
        lastModified: updated.toISOString(),
        changeFrequency: 'weekly',
        priority: 0.9,
      };
    }),
  );

  return [...staticUrls, ...postUrls];
}
