import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import { PostsApi } from "@/lib/posts-api";
import { PostCell } from "@/components/post/post-cell";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Metadata } from "next";
import { AUTHOR_NAME } from "@/lib/site-config";

interface Props {
  params: Promise<{ id: string }>;
}

// Process static posts to handle encoding issues
const processedPosts = PostsApi.processStaticPosts(posts);

type Post = (typeof processedPosts)[number];

function getPost(id: string): Post | undefined {
  return processedPosts.find((p) => p.id === id);
}

// Validate and transform params to ensure they're sanitized
function validateAndParseId(rawId: unknown) {
  return typeof rawId === "string" ? rawId : "";
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const resolvedId = validateAndParseId(id);
  const post = getPost(resolvedId);

  if (!post || post.status !== "published") {
    return {
      title: "Post Not Found",
      robots: { index: false, follow: false },
    };
  }

  // Project pages = specific expertise: lead with what this case study is
  // actually about (the excerpt), not just the project name.
  const description =
    post.excerpt || `A UX/UI case study by ${AUTHOR_NAME}: ${post.title}.`;
  const canonicalPath = `/post/${post.id}`;
  const ogImage = post.heroImages?.[0] ?? post.thumbnail;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: post.title,
      description,
      ...(ogImage && { images: [{ url: ogImage.url, alt: ogImage.alt }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(ogImage && { images: [ogImage.url] }),
    },
  };
}

// Generate static params for all published posts
export async function generateStaticParams() {
  // Handle case where posts array might be empty or undefined
  if (!processedPosts || processedPosts.length === 0) {
    console.warn("No posts available for generateStaticParams - returning placeholder");
    // Return a placeholder param to satisfy Next.js static export requirements
    return [{ id: "placeholder" }];
  }
  
  // Filter out placeholder posts and only include published posts
  const publishedPosts = processedPosts.filter((post) => 
    post.status === "published" && post.id !== "placeholder"
  );
  
  if (publishedPosts.length === 0) {
    console.warn("No published posts found for generateStaticParams - returning placeholder");
    // Return a placeholder param to satisfy Next.js static export requirements
    return [{ id: "placeholder" }];
  }
  
  return publishedPosts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({ params }: Props) {
  // Validate and parse id
  const { id } = await params;
  const resolvedId = validateAndParseId(id);
  
  // Handle placeholder case - redirect to 404
  if (resolvedId === "placeholder") {
    notFound();
  }
  
  const post = getPost(resolvedId);

  if (!post || post.status !== "published") {
    notFound();
  }

  const formattedDate = formatDistance(new Date(post.updatedAt), new Date(), {
    addSuffix: true,
  });

  return (
    <article className="max-w-4xl mx-auto py-8">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href={post.type === "project" ? "/projects" : "/blog"}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {post.type === "project" ? "Projects" : "Blog"}
        </Link>
      </Button>

      <div className="space-y-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Updated {formattedDate}
        </p>
      </div>

      <div className="space-y-12">
        {post.cells.map((cell) => (
          <PostCell key={cell.id} cell={cell} />
        ))}
      </div>

      {post.figmaLinks && post.figmaLinks.length > 0 && (
        <div className="mt-16 pt-8 border-t flex flex-wrap gap-3">
          {post.figmaLinks.map((link) => (
            <Button key={link.url} variant="outline" asChild>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>
      )}
    </article>
  );
}
