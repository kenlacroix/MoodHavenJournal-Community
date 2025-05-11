// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

/* ------------------------------------------------------------------ */
/* Shared post interfaces                                             */
/* ------------------------------------------------------------------ */
export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  publishDate?: string; // ISO yyyy-mm-dd when present
  draft?: boolean; // true  ➜ hide
  published?: boolean; // false ➜ hide
}

export interface PostFull extends PostMeta {
  content: string;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
function readFrontMatter(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  // normalise keys
  const publishDate: string | undefined =
    data.publishDate ?? data.date ?? undefined;

  const draft: boolean | undefined =
    data.draft !== undefined ? Boolean(data.draft) : undefined;

  const published: boolean | undefined =
    data.published !== undefined ? Boolean(data.published) : undefined;

  return { data, content, publishDate, draft, published };
}

/* ------------------------------------------------------------------ */
/* Public API                                                         */
/* ------------------------------------------------------------------ */
export function getAllPosts(): PostMeta[] {
  return fs.readdirSync(postsDirectory).map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const { data, publishDate, draft, published } = readFrontMatter(fullPath);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      heroImage: data.heroImage || "/images/default-hero.jpg",
      publishDate,
      draft,
      published,
    };
  });
}

export function getPostBySlug(slug: string): PostFull {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const { data, content, publishDate, draft, published } =
    readFrontMatter(fullPath);

  return {
    slug,
    content,
    title: data.title,
    excerpt: data.excerpt,
    heroImage: data.heroImage || "/images/default-hero.jpg",
    publishDate,
    draft,
    published,
  };
}
