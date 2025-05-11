// File: /lib/mdx.ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkSlug from 'remark-slug';
import { visit } from 'unist-util-visit';

export type Heading = { id: string; text: string; depth: number };

export async function getHeadings(mdxContent: string): Promise<Heading[]> {
  // 1. Build a processor with your plugins
  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkSlug);

  // 2. Parse to a tree…
  const tree = processor.parse(mdxContent);
  // 3. …then actually run all plugins against it
  await processor.run(tree);

  // 4. Walk it for headings with data.id
  const headings: Heading[] = [];
  visit(tree, 'heading', (node: any) => {
    const textNode = node.children.find((c: any) => c.type === 'text');
    if (textNode && node.data?.id) {
      headings.push({
        id: node.data.id!,
        text: textNode.value,
        depth: node.depth,
      });
    }
  });

  return headings;
}
