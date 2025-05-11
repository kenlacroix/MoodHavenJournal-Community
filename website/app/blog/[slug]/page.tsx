// File: /app/blog/[slug]/page.tsx
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { getHeadings } from '@/lib/mdx';
import { buildToc, TocItem } from '@/lib/build-toc';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import BlogPostClient from '@/components/BlogPostClient';
import { Heading } from '@/components/Heading';  // ← our new Heading component

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export default async function BlogPostPage(
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  if (new Date(post.publishDate) > new Date()) return notFound();

  const flatHeadings = await getHeadings(post.content);
  const toc: TocItem[] = buildToc(flatHeadings);

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
        h2: props => <Heading as="h2" {...props} />,
        h3: props => <Heading as="h3" {...props} />,
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
      accentColor={post.accentColor}   /* ← pass the frontmatter accent */
    />
  );
}
