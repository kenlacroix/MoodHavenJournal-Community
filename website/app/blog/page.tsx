// app/blog/page.tsx
import Link from "next/link";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/posts";

/* ------------------------------------------------------------------ */
/* Typed view of the helper result                                    */
/* ------------------------------------------------------------------ */
interface PostMeta {
  slug: string;
  title: string;
  publishDate?: string; // yyyy-mm-dd or ISO
  excerpt: string;
  heroImage: string;
  draft?: boolean;
  published?: boolean;
}

export default async function BlogIndex() {
  const todayISO = new Date().toISOString().slice(0, 10);

  /* ------------------------------------------------------------------
   * Collect posts, hide drafts + future-dated
   * ---------------------------------------------------------------- */
  const posts: PostMeta[] = getAllPosts()
    .filter((post: PostMeta) => {
      if (post.draft === true) return false;
      if (post.published === false) return false;
      if (post.publishDate && post.publishDate.slice(0, 10) > todayISO)
        return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = a.publishDate ? new Date(a.publishDate) : new Date(0);
      const dateB = b.publishDate ? new Date(b.publishDate) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

  /* ------------------------------------------------------------------
   * Render
   * ---------------------------------------------------------------- */
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {posts.map((post) => (
        <div key={post.slug} className="mb-6">
          <h2 className="text-xl font-semibold">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="text-gray-500 text-sm">
            {post.publishDate
              ? format(new Date(post.publishDate), "MMMM d, yyyy")
              : "Undated"}
          </p>
          <p className="mt-2">{post.excerpt}</p>
        </div>
      ))}

      {posts.length === 0 && (
        <p className="text-gray-500">No published posts yet—check back soon.</p>
      )}
    </div>
  );
}
