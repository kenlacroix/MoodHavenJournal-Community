import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title,
      publishDate: data.publishDate,
      excerpt: data.excerpt,
      heroImage: data.heroImage || '/images/default-hero.jpg',
    } as {
      slug: string;
      content: string;
      title: string;
      publishDate: string;
      excerpt: string;
      heroImage: string;
    };
  });
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    title: data.title,
    publishDate: data.publishDate,
    excerpt: data.excerpt,
    heroImage: data.heroImage || '/images/default-hero.jpg',
  } as {
    slug: string;
    content: string;
    title: string;
    publishDate: string;
    excerpt: string;
    heroImage: string;
  };
}
