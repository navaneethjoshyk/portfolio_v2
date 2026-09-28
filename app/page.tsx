import MatrixShaderBackground from "@/components/ui/matrix-shader-background";
import { PostCard } from "@/components/post/post-card";
import { PostsApi } from "@/lib/posts-api";
import { posts } from "@/data/posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Process static posts once, same pattern used on /projects and the
// case-study page — then hand-pick the three that best represent range
// (a live client build, a full-stack capstone, a healthcare case study)
// for the homepage instead of just taking the first three in the array.
const processedPosts = PostsApi.processStaticPosts(posts);
const FEATURED_IDS = ["b12feed", "infinite-housing", "mediguru"];
const featuredPosts = FEATURED_IDS.map((id) =>
  processedPosts.find((post) => post.id === id)
).filter((post): post is NonNullable<typeof post> => Boolean(post));

export default function Home() {
  return (
    <>
      {/* Full-screen Matrix Shader Background — dark mode only, purely
         decorative and fixed in place so it stays put as the page scrolls
         past it. In light mode this renders nothing, which is why the
         sections below can't depend on it for content. */}
      <MatrixShaderBackground
        className="dark:block hidden"
        name="Navaneeth Joshy K"
        title="UI/UX Designer & Frontend Developer"
        skills="Figma • React • Tailwind CSS"
        interests="UI/UX Design • Accessibility • Web Development"
      />

      {/* Gives the animated hero its own full screen in dark mode before
         real content begins. Collapses to nothing in light mode, where
         the hero above is hidden entirely. */}
      <div className="hidden dark:block h-screen" aria-hidden="true" />

      <div className="relative z-10 flex flex-col gap-16 pb-8">
        <section className="space-y-4 pt-4 dark:pt-0">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Navaneeth Joshy K
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            UI/UX Designer and Front-End Developer who takes products from
            research and wireframes through to production-ready, accessible
            interfaces — currently a Graduate Research Assistant at Humber
            College and a Graphic Designer at B12Feed, with prior frontend
            and product-design work across telecom and healthcare.
          </p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Selected Work
            </h2>
            <Button variant="ghost" asChild className="font-medium">
              <Link href="/projects">View all projects</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} variant="compact" />
            ))}
          </div>
        </section>

        <section className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t">
          <p className="text-base font-medium flex-1 pt-4 sm:pt-0">
            Open to new opportunities in UI/UX design and front-end
            development.
          </p>
          <Button asChild className="font-medium">
            <Link href="mailto:navaneethjoshyk8@gmail.com">Email me</Link>
          </Button>
        </section>
      </div>

      {/* Fixed social links dock — always visible (not just over the dark
         hero), so it stays the fastest way to reach these links even
         though the footer is intentionally hidden on this page. */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto animate-fade-in-1000">
        <div className="flex items-center gap-6 text-muted-foreground text-sm font-medium bg-background/80 backdrop-blur px-4 py-2 rounded-full border shadow-sm">
          <a
            href="https://github.com/navaneethjoshyk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-200"
          >
            GitHub
          </a>
          <span className="text-muted-foreground/40">•</span>
          <a
            href="https://www.linkedin.com/in/navaneethjoshyk/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-200"
          >
            LinkedIn
          </a>
          <span className="text-muted-foreground/40">•</span>
          <a
            href="mailto:navaneethjoshyk8@gmail.com"
            className="hover:text-foreground transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </>
  );
}
