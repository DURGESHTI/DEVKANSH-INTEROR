import { headers } from "next/headers";
import BlogArticle from "@/components/blog-article";

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

    return (data.records || []).filter((item: any) =>
      item.key?.startsWith("blog:")
    );
  } catch {
    return [];
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPosts();

  const post = posts.find((item: any) => {
    const savedSlug =
      item.payload?.slug || item.key?.replace("blog:", "");

    return savedSlug === decodeURIComponent(slug);
  });

  if (!post) {
    return (
      <main className="min-h-screen bg-background px-5 pt-40 text-center text-foreground">
        <h1 className="font-display text-4xl">Blog Not Found</h1>
        <a href="/blog" className="mt-6 inline-block text-gold">
          ← Back to Blogs
        </a>
      </main>
    );
  }

  return <BlogArticle post={post.payload || {}} />;
}