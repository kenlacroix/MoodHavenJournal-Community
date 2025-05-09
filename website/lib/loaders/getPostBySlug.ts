import { getPostBySlug } from '@/lib/posts';

export async function loadPost(slug: string) {
  const post = getPostBySlug(slug);
  if (new Date(post.publishDate) > new Date()) return null;
  return post;
}
