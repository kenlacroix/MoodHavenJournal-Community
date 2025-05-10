// File: /app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogPostClient from '@/components/BlogPostClient';

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage(
  { params, searchParams }: { params: { slug: string }; searchParams: Record<string, string | string[]> }
) {
  const { slug } = params;

  const post = getPostBySlug(slug);
  if (new Date(post.publishDate) > new Date()) return notFound();

  const mdxContent = <MDXRemote source={post.content} />;

  return (
    <BlogPostClient
      title={post.title}
      publishDate={post.publishDate}
      mdx={mdxContent}
      heroImage={post.heroImage}
    />
  );
}
