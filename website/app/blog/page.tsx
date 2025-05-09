import Link from 'next/link';
import { format } from 'date-fns';
import { getAllPosts } from '@/lib/posts';

export default async function BlogIndex() {
  const posts = getAllPosts()
    .filter((post) => new Date(post.publishDate) <= new Date())
    .sort(
      (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      {posts.map((post) => (
        <div key={post.slug} className="mb-6">
          <h2 className="text-xl font-semibold">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="text-gray-500 text-sm">
            {format(new Date(post.publishDate), 'MMMM d, yyyy')}
          </p>
          <p className="mt-2">{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
