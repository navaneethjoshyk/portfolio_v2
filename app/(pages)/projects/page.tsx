import { posts } from "@/data/posts";
import { PostsApi } from "@/lib/posts-api";
import { PostCard } from "@/components/post/post-card";
import { Metadata } from "next";
import { AUTHOR_NAME } from "@/lib/site-config";

// Process static posts to handle encoding issues
const processedPosts = PostsApi.processStaticPosts(posts);

const TITLE = "Projects";
const DESCRIPTION = `UI/UX case studies and front-end projects by ${AUTHOR_NAME} — healthcare, fintech, and community-platform work.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: "/projects",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ProjectsPage() {
  const publishedPosts = processedPosts.filter(
    (post) => post.status === "published" && post.type === "project"
  );

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <section>
        <h1 className="text-4xl font-bold tracking-tight mb-8 md:mb-10">
          Projects
        </h1>
        <div className="grid gap-8 md:gap-10">
          {publishedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
