// app/page.tsx
import { getSubstackPosts } from "@/lib/getSubstackPosts";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const posts = await getSubstackPosts();
  return <HomeClient posts={posts} />;
}
