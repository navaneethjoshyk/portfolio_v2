import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { PostsApi } from "@/lib/posts-api";
import { SITE_URL } from "@/lib/site-config";

// Static export (next.config.ts: output "export") still generates a static
// sitemap.xml from this file at build time — no server needed.
export default function sitemap(): MetadataRoute.Sitemap {
  const processedPosts = PostsApi.processStaticPosts(posts);
  const publishedProjects = processedPosts.filter(
    (post) => post.status === "published" && post.type === "project"
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/info`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = publishedProjects.map((post) => ({
    url: `${SITE_URL}/post/${post.id}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
