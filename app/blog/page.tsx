import { headers } from "next/headers";
import BlogList from "@/components/blog-list";

export const dynamic = "force-dynamic";

async function getPosts() {
  try {
    const h = await headers();

    const host =
      h.get("x-forwarded-host") ||
      h.get("host") ||
      "localhost:3000";

    const proto = h.get("x-forwarded-proto") || "http";

    const response = await fetch(
      `${proto}://${host}/api/cms/public`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    const data = await response.json();

    return (data.records || []).filter(
      (item: any) => item.key?.startsWith("blog:")
    );
  } catch (error) {
    console.error("Blog loading error:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return <BlogList posts={posts} />;
}