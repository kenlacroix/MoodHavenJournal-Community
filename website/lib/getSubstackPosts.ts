// lib/getSubstackPosts.ts
import Parser from "rss-parser";

type SubstackPost = {
  title: string;
  link: string;
  date: string;
  snippet: string;
};

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  const parser = new Parser();
  const feed = await parser.parseURL("https://moodhaven.substack.com/feed");

  return feed.items.slice(0, 3).map((item) => ({
    title: item.title ?? "",
    link: item.link ?? "#",
    date: item.pubDate ?? "",
    snippet: item.contentSnippet ?? "",
  }));
}
