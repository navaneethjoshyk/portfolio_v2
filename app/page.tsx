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
      {/* Matrix shader — dark mode only, purely decorative, and fixed
         behind the whole page so the animation runs throughout as you
         scroll. Everything readable sits on solid surfaces above it (the
         dark: panel classes below), so the moving background never ends up
         behind body text. */}
      <MatrixShaderBackground className="dark:block hidden" />

      <div className="relative z-10 flex flex-col gap-16 pb-8">
        {/* Dark-mode intro screen over the animation. Scrolls away
           normally; the negative top margin cancels the layout's top
           padding so it fills the first screen below the 4rem header. */}
        <section
          aria-label="Introduction"
          className="hidden dark:flex -mt-8 md:-mt-12 h-[calc(100vh-4rem)] items-center justify-center text-center"
        >
          <div className="space-y-4 px-8">
            {/* Not an h1 — the page's one h1 is in the section below,
               which is also what light mode shows. */}
            <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight animate-fade-in-300">
              Navaneeth Joshy K
            </p>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light animate-fade-in-500">
              UI/UX Designer &amp; Frontend Developer
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 font-light animate-fade-in-700">
              Figma • React • Tailwind CSS
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 font-light animate-fade-in-900">
              UI/UX Design • Accessibility • Web Development
            </p>
          </div>
        </section>

        <section className="space-y-4 pt-4 dark:bg-background dark:border dark:rounded-xl dark:p-6">
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
          <div className="flex items-center justify-between gap-4 dark:bg-background dark:border dark:rounded-xl dark:px-6 dark:py-3">
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

        <section className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t dark:bg-background dark:border dark:rounded-xl dark:p-6">
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
        {/* Solid background, no backdrop-blur: blurring over a moving
           WebGL canvas makes the browser re-blur this area every frame. */}
        <div className="flex items-center gap-6 text-muted-foreground text-sm font-medium bg-background px-4 py-2 rounded-full border shadow-sm">
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
