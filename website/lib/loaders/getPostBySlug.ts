import { getPostBySlug, PostFull } from "@/lib/posts";

export async function loadPost(slug: string): Promise<PostFull | null> {
  const post = getPostBySlug(slug);

  // Hide drafts, unpublished, or future-dated posts
  if (post.draft === true) return null;
  if (post.published === false) return null;
  if (post.publishDate && new Date(post.publishDate) > new Date()) return null;

  return post;
}
