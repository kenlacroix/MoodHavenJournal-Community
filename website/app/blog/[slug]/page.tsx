// File: app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { getHeadings } from '@/lib/mdx';
import { buildToc, TocItem } from '@/lib/build-toc';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import BlogPostClient from '@/components/BlogPostClient';
import { Heading } from '@/components/Heading';

// ---------------------------------------------------------------------------
// Types — renamed to avoid clash with Next internals
// ---------------------------------------------------------------------------
type RouteParams = { slug: string };

interface BlogPostPageProps {
  params: RouteParams;
  /** provided automatically by the Next.js app router */
  searchParams?: Record<string, string | string[] | undefined>;
}

// ---------------------------------------------------------------------------
// Pre-render all blog slugs
// ---------------------------------------------------------------------------
export async function generateStaticParams(): Promise<RouteParams[]> {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  if (new Date(post.publishDate) > new Date()) return notFound();

  // Build TOC
  const flatHeadings = await getHeadings(post.content);
  const toc: TocItem[] = buildToc(flatHeadings);

  // Render MDX
  const mdxContent = (
    <MDXRemote
      source={post.content}
      options={{
        mdxOptions: {
          remarkPlugins: [
            remarkSlug,
            [remarkAutolinkHeadings, { behavior: 'wrap' }],
          ],
        },
      }}
      components={{
        h2: (props) => <Heading as="h2" {...props} />,
        h3: (props) => <Heading as="h3" {...props} />,
      }}
    />
  );

  return (
    <BlogPostClient
      title={post.title}
      publishDate={post.publishDate}
      mdx={mdxContent}
      heroImage={post.heroImage}
      headings={toc}
      accentColor={post.accentColor}
    />
  );
}
