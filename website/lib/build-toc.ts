// File: /lib/build-toc.ts
import { Heading } from './mdx';

export type TocItem = Heading & { children: TocItem[] };

/**
 * Build a nested TOC: h2 become top–level, h3 become children of the last h2.
 */
export function buildToc(headings: Heading[]): TocItem[] {
  const toc: TocItem[] = [];
  let currentH2: TocItem | null = null;

  for (const h of headings) {
    if (h.depth === 2) {
      currentH2 = { ...h, children: [] };
      toc.push(currentH2);
    } else if (h.depth === 3 && currentH2) {
      currentH2.children.push({ ...h, children: [] });
    }
    // deeper depths can be handled similarly if you like
  }

  return toc;
}
