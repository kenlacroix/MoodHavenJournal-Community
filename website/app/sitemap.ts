// app/sitemap.ts
import { MetadataRoute } from 'next';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* ---------------------------------------------------------------
   * 1  Canonical origin: allow staging/dev via NEXT_PUBLIC_SITE_URL
   * ------------------------------------------------------------- */
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moodhaven.app').replace(/\/$/, '');

  const buildDate = new Date().toISOString();

  /* ---------------------------------------------------------------
   * 2  Static pages
   * ------------------------------------------------------------- */
  const staticUrls = [
    '', '/blog', '/founders', '/privacy', '/terms', '/faq', '/contribute',
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: buildDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  /* ---------------------------------------------------------------
   * 3  Blog posts (skip drafts if `draft: true` in front-matter)
   * ------------------------------------------------------------- */
  const posts = getAllPosts().filter((p: any) => !p.draft);

  const postUrls = await Promise.all(
    posts.map(async (p: any) => {
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
