// app/sitemap.ts
import { MetadataRoute } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { getAllPosts } from "@/lib/posts";

/* Typed helper result */
interface PostMeta {
  slug: string;
  publishDate?: string;
  draft?: boolean;
  published?: boolean;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* 1. canonical origin */
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.moodhaven.app"
  ).replace(/\/$/, "");

  const buildDate = new Date().toISOString();
  const todayISO = buildDate.slice(0, 10); // yyyy-mm-dd

  /* 2. static pages */
  const staticUrls = [
    "",
    "/blog",
    "/founders",
    "/privacy",
    "/terms",
    "/faq",
    "/contribute",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: buildDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  /* 3. blog posts (skip drafts + future-dated) */
  const posts: PostMeta[] = getAllPosts().filter((p: PostMeta) => {
    if (p.draft === true) return false;
    if (p.published === false) return false;
    if (p.publishDate && p.publishDate.slice(0, 10) > todayISO) return false;
    return true;
  });

  const postUrls = await Promise.all(
    posts.map(async (p) => {
      const full = path.join(process.cwd(), "content/posts", `${p.slug}.mdx`);
      const stat = await fs.stat(full);
      const updated = p.publishDate ? new Date(p.publishDate) : stat.mtime;

      return {
        url: `${base}/blog/${p.slug}`,
        lastModified: updated.toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      };
    })
  );

  return [...staticUrls, ...postUrls];
}
